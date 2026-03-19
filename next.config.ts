import type { NextConfig } from "next";

const ONECHAIN_RPC = "https://rpc-testnet.onelabs.cc";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/onechain-rpc",
        destination: ONECHAIN_RPC,
      },
    ];
  },
};

export default nextConfig;
