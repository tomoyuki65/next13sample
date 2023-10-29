'use client'
import { useState, useEffect } from "react"
import { setCookie, parseCookies, destroyCookie } from 'nookies'

export default function ClientComp() {
  const [value, setValue] = useState("abc");

  //setValue("123");

  const setV = () => {
    //() => setValue("123");
    setValue("123");
  };

  //setV();
  const COOKIE_OPTIONS = {
    maxAge: 60 * 60 * 24 * 1, //1日
  };
  setCookie(null, "test", "222", COOKIE_OPTIONS);

  const cookie = parseCookies();
  console.log(cookie.test);

  return (
    <>
    <h1>クライアントコンポーネントです{value}</h1>
    <br/>
    <br/>
    <button onClick={setV}>Test</button>
    </>
  )
}