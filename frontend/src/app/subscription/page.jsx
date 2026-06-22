"use client"

import Image from "next/image";
import { toast } from "sonner";
import React, { useState } from "react";
import { API, ENDPOINTS } from "@/lib/api";
import { useRouter } from "next/navigation"
import { useRazorpay } from "react-razorpay";
import { useSelector, useDispatch } from "react-redux";
import SpecialOfferCard from "@/components/atom/offersCard";
import { updatePremiumUser } from "@/components/redux/slice/userSlice"

const offers = [
    {   
        id: "xy1",
        title: "Premium Monthly",
        features: [
            "Ad-Free (except sports & live)",
            "Includes all Premium content",
            "Any 1 device at a time (up to 1080p quality)",
            "Download and watch anytime"
        ],
        price: "29",
        originalPrice: "59",
        discountLabel: "51% OFF",
        duration: "1 Month"
    },
    {   
        id: "xy3",
        title: "Family",
        features: [
            "All features of Premium account",
            "Any 4 device at a time (up to Asli 4K quality)",
        ],
        price: "399",
        originalPrice: "599",
        discountLabel: "33% OFF",
        duration: "12 Months"
    }
]


export default function Subscription(){
    
    const router = useRouter();
    const dispatch = useDispatch();
    const {Razorpay} = useRazorpay();
    const [activeID,setActiveID] = useState("");
    const userData = useSelector((store)=>store.user);
 
    const handleSubscribeButton = async function(){

        if(activeID===""){
            toast.warning("Select a plan for moving forward");
            return;
        }
        
        if(!userData.isLoggedIn){
            toast.error("You must be Login in order the purchase");
            router.push("/login");
            return;
        }
        
        try{

            const updatePremiumRequest = await API.post(ENDPOINTS.createOrder,{
                email: userData.userObject.email,
                id: activeID,
            });
 
            const options = {
                key: process.env.NEXT_PUBLIC_KEY_ID ?? "",
                amount: updatePremiumRequest.data.amount,
                currency: "INR",
                name: "StreamVault Corporation",
                description: "Test StreamVault Corporation Transaction",
                order_id: updatePremiumRequest.data.orderId,
                handler: async function (response) {
                    try {
                        const updatePremium = await API.patch(ENDPOINTS.updatePremiumUser, {
                            email: userData.userObject.email,
                            receiptId: updatePremiumRequest.data.receiptId,
                            signature: response.razorpay_signature,
                            razorpay_payment_id: response.razorpay_payment_id

                        })
                        if (updatePremium.status === 200) {
                            toast.success("Premium access updated successfully")
                            dispatch(updatePremiumUser(true));
                        }
                    } catch (err) {
                        console.log(err.message)
                    }
                }
            }

            const rzPortal = new Razorpay(options);

            rzPortal.on("payment.failed", function (response) {
                toast("reason " + response.error.reason)
            })

            rzPortal.open();
        }
        catch(err){
            console.log(err.message);
        }
   
    }

    return <div className="w-full min-h-[calc(100vh-75px)]">
        <Image
            src = "/motu-patlu.png"
            alt = "Cool background"
            width={2880}
            height={1620}
            className="w-full h-[calc(100vh-75px)]"
        />
        <div className="mt-18.75 pt-8 md:pt-16 px-8 md:pl-16 absolute inset-0 h-150">
            <h1 className="md:text-4xl text-2xl  leading-none font-black md:text-12 mb-4 text-nowrap">
                        JioCinema Premium
            </h1>
            <p className="text-lg mb-8 w-[70%] text-wrap hidden md:block">
                Entertainment Redefined - The best of Hollywood, Before TV
                premieres, Blockbuster movies, Exclusive series, India biggest
                Kids & Family hub + 365 days of reality!
            </p>
            <div className="flex flex-col md:flex-row w-full md:gap-8 gap-8 mt-10">
                {offers.map((offer, index) => (
                    <SpecialOfferCard
                        key={index}
                        title={offer.title}
                        features={offer.features}
                        price={offer.price}
                        originalPrice={offer.originalPrice}
                        discountLabel={offer.discountLabel}
                        duration={offer.duration}
                        isActive={activeID === offer.id}
                        onClick={() => setActiveID(offer.id)}
                    />
                ))}
            </div>
                <button
                    className="bg-pink-600 p-3 md:mt-10 item-start flex font-medium rounded-lg ml-2 hover:bg-[#f578bb]"
                    onClick ={handleSubscribeButton}
                >
                Continue & Pay
                </button>
        </div>
    </div>

}