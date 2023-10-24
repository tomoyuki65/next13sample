import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const body = await request.json();
  const refreshToken = body.refresh_token;
  let secure = false;
  
  if (process.env.NODE_ENV == 'production') {
    secure = true;
  };

  const response = NextResponse.json({ message: "OK" }, { status: 200 });
  response.cookies.set({
    name: 'next13',
    value: refreshToken,
    httpOnly: true,
    secure: secure,
    maxAge: 60 * 60 * 24 * 90 //90日
  });

  return response;
};
