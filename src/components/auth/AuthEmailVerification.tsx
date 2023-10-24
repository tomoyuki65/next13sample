'use client'
import { auth } from "@/libs/firebaseConfig"
import { applyActionCode } from "firebase/auth"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

type Props = {
  oobCode: string
};

export default function AuthEmailVerification({ oobCode }: Props) {
  const router = useRouter();

  const authEmailVerificationSubmit = async () => {
    applyActionCode(auth, oobCode);
  };

  return (
    <>
      <h1>メール認証用コンポーネント</h1>
      <br />
      <p>ボタンを押して認証して下さい。</p>
      <br />
      <button
        className="ml-5 px-2 bg-gray-500 rounded-xl text-white h-10"
        type="submit" onClick={authEmailVerificationSubmit}
      >
        メール認証ボタン
      </button>
      <br />
      <br />
    </>
  )
};