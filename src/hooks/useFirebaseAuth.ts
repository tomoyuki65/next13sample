/* FirebaseAuthの状態管理用フック */
import { useState, useEffect } from "react"
import { auth } from "@/libs/firebaseConfig"
import {
  User,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  // sendEmailVerification,
  signInWithCustomToken,
  deleteUser,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"

export interface currentUser {
  uid: string | null;
  email: string | null;
  idToken: string | null;
  refreshToken: string | null;
  emailVerified: boolean | null;
};

// useFirebaseAuth関数
export default function useFirebaseAuth() {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState<currentUser | null>(null)
  const [loading, setLoading] = useState(true);

  // Signup関数
  const signupWithEmail = async (arg: {
    email: string,
    password: string,
  }): Promise<void> => {
    setLoading(true);

    try {
      const credential = await createUserWithEmailAndPassword(auth, arg.email, arg.password);
      
      const user = credential.user;
      const idToken = await user.getIdToken();
      const refreshToken = user.refreshToken;

      // refreshTokenをサーバーサイドクッキーにセットする
      // 実際はバックエンドAPIのSignup処理内で行う
      // ヘッダーにidTokenを付与
      // name, name_kana, refreshTokenをポスト
      const url = "http://localhost:3000/api/setcookie";
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "refresh_token": refreshToken
        }),
        cache: 'no-store'
      });
      // response結果にサーバーサイドクッキーが付与される
      console.log(res);

      // 認証メール送信

      setLoading(false);
      return;

    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }

      setLoading(false);
      return;

      throw error;
    }
  };

  // Login関数
  const loginWithEmail = async (arg: {
    email: string,
    password: string,
  }): Promise<void> => {
    setLoading(true);

    try {
      const credential = await signInWithEmailAndPassword(auth, arg.email, arg.password);
      
      const user = credential.user;
      const idToken = await user.getIdToken();
      const refreshToken = user.refreshToken;

      // ログイン処理時にrefreshTokenをサーバーサイドクッキーにセットする
      const url = "http://localhost:3000/api/setcookie";
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "refreshToken": refreshToken
        }),
        cache: 'no-store'
      });
      console.log(res);

      const currentUser: currentUser = {
        uid: user.uid,
        email: user.email,
        idToken: String(await user.getIdToken()),
        refreshToken: user.refreshToken,
        emailVerified: user.emailVerified
      };
      setCurrentUser(currentUser);

      setLoading(false);
      // リダイレクト処理
      return;

    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }

      setLoading(false);
      return;

      throw error;
    }
  };

  // Logout関数
  const logout = async (): Promise<void> => {
    setLoading(true);

    try {
      // logoutのAPIを実行し、currentUserとクッキーを削除
      const url = "http://localhost:3000/api/logout";
      const res = await fetch(url, {
        method: 'GET',
        cache: 'no-store'
      });
      const data = await res.json();
      console.log(data);
      setCurrentUser(null);

      await signOut(auth);
      setFirebaseUser(null);

      setLoading(false);
      return;

    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }

      setLoading(false);
      return;

      throw error;
    }
  };

  // refreshTokenからidToken取得
  const getIdToken = async (): Promise<string | undefined> => {
    setLoading(true);
    try {
      const url = "http://localhost:3000/api/refresh";
      const res = await fetch(url, {
        method: 'GET',
        cache: 'no-store'
      });
      const data = await res.json();
      console.log("レスポンス確認！");
      console.log(data.uid);
      console.log(data.email);
      console.log(data.idToken);
      console.log(data.refreshToken);
      console.log(String(data.emailVerified));

      // ログインさせる
      const currentUser: currentUser = {
        uid: data.uid,
        email: data.email,
        idToken: data.idToken,
        refreshToken: data.refreshToken,
        emailVerified: data.emailVerified
      };
      setCurrentUser(currentUser);


      // const url = "https://securetoken.googleapis.com/v1/token?key=" + process.env.FIREBASE_API_KEY;
      // // const res = await fetch(url, { cache: 'no-store' });
      // const res = await fetch(url, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     "grant_type": "refresh_token",
      //     "refresh_token": "AMf-vBx_gGq9rvxG2Xy7hmpUDpUoTLYn6Kjb4UL-zhsRicSyO5tcg1PKNrojWOZjQF-G5WGtMVKcYrhT4516CVwPnrrj-SBCUosiKy_U-IVWEq0ifG3198NCtoRyNN3xvNyOQAIfSlETp1a4p7vrXxu1vO5kk_1D91c7QTgsRRQ1LrBbDW18OfNijuhSN65Xk-p-WMJ-0J4vsv0eIeIaa5-h_7QFaktNmA"
      //   }),
      // });
      // const data = await res.json();
      // console.log(auth.currentUser);

      setLoading(false);
      return data.idToken;

    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      setLoading(false);
      return undefined;

      throw error;
    }
  };

  // 退会用関数
  const destroyUser = async (user: User): Promise<void> => {
    setLoading(true);

    try {
      await deleteUser(user);

      // 通知＆トップページへリダイレクト

      setLoading(false);
      return;

    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }

      setLoading(false);
      return undefined;

      throw error;
    }
  }

  // onAuthStateChanged関数における、
  // ユーザーの状態管理用パラメータの設定
  const nextOrObserver = async (user: User | null): Promise<void> => {
    setLoading(true);

    if (!user) {
      setLoading(false);
      return;
    }

    const currentUser: currentUser = {
      uid: user.uid,
      email: user.email,
      idToken: String(await user.getIdToken()),
      refreshToken: user.refreshToken,
      emailVerified: user.emailVerified
    };
    setCurrentUser(currentUser);
    setFirebaseUser(user);

    setLoading(false);
    return;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, nextOrObserver);
    return unsubscribe;
  }, []);

  return {
    firebaseUser,
    currentUser,
    loading,
    signupWithEmail,
    loginWithEmail,
    logout,
    destroyUser,
    getIdToken,
  };
}