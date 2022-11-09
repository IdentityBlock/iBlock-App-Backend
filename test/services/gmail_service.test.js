const GmailService = require('../../services/gmail_service');

require('dotenv').config();

jest.setTimeout(30 * 1000);

test('Testing sending mail', async () => {
    const service = new GmailService(process.env.GMAIL_USER, process.env.GMAIL_CLIENT_ID, process.env.GMAIL_CLIENT_SECRET, process.env.GMAIL_REFRESH_TOKEN);
    let id = await service.send("ishadijaz@gmail.com", "TestMail", "Hello World!");
    console.log(id);
    expect(id).toMatch(/@gmail.com/);
})