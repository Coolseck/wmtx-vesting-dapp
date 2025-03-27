import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { WalletProvider } from "./utils/context/walletContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "./utils/lib/config.ts";

import { ApolloProvider } from "@apollo/client";
import client from "./utils/subgraph/apolloClient.ts";

// Initialize QueryClient directly
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 1000,
		},
	},
});


createRoot(document.getElementById("root")!).render(
	<WagmiProvider config={config}>
		<QueryClientProvider client={queryClient}>

			<Router>
				<WalletProvider>
					<ApolloProvider client={client}>
						<App />
					</ApolloProvider>
				</WalletProvider>
			</Router>
		</QueryClientProvider>
	</WagmiProvider>
);
