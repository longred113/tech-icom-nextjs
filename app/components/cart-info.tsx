import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Label } from "@/components/ui/label";


export default function CartInfo() {
    const formSchema = z.object({
        username: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    });
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <div>
            <form>
                <div className="flex flex-wrap justify-between">
                    <div className="w-1/2 px-2">
                        <Label htmlFor="name">Họ tên</Label>
                        <Input id="name" placeholder="Nhập họ tên" />
                    </div>
                    <div className="w-1/2 px-2">
                        <Label htmlFor="phone">Điện thoại</Label>
                        <Input id="phone" placeholder="Nhập số điện thoại" />
                    </div>
                </div>
            </form>

        </div>
    )
}