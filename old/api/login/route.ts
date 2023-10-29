
import { setCookie, parseCookies } from 'nookies'
import { NextResponse } from 'next/server'
import Response from 'next'

export async function POST(request: Request) {

  const c = parseCookies();
  console.log("サーバークッキー");
  console.log(c);

  const body = await request.json();
  const email = body.email;
  const password = body.password;

  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "email": email,
      "password": password,
      "returnSecureToken": true
    }),
  });

  const data = await res.json();
  // console.log(data);

  const idToken = data.idToken;
  const refreshToken = data.refreshToken;

  const response = NextResponse.json(data, { status: 200 });
    response.cookies.set({
        name: 'idToken',
        value: idToken,
        httpOnly: true,
        secure: false, // development
        maxAge: 60 * 60 * 24 * 90,
    });
    response.cookies.set({
      name: 'refreshToken',
      value: refreshToken,
      httpOnly: true,
      secure: false, // development
      maxAge: 60 * 60 * 24 * 90,
  });

  // const COOKIE_OPTIONS = {
  //   maxAge: 60 * 60 * 24 * 90, //90日
  //   httpOnly: true,
  //   //secure: true
  // };
  // setCookie(ctx, "idToken", idToken, COOKIE_OPTIONS);
  // // setCookie({response}, "idToken", idToken, COOKIE_OPTIONS);
  // // setCookie(null, "refreshToken", refreshToken, COOKIE_OPTIONS);

  return response;
}