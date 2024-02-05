import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB";
import User from "@/backend/model/User";
import {sendEmail} from "@/backend/utils/sendEmail";
import EmailTemplate from "@/components/EmailTemplate/EmailTemplate";
export async function POST(request) {
  await connectDB();
  try {
    const data = await request.json();
    const { email, password, name } = data;
    
    if (!email || !password || !name) {
        return NextResponse.json({
            status: 400,
            message: "Invalid Input",
        });
    }
    const isExist = await User.findOne({email: email});

    if (isExist !== null) {
        return NextResponse.json({
            success:false,
            message: "user already exists",
        },{status: 404});
    }
    const user = await User.create({
      email,
      password,
      name,
    });
    const verificationToken =  user.getEmailVerificationToken();
    await user.save({ validateBeforeSave: false });
    const verficationUrl = `${process.env.FrontendURL}/user/verify-email/${verificationToken}`;
    const EmailHtml =  EmailTemplate({url:verficationUrl,msg:"verifiy your email",email:process.env.SUPPORTMAIL});
    try {
        sendEmail({
          email: email,
          subject: "email verification",
          EmailHtml
        });
        const message = `We have send an email to ${email}  please click the link included to verify your email adress`
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
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
