import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function AddressTab() {
    const [addresses, setAddresses] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [city, setCity] = useState<any>(null);
    const [selectedCity, setSelectedCity] = useState<string>("");
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedWards, setSelectedWards] = useState('');

    const handleAddAddressClick = () => {
        setShowPopup(true);
    };
    const handleClosePopup = () => {
        setSelectedCity('');
        setSelectedDistrict('');
        setSelectedWards('');
        setCity(null);
        setShowPopup(false);
    };
    const handleOverlayClick = (e: any) => {
        if (e.target === e.currentTarget) {
            handleClosePopup();
        }
    }
    const formSchema = z.object({
        username: z.string().min(2, {
            message: "Họ tên phải có ít nhất 2 chữ cái",
        }),
        phone: z.string().min(10, {
            message: "Số điện thoại phải có ít nhất 10 ký tự",
        }).regex(/^0\d+$/, {
            message: "Số điện thoại không đúng định dạng"
        }),
        address: z.string().min(5, {
            message: "Địa chỉ phải có ít nhất 5 ký tự"
        }),
        city: z.string().optional(),
        district: z.string().optional(),
        ward: z.string().optional(),
        type: z.enum(["free ship", "normal"], {
            required_error: "Bạn cần phải chọn loại địa chỉ"
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
            type: undefined,
        },
    });

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

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <div>
            <div className="p-5 flex justify-between">
                <h3 className="text-2xl">Quản lý địa chỉ</h3>
                <Button onClick={handleAddAddressClick} className="text-white">
                    <Plus className="w-4" />
                    Thêm địa chỉ mới
                </Button>
            </div>
            {addresses !== null ? <div></div> :
                <div className="text-center mt-20 text-xl">
                    <p>Bạn chưa có địa chỉ</p>
                </div>}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={handleOverlayClick}>
                    <div className="bg-white w-1/4 p-3 rounded-lg shadow-lg">
                        <Form{...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="mx-3 mt-5">
                                <h2 className="text-xl mb-4">Thêm địa chỉ mới</h2>
                                <div>
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
                                <div>
                                    <Label>Địa chỉ</Label>
                                    <div className="flex flex-wrap justify-between">
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
                                        <div className="w-2/5 mb-3">
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
                                        <div className="w-2/5 mb-3">
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
                                <div>
                                    <Label>Loại địa chỉ</Label>
                                    <div className="flex my-3">
                                        <FormField control={form.control} name="type" render={({ field }) => {
                                            return <FormItem>
                                                <FormControl>
                                                    <RadioGroup
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                        className="flex flex-col space-y-1"
                                                    >
                                                        <div className="flex justify-between">
                                                            <FormItem className="flex items-center space-y-0">
                                                                <FormControl>
                                                                    <RadioGroupItem hidden value="free ship" />
                                                                </FormControl>
                                                                <FormLabel className={`border p-3 rounded-lg font-normal ${field.value === "free ship" ? "text-white bg-primary" : ""}`}>
                                                                    Văn phòng
                                                                </FormLabel>
                                                            </FormItem>
                                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <RadioGroupItem hidden value="normal" />
                                                                </FormControl>
                                                                <FormLabel className={`border p-3 rounded-lg font-normal ${field.value === "normal" ? "text-white bg-primary" : ""}`}>
                                                                    Nhà riêng
                                                                </FormLabel>
                                                            </FormItem>
                                                        </div>
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        }} />
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <Button onClick={handleClosePopup} className="mr-2 w-full">
                                        Hủy
                                    </Button>
                                    <Button type="submit" className="w-full">
                                        Lưu
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            )
            }
        </div >
    )
}