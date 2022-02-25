const dotenv = require('dotenv').config()
const fs = require('fs')
const sgMail = require('@sendgrid/mail')
const axios = require('axios')

const SENGRID_APIKEY = process.env.SENGRID_APIKEY
const SENDGRID_VALID_EMAIL = process.env.SENDGRID_VALID_EMAIL
const ETHERSCAN_APIKEY = process.env.ETHERSCAN_APIKEY
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN
const TWILIO_PHONE = process.env.TWILIO_PHONE

const GAS_TARGET = process.env.GAS_TARGET

const sms = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

sgMail.setApiKey(SENGRID_APIKEY);

const recipients = [
  { email: '<Coloca el email en donde quieres recibir la notificación aquí>',
    phone: '<Coloca el numero de teléfono con prefijo en donde quieres recibir la notificación sms aquí>' },
]

let email = ( addressEmail, safeGasPrice ) => {
  msg = {
    to: addressEmail,
    from: SENDGRID_VALID_EMAIL,
    subject: 'This is a notification about gas price.',
    text: `El precio del gas en este momento es de ${safeGasPrice} GWEI`,
    html: `<p>El precio del gas en este momento es de <strong>${safeGasPrice}</strong> GWEI</p>`
  }

  return msg;
}
setInterval(
  () => { axios.get(`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${ETHERSCAN_APIKEY}`)
              .then(function (response) {
                if(response.data.result.SafeGasPrice < GAS_TARGET) sendNotifications(response.data.result.SafeGasPrice)
              })
              .catch(function (error) {
                console.log(error);
              })
          }
, 20000 )

async function sendNotifications (safeGasPrice) {
  recipients.forEach( user => {
    let msg = email(user.email, safeGasPrice)

    sms.messages
      .create({
        body: `El precio del gas en este momento es de ${safeGasPrice} GWEI`,
        from: `${TWILIO_PHONE}`,
        to: user.phone
      })
      .then(message => console.log(message.sid))
      .catch((error) => {console.error(error)})

    sgMail.send(msg)
      .then(console.log( "Email sent"))
      .catch((error) => {console.error(error)})
  })
}
