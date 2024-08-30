import { BASE_URL } from "@/other/axios";
import { NextApiRequest } from "next";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const param = url.searchParams.get("param");
    const token = cookies().get('Auth-token')?.value;
    if (param === "DETAIL") {
        const response = await fetch(`${BASE_URL}/api/user/profile`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `${token}`,
            },
        });
        const data = await response.json();
        return NextResponse.json({ data } as any);
    }
}
export async function POST(req: Request) {
    const url = new URL(req.url);
    const param = url.searchParams.get("param");
    const body = await req.json();
    if (param === "LOGIN") {
        const response = await fetch(`${BASE_URL}/api/user/login`, {
            headers: {
                "Content-Type": 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                email: body.email,
                password: body.password,
            }),
        });
        const data = await response.json();
        return Response.json({ data } as any);
    }

    if (param === "REGISTER") {
        const response = await fetch(`${BASE_URL}/api/user/register`, {
            headers: {
                "Content-Type": 'application/json',
                "accept": "application/json"
            },
            method: 'POST',
            body: JSON.stringify({
                name: body.name,
                email: body.email,
                password: body.password,
                password_confirmation: body.password_confirmation
            }),
        });
        const data = await response.json();
        return Response.json({ data } as any);
    }
}