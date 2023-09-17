'use client'
import { useState } from 'react';
import { slide as Menu, State } from 'react-burger-menu'

// Menuコンポーネントに適用させるCSS
const styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '32px',
    height: '26px',
    right: '20px',
    top: '5px',
  },
  bmBurgerBars: {
    background: 'black'
  },
  bmCross: {
    background: 'white'
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%',
    top: "0",
  },
  bmMenu: {
    background: 'dimgray',
    padding: '2.5em 1.5em 0',
  },
  bmItemList: {
    color: 'white',
  },
}

export default function BurgerMenu() {
  // メニュー画面の開閉状態を管理する「isMenuOpen」を設定
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // メニューを閉じるための関数を設定
  const handleCloseMenu = () => {
    setIsMenuOpen(false)
  }

  // メニュー画面の開閉状態を確認するための関数を設定
  const handleStateChange = (state: State) => {
    setIsMenuOpen(state.isOpen)
  }

  return (
    <div id="outer-container">
      <Menu
        isOpen={isMenuOpen}
        onStateChange={handleStateChange}
        pageWrapId={'page-wrap'}
        outerContainerId={'outer-container'}
        right={true}
        styles={styles}
      >
        <main id="page-wrap">
          <ul className="flex flex-col">
            <li className="mb-4">
              <button className="hover:opacity-50"
                onClick={()=>{handleCloseMenu()}}
              >
                Content1
              </button>
            </li>
            <li className="mb-4">
              <button className="hover:opacity-50"
                onClick={()=>{handleCloseMenu()}}
              >
                Content2
              </button>
            </li>
            <li className="mb-4 flex justify-center">
              <button className="mt-4 p-2 w-3/4 text-3xl border-2 rounded-lg bg-red-500 hover:opacity-50"
                onClick={()=>{handleCloseMenu()}}
              >
                Signup
              </button>
            </li>
            <li className="mb-4 flex justify-center">
              <button className="mt-4 p-1 w-3/5 border-2 rounded-lg bg-slate-400 hover:opacity-50"
                onClick={()=>{handleCloseMenu()}}
              >
                Login
              </button>
            </li>
          </ul>
        </main>
      </Menu>
    </div>
  );
};