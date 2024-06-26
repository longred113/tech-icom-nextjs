'use server';

import { cookies } from "next/headers";

async function deleteCookie() {
    cookies().delete("Auth-token");
}

export default deleteCookie;