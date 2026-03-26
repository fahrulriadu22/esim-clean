/** @type {import('next').NextConfig} */
const nextConfig = {
   eslint: {
      ignoreDuringBuilds: true,
   },
   typescript: {
      ignoreBuildErrors: true,
   },
   images: {
      unoptimized: true,
   },
   // Untuk Next.js 15, pake serverExternalPackages (bukan experimental)
   serverExternalPackages: ['@upstash/redis', 'bcrypt'],
   
   webpack: (config, { isServer }) => {
      if (isServer) {
         config.externals = config.externals || [];
         config.externals.push({
            "@ton/core": "commonjs @ton/core",
            "@ton/crypto": "commonjs @ton/crypto",
            "@tonconnect/ui-react": "commonjs @tonconnect/ui-react",
            "@upstash/redis": "commonjs @upstash/redis",
         });
      }
      return config;
   },
};

export default nextConfig;
