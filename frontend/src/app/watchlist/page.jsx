"use client"

import { Lock } from "lucide-react";
import { useSelector } from "react-redux";

export default function WatchList(){
    const { isLoggedIn } = useSelector((store) => store.user);

    if(!isLoggedIn){
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-75px)] gap-4 text-gray-400">
                <Lock size={48} strokeWidth={1.5} />
                <p>Login to view your watchlist</p>
            </div>
        )
    }

    return <h1 className="text-2xl font-medium">This is your watchlist</h1>
}
