'use client'
import { useRouter } from 'next/navigation'

export default function SignupFinish() {
  const router = useRouter();

  const submit = () => {
    router.push("/");
  };

  return (
    <main className="flex flex-col justify-center items-center w-full h-screen m-auto">
      <h1 className="text-2xl mb-8 border-b-2 w-2/3 max-w-lg pb-8 text-center">
        認証用のメールを送信しました。<br />
        メールのリンクから認証して下さい。
      </h1>
      <br />
      <button
        type="submit" className="px-2 bg-blue-500 rounded-xl text-white h-10"
        onClick={submit}>
        TOPページへ戻る
      </button>
    </main>
  );
};