// 'use client'
// import { useAuthContext } from '@/contexts/AuthContext'
// import NextLink from 'next/link'

// export default function CheckComp() {
//   const { firebaseUser, currentUser, loading, logout, certification } = useAuthContext();
  
//   console.log("firebaseUserのログイン状況");
//   console.log(firebaseUser);
  
//   console.log("currentUserのログイン状況");
//   console.log(currentUser);

//   // ログアウトボタン
//   const logoutSubmit = async (): Promise<void>  => {
//     await logout();
//   };

//   const certificationSubmit = async (): Promise<void>  => {
//     await certification();
//   };

//   return (
//     <>
//       <h1>Checkページ</h1>
//       <br />
//       <h2>ロード：{ loading == true ? "...読み込み中" : "" }</h2>
//       <br />
//       <h2>firebaseUserの状態：{ firebaseUser ? "ログイン済み" : "未ログイン" }</h2>
//       <br />
//       <h2>currentUserの状態：{ currentUser ? "ログイン済み" : "未ログイン" }</h2>
//       <br />
//       <h2>ユーザー情報</h2>
//       <p className='pl-2'>uid: { currentUser?.uid }</p>
//       <p className='pl-2'>email: { currentUser?.email }</p>
//       <p className='pl-2'>idToken: { currentUser?.idToken }</p>
//       <p className='pl-2'>refreshToken: { currentUser?.refreshToken }</p>
//       <p className='pl-2'>emailVerified: { String(currentUser?.emailVerified) }</p>
//       <br />
//       <button className="ml-5 px-2 bg-gray-500 rounded-xl text-white h-10"
//         type="submit" onClick={logoutSubmit}>
//           ログアウト
//       </button>
//       <br />
//       <br />
//       <button className="ml-5 px-2 bg-gray-500 rounded-xl text-white h-10"
//         type="submit" onClick={certificationSubmit}>
//           再認証
//       </button>
//       <br />
//       <br />
//       <NextLink href="/checklogin">to CheckLoginページへ</NextLink>
//       <br />
//       <br />
//       <NextLink href="/reset-password">to パスワードリセットページへ</NextLink>
//       <br />
//       <br />
//     </>
//   )
// }