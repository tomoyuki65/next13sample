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
import axios from '@/libs/axios/axios'
import certificationRequests from "@/libs/axios/certificationRequests"
import { toast } from "react-toastify"
import { useRouter } from 'next/navigation'

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
  const router = useRouter();

  // ログインチェック関数
  const checklogin = (): boolean => {
    if (!currentUser) {
      return false;
    }
    return true;
  };

  // Signup関数
  const signupWithEmail = async (args: {
    email: string,
    password: string,
  }): Promise<void> => {
    setLoading(true);

    try {
      const credential = await createUserWithEmailAndPassword(auth, args.email, args.password);
      
      const user = credential.user;
      const idToken = await user.getIdToken();
      const refreshToken = user.refreshToken;

      // Session作成
      const config1 = {
        headers: {
          'Authorization': `Bearer ${idToken}`,
          'Content-Type': 'application/json'
        },
      };
      const data1 = {
        "refresh_token": refreshToken
      };
      await axios.post(certificationRequests.fetchSignup, data1, config1);

      // メール認証用のリンクを作成
      const config2 = {
        headers: {
          'Content-Type': 'application/json'
        },
      };
      const data2 = {
        "mode": "verifyEmail",
        "email": args.email
      };
      const res1 = await axios.post(certificationRequests.fetchGetFirebaseCustomLink, data2, config2);
      const link = res1.data.link;

      // リンクを使ってメール送信

      console.log("Signup処理が成功！");
      setLoading(false);
      return;

    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      };

      console.log("Signup処理が失敗！！！");
      setLoading(false);
      return;

      throw error;
    }
  };

  // Login関数
  const loginWithEmail = async (args: {
    email: string,
    password: string,
  }): Promise<void> => {
    setLoading(true);

    try {
      const credential = await signInWithEmailAndPassword(auth, args.email, args.password);
      const user = credential.user;
      const idToken = await user.getIdToken();
      const refreshToken = user.refreshToken;

      // Session作成
      const config = {
        headers: {
          'Authorization': `Bearer ${idToken}`,
          'Content-Type': 'application/json'
        },
      };
      const data = {
        "refresh_token": refreshToken
      };
      await axios.post(certificationRequests.fetchCreateSession, data, config);

      console.log("Login処理成功！");
      setLoading(false);
      return;

    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }

      toast.error("ログインできませんでした！");
      console.log("Login処理失敗！！！");
      setLoading(false);
      // router.push("/");
      return;

      throw error;
    }
  };

  // 再認証用の関数
  const certification = async (): Promise<void> => {
    setLoading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        },
      };
      const res = await axios.get(certificationRequests.fetchSignup, config);

      // ログインさせる
      const currentUser: currentUser = {
        uid: res.data.uid,
        email: res.data.email,
        idToken: res.data.idToken,
        refreshToken: res.data.refreshToken,
        emailVerified: res.data.emailVerified
      };
      setCurrentUser(currentUser);

      console.log("再認証処理が成功！");
      setLoading(false);
      return;

    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }

      console.log("再認証処理が失敗！！！");
      setLoading(false);
      return;

      throw error;
    };
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

  // メール認証用のメール送信処理



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
    certification,
    logout,
    destroyUser,
    checklogin,
  };
}