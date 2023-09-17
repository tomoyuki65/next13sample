import BurgerMenu from '@/components/common/BurgerMenu';

export default function Header() {
  return (
    <header className="w-full sticky top-0 bg-gray-100">
      <nav className="p-1 bg-gray-200">
        <div className="hidden md:flex justify-between min-w-3xl bg-gray-300">
          <div className="ml-1 text-xl font-bold">
            Logo
          </div>
          <div>
            <ul className="flex">
              <li className="mx-2">
                Content1
              </li>
              <li className="mx-2">
                Content2
              </li>
              <li className="mx-2">
                Signup
              </li>
              <li className="mx-2">
                Login
              </li>
            </ul>
          </div>
        </div>
        <div className="md:hidden flex justify-between max-w-3xl bg-blue-200">
          <div className="text-xl font-bold">
            Logo
          </div>
          <div className="text-xl font-bold">
            <BurgerMenu />
          </div>
        </div>
      </nav>
    </header>
  )
}