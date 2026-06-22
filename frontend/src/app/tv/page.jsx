import { API, ENDPOINTS } from "../../lib/api.js"
import BannerSection from "@/components/section/bannerSection.jsx";
import SectionNavigator from '@/components/section/sectionNavigator';
import CategoryNavigator from '@/components/section/categoryNavigator';

const dataList = [
  {
    name: "Action Tv",
    href: "actionTv",
    fetcher: async function(){
      const responseData = await API.get(ENDPOINTS.actionTv);
      const data = responseData?.data?.data?.results;
      return data;
    }
  },

  {
    name: "Comedy Tv",
    href: "comedyTv",
    fetcher: async function(){
      const responseData = await API.get(ENDPOINTS.comedyTv);
      const data = responseData?.data?.data?.results;
      return data;
    }
  },

  {
      name: "Mystery Tv",
      href: "mysteryTv",
      fetcher: async function(){
          const responseData = await API.get(ENDPOINTS.mysteryTv);
          const data = responseData?.data?.data?.results;
          return data;
        }
    },
    
    {
      name: "Drama Tv",
      href: "dramaTv",
      fetcher: async function(){
        const responseData = await API.get(ENDPOINTS.dramaTv);
        const data = responseData?.data?.data?.results;
        return data;
      }
    },

    {
      name: "Crime Tv",
      href: "crimeTv",
      fetcher: async function(){
        const responseData = await API.get(ENDPOINTS.crimeTv);
        const data = responseData?.data?.data?.results;
        return data;
      }
    },

];

const tvBannerDataFetcher = async function(){
  const responseData = await API.get(ENDPOINTS.nowPlaying);
  const data = responseData?.data?.data?.results;
  return data;
}

export default function Tv() {
  return (<>
      <SectionNavigator dataList={dataList}/>
      <BannerSection fetcher={tvBannerDataFetcher}></BannerSection>
        {dataList.map((element,index)=>{
          return <CategoryNavigator key={index} name={element.name} href={element.href} fetcher={element.fetcher}/>
        })
      }
      </>
  )
}
