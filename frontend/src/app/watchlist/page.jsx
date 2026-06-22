"use client"

import Link from "next/link";
import Image from "next/image";
import { Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API, ENDPOINTS, Media, getWatchUrl } from "@/lib/api";

export default function WatchList(){
    const { isLoggedIn } = useSelector((store) => store.user);
    const [watchlistData,setWatchlistData] = useState([]);

    useEffect(()=>{
        const fetchData = async ()=>{
            if(isLoggedIn){
                try{
                    const response = await API.get(ENDPOINTS.getWishlist);
                    setWatchlistData(response.data.data);
                }catch(err){
                    setWatchlistData([]);
                }
            }
        }
        fetchData();
    },[isLoggedIn]);

    if(!isLoggedIn){
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-75px)] gap-4 text-gray-400">
                <Lock size={48} strokeWidth={1.5} />
                <p>Login to view your watchlist</p>
            </div>
        )
    }

    return <div className="min-h-[calc(100vh-75px)] px-8 py-10">
        <h1 className="font-bold text-2xl mb-6">Watchlist</h1>
        {(watchlistData&&watchlistData.length>0)?(
            <div className="flex flex-wrap gap-4">
                {watchlistData.map((element,index)=>(
                    <Link href={getWatchUrl(element?.id,element?.media_type,element?.poster_path)} key={index}>
                        <Image
                            src={Media(element?.poster_path)}
                            alt={`${element?.name} poster`}
                            width={200}
                            height={300}
                            className="w-[200px] h-[300px] rounded-lg object-cover"
                        />
                    </Link>
                ))}
            </div>
        ):(
            <p className="text-gray-400">No items in your watchlist yet.</p>
        )}
    </div>
}
