
import { NextRequest, NextResponse } from 'next/server'
import { authAdmin } from '@/libs/firebaseAdminConfig'

export async function POST(request: NextRequest) {
  const body = await request.json();
  const name = body.name;
  const email = body.email;
  const refreshToken = body.refresh_token;

  let secure = false;
  if (process.env.NODE_ENV == 'production') {
    secure = true;
  };

  // Firebaseの認証用メールリンク作成
  const link = await authAdmin.generateEmailVerificationLink(email);
  console.log("作成したメール認証用のリンク");
  console.log(link);

  const response = NextResponse.json({ message: "OK" }, { status: 201 });
  response.cookies.set({
    name: 'next13',
    value: refreshToken,
    httpOnly: true,
    secure: secure,
    maxAge: 60 * 60 * 24 * 90 //90日
  });

  return response;
};