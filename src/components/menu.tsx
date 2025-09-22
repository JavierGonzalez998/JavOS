import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import imageMM from '@/assets/mm-standalone.png'
import { Button } from "./ui/button"
import { ExternalLink } from "lucide-react"
const items = [
    {
        title: "Archetype Misha Mansoor X",
        img: imageMM,
        desc: "Archetype: Misha Mansoor X es más que una ampliación de sus emblemáticos tonos. Es una exploración de lo inesperado, con efectos experimentales, amplificadores únicos y un conjunto de herramientas diseñado para músicos que comparten su inquieta curiosidad."

    }
]

export default function Menu() {
    return (
        <Carousel className="max-w-sm max-h-96">
            <CarouselContent>
                {
                    items.map((item, index) => (
                        <CarouselItem key={index}>
                            <div className="p-1">
                                <Card className="size-2/3 gap-1">
                                    <CardHeader className="flex justify-center items-center">
                                        <div className="w-2/4 h-3/4 object-cover">
                                            <img className="size-full" src={item.img}></img>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                                        <span className="text-xl font-semibold">{item.title}</span>
                                        <div className="divider"></div>
                                        <p className="text-sm font-light">{item.desc}</p>
                                    </CardContent>
                                    <CardFooter className="flex justify-center items-center h-10">
                                        <Button>
                                            <ExternalLink/>
                                            Abrir Plugin
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))
                }
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}