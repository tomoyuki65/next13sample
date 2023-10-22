import { cookies } from "next/headers";

type CookieKeyValue = { [key: string]: any; };

let allCookies: CookieKeyValue = [];

export const getAllCookies = (): CookieKeyValue => {
  const cookieStore = cookies();

  cookieStore.getAll().map((cookie) => {
    allCookies[cookie.name] = cookie.value;
  });

  return allCookies;
};