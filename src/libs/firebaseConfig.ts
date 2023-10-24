/* Firebaseの初期設定ファイル */

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, browserLocalPersistence, browserSessionPersistence, inMemoryPersistence } from "firebase/auth";

// Firebaseの認証情報を設定
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSEGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Firebaseの初期化＆Appオブジェクトの作成
const getFirebaseApp = () => {
  if (typeof window !== "undefined" && !getApps().length) {
    return initializeApp(firebaseConfig);
  } else {
    return getApp();
  }
};

const app = getFirebaseApp();

// FirebaseAppに関連するAuthインスタンスを取得
export const auth = getAuth(app);

// 認証状態の永続性を変更
auth.setPersistence(inMemoryPersistence);