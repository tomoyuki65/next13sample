'use client'
import { toast } from 'react-toastify'

type Props = {
  uid: string
};

export default function ClComp({ uid }: Props) {
  console.log(uid);

  toast.error("トーストエラー表示！！！");
  
  return (
    <>
      <h1>Clientコンポーネント</h1>
      <p>uidは{uid}です！</p>
    </>
  )
}