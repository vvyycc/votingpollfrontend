import type { NextPage } from 'next'
import { ListVotingPoll } from '../components/listVotingPoll/listVotingPoll';



import React, { useEffect, useState } from 'react';
import { setInterval } from 'timers';



const Home: NextPage =  () => {
    
    const [active,setActive] = useState(false);


   const interval= setInterval(() => {

    let chainIds=localStorage.getItem("chainId");
    if(chainIds!=null){ 
       
        setActive(true)
        clearInterval(interval);
    }
    else{
        setActive(false)
    }
    
    }, 2000)
  

  
  return (<> 
       {active ?<ListVotingPoll />:""}
      </>)

 
}

export default Home
