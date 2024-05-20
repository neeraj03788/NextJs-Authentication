import { User } from '@/models/user.model';
import nodemailer  from 'nodemailer'
import bcryptjs from 'bcryptjs'

export const sendEmail=async({email,emailType,userId}:any)=>{
        //todo
        try{
         const hashedToken= await bcryptjs.hash(userId.toString(),10)
        
        if(emailType==="VERIFY"){
          await User.findByIdAndUpdate(userId,
            {VerifyToken:hashedToken,VerifyTokenExpiery:Date.now()+3600000}
          )
        }
        else if(emailType==="RESET"){
          await User.findByIdAndUpdate(userId,
            {forgotPasswordVerify:hashedToken,forgotPasswordExpiery:Date.now()+3600000}
          )
        }
    
        var transport = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "18a14672f457c2",
            pass: "6fd3652a2530de"
          }
        });

          const mailOptions={
            from: 'neerajkumarburnwal.cse2021@nsec.ac.in', 
            to: 'neerajkumar03788@gmail.com', 
            subject: emailType==="VERIFY"?"verify email ":"reset your password", 
            html: "<b>Hello world?</b>", 
          }
          const mailResponse = await transport.sendMail(mailOptions)
          return mailResponse;
    } catch (error:any) {
        throw new Error(error.message)
    }

}