
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {

  let response;
  if (!request.cookies.has('n13s')) {
    response = NextResponse.json({ "message": "Bad Request" }, { status: 400 });
    return response;
  };

  response = NextResponse.json({ "message": "OK" }, { status: 200 });
  response.cookies.delete("n13s");

  return response;
}