import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(req) {
    const session = await getServerSession({ req, ...authOptions });

    console.log(session.user.role);
    if (session) {
        return NextResponse.json({ content: 'This is protected content', session });
    } else {
        return NextResponse.redirect('/login');
    }
}
