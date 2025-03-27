import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia } from "wagmi/chains";

const projectId = import.meta.env.VITE_PROJECT_ID;

export const config = getDefaultConfig({
  appName: "wmt",
  projectId,
  chains: [sepolia],
  ssr: true,
});