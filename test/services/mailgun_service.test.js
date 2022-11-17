const Mailgun = require('../../services/mailgun_service');
let mailgun = new Mailgun();

jest.setTimeout(30 * 1000);

test('Testing sending mail with mailgun', async () => {
    let receipt = await mailgun.send("ishadijaz@gmail.com", "TestMail", "Hello World!");
    console.log(receipt);
    expect(receipt["status"]).toBe(200);
})