import { NextResponse } from "next/server"
import connectDB from "@/backend/DATABASE/ConnectDB"  //database connection
import User from "@/backend/model/User";
import crypto from "crypto" 
export async function PUT(request,context){
    await connectDB()
    try {
        const data = await request.json()
        if(!data.password){
            return NextResponse.json({success:false, message:"Invalid Input"},{status:400})
        }
        const id = context.params.id;
        const resetPasswordToken = crypto.createHash('sha256').update(id).digest('hex');
        console.log(resetPasswordToken);
        const user = await User.findOne({ resetPasswordToken,
            resetPasswordExpires: { $gt: Date.now() }}).select('+password');
            if (!user) {
                return NextResponse.json({success:false, message:"Invalid token"},{status:400}) 
            }
            console.log(user);
            console.log(data.password);
            
            user.password = data.password;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save();
            console.log(user);
            return NextResponse.json({success:true, message:"Password Updated"},{status:200})

        
        } catch (error) {
        return NextResponse.json({success:false, message:"Invalid token"},{status:400})
    }
}

