'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export default function InfoTab() {
    const [detail, setDetail] = useState<any>(null);
    const getUserDetail = async () => {
        try {
            const res = await fetch("/api/users?param=DETAIL", {
                method: "GET",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            });
            const data = await res.json();
            setDetail(data.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        console.log("useEffect is running"); // Thêm log này
        getUserDetail();
    }, []);

    return (
        <div>
            <h3 className="text-2xl px-5 pt-5">Thông tin tài khoản</h3>
            <div className="px-10 py-8">
                <div className="flex items-center mb-3">
                    <p className="w-1/4">Họ tên</p>
                    <Input className="w-1/2" value={detail?.name} />
                </div>
                <div className="flex items-center mb-3">
                    <p className="w-1/4">Giới tính</p>
                    <div className="flex items-center mr-5">
                        <Input type="radio" name="gender" value="male" />
                        <p>Nam</p>
                    </div>
                    <div className="flex items-center">
                        <Input type="radio" name="gender" value="female" />
                        <p>Nữ</p>
                    </div>
                </div>
                <div className="flex items-center mb-3">
                    <p className="w-1/4">Số điện thoại</p>
                    <Input className="w-1/3" />
                </div>
                <div className="flex items-center mb-3">
                    <p className="w-1/4">Email</p>
                    <Input className="w-1/2" value={detail?.email} />
                </div>
                <div className="flex items-center mb-3">
                    <p className="w-1/4">Ngày sinh</p>
                    <Input type="date" className="w-1/2" />
                </div>
                <div className="text-center text-white">
                    <Button>
                        Lưu thay đổi
                    </Button>
                </div>
            </div>
        </div>
    )
}