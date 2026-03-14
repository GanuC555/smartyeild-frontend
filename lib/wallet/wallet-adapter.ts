export interface IWalletAdapter {
  connect(): Promise<string>;
  disconnect(): Promise<void>;
  signMessage(message: string): Promise<string>;
  getAddress(): string | null;
  isConnected(): boolean;
}

/** Stub adapter — no real wallet, for hackathon dev */
class StubWalletAdapter implements IWalletAdapter {
  private address: string | null = null;

  async connect(): Promise<string> {
    await new Promise((r) => setTimeout(r, 400));
    this.address = `0x${crypto.getRandomValues(new Uint8Array(20)).reduce((s, b) => s + b.toString(16).padStart(2, '0'), '')}`;
    return this.address;
  }

  async disconnect(): Promise<void> {
    this.address = null;
  }

  async signMessage(message: string): Promise<string> {
    await new Promise((r) => setTimeout(r, 300));
    return `stub_sig_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  }

  getAddress() {
    return this.address;
  }
  isConnected() {
    return this.address !== null;
  }
}

export const walletAdapter: IWalletAdapter = new StubWalletAdapter();
