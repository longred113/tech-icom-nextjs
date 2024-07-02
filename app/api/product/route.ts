import { BASE_URL } from "@/other/axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const name = url.searchParams.get("name");
    const param = url.searchParams.get("param");
    if (param === "GETALL") {
        try {
            const response = await fetch(`${BASE_URL}/api/product/get-all`, {
                method: 'GET',
                cache: 'no-store'
            });
            const data = await response.json();
            return NextResponse.json({ data } as any);
        } catch (error) {
            console.log(error);
        }
    }
    if (param === "GETDETAIL") {
        const productId = 1;
        const response = await fetch(`${BASE_URL}/api/product/get-by-category/${productId}`)
    }

    if (param === "PRODUCTDETAIL") {
        try {
            const response = await fetch(`${BASE_URL}/api/product/${name}`, {
                method: 'GET',
                cache: 'no-store',
                headers: {
                    "Content-type": "application/json",
                },
            });
            const data = await response.json();
            return NextResponse.json({ data } as any);
        } catch (error) {
            console.log(error);
        }
    }
    if (param === "GETPRODUCTBYCATEGORY") {
        try {
            if (name === "mouse") {
                const response = await fetch(`${BASE_URL}/api/product/get-by-category/5`, {
                    method: 'GET',
                    cache: 'no-store',
                    headers: {
                        "Content-type": "application/json",
                    },
                });
                const data = await response.json();
                return NextResponse.json({ data } as any);
            }
        } catch (error) {
            console.log(error);
        }
    }
}