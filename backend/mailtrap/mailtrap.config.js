import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";
dotenv.config();


const TOKEN = "66aca14f7e97a2fb11fe59536d31e5a6";

export const mailtrapClient = new MailtrapClient({
  token: TOKEN,
});

console.log(TOKEN);


export const sender = {
  email: "hello@demomailtrap.com",
  name: "AKAKI ",
};


// const recipients = [
//   {
//     email: "akakichachava1@gmail.com",
//   }
// ];

// mailtrapClient
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!AKAKI CHACHAVA",
//     text: "Congrats for sending test email with Mailtrap!     SAMA LAMA DUMMA GAMA YOU ASSUMIN",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);