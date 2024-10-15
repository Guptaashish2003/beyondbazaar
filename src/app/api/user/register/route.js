import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB";
import User from "@/backend/model/User";
import { sendEmail } from "@/backend/utils/sendEmail";
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
    const isExist = await User.findOne({ email: email });
    let message = `We have send an email to ${email}  please click the link included to verify your email adress`;
    let user;
    if (isExist) {
      if (!isExist.isEmailValid && isExist.emailVerificationExpires >= Date.now()) {
         
        return NextResponse.json({ success: true, message: message }, { status: 200 });     
      }
      else if(!isExist.isEmailValid && isExist.emailVerificationExpires < Date.now()){
        user = isExist; 
      }
      else{
        return NextResponse.json(
          {
            success: false,
            message: "Email already exist",
          },
          { status: 404 }
        );
      }
    } else {
      user = await User.create({
        email,
        password,
        name,
      });
    }

    const verificationToken = user.getEmailVerificationToken();
    await user.save({ validateBeforeSave: false });
    const verficationUrl = `${process.env.FRONTENDURL}/user/verify-email/${verificationToken}`;
    const EmailHtml = EmailTemplate({
      url: verficationUrl,
      msg: "verifiy your email",
      email: process.env.SUPPORTMAIL,
    });
    try {
      sendEmail({
        email: email,
        subject: "email verification",
        EmailHtml,
      });
      
      return NextResponse.json(
        { success: true, message: message },
        { status: 200 }
      );
    } catch (error) {
      user.emailVerificationToken = undefined;
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
