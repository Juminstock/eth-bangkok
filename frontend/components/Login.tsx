import Link from 'next/link';

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
            <Link href="/dashboard"><button style={{ margin: '50px' }}>Go to dashboard →</button></Link>
        </div>
    )
}

export { Login };  