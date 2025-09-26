import { Info } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    getCpuInfo,
    getRamInfo,
    getGpuInfo,
    getOsInfo,
} from "tauri-plugin-hwinfo";

import * as React from 'react'
import { Loader } from "./ui/loader";

interface SysInfo {
    CPU: {
        manufacturer: string,
        model: string,
        maxFrequency: number,
        threads: number
    },

    RAM: {
        sizeMb: number
    },
    GPU: {
        manufacturer: string,
        model: string,
        vramMb: number,
        supportsCuda: boolean,
        supportsVulkan: boolean
    },
    OS: {
        name: string,
        version: string
    }
}

export default function SystemInfo() {
    const [sysData, setSysData] = React.useState<SysInfo | null>(null)
    const [loading, setLoading] = React.useState<boolean>(false)
    const handleFetchInfo = async () => {
        if (sysData) return
        setLoading(true);
        try {
            const cpu = await getCpuInfo();
            const ram = await getRamInfo();
            const gpu = await getGpuInfo();
            const os = await getOsInfo();
            setSysData({
                CPU: cpu,
                RAM: ram,
                GPU: gpu,
                OS: os
            })
        }catch(error){
            console.log("Error Fetching sys info: ", error)
        }finally{
            setLoading(false)
        }

    }

    const formatFrequency = (freq: number) => `${(freq / 1000).toFixed(2)} GHz`
    const formatRam = (sizeMb: number) => `${(sizeMb / 1024).toFixed(2)} GB`
    const formatVram = (vramMb: number) => `${(vramMb / 1024).toFixed(2)} GB`

    return (
        <Dialog>
            <DialogTrigger >
                <Info className="text-white size-5 cursor-pointer" />
            </DialogTrigger>
            <DialogContent onOpenAutoFocus={() => handleFetchInfo()} aria-describedby="System Information">
                <DialogHeader>
                    <DialogTitle>Información del sistema</DialogTitle>
                </DialogHeader>
                {loading ? (
                    <Loader
                        message="Cargando..."
                        size="lg"
                        className="py-8"
                    />
                ) : sysData && (
                    <div className="grid gap-4 max-h-96 overflow-y-auto">
                        {/* CPU Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <span className="text-blue-500">🔲</span>
                                    Procesador
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Fabricante:</span>
                                    <span className="font-medium">{sysData.CPU.manufacturer}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Modelo:</span>
                                    <span className="font-medium">{sysData.CPU.model}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Frecuencia máxima:</span>
                                    <span className="font-medium">{formatFrequency(sysData.CPU.maxFrequency)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Núcleos/Hilos:</span>
                                    <span className="font-medium">{sysData.CPU.threads}</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* RAM Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <span className="text-green-500">🧠</span>
                                    Memoria RAM
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Capacidad:</span>
                                    <span className="font-medium">{formatRam(sysData.RAM.sizeMb)}</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* GPU Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <span className="text-purple-500">🎮</span>
                                    Tarjeta Gráfica
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Fabricante:</span>
                                    <span className="font-medium">{sysData.GPU.manufacturer}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Modelo:</span>
                                    <span className="font-medium">{sysData.GPU.model}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">VRAM:</span>
                                    <span className="font-medium">{formatVram(sysData.GPU.vramMb)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">CUDA:</span>
                                    <span className="font-medium">{sysData.GPU.supportsCuda ? 'Sí' : 'No'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Vulkan:</span>
                                    <span className="font-medium">{sysData.GPU.supportsVulkan ? 'Sí' : 'No'}</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* OS Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <span className="text-orange-500">💻</span>
                                    Sistema Operativo
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Nombre:</span>
                                    <span className="font-medium">{sysData.OS.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Versión:</span>
                                    <span className="font-medium">{sysData.OS.version}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}