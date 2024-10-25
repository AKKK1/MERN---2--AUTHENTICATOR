import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js"



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

export const sendWelcomeEmail = async (email, name) => {
    
    const recipients = [
        {email}
    ];

    try {
     
       const response = await mailtrapClient
          .send({
            from: sender,
            to: recipients,
            template_uuid: "550da430-66f1-4ebc-8968-8bf86b468865",
            template_variables: {
              "company_info_name": "Auth Company",
              "name": "Test_Name"
            }
          })
          
    

          console.log("email send successfully", response)

    }
    catch (error) {
		console.error(`Error sending welcome email`, error);

		throw new Error(`Error sending welcome email: ${error}`);
	}


}

export const sendPasswordResetEmail = async (email, resetURL) => {
	const recipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Reset your password",
			html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
			category: "Password Reset",
		});
	} catch (error) {
		console.error(`Error sending password reset email`, error);

		throw new Error(`Error sending password reset email: ${error}`);
	}
};

export const sendResetSuccessEmail = async (email) => {
	const recipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Password Reset Successful",
			html: PASSWORD_RESET_SUCCESS_TEMPLATE,
			category: "Password Reset",
		});

		console.log("Password reset email sent successfully", response);
	} catch (error) {
		console.error(`Error sending password reset success email`, error);

		throw new Error(`Error sending password reset success email: ${error}`);
	}
};