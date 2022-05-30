import { useEffect, useState } from "react";

import { VotingPollC } from "../votingPoll/votingPollC";

import {getContract} from "../../utils/webprovider"
import Link from "next/link";

export class VotingPoll{
    id="";
    title="";
    options="";
    numVotes="";
}
export interface OptionList{
    value:string;
    numVotes:number
    label:string;
}
export const ListVotingPoll = (active:any) => {
   
    const [votingPollListed, setVotingPollListed] = useState(new Array<VotingPoll>());
    let votingPollList:Array<VotingPoll>= new Array<VotingPoll>();
    useEffect(() => {
       if(active){
        load();
    }
    }, []);
    
    
    async function load() {
      
   
            const votingPoll = await getContract();
            const votingPollcounter: string = await votingPoll.methods.votingPollCount().call();
            console.log(votingPollcounter);
            let getVotingPollF: Array<any> = new Array<any>();
            for (let i = 1; i <= Number(votingPollcounter); i++) {
             getVotingPollF[i]=  await votingPoll.methods.getVotingPollF(i).call();
              
            }
              
         
            getVotingPollF=  getVotingPollF.filter((el)=>{
              return  el!= null;
             });
             
            votingPollList= getListVotingPoll(getVotingPollF);
            setVotingPollListed(votingPollList);
   

    }

    return <div className="container my-12 mx-auto px-4 md:px-12">
             <Link href={{ pathname:"/create-votingpoll"
                            }}
                   >
                        <button className=" py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" type="submit"> Create New Voting Poll</button>
        </Link>
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
   
            {votingPollListed.map((votingPoll)=>(
     
                <VotingPollC   id={votingPoll.id} title={votingPoll.title}  ></VotingPollC>
            )) }

        </div>
    </div>
    

    function getListVotingPoll(getVotingPollF: string[]):Array<VotingPoll> {
        let votingPollList = new Array<VotingPoll>();
       getVotingPollF.forEach((element)=>{
           let votingPoll:VotingPoll= new VotingPoll();
           votingPoll.id=element[0];
           votingPoll.title=element[1];
           votingPoll.numVotes=element[3];
           votingPollList.push(votingPoll)
       });
        return votingPollList
    }
}