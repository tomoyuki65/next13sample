import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {

  // Sessionクッキー取得
  const session = request.cookies.get("n13s")?.value;

  if (!session) {
    return NextResponse.json({ message: "Bad Request" }, { status: 400 });
  };

  // 最新のidToken取得
  const getIdTokenUrl = `https://securetoken.googleapis.com/v1/token?key=${process.env.FIREBASE_API_KEY}`;

  const getIdTokenRes = await fetch(getIdTokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    },
    body: JSON.stringify({
      "grant_type": "refresh_token",
      "refresh_token": session
    }),
  });
  const getIdTokenData = await getIdTokenRes.json();
  const idToken = getIdTokenData.id_token;

  // ユーザー情報取得
  const getUserUrl = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.FIREBASE_API_KEY}`;
  const getUserRes = await fetch(getUserUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    },
    body: JSON.stringify({
      "idToken": idToken
    }),
  });
  const getUseData = await getUserRes.json();
  const uid = getUseData.users[0].localId;
  const email = getUseData.users[0].email;
  const emailVerified = getUseData.users[0].emailVerified;

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