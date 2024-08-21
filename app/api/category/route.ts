import { BASE_URL } from "@/other/axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const param = url.searchParams.get("param");
    const token = cookies().get('Auth-token')?.value;
    if (param === "GETALL") {
        const response = await fetch(`${BASE_URL}/api/category/get-all`, {
            method: 'GET',
            headers: {
                "Authorization": `${token}`
            }
        });
        const data = await response.json();
        return NextResponse.json({ data } as any);
    }
}