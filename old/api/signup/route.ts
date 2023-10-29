
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const idToken = request.headers.get("Authorization")?.replace("Bearer ", "");
  const body = await request.json();
  const refreshToken = body.refresh_token;

  let secure = false;
  if (process.env.NODE_ENV == 'production') {
    secure = true;
  };

  // idTokenからユーザー情報取得
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.FIREBASE_API_KEY}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    },
    body: JSON.stringify({
      "idToken": idToken
    }),
  });
  const data = await res.json();
  const uid = data.users[0].uid;
  const email = data.users[0].email;
  console.log("idTokenから取得したユーザー情報");
  console.log(uid);
  console.log(email);

  const response = NextResponse.json({ message: "OK" }, { status: 201 });
  response.cookies.set({
    name: 'n13s',
    value: refreshToken,
    httpOnly: true,
    secure: secure,
    maxAge: 60 * 60 * 24 * 90 //90日
  });

  return response;
};