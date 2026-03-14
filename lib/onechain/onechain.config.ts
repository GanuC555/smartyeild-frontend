export const ONECHAIN_CONFIG = {
  rpcUrl: process.env.NEXT_PUBLIC_ONECHAIN_RPC_URL ?? 'https://rpc-testnet.onelabs.cc',
  packageId: process.env.NEXT_PUBLIC_ONECHAIN_PACKAGE_ID ?? '',
  vaultObjectId: process.env.NEXT_PUBLIC_ONECHAIN_VAULT_OBJECT_ID ?? '',
  spendBufferObjectId: process.env.NEXT_PUBLIC_ONECHAIN_SPEND_BUFFER_OBJECT_ID ?? '',
  laneRouterObjectId: process.env.NEXT_PUBLIC_ONECHAIN_LANE_ROUTER_OBJECT_ID ?? '',
} as const;
