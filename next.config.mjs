/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
		domains: [
			'res.cloudinary.com',
			'*',
			'file.hstatic.net',
		],
	},
};

export default nextConfig;
