import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export default function Dashboard() {
    return (
        <div className="dashboard-container">
            <div className="section stat-card">
                <h1 className="title">Dashboard</h1>
                <h2>Total amount</h2>
                <p>1 $ETH</p>
            </div>
            <div className="section">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            <div className="section"><p>Section three</p></div>
            <div className="section"><p>Section four</p></div>
        </div>
    )
}