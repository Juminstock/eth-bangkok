import { DynamicContextProvider, DynamicWidget } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

function Login() {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh'
            }}
        >
            <h1 className="bricolage_grotesque" style={{ margin: '5px' }}>Hello, there!</h1>
            <h1 className='bricolage_grotesque' style={{ margin: '5px' }}>Welcome to MetaIntent</h1>
            <DynamicContextProvider
                settings={{
                environmentId: '865c2fad-5f3a-4b3c-8d1c-62dad61f518d',
                walletConnectors: [ EthereumWalletConnectors ],
                }}>
                <DynamicWidget />
            </DynamicContextProvider>
        </div>
    )
}

export { Login };