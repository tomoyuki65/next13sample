//'use client'
import { useAuthContext } from '@/contexts/AuthContext'
import NextLink from 'next/link'
import CheckComp from '@/components/check/CheckComp'
//import { getAllCookies } from '@/utils/getCookies'
// import { parseCookies } from "nookies"

export default function Check() {
  //const cookies = getAllCookies();
  //console.log("クッキーのrefreshTokenを取得して表示")
  //console.log(cookies.refreshToken);
  // const { firebaseUser, currentUser, loading, logout, getIdToken } = useAuthContext();
  
  // console.log("firebaseUserのログイン状況");
  // console.log(firebaseUser);
  
  // console.log("currentUserのログイン状況");
  // console.log(currentUser);

  // // const cookies = parseCookies();
  // // console.log("クッキー表示");
  // // console.log(cookies);
  // // const idToken = currentUser?.getIdToken();
  // // const getIdToken = async () => {
  // //   const idToken = await currentUser?.getIdToken();
  // //   return idToken;
  // // };
  // // const credential = currentUser.credential as firebase.auth.OAuthCredential

  // // ログアウトボタン
  // const logoutSubmit = async (): Promise<void>  => {
  //   await logout();
  // };

  // const getIdTokenSubmit = async (): Promise<void>  => {
  //   const id = await getIdToken();
  //   console.log("再取得したidToken");
  //   console.log(id);
  // };

  return (
    <>
      <CheckComp />
      {/* <h1>Checkページ</h1>
      <br />
      <h2>ロード：{ loading == true ? "...読み込み中" : "" }</h2>
      <br />
      <h2>firebaseUserの状態：{ firebaseUser ? "ログイン済み" : "未ログイン" }</h2>
      <br />
      <h2>currentUserの状態：{ currentUser ? "ログイン済み" : "未ログイン" }</h2>
      <br />
      <h2>ユーザー情報</h2>
      <p className='pl-2'>uid: { currentUser?.uid }</p>
      <p className='pl-2'>email: { currentUser?.email }</p>
      <p className='pl-2'>idToken: { currentUser?.idToken }</p>
      <p className='pl-2'>refreshToken: { currentUser?.refreshToken }</p>
      <p className='pl-2'>emailVerified: { String(currentUser?.emailVerified) }</p>
      <br />
      <button className="ml-5 px-2 bg-gray-500 rounded-xl text-white h-10"
        type="submit" onClick={logoutSubmit}>
          ログアウト
      </button>
      <br />
      <br />
      <button className="ml-5 px-2 bg-gray-500 rounded-xl text-white h-10"
        type="submit" onClick={getIdTokenSubmit}>
          idToken再取得
      </button>
      <br />
      <br />
      <NextLink href="/checklogin">to CheckLoginページへ</NextLink>
      <br />
      <br /> */}
    </>
  )
}