import { API, ENDPOINTS } from "../lib/api.js";
import BannerSection from "@/components/section/bannerSection.jsx";
import SectionNavigator from '@/components/section/sectionNavigator';
import CategoryNavigator from '@/components/section/categoryNavigator';


const dataList = [
  {
    name: "Trending",
    href: "trending",
    fetcher: async function(){
      const responseData = await API.get(ENDPOINTS.trending);
      const data = responseData?.data?.data?.results;
      return data;
    }
  },

  {
    name: "Popular",
    href: "popular",
    fetcher: async function(){
      const responseData = await API.get(ENDPOINTS.popular);
      const data = responseData?.data?.data?.results;
      return data;
    }
  },

  {
    name: "TopRated",
    href: "topRated",
    fetcher: async function(){
      const responseData = await API.get(ENDPOINTS.topRated);
      const data = responseData?.data?.data?.results;
      return data;
    }
  },

  {
    name: "Upcoming",
    href: "upcoming",
    fetcher: async function(){
      const responseData = await API.get(ENDPOINTS.upcoming);
      const data = responseData?.data?.data?.results;
      return data;
    }
  },

];

const homeBannerDataFetcher = async function(){
  const responseData = await API.get(ENDPOINTS.nowPlaying);
  const data = responseData?.data?.data?.results;
  return data;
}

export default function Home() {

  return (<>
      <SectionNavigator dataList={dataList}/>
      <BannerSection fetcher={homeBannerDataFetcher}></BannerSection>
        {dataList.map((element,index)=>{
          return <CategoryNavigator key={index} name={element.name} href={element.href} fetcher={element.fetcher}/>
        })
      }
      </>
  )
}
