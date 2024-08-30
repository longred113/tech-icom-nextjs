import { BASE_URL } from "@/other/axios";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
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
    if (param === 'GETADDRESSDETAIL') {
        const response = await fetch(`${BASE_URL}/api/address/get-all`, {
            method: 'GET',
            headers: {
                "Authorization": `${token}`
            }
        });
        const data = await response.json();
        return NextResponse.json({ data } as any);
    }
}
export async function POST(req: Request) {
    const url = new URL(req.url);
    const param = url.searchParams.get("param");
    const body = await req.json();
    const token = cookies().get('Auth-token')?.value;

    if (param === "ADDTOCART") {
        const response = await fetch(`${BASE_URL}/api/cart/add-to-cart`, {
            method: 'POST',
            headers: {
                "Authorization": `${token}`,
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({
                productId: body.productId,
                quantity: 1,
            })
        });
        const data = await response.json();
        return NextResponse.json({ data } as any);
    }

    if (param === "UPDATECARTQUANTITY") {
        const response = await fetch(`${BASE_URL}/api/cart/update-quantity`, {
            method: 'POST',
            headers: {
                "Authorization": `${token}`,
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({
                productId: body.productId,
                quantity: 1,
                type: body.type,
            })
        });
        const data = await response.json();
        return NextResponse.json({ data } as any);
    }

    if (param === "SUBMITORDER") {
        const response = await fetch(`${BASE_URL}/api/cart/submit-order`, {
            method: 'POST',
            headers: {
                "Authorization": `${token}`,
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({
                products: body.products,
                cartInfo: body.cartInfo,
            })
        });
        const data = await response.json();
        return NextResponse.json({ data } as any);
    }
}

export async function DELETE(req: Request) {
    const url = new URL(req.url);
    const param = url.searchParams.get("param");
    const body = await req.json();
    const token = cookies().get('Auth-token')?.value;
    if (param === "DELETEITEM") {
        const response = await fetch(`${BASE_URL}/api/cart/delete-item`, {
            method: 'DELETE',
            headers: {
                "Authorization": `${token}`,
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({
                productId: body.productId,
            })
        });
        const data = await response.json();
        return NextResponse.json({ data } as any);
    }

    if (param === "DELETECART") {
        const response = await fetch(`${BASE_URL}/api/cart/delete`, {
            method: 'DELETE',
            headers: {
                "Authorization": `${token}`,
                "Content-Type": 'application/json',
            },
        });
        const data = await response.json();
        return NextResponse.json({ data } as any);
    }
}