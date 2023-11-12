import { NextResponse } from "next/server"
import connectDB from "@/backend/DATABASE/ConnectDB"  //database connection
import User from "@/backend/model/User";
import crypto from "crypto"
export async function GET(request,context){
    await connectDB()
    try {
        const id = context.params.id;
        const emailVerificationToken = crypto.createHash('sha256').update(id).digest('hex');
        const user = await User.findOne({ emailVerificationToken,
            emailVerificationExpires: { $gt: Date.now() }})
            if (!user) {
                return NextResponse.json({success:false, message:"Invalid token"},{status:400}) 
            }
            user.isEmailValid = true;
            user.emailVerificationToken = undefined;
            user.emailVerificationExpires = undefined;
            await user.save();
        return NextResponse.json({success:true , message:"email verified successfully!"},{status:200})
    } catch (error) {
        return NextResponse.json({success:false, message:error.message},{status:400})
    }
}