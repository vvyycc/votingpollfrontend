import React from "react"

import { useWeb3React  } from '@web3-react/core'
import {Injected} from '../Wallet/connectors'

type Props = {
  children: JSX.Element,
  setActive:any
};
const Header =({children,setActive}:Props)=> {
  const { active, account, activate,deactivate,chainId } = useWeb3React();
 
 


  if(chainId!=null){
    
    localStorage.setItem("chainId",chainId.toString());
 
  
  }


  
     return <><header className="bg-cyan-500">


       <div className="items-baseline  mx-0 my-auto max-w-[640px] px-4 py-4 ">
         {(active) ?
           <button onClick={async () => {
            await deactivate();
             localStorage.clear();
             await setActive(false);
           } } className="px-4 py-2 w-80 rounded-md text-sm font-medium border-b-2 focus:outline-none focus:ring transition text-white bg-gray-500 border-gray-800 hover:bg-gray-600 active:bg-gray-700 focus:ring-gray-300" type="submit">Disconnect Wallet</button> :
           <button onClick={async ()=>{
            await activate(Injected);
            await setActive( true );
            } } className="px-4 py-2 w-80 rounded-md text-sm font-medium border-b-2 focus:outline-none focus:ring transition text-white bg-gray-500 border-gray-800 hover:bg-gray-600 active:bg-gray-700 focus:ring-gray-300" type="submit">Connect Wallet</button>}
         <div className="text-sm font-medium text-white ml-6 absolute top-6 left-[321px]">Account:</div> <div className="text-sm font-medium text-white ml-6 absolute top-6 left-96 "> {account}</div>
         <nav role="main" className="text-xl mt-0 text-right ml-[400px]">


         </nav>
       </div>
     </header><div>{children}</div></>
  

  
 
}

export default Header
