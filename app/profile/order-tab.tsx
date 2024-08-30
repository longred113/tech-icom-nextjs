import { Button } from "@/components/ui/button";
import { useState } from "react"

export default function OrderTab() {
    const [orders, setOrder] = useState<[]>([]);
    return (
        <div>
            <h3 className="text-2xl p-5">Quản lý đơn hàng</h3>
            {orders.length > 0 ? "" :
                <div className="text-center mt-10 text-xl">
                    <p className="mb-3">Bạn chưa có đơn hàng nào</p>
                    <Button className="text-white text-lg">Tiếp tục mua hàng</Button>
                </div>}
        </div>
    )
}