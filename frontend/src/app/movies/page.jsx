import { API, ENDPOINTS } from "../../lib/api.js"
import BannerSection from "@/components/section/bannerSection.jsx";
import SectionNavigator from '@/components/section/sectionNavigator';
import CategoryNavigator from '@/components/section/categoryNavigator';

const dataList = [
  {
    name: "Action Movies",
    href: "actionMovies",
    fetcher: async function(){
      const responseData = await API.get(ENDPOINTS.actionMovies);
      const data = responseData?.data?.data?.results;
      return data;
    }
  },

  {
    name: "Comedy Movies",
    href: "comedyMovies",
    fetcher: async function(){
      const responseData = await API.get(ENDPOINTS.comedyMovies);
      const data = responseData?.data?.data?.results;
      return data;
    }
  },

  {
      name: "Horror Movies",
      href: "horrorMovies",
      fetcher: async function(){
          const responseData = await API.get(ENDPOINTS.horrorMovies);
          const data = responseData?.data?.data?.results;
          return data;
        }
    },
    
    {
      name: "Romance Movies",
      href: "romanceMovies",
      fetcher: async function(){
        const responseData = await API.get(ENDPOINTS.romanceMovies);
        const data = responseData?.data?.data?.results;
        return data;
      }
    },

    {
      name: "Anime Movies",
      href: "animeMovies",
      fetcher: async function(){
        const responseData = await API.get(ENDPOINTS.animeMovies);
        const data = responseData?.data?.data?.results;
        return data;
      }
    },

];

const moviesBannerDataFetcher = async function(){
  const responseData = await API.get(ENDPOINTS.nowPlaying);
  const data = responseData?.data?.data?.results;
  return data;
}

export default function Movies() {
  return (<>
      <SectionNavigator dataList={dataList}/>
      <BannerSection fetcher={moviesBannerDataFetcher}></BannerSection>
        {dataList.map((element,index)=>{
          return <CategoryNavigator type="movies" key={index} name={element.name} href={element.href} fetcher={element.fetcher}/>
        })
      }
      </>
  )
}
