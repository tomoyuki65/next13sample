'use client'
import BurgerMenu from '@/components/common/BurgerMenu';
import NextLink from "next/link";
import { Link as Scroll } from 'react-scroll';
import { usePathname } from "next/navigation";

export default function Header() {
  // header表示可否のフラグを設定
  let headerDisplayFlag = false;
  
  // TOPページ（/）の場合のみフラグを有効にする
  const pathName = usePathname()
  if (pathName == '/') {
    headerDisplayFlag = true;
  }

  return (
    <> { headerDisplayFlag &&
    <header className="w-full sticky top-0 bg-gray-100">
      <nav className="p-1 bg-gray-200">
        <div className="hidden md:flex justify-between min-w-3xl bg-gray-300">
          <div className="flex items-center ml-1 text-xl font-bold">
            <Scroll
              to="main-visual"
              smooth={true}
              duration={600}
              offset={-50}
              className="hover:opacity-50 hover:cursor-pointer"
            >
              Logo
            </Scroll>
          </div>
          <div>
            <ul className="flex items-center">
              <li className="mx-2">
                <button className="font-medium">
                  <Scroll
                    to="content1"
                    smooth={true}
                    duration={600}
                    offset={-50}
                    className="hover:opacity-50 hover:cursor-pointer"
                  >
                    Content1
                  </Scroll>
                </button>
              </li>
              <li className="mx-2">
                <button className="font-medium">
                  <Scroll
                    to="content2"
                    smooth={true}
                    duration={600}
                    offset={-50}
                    className="hover:opacity-50 hover:cursor-pointer"
                  >
                    Content2
                  </Scroll>
                </button>
              </li>
              <li className="mx-2">
                <button className="m-1 py-1 px-3 border-2 rounded-lg bg-red-500 text-white hover:opacity-50">
                  <NextLink href="/signup">Signup</NextLink>
                </button>
              </li>
              <li className="mx-2">
                <button className="m-1 py-1 px-3 border-2 rounded-lg bg-slate-400 text-white hover:opacity-50">
                  <NextLink href="/login">Login</NextLink>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="md:hidden flex justify-between max-w-3xl bg-blue-200">
          <div className="text-xl font-bold">
            <Scroll
              to="main-visual"
              smooth={true}
              duration={600}
              offset={-50}
              className="hover:opacity-50 hover:cursor-pointer"
            >
              Logo
            </Scroll>
          </div>
          <div className="text-xl font-bold">
            <BurgerMenu />
          </div>
        </div>
      </nav>
    </header>
    } </>
  )
}