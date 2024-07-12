export default function Footer() {
    return (
        <footer className="flex items-center justify-center w-full bg-primary">
            <div className="flex flex-wrap xl:w-8/12 my-8">
                <div className="border w-1/5 px-2">
                    <div className="uppercase font-medium mb-2">
                        <h4>
                            Về Tech Icom
                        </h4>
                    </div>
                </div>
                <div className="border w-1/5 px-2">
                    <div className="uppercase font-medium mb-2">
                        <h4>
                            Chính sách
                        </h4>
                    </div>
                    <div>Chính sách bảo hành</div>
                    <div>Chính sách thanh toán</div>
                    <div>Chính sách giao hàng</div>
                    <div>Chính sách bảo mật</div>
                </div>
                <div className="border w-1/5 px-2">
                    <div className="uppercase font-medium mb-2">
                        <h4>
                            Thông tin
                        </h4>
                    </div>
                    <div>Hệ thống của hàng</div>
                    <div>Hướng dẫn mua hàng</div>
                    <div>Tra cứu địa chỉ bảo hành</div>
                </div>
                <div className="border w-1/5 px-2">
                    <div className="uppercase font-medium mb-2">
                        <h4>
                            Tổng đài hỗ trợ
                        </h4>
                    </div>
                    <div>Mua hàng:</div>
                    <div>Bảo hành:</div>
                    <div>Khiếu nại:</div>
                    <div>Email:</div>
                </div>
                <div className="border w-1/5 px-2">
                    <div className="uppercase font-medium mb-2">
                        <h4>
                            Đơn vị vận chuyển
                        </h4>
                    </div>
                </div>
            </div>
        </footer>
    )
}