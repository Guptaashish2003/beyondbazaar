import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import sendEmail from "@/components/EmailTemplate/AdminFeed";

var transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request ) {
  const data = await request.json();
  const {name, email,phone,message} = data;  
  if(!name || !email || !phone || !message){
    return NextResponse.json(
      { success: false, message: "Invalid Input" },
      { status: 400 }
    );
  }
  const EmailHtml = sendEmail({name,email,phone,message});
 
  try {
      transporter.sendMail({
      from: email,
      to: "beyondbazaarofficial@gmail.com",
      subject: `Message from ${name} and his phone number is ${phone}`,
      EmailHtml,
    });

    return NextResponse.json(
      { success: true, message: message },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
