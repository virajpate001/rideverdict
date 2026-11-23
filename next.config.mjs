const nextConfig = {
  output: 'export',      // generates static HTML in /out
  trailingSlash: true,   // /about-us/ → matches your WordPress URLs
  images: { unoptimized: true }, // Cloudinary handles optimisation
};
export default nextConfig;