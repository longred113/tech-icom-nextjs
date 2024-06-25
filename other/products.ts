export type Product = {
    id: number;
    name: string;
    price: string;
    img: string;
};

export const products: Product[] = [
    { id: 1, name: 'Laptop GEARVN', price: '9.990.000₫', img: '/images/product1.png' },
    { id: 2, name: 'Laptop Gaming', price: '14.490.000₫', img: '/images/product2.png' },
    { id: 3, name: 'Chuột Gaming', price: '1.500.000₫', img: '/images/product3.png' },
    // Thêm các sản phẩm khác ở đây
];

