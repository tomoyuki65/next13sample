
//'use server'
//'use client'
//import { setCookie, parseCookies, destroyCookie } from 'nookies'
import nookies from 'nookies'
// import { NextPageContext } from 'next'
// import { cookies } from 'next/headers'
//import { cookies } from 'next/headers'
//import { headers } from 'next/headers'
//import { NextResponse } from 'next/server'
//import nookies from 'nookies'
//import { resolve } from 'path';
import { getAllCookies } from "@/utils/getCookies";
//import { cookies } from 'next/headers';
import ClientComp from '@/components/ClientComp';

const getIdToken = async () => {
  await fetch("http://localhost:3000/api/login", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "email":"test1021@example.com",
      "password":"test123"
    })
  }).then(res => {
    console.log("レスポンス確認");
    const cookie = getAllCookies();
    console.log(cookie);


    // const cookies = parseCookies()
    // console.log({ cookies })
    //const c = nookies.get();
    //console.log(c);
    //const cookies = res.headers.get("set-cookie");
    //console.log(res.clone);
    //const cookieStore = parseCookies();
    // console.log(cookieStore);
    //const cookieStore = cookies();
    // const idToken = cookieStore.get('idToken');
    //onsole.log(cookieStore);
  
    // フロントクッキーテスト
    // const COOKIE_OPTIONS = {
    //     maxAge: 60 * 60 * 24 * 90, //90日
    //   };
    // setCookie(null, "Test", "A1022", COOKIE_OPTIONS);
    // destroyCookie(null, "Test");
    // destroyCookie(null, "idToken");



  });
};

const logoutTest = async () => {
    await fetch("http://localhost:3000/api/logout", {
      method: 'GET',
    }).then(res => {
      console.log("レスポンス確認");
      const cookies = res.headers.get("set-cookie");
      console.log(cookies);
      //res.headers.delete("set-cookie");
      return res;
    });
};


export default function Test() {

  console.log("サーバーサイドクッキーの取得テスト");
  const cookie = getAllCookies();
  console.log("idTokenの値");
  console.log(cookie.idToken);
  console.log("refreshTokenの値");
  console.log(cookie.refreshToken);
  // const res = fetch("http://localhost:3000/api/login", {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     "email":"test1021@example.com",
  //     "password":"test123"
  //   })
  // });
  //const response = getIdToken();

  //const response = logoutTest();

  // const cookieStore = cookies();
  // console.log("レスポンス確認");
  // console.log(cookieStore);
  //console.log(response);
  //console.log(res.headers);
  // const cookieStore = cookies()
  // const idToken = cookieStore.get('idToken')
  // console.log("クッキー");
  // console.log(idToken);
  
  //const parsedCookies = parseCookies(res);






  // const idToken = "ABC123";
  // const refreshToken = "abc987";
  // const COOKIE_OPTIONS = {
  //   maxAge: 60 * 60 * 24 * 90, //90日
  //   httpOnly: true,
  //   secure: true
  // };
  // setCookie(null, "idToken", idToken, COOKIE_OPTIONS);
  //setCookie(null, "refreshToken", refreshToken, COOKIE_OPTIONS);

  //const cookies = parseCookies(ctx);
  //console.log(cookies);
  // console.log({ cookies })
  // console.log(cookies.idToken);
  // console.log(cookies.refreshToken);

  // destroyCookie(null, "idToken");
  // destroyCookie(null, "refreshToken");

  // cookies().set({
  //   name: 'idToken',
  //   value: idToken,
  //   httpOnly: true,
  //   path: '/',
  // })

  // console.log("ログ");

  const COOKIE_OPTIONS = {
    maxAge: 60 * 60 * 24 * 1, //1日
    httpOnly: true,
    secure: false
  };
  // setCookie(null, "test", "123", COOKIE_OPTIONS);
  nookies.set(null, "sv", "1022", COOKIE_OPTIONS);


  return (
    <>
      <h1>Testページ</h1>
      {/* <p>{cookies.idToken}</p> */}
      {/* <p>{cookies.refreshToken}</p> */}
      <ClientComp />
    </>
  )
}