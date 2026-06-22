import Image from 'next/image';
import { helpAndPrivacy, connectWithUs, downloadApp} from '../../lib/externalLinks';

export default function SiteFooter() {
  return (<> <div className="
        bg-gray-900
          fixed-b
          flex flex-col md:flex-row
          justify-between
          items-center md:items-start
          gap-10
          px-5 md:px-10
          py-5">

      <div className="flex flex-col text-center md:text-left">
        <div>
          <h1 className="font-medium text-[1.2rem] ">SUPPORT</h1>
        </div>
        <div className="flex flex-col mt-2 text-[1rem]">
          {
            helpAndPrivacy.map((element,index)=>{
              return <a href={element.link} key={index} target='_blank'>{element.name}</a>
            })
          }
        </div>
      </div>

      <div className="flex flex-col ">
        <div>
          <h1 className="font-medium text-[1.2rem] text-center mb-8">CONNECT WITH US</h1>
        </div>
        <div className="flex mt-2 text-[1rem] justify-around">
          {connectWithUs.map((element)=>{
              return <a key = {element.name} href={element.link} target='_blank'>
                <Image
                src = {element.source}
                alt = {element.name}
                width = {40}
                height = {40}
                className="md:w-15 md:h-15"
              />
            </a>
            })}
        </div>
        

      </div>

      <div className="flex flex-col ">
        <div>
          <h1 className="font-medium text-[1.2rem] text-center mb-8">DOWNLOAD THE APP</h1>
        </div>
        <div className="flex gap-2 mt-2 text-[1rem] justify-around">
          {downloadApp.map((element)=>{
              return <a key = {element.name} href={element.link} target='_blank'>
                <Image
                src = {element.source}
                alt = {element.name}
                width = {100}
                height = {30}
                className="md:w-30"
              />
            </a>
            })}
          
        </div>
      </div>
    </div>

    <div className="flex flex-col md:flex-row
        justify-between
        items-center
        gap-3
        bg-gray-700
        p-5">
        <p className="text-center md:text-left text-sm">
          Copyright © 2026 tihsra Media PVT LTD. All rights reserved.</p>
        <Image
          src = '/jio-logo.png'
          alt = "Jio-Cinema-Logo"
          width={50}
          height={50}
        />
    </div>
  </>
  )
}
