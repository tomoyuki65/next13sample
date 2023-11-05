
'use client'
// import axios from '@/libs/axios/axios'
import { useAuthContext } from '@/contexts/AuthContext'

// const getCookie = async () => {
//   const config = {
//     headers: {
//       // 'withCredentials': true,
//       credentials: true,
//       'Cache-Control': 'no-store'
//     },
//   };
//   const res = await axios.get("/api/test/v1/create-session", config);
//   console.log(res.data);
//   console.log(res.status);
//   console.log(res.data.message);
//   console.log(res.headers);
//   return;
// };

export default function TestCookie() {
  const { currentUser, loading, createSession } = useAuthContext();

  const f = async () => {
    await createSession();
  };

  f();
  // getCookie();
  // console.log("検証結果");
  // // console.log(message);
  return (
    <>
      <h1>Cookieテストページ</h1>
    </>
  );
};