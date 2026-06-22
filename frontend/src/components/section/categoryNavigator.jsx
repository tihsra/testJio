import Image from "next/image";
import { Box } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Media } from "@/lib/api";

export default async function CategoryNavigator({fetcher,name,href}){
    return <div id={href} className="scroll-mt-24 flex flex-col justify-center items-start gap-2 px-5 mb-10">
        <h1 className="ml-5 font-bold text-2xl">{name}</h1>
        <CategoryContent fetcher={fetcher}/>
    </div>
}

async function CategoryContent({fetcher}){
    const requestedData = await fetcher();

    if(!requestedData||requestedData.length==0){
        return <div>
            <Box size={40} strokeWidth={1.5} />
        </div>
    }

    return <ScrollArea className="w-full overflow-hidden">
      <div className="flex w-max space-x-4 p-4">
        {requestedData.map((element,index) => (
          <figure key={index} className="shrink-0">
            <div className="overflow-hidden rounded-md">
              <Image
                src={Media(element?.poster_path)}
                alt={`${element?.title} poster`}
                className="aspect-3/4 rounded-2xl"
                width={295}
                height={350}
              />
            </div>
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>    
} 