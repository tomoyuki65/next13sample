import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {

  const refreshToken = request.cookies.get("refreshToken")?.value;
  console.log("デバッグクッキー確認");
  console.log(refreshToken);

  // const body = await request.json();
  // const refresh_token = body.refresh_token;

  const url1 = `https://securetoken.googleapis.com/v1/token?key=${process.env.FIREBASE_API_KEY}`;

  const res1 = await fetch(url1, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "grant_type": "refresh_token",
      "refresh_token": refreshToken
    }),
  });
  const data1 = await res1.json();
  const idToken = data1.id_token;
  console.log("デバッグ1");
  console.log(data1);


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
  console.log("デバッグ2");
  console.log(data2);


  const uid = data2.users[0].localId;
  const email = data2.users[0].email;
  const emailVerified = data2.users[0].emailVerified;

  const resData = {
    "uid": uid,
    "email": email,
    "idToken": idToken,
    "refreshToken": refreshToken,
    "emailVerified": emailVerified
  };
  console.log("レスポンスチェック");
  console.log(resData);

  const response = NextResponse.json(resData, { status: 200 });

  return response;
}