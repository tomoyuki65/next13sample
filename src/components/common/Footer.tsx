import NextLink from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100">
      <div className="p-1 bg-gray-200">
        <div className="flex flex-col">
          <div className="m-2 p-1 bg-blue-200">
            <p className="ml-2">
              | NextJS13 Sample
            </p>
            <ul className="flex ml-6 text-sm">
              <li className="mx-1 hover:opacity-50">
                <NextLink href="/">Home</NextLink>
              </li>
              <li className="mx-1">
                |
              </li>
              <li className="mx-1 hover:opacity-50">
                <NextLink href="/signup">Signup</NextLink>
              </li>
              <li className="mx-1">
                |
              </li>
              <li className="mx-1 hover:opacity-50">
                <NextLink href="/login">Login</NextLink>
              </li>
            </ul>
          </div>
          <div className="m-2 p-1 text-center bg-blue-200">
            © 2023 NextJS13 Sample
          </div>
        </div>
      </div>
    </footer>
  )
}