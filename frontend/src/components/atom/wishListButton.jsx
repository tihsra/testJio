"use client"

import { toast } from "sonner";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { API, ENDPOINTS } from "@/lib/api";

export default function WishListButton({wishlist}){

    const userData = useSelector((store)=>store.user);
    const [loading,setLoading] = useState(false);

    if(!userData.isLoggedIn){
        return <></>;
    }

    const handleAddToWishlist = async ()=>{
        try{
            setLoading(true);
            const response = await API.post(ENDPOINTS.addToWishlist,wishlist);
            if(response.status===200){
                toast.success("Added to watchlist");
            }
        }catch(err){
            toast.error(err?.response?.data?.message||"Could not add to watchlist");
        }finally{
            setLoading(false);
        }
    }

    return <Button onClick={handleAddToWishlist} className="bg-pink-600 hover:bg-[rgb(215,64,99)]">
        <Plus className="w-4 h-4 mr-2"/>
        {loading?"Adding...":"Watchlist"}
    </Button>
}
