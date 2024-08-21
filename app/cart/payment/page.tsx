'use client'
import { useCart } from "@/app/components/cartContext"
import CartStep from "@/app/components/cartstep"
import Layout from "@/app/components/Layout"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { IMAGE_NULL } from "@/other/axios"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

export default function CartPayment() {
    const [totalPrice, setTotalPrice] = useState(0);
    const [products, setProducts] = useState<any[]>([]);
    const [userPayInfo, setUserPayInfo] = useState<any>(null);
    const [customData, setCustomData] = useState<any[]>([]);
    const { fetchCart } = useCart();

    const router = useRouter();

    const formSchema = z.object({
        type: z.enum(["COD", "Bank"], {
            required_error: "You need to select a notification type."
        })
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: "COD",
        },
    });
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        userPayInfo.payment_method = values.type;
        try {
            const res = await fetch("/api/cart?param=SUBMITORDER", {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify({ products: customData, cartInfo: userPayInfo }),
            });
            const data = await res.json();
            console.log(data);
            if (data.data.code === 200) {
                router.push("/cart/thankyou");
            }
        } catch (error) {
            console.log(error);
        }
    }
    const payInfo = () => {
        const data = localStorage.getItem("formData");
        if (data) {
            setUserPayInfo(JSON.parse(data));
        }
    }

    const getCart = async () => {
        try {
            const res = await fetchCart();
            setProducts(res.data.data.cartItems);
            setTotalPrice(res.data.data.totalPrice);
            const customData =
                res.data.data.cartItems.map((item: any) => ({
                    "productId": item.productData.id,
                    "quantity": item.quantity
                }))
            setCustomData(customData);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        payInfo();
        getCart();
    }, []);
    return (
        <Layout>
            <div className="container mx-auto p-4 md:h-full h-screen">
                <div className="bg-white shadow-md p-4 md:w-1/2 mx-auto">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="mx-3 mt-5">
                            <CartStep param={["info", "payment"]} />
                            <div className="my-3 border-b-2">
                                <h3 className="text-lg font-medium">Thông tin nhận hàng</h3>
                                <div className="p-3">
                                    <div className="flex gap-5">
                                        <div>
                                            <Label>Họ tên: </Label>
                                            <span>{userPayInfo?.username}</span>
                                        </div>
                                        <div>
                                            <Label>Số điện thoại: </Label>
                                            <span>{userPayInfo?.phone}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <Label>Địa chỉ nhận hàng: </Label>
                                        <span>{userPayInfo?.address + ", " + userPayInfo?.ward + ", " + userPayInfo?.district + ", " + userPayInfo?.city}</span>
                                    </div>
                                    <div>
                                        <Label>Phương thức giao hàng: </Label>
                                        {userPayInfo?.type === "free ship" &&
                                            <span>Miễn phí vận chuyển</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="my-3 border-b-2">
                                <h3 className="text-lg font-medium">Sản phẩm</h3>
                                {products?.map((item, index) => {
                                    return (
                                        <div key={index} className="flex w-full p-3">
                                            <div className="flex-shrink-0">
                                                <Image src={item.productData.image ? item.productData.image[0] : IMAGE_NULL}
                                                    alt={item.productData.name}
                                                    className="md:w-2/3 w-1/2 h-auto mb-2 border-2"
                                                    width={90} // Specify the width of the image
                                                    height={90} // Specify the height of the image
                                                    quality={90} // Specify the image quality
                                                    priority
                                                />
                                            </div>
                                            <div className="md:flex md:flex-row w-full">
                                                <div className="w-full mx-3">
                                                    <h3>{item.productData.name}</h3>
                                                </div>
                                                <div className="text-end">
                                                    <div className="text-red-600 font-semibold">{item?.productData?.price?.toLocaleString('vi-VN')}đ</div>
                                                    <div className="">
                                                        <span className="mx-2">{item.quantity}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                                <div className="px-3 mb-3 text-end">
                                    <span className="font-semibold">Tổng tiền: {totalPrice.toLocaleString('vi-VN')}đ</span>
                                </div>
                            </div>
                            <div className="my-3">
                                <h3 className="text-lg font-medium">Phương thức thanh toán</h3>
                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3 p-3">
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    className="flex flex-col space-y-1"
                                                >
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="COD" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            Thanh toán khi nhận hàng
                                                        </FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="Bank" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            Chuyển khoản ngân hàng
                                                        </FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button type="submit" className="w-full text-xl uppercase">
                                Xác nhận
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </Layout>

    )
}