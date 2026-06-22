"use client"

import Link from "next/link";
import Image from "next/image"
import { Badge } from "../ui/badge"
import ProfileSheet from "./profileSheet";
import { usePathname } from "next/navigation";
import { navigationLinks } from "../../lib/navigationLinks.js"

/***
 * 1) Link is Next equivalent for a href
 * It is faster and 
 * Doesnot relaoad full page like anchor does
 * 
 * 2) Use internal link -> Link
 * For external link -> a
 * 
 * 3) Image tag is similar optimized component from next
 * 
 * 4) Use min-w-0 for flex items as these increase size to fit the content
 * inside this tells them they are allowed to shrink
 * 
 **/

export default function NavigationBar(){

  const currentPathKey = usePathname().split('/')[1];

    return <>
        <header className="bg-black sticky w-full top-0 z-50 flex flex-wrap items-center h-18.75 box-border border-b-2 border-gray-700 font-sans">
            <div className="flex gap-6 text-gray-400 pl-2">
                <Link href ="/">
                    <Image
                    src="/logo.svg"
                    alt="StreamVault-Logo"
                    width={136}
                    height={36}
                    className="w-24 md:w-32 lg:w-36 h-auto"
                    />
                </Link>

                <Link href = "/subscription">
                    <Badge className="text-[rgb(193,163,98)]
                            border border-[rgb(193,163,98)]
                            bg-black
                            gap-2
                            font-medium
                            h-7 md:h-8.5
                            w-auto md:w-[151.2px]
                            text-sm md:text-base
                            px-2 md:px-3">
                        <Image
                            src="/crown.svg"
                            alt="Crown-Logo"
                            width={15}
                            height={15}
                        />
                      Go Premium</Badge>
                </Link>

            </div>

            <div className="hidden md:flex gap-6 text-gray-400 pl-5">
              {navigationLinks.map((element) => {
                return <Link key= {element.key} href={element.href} className={`pb-2.5 border-b-2 border-black hover:text-white ${(currentPathKey==element.key)?"text-white border-pink-500":""}`}
                >
                  {element.name}</Link>   
              })}
            </div>

            <div className="flex ml-auto gap-5 items-center">
              <div
                className="
                  hidden md:flex items-center
                  h-9.5 w-40 md:w-55
                  rounded-full
                  border border-gray-600
                  bg-zinc-900
                  px-3
                  gap-2
                "
              >
                <Image
                  src="/search.svg"
                  alt="Search"
                  width={18}
                  height={18}
                />

                <input
                  type="text"
                  placeholder="Search..."
                  className="
                    flex
                    min-w-0
                    bg-transparent
                    text-sm
                    text-white
                    placeholder:text-gray-400
                    outline-none
                  "
                />
              </div>
              <ProfileSheet/>

            </div>
        </header>
    
    
    </>
    
}