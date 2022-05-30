import type { NextPage } from 'next'
import { ListVotingPoll } from '../components/listVotingPoll/listVotingPoll';



import React from 'react';



const Home: NextPage =  ({isActive}:any) => {
    

  
  return (<> 
       {isActive ?<ListVotingPoll active={isActive} />:""}
      </>)

 
}

export default Home
