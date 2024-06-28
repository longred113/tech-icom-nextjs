import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Label } from "@/components/ui/label";
import { FaCreditCard, FaIdCard } from "react-icons/fa6";
import { IoBagCheck, IoShieldCheckmarkSharp } from "react-icons/io5";
import { useState } from "react";


export default function CartStep(param: any) {
    return (
        <div>
            {/* <h2 className="text-2xl font-semibold mb-4">Giỏ hàng của bạn</h2> */}
            <div className="bg-slate-400 flex justify-between p-5 rounded-lg">
                <div>
                    <div className="rounded-full border border-primary p-2 w-fit mx-auto bg-primary text-white">
                        <IoBagCheck className="text-2xl" />
                    </div>
                    <div className="text-center text-primary">
                        <span>Giỏ hàng</span>
                    </div>
                </div>
                <div className="text-gray-500">
                    <div className={`rounded-full border p-2 w-fit mx-auto ${param?.param?.[0] === "info" ? ("bg-primary text-white border-primary") : ("text-gray-500 border-gray-500")}`}>
                        <FaIdCard className={`text-2xl`} />
                    </div>
                    <div className={`text-center  ${param?.param?.[0] === "info" ? ("text-primary") : ("text-gray-500")}`}>
                        <span>Thông tin đặt hàng</span>
                    </div>
                </div>
                <div className="text-gray-500">
                    <div className={`rounded-full border p-2 w-fit mx-auto ${param?.param?.[1] === "payment" ? ("bg-primary text-white border-primary") : ("text-gray-500 border-gray-500")}`}>
                        <FaCreditCard className="text-2xl" />
                    </div>
                    <div className={`text-center  ${param?.param?.[1] === "payment" ? ("text-primary") : ("text-gray-500")}`}>
                        <span>Thanh toán</span>
                    </div>
                </div>
                <div className="text-gray-500">
                    <div className={`rounded-full border p-2 w-fit mx-auto ${param?.param?.[2] === "thankyou" ? ("bg-primary text-white border-primary") : ("text-gray-500 border-gray-500")}`}>
                        <IoShieldCheckmarkSharp className="text-2xl" />
                    </div>
                    <div className={`text-center  ${param?.param?.[2] === "thankyou" ? ("text-primary") : ("text-gray-500")}`}>
                        <span>Hoàn tất</span>
                    </div>
                </div>
            </div>
        </div>
    )
}