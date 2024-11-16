import Link from 'next/link';
import { Button } from "@/components/ui/button"

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
            <h1 className='bricolage_grotesque'>Welcome to MetaIntents</h1>
            <Link href="/dashboard"><Button style={{ 
                margin: '50px', 
                backgroundColor: "#2E01DB", 
                color: "white"
            }}>Go to dashboard →</Button></Link>
        </div>
    )
}

export { Login };