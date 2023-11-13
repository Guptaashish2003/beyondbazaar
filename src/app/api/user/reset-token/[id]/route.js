import { NextResponse } from "next/server"
import connectDB from "@/backend/DATABASE/ConnectDB"  //database connection
import User from "@/backend/model/User";
import crypto from "crypto" 

export async function PUT(request,context){
    await connectDB()
    try {
        const id = context.params.id;
        const resetPasswordToken = crypto.createHash('sha256').update(id).digest('hex');
        const user = await User.findOne({ resetPasswordToken,
            resetPasswordExpires: { $gt: Date.now() }})
            if (!user) {
                return NextResponse.json({success:false, message:"Invalid token"},{status:400}) 
            }
            user.password = request.body.password;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save();
        
    } catch (error) {

        
    }
}

