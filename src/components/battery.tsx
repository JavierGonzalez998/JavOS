import { useEffect, useState } from "react";
import { BatteryFull, BatteryCharging, BatteryMedium, BatteryLow, BatteryWarning } from "lucide-react";
export default function BatteryInfo() {
    const [batteryInfo, setBatteryInfo] = useState<{
        level: number;
        charging: boolean;
    }>({ level: 1, charging: false });

    useEffect(() => {
        let battery: any;

        async function loadBattery() {
            if ("getBattery" in navigator) {
                battery = await (navigator as any).getBattery();
                const update = () => {
                    setBatteryInfo({
                        level: battery.level,
                        charging: battery.charging,
                    });
                };
                update();

                // listeners
                battery.addEventListener("levelchange", update);
                battery.addEventListener("chargingchange", update);
            }
        }

        loadBattery();

        return () => {
            if (battery) {
                battery.removeEventListener("levelchange", () => { });
                battery.removeEventListener("chargingchange", () => { });
            }
        };
    }, []);
    return (
        <>
            {
                batteryInfo.charging && (
                    <BatteryCharging className="text-green-500 size-6" />
                )
            }
            {
                !batteryInfo.charging && (batteryInfo.level * 100) > 50 && (
                    <BatteryFull className="text-green-400 size-6" />
                )
            }
            {
                !batteryInfo.charging && ((batteryInfo.level * 100) <= 50 && (batteryInfo.level * 100) > 30) && (
                    <BatteryMedium className="text-green-700 size-6" />
                )
            }
            {
                !batteryInfo.charging && ((batteryInfo.level * 100) <= 30 && (batteryInfo.level * 100) > 10 ) && (
                    <BatteryLow className="text-red-500 size-6" />
                )
            }
            {
                !batteryInfo.charging && ((batteryInfo.level * 100) <= 10) && (
                    <BatteryWarning className="text-red-600 size-6" />
                )
            }
        </>
    )
}