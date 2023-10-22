// 'use client'
import { useRouter } from 'next/navigation'

const emailVerified = async (uid: string, idToken: string) => {
  const router = useRouter();

  const url = `/api/emailVerified/${uid}`;
  await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer: '+idToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "idToken": idToken
    }),
    cache: 'no-store'
  }).then((res) => {
    if (res.status == 200) {
      router.push("/");
      return true;
    } else {
      console.log("エラー");
      return false;
    }
  }).catch((error) => {
    console.log("エラー");
    return false;
  });
};

export default function EmailVerified() {
  
  const uid = "111";
  const idToken = "111";
  emailVerified(uid, idToken);

  return (
    <></>
  )
};