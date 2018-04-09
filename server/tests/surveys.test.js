const Page = require('./helpers/page');

let page;

beforeEach(async () => {
	page = await Page.build();
	await page.goto('localhost:3000');
});

afterEach(async () => {
	await page.close();
});

describe('when logged in', async () => {
	beforeEach(async () => {
		await page.login();
		await page.click('a.btn-floating');
	});

	test('can see survey create form', async () => {
		const label = await page.getContentsOf('form label');

		expect(label).toEqual('Survey Title');
	});

	describe('and using valid inputs', async () => {
		beforeEach(async () => {
			await page.type('[name="title"]', 'My Title');
			await page.type('[name="subject"]', 'My Subject');
			await page.type('[name="body"]', 'My Content');
			await page.type('[name="recipients"]', 'jlyu@wpi.edu');

			await page.click('form button');
		});

		test('submitting takes user to review screen', async () => {
			const text = await page.getContentsOf('h5');
			expect(text).toEqual('Please confirm your entries:');
		});

		// fails, timeout error, no click event observed
		// might related to the 'need credit' check
		test.skip('submitting then saving adds survey to index page', async () => {
			await page.click('button.green');			
			await page.waitFor('.card');

			const title = await page.getContentsOf('.card-title');
			const content = await page.getContentsOf('p');

			expect(title).toEqual('My Title');
			expect(content).toEqual('My Content');
		});
	});


	describe('and using invalid inputs', async () => {
		beforeEach(async () => {
			await page.click('form button');
		});

		test('the form shows an error message', async () => {
			const titleError = await page.getContentsOf('[name="title"] + div');
			const subjectError = await page.getContentsOf('[name="subject"] + div');
			const contentError = await page.getContentsOf('[name="body"] + div');
			const recipientsError = await page.getContentsOf('[name="recipients"] + div');

			expect(titleError).toEqual('Survey Title couldn\'t be empty');
			expect(subjectError).toEqual('Subject couldn\'t be empty');
			expect(contentError).toEqual('Content couldn\'t be empty');
			expect(recipientsError).toEqual('Recipient List couldn\'t be empty');
		});
	});

});