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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/components/cartContext";



export default function CartInfo() {
    const [totalPrice, setTotalPrice] = useState(0);
    const [city, setCity] = useState<any>(null);
    const [district, setDistrict] = useState<any>(null);
    const [ward, setWard] = useState<any>(null);
    const [selectedCity, setSelectedCity] = useState<string>("");
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedWards, setSelectedWards] = useState('');
    const router = useRouter();
    const { fetchCart } = useCart();

    const formSchema = z.object({
        username: z.string().min(2, {
            message: "Họ tên phải có ít nhất 2 chữ cái",
        }),
        phone: z.string().min(10, {
            message: "Số điện thoại phải có ít nhất 10 ký tự",
        }).regex(/^0\d+$/, {
            message: "Số điện thoại không đúng định dạng"
        }),
        address: z.string().min(5),
        city: z.string().optional(),
        district: z.string().optional(),
        ward: z.string().optional(),
        type: z.enum(["free ship", "normal"], {
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
            type: "free ship",
        },
    });
    function onSubmit(values: z.infer<typeof formSchema>) {
        localStorage.setItem("formData", JSON.stringify(values));
        router.push('/cart/payment');
    }
    const getCart = async () => {
        try {
            const res = await fetchCart();
            setTotalPrice(res.data.data.totalPrice);
        } catch (error) {
            console.log(error);
        }
    }
    const getAddress = async () => {
        try {
            const res = await fetch("/api/cart?param=GETADDRESSDETAIL", {
                method: "GET",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            });
            const data = await res.json();
            const cities = data.data.data.map((item: any) => item.Name);
            setCity(data.data.data);
        } catch (error) {

        }
    }
    useEffect(() => {
        getCart();
        getAddress();
    }, []);

    const getDistrictsByCity = (cityName: any) => {
        if (!city) return [];
        const selectedCity = city.find((city: any) => city.Name === cityName);
        return selectedCity ? selectedCity.Districts : [];
    }

    // Hàm để lấy danh sách các phường (wards) trong quận đã chọn
    const getWardsByDistrict = (values: z.infer<typeof formSchema>) => {
        if (!city) return [];
        const selectedCity = city.find((city: any) => city.Name === values.city);
        console.log(selectedCity);
        if (selectedCity) {
            const selectedDistrict = selectedCity.Districts.find((district: any) => district.Name === values.district);
            return selectedDistrict ? selectedDistrict.Wards : [];
        }
        return [];
    }

    useEffect(() => {
        setDistricts(getDistrictsByCity(selectedCity));
        if (selectedCity) {
            form.resetField('district');
            setSelectedDistrict(''); // Reset quận khi thành phố thay đổi
            setWards([]); // Reset phường khi thành phố thay đổi
        }
        setSelectedDistrict(''); // Reset quận khi thành phố thay đổi
        setWards([]); // Reset phường khi thành phố thay đổi
    }, [selectedCity]);

    useEffect(() => {
        setWards(getWardsByDistrict(form.getValues()));
        if (selectedDistrict) {
            form.resetField('ward');
        }
    }, [selectedDistrict]);

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
                                                <Select onValueChange={(value: any) => {
                                                    field.onChange(value);
                                                    setSelectedCity(value);
                                                }}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Chọn Tỉnh, thành phố" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {city != null && city.map((city: any) => (
                                                            <SelectItem key={city.Name} value={city.Name}>{city.Name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        }} />
                                    </div>
                                    <div className="w-2/5 mb-3">
                                        <FormField control={form.control} name="district" render={({ field }) => {
                                            return <FormItem>
                                                <Select onValueChange={(value: any) => {
                                                    field.onChange(value);
                                                    setSelectedDistrict(value);
                                                }}>
                                                    <FormControl>
                                                        <SelectTrigger disabled={selectedCity === ""}>
                                                            <SelectValue placeholder="Chọn Quận,Huyện" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {districts != null && districts.map((district: any) => (
                                                            <SelectItem key={district.Name} value={district.Name}>{district.Name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        }} />
                                    </div>
                                    <div className="w-2/5">
                                        <FormField control={form.control} name="ward" render={({ field }) => {
                                            return <FormItem>
                                                <Select onValueChange={(value: any) => {
                                                    field.onChange(value);
                                                    setSelectedWards(value);
                                                }}>
                                                    <FormControl>
                                                        <SelectTrigger disabled={selectedDistrict === ""}>
                                                            <SelectValue placeholder="Chọn Phường,Xã" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {wards != null && wards.map((ward: any) => (
                                                            <SelectItem key={ward.Name} value={ward.Name}>{ward.Name}</SelectItem>
                                                        ))}
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
                                                                    <RadioGroupItem value="free ship" />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">
                                                                    Miễn phí vận chuyển
                                                                </FormLabel>
                                                            </FormItem>
                                                            <span className="">0₫</span>
                                                        </div>
                                                        {/* <div className="flex justify-between">
                                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <RadioGroupItem value="normal" />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">
                                                                    Direct messages and mentions
                                                                </FormLabel>
                                                            </FormItem>
                                                            <span className="">1</span>
                                                        </div> */}
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        }} />
                                    </div>
                                </div>
                            </div>
                            <div className="my-5">
                                <div className="flex justify-between">
                                    <span className="text-lg font-medium">Phí vận chuyển:{" "}</span>
                                    {/* <span className="text-red-600 text-xl font-bold">{totalPrice.toLocaleString('vi-VN')}đ</span> */}
                                    <span className="text-sm font-medium">Miễn phí</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-lg font-medium">Tổng tiền:{" "}</span>
                                    {/* <span className="text-red-600 text-xl font-bold">{totalPrice.toLocaleString('vi-VN')}đ</span> */}
                                    <span className="text-red-600 text-xl font-bold">{totalPrice.toLocaleString('vi-VN')}₫</span>
                                </div>
                            </div>
                            <Button type="submit" className="w-full text-xl uppercase">
                                Đặt hàng ngay
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </Layout>
    )
}
