import Link from "next/link.js"
import { Badge } from "../ui/badge.jsx"

export default function SectionNavigator({dataList}){

    return <div className="flex items-center justify-start w-full p-6 gap-4">
        {dataList.map((element)=>{
            return <Badge key={element.name} className="bg-white/15 px-3 py-2 h-full text-sm">
                <Link href={`#${element.href}`}>
                    {element.name}
                </Link>
            </Badge>
        })
    }
    </div>
}