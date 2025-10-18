/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Enable static exports.
   *
   * @see https://nextjs.org/docs/app/building-your-application/deploying/static-exports
   */
  output: 'export',
  transpilePackages: ['@workspace/ui'],
};

export default nextConfig;
