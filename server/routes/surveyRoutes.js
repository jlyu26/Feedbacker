const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const cleanCache = require('../middlewares/cleanCache');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
	app.get('/api/surveys', requireLogin, async (req, res) => {	// pull the list of surveys created by current user out of database
		const surveys = await Survey.find({ _user: req.user.id })	// returns a query object of mongoose
			.select({ recipients: false })	// exclude `recipients` list which could be very big
			.cache({ key: req.user.id });	// cache this particular query

		res.send(surveys);
	});

	// Caching with Redis:
	// app.get('/api/surveys', requireLogin, async (req, res) => {
	// 	const redis = require('redis');
	// 	const redisUrl = 'redis://127.0.0.1:6379';
	// 	const client = redis.createClient(redisUrl);
	// 	const util = require('util');
	// 	client.get = util.promisify(client.get);

	// 	// Do we have any cached data in redis related to this query?
	// 	const cachedSurveys = await client.get(req.user.id);

	// 	// If yes, then respond to the request right away in return
	// 	if (cachedSurveys) {
	// 		console.log('SERVING FROM CACHE');
	// 		return res.send(JSON.parse(cachedSurveys));
	// 	}

	// 	// If no, respond to request and update cache to store the data
	// 	const surveys = await Survey.find({ _user: req.user.id })
	// 		.select({ recipients: false });

	// 	console.log('SERVING FROM MONGODB');
	// 	res.send(surveys);

	// 	client.set(req.user.id, JSON.stringify(surveys));
	// });

	app.get('/api/surveys/:surveyId/:choice', (req, res) => {	// in production environment remove '/' before 'api/...'
		res.send('Thanks for your feedback!');
	});

	app.post('/api/surveys/webhooks',(req, res) => {	// survey feedback filter pipeline
		const p = new Path('/api/surveys/:surveyId/:choice');

		_.chain(req.body)
			.map(({ email, url }) => {
				const match = p.test(new URL(url).pathname);
				if (match) {
					return { email, surveyId: match.surveyId, choice: match.choice };
				}
			})
			.compact()
			.uniqBy('email', 'surveyId')
			.each(({ surveyId, email, choice }) => {
				Survey.updateOne(	// query inside MongoDB
					{
						_id: surveyId,
						recipients: {
							$elemMatch: { email: email, responded: false }
						}
					}, 
					{
						$inc: { [choice]: 1 },
						$set: { 'recipients.$.responded': true },
						lastResponded: new Date()
					}
				).exec();
			})
			.value();

		res.send({});
	});

	app.post('/api/surveys', requireLogin, requireCredits, cleanCache, async (req, res) => {
		const { title, subject, body, recipients } = req.body;	// ES6 deconstructure

		const survey = new Survey({
			title,
			subject,
			body,
			recipients: recipients.split(',').map(email => ({ email: email.trim() })),
			_user: req.user.id,
			dateSent: Date.now()
		});

		// Send an email, save the suevey, charge user 1 credit and update user information
		const mailer = new Mailer(survey, surveyTemplate(survey));

		try {
			await mailer.send();
			await survey.save();
			req.user.credits -= 1;
			const user = await req.user.save();

			res.send(user);	// send back the user model with updated credits
		} catch (err) {
			res.status(422).send(err);	// 422: UNPROCESSABLE ENTITY
		}
	});
};