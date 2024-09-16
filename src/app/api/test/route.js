import { NextResponse } from "next/server";

export async function GET(request) {
    const envals = [
        {
            BASEURL: process.env.BASEURL,
            FRONTENDURL: process.env.FRONTENDURL,
            BGDATAURL: process.env.BGDATAURL,
            BIGDATACLOUDKEY: process.env.BIGDATACLOUDKEY,
            NEXTAUTH_URL: process.env.NEXTAUTH_URL,
            DB_URI: process.env.DB_URI,
            NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
            JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
            JWT_ALGORITHM: process.env.JWT_ALGORITHM,
            JWT_COOKIE_EXPIRE: process.env.JWT_COOKIE_EXPIRE,
            JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
            CLIENT_ID: process.env.CLIENT_ID,
            CLIENT_SECRET: process.env.CLIENT_SECRET,
            GOOGLE_AUTH_API_KEY: process.env.GOOGLE_AUTH_API_KEY  // Corrected here
        }
    ];

    return NextResponse.redirect(new URL("/user/your-orders", request.url));
    
    return NextResponse.json({ message: "Hello, World!", data: envals });
}
