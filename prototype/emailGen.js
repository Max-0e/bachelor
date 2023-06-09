const nodemailer = require('nodemailer');

nodemailer.createTestAccount((err, account) => {
	if (err) {
		console.log(err);
	}
	console.log(`
Account created successfully!
****************************************************************************
SMTP_USER=${account.user}
SMTP_PASS=${account.pass}
****************************************************************************
Please create a .env file and copy the text between the lines above into it.
\n
You can use these Credetials to log into https://ethereal.email/login and receive emails sent from your application instance.
\n
Username: ${account.user}
Password: ${account.pass}
	`);
});
