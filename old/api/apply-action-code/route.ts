
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/libs/firebaseConfig'
import { verifyPasswordResetCode, confirmPasswordReset } from 'firebase/auth'

export async function POST(request: NextRequest) {
  const body = await request.json();
  const mode = body.mode;
  const oobCode = body.oobCode;
  const newPassword = body.password;
  let response;

  if (mode == "resetPassword") {
    try {
      await verifyPasswordResetCode(auth, oobCode).then( async ()=>{
        await confirmPasswordReset(auth, oobCode, newPassword).then( async (res) => {
          return response = NextResponse.json({ message: "OK" }, { status: 200 });
        });
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      };

      console.log("パスワード変更ができませんでした。");
      return response = NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    };

  } else {
    //
  };

  return response;
};