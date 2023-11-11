import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import User from "@/backend/model/User";
import sendEmail from "@/backend/utils/sendEmail";
import EmailTemplate from "@/components/EmailTemplate/EmailTemplate";

export default async function (request){
    await connectDB();
    try {
        const data = await request.json();
        const {password,email} = data;
        if ( !email || !password ) {
            return NextResponse.json({ success: false, message: "Invalid Input" }, { status: 400 });
        }
        const isCheck = await User.findOne({email: email});

        if (!isCheck) {
            return NextResponse.json({
                status: 400,
                message: "email not found",
            });
        }
        try {
            sendEmail({
              email: email,
              subject: "forgot password",
              EmailHtml
            });
            const message = `We have send an email to ${email}  please click the link included to update your pasword`
            return NextResponse.json(
                { success: true, message: message },
                { status: 200 })
        
          } catch (error) {
            user.emailVerificationToken  = undefined;
            user.emailVerificationExpires = undefined;
            await user.save({ validateBeforeSave: false });
            return NextResponse.json(
                { success: false, message: error.message },
                { status: 400 }
              );
          }
        // const user = await User.findByIdAndUpdate(_id, { password});
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 400 }
        );
        
    }
}