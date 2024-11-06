import Image from "next/image";
import SearchForm from "../Components/SearchForm";
import StartupCard from "../Components/StartupCard";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { StartupCardType } from "../Components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({searchParams}:{searchParams: Promise<{query?:string}>}) {
  const query = (await searchParams).query;

  const session= await auth();
  console.log(session?.id)
  
    const params= {search:query || null};
   const {data: posts}= await sanityFetch({query:STARTUPS_QUERY,params})
  return (
  <>
  <section className="pink_container">
  <h1 className="heading">Pitch Your Startup, <br/> Connect with Entreprenuers</h1>
  <p className="sub-heading !max-w-3xl">

    Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
  </p>
   <SearchForm query={query} />

  </section>

  <section className="section_container">
    <p className="text-30-semibold">

      {query ? `Search Results for "${query}"` : 'All StaryUps'}

    </p>
    <ul className="mt-7 card_grid">
      {
        posts?.length >0 ? (
          posts.map((post: StartupCardType ,index: number)=>(
             <StartupCard key={post?._id} post={post}  /> 
          ))

        ):(
          <p className="no-results">No startUps found</p>
        )
      }

    </ul>

  </section>
  <SanityLive />
  </>
  );
}
