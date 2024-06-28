'use client'
import CartStep from "@/app/components/cartstep"
import Layout from "@/app/components/Layout"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"

export default function CartPayment() {
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
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
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
                                            <span>12312321</span>
                                        </div>
                                        <div>
                                            <Label>Số điện thoại: </Label>
                                            <span>4324324</span>
                                        </div>
                                    </div>
                                    <div>
                                        <Label>Địa chỉ nhận hàng: </Label>
                                        <span>123 abc, abc, adsa</span>
                                    </div>
                                    <div>
                                        <Label>Phương thức giao hàng: </Label>
                                        <span>Giao hàng nhanh</span>
                                    </div>
                                </div>
                            </div>
                            <div className="my-3 border-b-2">
                                <h3 className="text-lg font-medium">Sản phẩm</h3>
                                <div className="flex w-full p-3">
                                    <div className="flex-shrink-0">
                                        <Image src={"https://pcmi8upoqradiz4smxabg0comvfcje9mz19juor3psi8p0.muatuhanquoc.com/2023/07/EnA7Yawg-woocommerce-placeholder.png"}
                                            alt={"something"}
                                            className="md:w-2/3 w-1/2 h-auto mb-2 border-2"
                                            width={90} // Specify the width of the image
                                            height={90} // Specify the height of the image
                                            quality={90} // Specify the image quality
                                            priority
                                        />
                                    </div>
                                    <div className="md:flex md:flex-row w-full">
                                        <div className="w-full mx-3">
                                            <h3>{"productName"}</h3>
                                        </div>
                                        <div className="text-end">
                                            <div className="text-red-600 font-semibold">{"product price"}đ</div>
                                            <div className="">
                                                <span className="mx-2">{"quantity"}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-3 mb-3 text-end">
                                    <span className="font-semibold">Tổng tiền: {"total price"}đ</span>
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
                                <Link href="/cart/thankyou">
                                    Xác nhận
                                </Link>
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </Layout>

    )
}