import { BASE_URL } from "@/other/axios";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const param = url.searchParams.get("param");
    const response = await fetch(`${BASE_URL}/api/user/profile`, {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL3VzZXIvbG9naW4iLCJpYXQiOjE3MTYyODIyODIsImV4cCI6MTcxNjI4NTg4MiwibmJmIjoxNzE2MjgyMjgyLCJqdGkiOiJzSW5oanA0Z2p1U2tTVTc4Iiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.T4frq-ZrkYk6LA0JSWrRiLixpUF61wVunobMl7_kpW4`
        },
    });
    const data = await response.json();
    return NextResponse.json({ data } as any);
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