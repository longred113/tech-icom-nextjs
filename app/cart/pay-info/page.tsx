'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Label } from "@/components/ui/label";
import Layout from "@/app/components/Layout";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import CartStep from "@/app/components/cartstep";


export default function CartInfo() {
    const formSchema = z.object({
        username: z.string().min(2, {
            message: "Họ tên phải có it nhất 2 chữ cái",
        }),
        phone: z.string().min(10, {
            message: "Số điện thoại phải có it nhất 10 ký tự",
        }).regex(/^0\d+$/, {
            message: "Số điện thoại không đúng định dạng"
        }),
        address: z.string().min(5),
        city: z.string().optional(),
        district: z.string().optional(),
        ward: z.string().optional(),
        type: z.enum(["fast", "normal"], {
            required_error: "You need to select a notification type."
        })
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            phone: "",
            address: "",
            city: "",
            district: "",
            ward: "",
            type: "fast",
        },
    });
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
    // console.log(username, phone, address)

    return (
        <Layout>
            <div className="container mx-auto p-4 md:h-full h-screen">
                <div className="bg-white shadow-md p-4 md:w-1/2 mx-auto">
                    <CartStep param={["info"]} />
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="mx-3 mt-5">
                            <h3 className="text-lg font-medium">Thông tin khách mua hàng</h3>
                            <div className="flex justify-between">
                                <FormField control={form.control} name="username" render={({ field }) => {
                                    return <FormItem>
                                        <FormLabel>Họ tên</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nhập họ tên" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                }} />
                                <FormField control={form.control} name="phone" render={({ field }) => {
                                    return <FormItem>
                                        <FormLabel>Số điện thoại</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nhập số điện thoại" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                }} />
                            </div>
                            <div className="mb-10">
                                <h3 className="text-lg font-medium my-3">Địa chỉ nhận hàng</h3>
                                <div className="flex flex-wrap justify-between p-5 bg-slate-400">
                                    <div className="w-2/5 mb-3">
                                        <FormField control={form.control} name="city" render={({ field }) => {
                                            return <FormItem>
                                                <Select onValueChange={field.onChange}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Chọn Tỉnh, thành phố" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="1">Item 1</SelectItem>
                                                        <SelectItem value="2">Item 2</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        }} />
                                    </div>
                                    <div className="w-2/5 mb-3">
                                        <FormField control={form.control} name="district" render={({ field }) => {
                                            return <FormItem>
                                                <Select>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Chọn Quận,Huyện" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="11">Item 1</SelectItem>
                                                        <SelectItem value="22">Item 2</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        }} />
                                    </div>
                                    <div className="w-2/5">
                                        <FormField control={form.control} name="ward" render={({ field }) => {
                                            return <FormItem>
                                                <Select>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Chọn Phường,Xã" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="111">Item 1</SelectItem>
                                                        <SelectItem value="222">Item 2</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        }} />
                                    </div>
                                    <div className="w-2/5">
                                        <FormField control={form.control} name="address" render={({ field }) => {
                                            return <FormItem>
                                                <FormControl>
                                                    <Input placeholder="Số nhà, tên đường" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        }} />
                                    </div>
                                </div>
                            </div>
                            <div className="border-b-2 border-gray-400">
                                <h3 className="text-lg font-medium">Dịch vụ giao hàng</h3>
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full px-3">
                                        <FormField control={form.control} name="type" render={({ field }) => {
                                            return <FormItem>
                                                <FormControl>
                                                    <RadioGroup
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                        className="flex flex-col space-y-1"
                                                    >
                                                        <div className="flex justify-between">
                                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <RadioGroupItem value="fast" />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">
                                                                    All new messages
                                                                </FormLabel>
                                                            </FormItem>
                                                            <span className="">1</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <RadioGroupItem value="normal" />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">
                                                                    Direct messages and mentions
                                                                </FormLabel>
                                                            </FormItem>
                                                            <span className="">1</span>
                                                        </div>
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        }} />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between">
                                    <span className="text-lg font-medium">Tổng tiền:{" "}</span>
                                    {/* <span className="text-red-600 text-xl font-bold">{totalPrice.toLocaleString('vi-VN')}đ</span> */}
                                    <span className="text-sm font-medium">2312321312đ</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-lg font-medium">Tổng tiền:{" "}</span>
                                    {/* <span className="text-red-600 text-xl font-bold">{totalPrice.toLocaleString('vi-VN')}đ</span> */}
                                    <span className="text-red-600 text-xl font-bold">1111111đ</span>
                                </div>
                            </div>
                            <Button type="submit" className="w-full text-xl uppercase">
                                <Link href="/cart/payment">
                                    Đặt hàng ngay
                                </Link>
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </Layout>
    )
}