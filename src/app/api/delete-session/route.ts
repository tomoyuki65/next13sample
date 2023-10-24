
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {

  let response;
  if (!request.cookies.has('next13')) {
    response = NextResponse.json({ "message": "Bad Request" }, { status: 400 });
    return response;
  };

  response = NextResponse.json({ "message": "OK" }, { status: 200 });
  response.cookies.delete("next13");

  return response;
}