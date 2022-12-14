const fs = require('fs');
const path = require('path');

const Mailgun = require('../../services/mailgun_service');
let mailgun = new Mailgun();

jest.setTimeout(30 * 1000);

test('Testing sending mail with mailgun', async () => {
    let receipt = await mailgun.send("mailer.iblock@gmail.com", "TestMail", "Hello World!");
    expect(receipt["status"]).toBe(200);
});

test('Test sending mail with html templates', async ()=>{
    let template = fs.readFileSync(path.join(__dirname,'../../mail_templates/success.html'));
    let html = template.toString();
    html = html.replace('[0xSAMPLE_CONTRACT]', '0xasdfghjkllllllll');

    let receipt = await mailgun.send("mailer.iblock@gmail.com", "noreply", "", html);
    expect(receipt["status"]).toBe(200);
});