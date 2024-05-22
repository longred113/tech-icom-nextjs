import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: any) {
    const { param } = context;
    console.log(req.url);
    return NextResponse.json({ data: 1 } as any);
}