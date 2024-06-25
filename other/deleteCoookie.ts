'use server';

import { cookies } from "next/headers";

async function deleteCookie() {
    cookies().delete("Auth-token");
}

async function checkExistToken() {
    const token = cookies().get('Auth-token')?.value;
    if (!token) {
        return false;
    }
    return true;
}

export const myModule = { deleteCookie, checkExistToken };
export default myModule;