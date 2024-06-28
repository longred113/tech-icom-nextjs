import CartStep from "@/app/components/cartstep"
import Layout from "@/app/components/Layout"
import { FaCircleCheck } from "react-icons/fa6"

export default function CartThankYou() {
    return (
        <Layout>
            <div className="container mx-auto p-4 md:h-full h-screen">
                <div className="bg-white shadow-md p-4 md:w-1/2 mx-auto">
                    <CartStep param={["info", "payment", "thankyou"]} />
                    <div className="text-center my-5 text-primary">
                        <FaCircleCheck className="text-9xl mx-auto" />
                        <p>Cám ơn bạn đã đặt hàng</p>
                        <p>Đơn hàng sẽ được vận chuyển trong thời gian sớm nhất</p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}