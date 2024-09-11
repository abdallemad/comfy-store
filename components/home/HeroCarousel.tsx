'use client'
import * as React from "react"
import Image from "next/image"
import hero1 from '@/public/images/hero1.jpg'
import hero2 from '@/public/images/hero2.jpg'
import hero3 from '@/public/images/hero3.jpg'
import hero4 from '@/public/images/hero4.jpg'
import hero5 from '@/public/images/hero5.jpg'
const images = [hero1,hero2,hero3,hero4,hero5]
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function CarouselDemo() {
  return (
    <div className="hidden lg:block">
      <Carousel>
        <CarouselContent>
          {images.map((img, index) => (

            <CarouselItem key={index}>
                <Card>
                  <CardContent className="p-2">
                    <Image src={img.src} alt="ss" width={692} height={692} className="object-cover w-full h-[24rem] rounded-md"/>
                  </CardContent>
                </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
