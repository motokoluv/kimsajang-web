import '../styles/globals.css'
import type {AppProps} from 'next/app'
import React from "react";
import {QueryClient, QueryClientProvider,} from 'react-query'
import {SessionProvider} from "next-auth/react";

const queryClient = new QueryClient();

export default function MyApp({Component, pageProps: {session, ...pageProps}}: AppProps) {
    return (
        <SessionProvider session={session}>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
            </QueryClientProvider>
        </SessionProvider>
    )
}
