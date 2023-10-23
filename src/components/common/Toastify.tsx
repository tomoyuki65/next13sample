'use client'
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function ToastContainerWrapper() {
    return (
        <ToastContainer
            position="top-center"   // 通知の表示位置
            autoClose={5000}        // 設定した時間（ms）経過後に通知をクローズさせる
            hideProgressBar={false} // 通知のProgress Barの非表示設定をOFF
            newestOnTop             // 最新の通知をTOPに表示させる
            closeOnClick            // 通知をクリックで閉じれる
            rtl={false}             // 通知の文字を左寄せにする
            pauseOnFocusLoss        // ウィンドウがフォーカスを失った時に通知の時間経過を一時停止
            draggable={false}       // 通知をドラッグできないようにする
            pauseOnHover={false}    // 通知にカーソルを当てても時間経過を一時停止しない
            theme="colored"         // テーマ「coloered」を使用する
        />
    );
};