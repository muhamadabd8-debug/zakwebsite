import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Pin the Turbopack root. This project lives under a Windows Store-app
   * junction (AppData\Roaming -> Local\Packages\...\LocalCache\Roaming);
   * without an explicit root, source detection resolves through the junction
   * and walks above the filesystem root.
   */
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
