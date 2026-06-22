import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { Skeleton } from "../atom/skeleton";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { Media, getWatchUrl } from "@/lib/api";
import { Box } from "lucide-react";

function BannerSection({fetcher}) {
    return <Suspense fallback={<BannerSectionFallback/>}>
        <BannerSectionData fetcher={fetcher}/>
    </Suspense>

}

async function BannerSectionData({fetcher}) {
    const data = await fetcher().catch(()=>null);
    if(!data||data.length==0){
        return <>
            <Box size={40} strokeWidth={1.5}/>
        </>
    }

    return <Carousel opts={{ align: "start", loop: true}} className="px-10 mb-10">

      <CarouselContent className="h-137.5">
        {data.map((element)=>{
            return <CarouselItem className="w-full max-w-115 h-137.5" key={element?.id}>
            <Link href={getWatchUrl(element?.id,element?.media_type,element?.poster_path)}>
            <Image
                src = {Media(element?.poster_path)}
                alt = {`${element?.title} poster`}
                className="rounded-[10px] object-cover w-full h-full"
                width={460}
                height={550}
                priority
            />
            </Link>
        </CarouselItem>
            })
        }
    </CarouselContent>
    
    <CarouselPrevious className="w-12 h-12 left-14 z-10 bg-white/15 hover:bg-white/30 backdrop-blur-md border-white/30 text-white"/>
    <CarouselNext className="w-12 h-12 right-14 z-10 bg-white/15 hover:bg-white/30 backdrop-blur-md border-white/30 text-white"/>

    </Carousel>
}

function BannerSectionFallback() {
  return (
    <div className="flex items-center justify-center">
      <Skeleton className="h-137.5 w-115 rounded-lg" />
      <Skeleton className="h-137.5 w-115 rounded-lg" />
      <Skeleton className="h-137.5 w-115 rounded-lg" />
      <Skeleton className="h-137.5 w-115 rounded-lg" />
    </div>
  )

}
export default BannerSection