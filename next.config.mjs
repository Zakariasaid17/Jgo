/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['jihawigocom.s3.eu-west-3.amazonaws.com'],
    },
    async headers() {
        return [
            {
                source: '/api/(.*)',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '*',
                    },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET, POST, PUT, DELETE, OPTIONS',
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'Content-Type, Authorization',
                    },
                    {
                        key: 'Content-Range',
                        value: 'bytes: 0-9/*',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
