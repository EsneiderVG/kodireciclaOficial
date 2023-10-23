/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig
module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.mundodeportivo.com',
                port: '',
                pathname: '/alfabeta/hero/2023/04/all-might-se-convierte-en-iron-man.jpg',
            },
            {
                protocol: 'https',
                hostname: 'img.freepik.com',
                port: '',
                pathname: '/premium-vector/3d-simple-user-icon-isolated_169241-6976.jpg',
            }
            
        ],
    },
}