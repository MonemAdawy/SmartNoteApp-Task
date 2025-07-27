import { EventEmitter } from "events";
import jwt from "jsonwebtoken";
import sendEmails, { subjects } from "./sendEmails.js";
import { signUpActivateByOtp } from "./generateHTML.js";
export const emailEvent = new EventEmitter();



emailEvent.on("sendEmail", async (email, otp, subject) => {
    console.log(`Event sendEmail: ${email}`);
    const isSent = await sendEmails({to: email, subject, html: signUpActivateByOtp(otp)});
    
});



