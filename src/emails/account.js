const sgMail = require('@sendgrid/mail')
// const sendgridAPIKey =
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'hello@billss.co',
    subject: 'Thanks for joining in!',
    text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
  }).then(() => {
    //Celebrate
  })
  .catch(error => {
    //Log friendly error
    console.error(error.toString());

    //Extract error msg
    const {message, code, response} = error;

    //Extract response msg
    const {headers, body} = response;
  });
}

const sendCancelationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'hello@billss.co',
    subject: 'We are sorry to see you leave!',
    text: `Googbye ${name}. Let us knoww what we could have done better to keep you among us.`
  }).then(() => {
    //Celebrate
  })
  .catch(error => {

    //Log friendly error
    console.error(error.toString());

    //Extract error msg
    const {message, code, response} = error;

    //Extract response msg
    const {headers, body} = response;
  });
}

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail
}
