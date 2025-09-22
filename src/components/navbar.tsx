import { BatteryFull, WifiOff, Folder } from "lucide-react"
export default function Navbar(){
    return(
        <header className="min-w-full h-8 bg-primary shadow-custom">
            <div className="flex flex-row-reverse px-10 gap-5 items-center h-full">
                <BatteryFull className="text-white size-6"/>   
                <WifiOff className="text-white size-5"/>
                <Folder className="text-white size-5"/>
            </div>
        </header>
    )
}