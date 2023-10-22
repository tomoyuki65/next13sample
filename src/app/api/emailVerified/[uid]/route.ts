
import { NextRequest, NextResponse } from 'next/server'


export async function POST(request: NextRequest, uid: string) {

  // const url = `/api/v1/user/${uid}`;

  // const res = await fetch(url, {
  //   method: 'PUT',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     "email_verified": true
  //   }),
  //   cache: 'no-store'
  // });

  let response;
  response = NextResponse.json({ message: "OK" }, { status: 200 });
  // if (res.status != 200) {
  //   response = NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  // } else {
  //   response = NextResponse.json({ message: "OK" }, { status: 200 });
  // };

  return response;
}