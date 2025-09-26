import { WifiOff, Folder } from "lucide-react"
import SystemInfo from "./info"
import * as React from 'react'
import BatteryInfo from "./battery";
export default function Navbar() {
    const [time, setTime] = React.useState<string>("");
    React.useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date()
            setTime(now.toLocaleString()); // actualiza con la hora del sistema
        }, 1000);

        return () => clearInterval(interval); // limpia el intervalo al desmontar
    }, []);
    return (
        <header className="min-w-full h-8 bg-primary shadow-custom">
            <div className="flex px-1 items-center w-full h-full relative">
                <div className="w-full flex flex-row-reverse px-1 items-center gap-3">
                    <BatteryInfo/>
                    <WifiOff className="text-white size-5" />
                    <Folder className="text-white size-5" />
                    <SystemInfo />
                    <p className="text-sm font-semibold text-white absolute left-1/2 -translate-x-1/2">
                        {time}
                    </p>
                </div>
            </div>

        </header>
    )
}