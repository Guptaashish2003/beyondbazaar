import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import User from "@/backend/model/User";
import {sendEmail} from "@/backend/utils/sendEmail";
import ResetPassword from "@/components/EmailTemplate/ResetPassword";

export async function POST(request){
    await connectDB();
    try {
        const data = await request.json();
        const {email} = data;
        if ( !email ) {
            return NextResponse.json({ success: false, message: "Invalid Input" }, { status: 400 });
        }
        const user = await User.findOne( {email});
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "email not found",
            },{status: 400});
        }
        const verificationToken =  user.getResetPasswordToken();
        await user.save({ validateBeforeSave: false });
        const ResetUrl = `${process.env.FrontendURL}/reset-password/${verificationToken}`;
        const EmailHtml =  ResetPassword({url:ResetUrl,name:user.name});
        try {
            sendEmail({
              email: email,
              subject: "Reset Your Password",
              EmailHtml
            });
            const message = `We have send an email to ${email}  please click the link included to update your pasword`
            return NextResponse.json(
                { success: true, message: message },
                { status: 200 })
        
          } catch (error) {
            user.resetPasswordToken  = undefined;
            user.resetPasswordExpires = undefined;
            await user.save({ validateBeforeSave: false });
            return NextResponse.json(
                { success: false, message: error.message },
                { status: 400 }
              );
          }
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 400 }
        );
        
    }
}