import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {

  // Sessionクッキー取得
  const session = request.cookies.get("refreshToken")?.value;

  // 最新のidToken取得
  const url1 = `https://securetoken.googleapis.com/v1/token?key=${process.env.FIREBASE_API_KEY}`;

  const res1 = await fetch(url1, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "grant_type": "refresh_token",
      "refresh_token": session
    }),
  });
  const data1 = await res1.json();
  const idToken = data1.id_token;

  // ユーザー情報取得
  const url2 = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.FIREBASE_API_KEY}`;
  const res2 = await fetch(url2, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "idToken": idToken
    }),
  });
  const data2 = await res2.json();
  const uid = data2.users[0].localId;
  const email = data2.users[0].email;
  const emailVerified = data2.users[0].emailVerified;

  // レスポンスデータ作成
  const resData = {
    "uid": uid,
    "email": email,
    "idToken": idToken,
    "refreshToken": session,
    "emailVerified": emailVerified
  };

  const response = NextResponse.json(resData, { status: 200 });

  return response;
}