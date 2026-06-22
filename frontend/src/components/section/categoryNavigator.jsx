import Image from "next/image";
import { Media, getWatchUrl } from "@/lib/api";
import { InboxIcon } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import Link from "next/link";

export default async function CategoryNavigator({fetcher,name,href}){
    return <div id={href} className="scroll-mt-24 flex flex-col justify-center items-start gap-2 px-5 mb-10">
        <h1 className="ml-5 font-bold text-2xl">{name}</h1>
        <CategoryContent fetcher={fetcher}/>
    </div>
}

async function CategoryContent({type, fetcher}){
    const requestedData = await fetcher();

    if(!requestedData||requestedData.length==0){
        return <div className="flex flex-col items-center justify-center w-full h-[300px] py-12">
            <InboxIcon 
                className="w-32 h-32 text-slate-400 mb-10"
                strokeWidth={1.2}
            />
            <p className="text-lg text-gray-500">No items found.</p>
        </div>
    }

    return <ScrollArea className="w-full overflow-hidden">
      <div className="flex w-max space-x-4 p-4">
        {requestedData.map((element) => (
          <Link 
            href={getWatchUrl(element.id, type, element?.poster_path)} 
            key={element.id}
            className="shrink-0"
          >
            <div className="overflow-hidden rounded-md">
              <Image
                src={Media(element?.poster_path)}
                alt={`${element?.title} poster`}
                className="aspect-3/4 rounded-2xl"
                width={295}
                height={350}
              />
            </div>
          </Link>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>    
}
