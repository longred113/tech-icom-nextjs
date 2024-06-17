import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: any) {
    const { param } = context;
    return NextResponse.json({ data: 1 } as any);
}