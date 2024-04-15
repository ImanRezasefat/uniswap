// global.d.ts or types/index.d.ts
declare global {
  interface Window {
    ethereum: {
      isMetaMask: boolean;
      request: (...args: any[]) => Promise<void>;
      // Add other properties and methods as needed
    };
  }
}
