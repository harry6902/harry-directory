import React from 'react'
import Ping from './Ping'
import { client } from '@/sanity/lib/client'
import { START_UP_VIEWS_QUERY } from '@/sanity/lib/queries'
import { writeClient } from '@/sanity/lib/write-client'
import { unstable_after as after} from 'next/server'

const View = async({id}:{id:string}) => {

    const {views: totalViews}= await client.withConfig({useCdn:false}).fetch(START_UP_VIEWS_QUERY,{id})

    
    after(async()=> await writeClient.patch(id).set({views:totalViews +1}).commit());
  return (
    <div className='view-container'>
        <div className='absolute -top-2 -right-2'>
            <Ping />
        </div>
        <p className='view-text'>
           { totalViews ?
            <span className='font-black'>Views:{totalViews}</span> :(
              <span className='font-black'>Views:0</span>
            )
            

          }

        </p>
      
    </div>
  )
}

export default View
