
import { NextRequest, NextResponse } from 'next/server'
import { authAdmin } from '@/libs/firebaseAdminConfig'

export async function POST(request: NextRequest) {
  const body = await request.json();
  const mode = body.mode;
  const email = body.email;
  const newEmail = body.newEmail;
  let link;

  if (mode == "verifyEmail") {
    const actionCodeSettings = {
      url: "http://localhost:3000/check"
    };
    link = await authAdmin.generateEmailVerificationLink(email, actionCodeSettings);
  };
  
  if (mode == "resetPassword") {
    const actionCodeSettings = {
      url: "http://localhost:3000/check"
    };
    link = await authAdmin.generatePasswordResetLink(email, actionCodeSettings);
  };

  if (mode == "verifyAndChangeEmail") {
    const actionCodeSettings = {
      url: "http://localhost:3000/check"
    };
    link = await authAdmin.generateVerifyAndChangeEmailLink(email, newEmail, actionCodeSettings);
  };

  if (link) {
    console.log("カスタムリンク作成");
    console.log(link);
  };

  const response = NextResponse.json({ "link": link }, { status: 200 });

  return response;
};