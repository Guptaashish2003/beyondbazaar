import axios from "axios"
import { NextResponse } from "next/server";
const GeoCoding = async (lattitude,longitude) =>{
    try {
        const url = {
            apiKey: process.env.BigDataCloud_API_KEY,
            apiUrl: process.env.bigDataUrl,
        }
        const response = await axios.get(`${url.apiUrl}?latitude=${lattitude}&longitude=${longitude}&key=${url.apiKey}`);
        console.log("response",response,"response")
        return NextResponse.json({ success: true, message: "GeoCoding", data: response.data }, { status: 200 });    
        
    }catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
}

export default GeoCoding