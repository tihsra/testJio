import Link from "next/link";
import { Film } from "lucide-react";
import { API, ENDPOINTS } from "@/lib/api";
import { buttonVariants } from "@/components/ui/button";
import ShareButton from "@/components/atom/shareButton";
import WishListButton from "@/components/atom/wishListButton";

export default async function Watch({searchParams}){

    const { id, poster_path } = await searchParams;

    const responseData = await API.get(ENDPOINTS.getTvShowsDetails(id)).catch(()=>null);
    const details = responseData?.data?.data?.results?.[0];

    return <div className="mt-20">
        {details ? (<>
            <iframe
                className="w-full aspect-video lg:h-[78vh]"
                src={`https://www.youtube.com/embed/${details?.key}`}
            />
            <div className="flex flex-wrap gap-4 px-4 lg:px-10 py-8 items-center">
                <h1 className="text-2xl font-bold">{details?.name}</h1>
                <WishListButton
                    wishlist={{
                        id: id,
                        name: details?.name,
                        poster_path: poster_path,
                        media_type: "tv"
                    }}
                />
                <ShareButton/>
            </div>
        </>):(
            <div className="w-full h-[60vh] flex flex-col gap-4 items-center justify-center text-slate-400">
                <Film className="w-25 h-25"/>
                <p>Uh Oh! Video is unavailable.</p>
                <Link href="/" className={buttonVariants()}>Take me Home</Link>
            </div>
        )}
    </div>
}
