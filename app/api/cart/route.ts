import { BASE_URL } from "@/other/axios";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest, res: NextResponse) {
    const url = new URL(req.url);
    const param = url.searchParams.get("param");
    const token = cookies().get('Auth-token')?.value;
    if (param === "GETCART") {
        const response = await fetch(`${BASE_URL}/api/cart/get-cart`, {
            method: 'GET',
            headers: {
                "Authorization": `${token}`
            }
        });
        const data = await response.json();
        return NextResponse.json({ data } as any);
    }
}