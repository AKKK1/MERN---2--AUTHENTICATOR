import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailtrapClient } from "./mailtrap.config.js"
import { sender } from "./mailtrap.config.js";


export const sendVerificationEmail = async (email, verificationToken) => {
    const recipients = [
        {email}
    ]

    try {
        const response = await mailtrapClient.send({
            from: {
                email: "hello@demomailtrap.com",
                name: "AKAKI ",
            },
            to: recipients,
            subject: "Verify Your Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            text: "Congrats for sending test email with Mailtrap!     SAMA LAMA DUMMA GAMA YOU ASSUMIN",
            category: "Email  Verification",
            
        })
console.log("email send successfully", response)
    } catch (error) {
console.error(`error sending verification : ${error}`)

throw new Error(` sending verification email failed: ${error}`)
    }
}