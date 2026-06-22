"use client"

import Image from "next/image";
import { toast } from "sonner";
import { useState } from "react"
import LinkFunction from "next/link";
import { Button } from "../ui/button";
import { API , ENDPOINTS } from "@/lib/api";
import { useDispatch, useSelector } from "react-redux";
import { updateLoggedOut } from "../redux/slice/userSlice"; 
import { navigationLinks } from '../../lib/navigationLinks.js'
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet"
import { ExternalLink, ChevronRight, UserPlus } from 'lucide-react'

export default function ProfileSheet(){

  const dispatch = useDispatch();
  const close = () => setOpen(false)
  const [open, setOpen] = useState(false)
  const userData = useSelector((store)=>store.user);

  const handleLogoutRequest = async ()=>{

    try{

      const response = await API.get(ENDPOINTS.logout);
      console.log(response);

      if(response.data.status==="success"){
        dispatch(updateLoggedOut());
        toast.success("Successfully logged out");
      }
      else{
        toast.error("Logout request Failed");
      }
    }
    catch(err){
      toast.error(err.message);
    }
  }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild >
              <Button className="flex items-center">
                <Image
                  src="/profile.avif"
                  alt="Profile-Photo"
                  width={56}
                  height={40}
                  className="w-10 md:w-14 h-auto"
                />
              </Button>
            </SheetTrigger>

            <SheetContent className="bg-black">
              <div className="flex flex-col gap-10 h-full w-full p-6">

                <div className="flex flex-col items-center bg-[rgba(51,65,85,0.3)] rounded-[10px] h-[20%] mt-25 gap-2">

                  <Image src="/profile.avif" alt="Profile-Photo" width={100} height={100} className="-mt-12.5" />

                  <p>{(userData.isLoggedIn)?userData.userObject.name:"Guest"}</p>

                  <Button className="bg-pink-600 rounded-4xl h-12 w-20 mt-4 font-medium text-[1rem]">

                    <LinkFunction href={(userData.isLoggedIn)?'/':'/login'} onClick={()=>{
                      setOpen(false);
                      if(userData.isLoggedIn){
                        handleLogoutRequest();
                      }}
                      }>{(userData.isLoggedIn)?"Logout":"Login"}</LinkFunction>

                  </Button>

                </div>

                <div className="mt-5 mb-5 items-center gap-10">
                  <LinkFunction href="/subscription" onClick={close} className="flex justify-between px-2 py-3">
                    Subscription
                    <UserPlus strokeWidth={1}/>
                  </LinkFunction>

                  <div className="flex flex-col mt-4 border-b border-t border-gray-600">
                     {navigationLinks.map((element)=>(
                        <LinkFunction key={element.href} href={element.href} onClick={close} className="flex justify-between px-2 py-3">
                            {element.name}
                            <ExternalLink strokeWidth={1}/>
                        </LinkFunction>
                    ))}
                  </div>

                  <LinkFunction href="https://help.hotstar.com/in/en/support/home" target="_blank" onClick={close} className="flex justify-between px-2 py-3 mt-4">
                    Help and Legal
                    <ChevronRight strokeWidth={1} />
                  </LinkFunction>
                </div>
              </div>
            </SheetContent>
        </Sheet>
    )
}