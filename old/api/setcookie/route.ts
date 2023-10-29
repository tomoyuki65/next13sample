import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const body = await request.json();
  const refreshToken = body.refreshToken;
  let secure = false;

  // productionの場合はsecureをtrueにする
  if (process.env.NODE_ENV == "production") {
    secure = true;
  }

  const response = NextResponse.json({ message: "OK" }, { status: 200 });
  response.cookies.set({
    name: 'refreshToken',
    value: refreshToken,
    httpOnly: true,
    secure: secure,
    maxAge: 60 * 60 * 24 * 90 //90日
  });

  return response;
};









// import { parseCookies } from 'nookies'
// import type { NextApiRequest, NextApiResponse } from 'next';
// import { headers } from 'next/headers'

// export async function GET(request: Request) {
//   // const cookie = parseCookies();
//   //const c = request.headers.getSetCookie();
//   console.log("さば");
//   const cook = headers();
//   const c = cook.get("cookie");
//   const t = c?.split("; ");

//   let idToken;
//   let refreshToken;
//   t?.forEach(function(i) {
//     const k = i.split("=");
//     if (k[0] == "idToken") {
//       idToken = k[1];
//     }
//     if (k[0] == "refreshToken" ) {
//       refreshToken = k[1];
//     }
//   });
//   console.log("idToken");
//   console.log(idToken);
//   console.log("refreshToken");
//   console.log(refreshToken);
//   // for cookie_string in cookie_strings:
//   //       name, value = cookie_string.split("=", maxsplit=1)
//   //       cookies[name] = value
  
//   // console.log(t);
//   // console.log(GetCookie('cookieName'));

//   return Response.json({ "ABX": "AAA"});
// }




// // import { setCookie, parseCookies } from 'nookies'

// // // pages/api/v1/cart/add.ts

// // import type { NextApiRequest, NextApiResponse } from 'next';

// // export async function POST(request: Request) {
// // //export async function GETGET(req: NextApiRequest) {
// //   // const cookie = parseCookies({ req });
// //   // console.log("サバクッキー");
// //   // console.log(cookie.idToken);
// //   // console.log(cookie.refreshToken);
// //   return Response.json({"message": "OK"});
// //   //return new Response.status(200).json({ "message": "OK"});
// // }
// // //-----------------------------------------------------------
// // // api
// // //-----------------------------------------------------------
// // // const Cook = async (req: NextApiRequest, res: NextApiResponse) => {

// // //   // クライアントからPOSTされてきたBody
// // //   //const datas = req.body;

// // //   // contextのreqを渡してcookie内の値を取得する
// // //   const cookie = parseCookies({ req });
// // //   console.log(cookie.idToken);
// // //   console.log(cookie.refreshToken);

// // //   return res.status(200).json({ "message": "OK"});
// // //   // cookieがなければエラー
// // //   //if(!cookie) throw new Error('Cookie Parse Error.');
  
// // //   // RedisのsessionにproductIdを追加する
// // //   //await redisClient.hset(cookie.sessionId, 'productId', datas.productId);
// // // };

// // // export default Cook;





// // // export async function POST(request: Request) {

// // //   const body = await request.json();
// // //   const idToken = body.idToken;
// // //   const refreshToken = body.refreshToken;
// // //   const COOKIE_OPTIONS = {
// // //     maxAge: 60 * 60 * 24 * 90, //90日
// // //     httpOnly: true,
// // //     secure: true
// // //   };
// // //   setCookie(null, "idToken", idToken, COOKIE_OPTIONS);
// // //   setCookie(null, "refreshToken", refreshToken, COOKIE_OPTIONS);

// // //   return Response.json({"message": "OK"});
// // // }

// // // import { NextApiRequest, NextApiResponse } from 'next'

// // // export default function handler(req: NextApiRequest, res: NextApiResponse) {
// // //   const body = req.body;
// // //   const idToken = body.idToken;
// // //   const refreshToken = body.refreshToken;
// // //     const COOKIE_OPTIONS = {
// // //     maxAge: 60 * 60 * 24 * 90, //90日
// // //     httpOnly: true,
// // //     //secure: true,
// // //     path: '/'
// // //   };
// // //   setCookie({ res }, "idToken", idToken, COOKIE_OPTIONS);
// // //   setCookie({ res }, "refreshToken", refreshToken, COOKIE_OPTIONS);
// // //   res.status(200).json({ message: "OK" });
// // // }

