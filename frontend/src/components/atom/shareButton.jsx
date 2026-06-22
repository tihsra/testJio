"use client"

import { toast } from "sonner";
import { Share2 } from "lucide-react";
import { Button } from "../ui/button";

export default function ShareButton(){

    const handleShare = ()=>{
        navigator.clipboard.writeText(window.location.href)
        .then(()=>{
            toast.success("URL copied to clipboard");
        })
        .catch(()=>{
            toast.error("Failed to copy URL");
        })
    }

    return <Button onClick={handleShare}>
        <Share2 className="w-4 h-4 mr-2"/>
        Share
    </Button>
}
