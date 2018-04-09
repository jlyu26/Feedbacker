// const puppeteer = require('puppeteer');
// const sessionFactory = require('./factories/sessionFactory');
// const userFactory = require('./factories/userFactory');
const Page = require('./helpers/page');

// let browser, page;	// make the two variable global
let page;

beforeEach(async () => {
	// browser = await puppeteer.launch({
	// 	headless: false
	// });
	// page = await browser.newPage();
	page = await Page.build();
	await page.goto('http://localhost:3000');
});

afterEach(async () => {
	// await browser.close();
	await page.close();
});

test('the header has the correct text', async () => {
	// nothing special with $ sign below, it's not jQuery but puppyteer page function
	// const text = await page.$eval('a.brand-logo', el => el.innerHTML);
	const text = await page.getContentsOf('a.brand-logo');

	expect(text).toEqual('Feedbacker');
});

test('clicking login starts oauth flow', async () => {
	await page.click('.right a');

	const url = await page.url();

	expect(url).toMatch(/accounts\.google\.com/);
});

test('when signed in, shows logout button', async () => {
	// const user = await userFactory();
	// const { session, sig } = sessionFactory(user);

	// await page.setCookie({ name: 'session', value: session });
	// await page.setCookie({ name: 'session.sig', value: sig });
	// await page.goto('localhost:3000');
	// await page.waitFor('a[href="/api/logout"]');

	await page.login();

	const text = await page.getContentsOf('a[href="/api/logout"]');

	expect(text).toEqual('Logout');
});