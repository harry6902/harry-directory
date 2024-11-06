import { client } from "@/sanity/lib/client"
import { STARTUP_BY_ID_QUERY, STARTUPS_BY_AUTHOR } from "@/sanity/lib/queries"
import StartupCard, { StartupCardType } from "./StartupCard"

const UserStartups =async ({id}:{id:string}) => {

  const startups = await client.fetch(STARTUPS_BY_AUTHOR,{id})
  return (
    <>
      {startups.length >0 ? startups.map((startup:StartupCardType)=>(
    <StartupCard key={startup._id}  post={startup}/>
   ))
  
  : (
    <p className="no-results">No posts yet</p>
  )}
    </>
  )
}

export default UserStartups
