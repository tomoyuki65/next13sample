
import { NextRequest, NextResponse } from 'next/server'
// import { getAllCookies } from "@/utils/getCookies";


// import { headers, cookies } from 'next/headers'
// import { setCookie, parseCookies, destroyCookie } from 'nookies'
// import { NextPageContext } from 'next';
// import { NextRequest } from 'next/server' 

export async function GET(request: NextRequest) {

  // サーバーサイドクッキーを削除
  const t = request.cookies.get('refreshToken')?.value;
  console.log(t);
  console.log(String(request.cookies.has('refreshToken')))
  request.cookies.delete('refreshToken');
  console.log(String(request.cookies.has('refreshToken')))

  let response: NextResponse;
  if (!request.cookies.has('refreshToken')) {
    response = NextResponse.json({ "message": "OK" }, { status: 200 });
  } else {
    response = NextResponse.json({ "message": "Bad Request" }, { status: 400 });
  }
  // クッキー削除
  response.cookies.delete('refreshToken');

  return response;


  //const response = NextResponse.json({ "message": "OK" }, { status: 200 });
  //response.cookies.delete("refreshToken");

  // return response;
  // //const c = parseCookies();
  // console.log("サーバークッキー");
  // const cookieStore = cookies();
  // console.log(cookieStore);
  // //const idToken = cookieStore.get("idToken")?.value;
  // console.log("idTokenの値はこちら")
  // const idToken = request.cookies.get("idToken")?.value;
  // console.log(idToken);

  // //destroyCookie(, "idToken");
  // // request.cookies.delete("idToken");
  // // console.log(request.cookies.has('idToken')); // => true
  // // request.cookies.delete('idToken');
  // // console.log(request.cookies.has('idToken')); // => false

  

  // response.cookies.delete("idToken");
  // response.cookies.delete("refreshToken");

  // setCookie(res, "idToken", "aaa");

  // return response;
}