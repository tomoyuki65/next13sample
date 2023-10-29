/* FirebaseAuthの状態管理用フック */
import { useState, useEffect } from "react"
import { auth } from "@/libs/firebaseConfig"
import {
  User,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  deleteUser,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"
import axios from '@/libs/axios/axios'
import certificationRequests from "@/libs/axios/certificationRequests"

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
  const signupWithEmail = async (args: {
    email: string,
    password: string,
  }): Promise<boolean> => {
    setLoading(true);

    try {
      const credential = await createUserWithEmailAndPassword(auth, args.email, args.password);
      
      const user = credential.user;
      const idToken = await user.getIdToken();
      const refreshToken = user.refreshToken;

      // Session作成
      const config = {
        headers: {
          'Authorization': `Bearer ${idToken}`,
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        },
      };
      const data = {
        "refresh_token": refreshToken
      };
      await axios.post(certificationRequests.fetchSignup, data, config);

      // 認証メール送信
      const actionCodeSettings = {
        url: "http://localhost:3000/check/certification"
      };
      await sendEmailVerification(user, actionCodeSettings);

      setLoading(false);
      return true;

    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      };

      console.log("Signup処理ができませんでした。");
      setLoading(false);
      return false;

      throw error;
    }
  };

  // Login関数
  const loginWithEmail = async (args: {
    email: string,
    password: string,
  }): Promise<boolean> => {
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
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        },
      };
      const data = {
        "refresh_token": refreshToken
      };
      await axios.post(certificationRequests.fetchCreateSession, data, config);

      setLoading(false);
      return true;

    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }

      console.log("Loginできませんでした。");
      setLoading(false);
      return false;

      throw error;
    }
  };

  // 再認証用の関数
  const certification = async (): Promise<void> => {
    setLoading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        },
      };
      const res = await axios.get(certificationRequests.fetchCertification, config);

      // ログインさせる
      const currentUser: currentUser = {
        uid: res.data.uid,
        email: res.data.email,
        idToken: res.data.idToken,
        refreshToken: res.data.refreshToken,
        emailVerified: res.data.emailVerified
      };
      setCurrentUser(currentUser);

      setLoading(false);
      return;

    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }

      setLoading(false);
      return;

      throw error;
    };
  };

  // Logout関数
  const logout = async (): Promise<void> => {
    setLoading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        },
      };
      await axios.get(certificationRequests.fetchDeleteSession, config);
      setCurrentUser(null);

      if (firebaseUser) {
        await signOut(auth);
        setFirebaseUser(null);
      };

      setLoading(false);
      return;

    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }

      console.log("ログアウトに失敗しました。");
      setLoading(false);
      return;

      throw error;
    }
  };

  // パスワードリセット用関数
  // const resetPassword = async (email: string): Promise<boolean> => {
  //   setLoading(true);

  //   try {

  //     // メール認証用のリンクを作成
  //     const config = {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Cache-Control': 'no-cache'
  //       },
  //     };
  //     const data = {
  //       "mode": "resetPassword",
  //       "email": email
  //     };
  //     const res = await axios.post(certificationRequests.fetchGetFirebaseCustomLink, data, config);
  //     const link = res.data.link;

  //     // リンクでメール送信

  //     setLoading(false);
  //     return true;

  //   } catch (error) {
  //     if (error instanceof Error) {
  //       console.error(error.message);
  //     }

  //     setLoading(false);
  //     return false;

  //     throw error;
  //   };
  // };

  // const applyActionCode = async (
  //   mode: string,
  //   oobCode: string,
  //   password: string | null,
  //   email: string | null 
  // ): Promise<boolean> => {
  //   setLoading(true);

  //   console.log("デバッグ開始！！！");
  //   try {
  //     const config = {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Cache-Control': 'no-cache',
  //       },
  //     };
  //     const data = {
  //       "mode": mode,
  //       "oobCode": oobCode,
  //       "password": password,
  //       "email": email,
  //     };
  //     const res = await axios.post(certificationRequests.fetchApplyActionCode, data, config);

  //     setLoading(false);
  //     return true;

  //   } catch (error) {
  //     if (error instanceof Error) {
  //       console.error(error.message);
  //     }

  //     setLoading(false);
  //     return false;

  //     throw error;
  //   };

  // };

  // 退会用関数
  const destroyUser = async (password: string): Promise<boolean> => {
    setLoading(true);

    if (!currentUser) {
      setLoading(false);
      return false;
    };

    try {
      const email = String(currentUser.email);
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const user = credential.user;
      
      // Firebaseのユーザー削除
      await deleteUser(user);

      // ログアウト処理
      await logout();

      setLoading(false);
      return true;

    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }

      setLoading(false);
      return false;

      throw error;
    };
  };

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
    certification,
    destroyUser,
  };
}