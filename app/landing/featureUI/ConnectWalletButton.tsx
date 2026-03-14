'use client';

import { useWalletConnect } from '../featureService/useWalletConnect';

export default function ConnectWalletButton({
  label = 'Connect Wallet',
}: {
  label?: string;
}) {
  const { loading, connect } = useWalletConnect();

  return (
    <button
      onClick={connect}
      disabled={loading}
      className="cursor-pointer rounded-xl bg-teal-500 px-6 py-3 font-bold text-black transition-all hover:bg-teal-400 disabled:opacity-50"
    >
      {loading ? 'Connecting...' : label}
    </button>
  );
}
