import Link from "next/link";
import { useEffect, useState } from "react";
import { getContract } from "../../utils/webprovider";
import { OptionList } from "../listVotingPoll/listVotingPoll";

export const VotingPollC = (votingPolls: { id: string, title: string }) => {
  
   
    const { id, title } = votingPolls;
    const [optionsu, setOptionsu] = useState([{ value: '', numVotes: 0, label: '' }])
    let optionList: OptionList[] = [];
    useEffect(() => {

        load();
    }, []);
 
    async function load() {

        let chainId = localStorage.getItem("chainId");
        if (chainId != "") {
            const votingPoll = await getContract();
            let optionsGood: OptionList = { value: 'good', numVotes: 0, label: 'Good' };
            let optionsBad: OptionList = { value: 'bad', numVotes: 0, label: 'Bad' };
            let optionsVeryGood: OptionList = { value: 'verygood', numVotes: 0, label: 'Very Good' };


            if (optionList.length == 0) {
                optionList.push(optionsGood);
                optionList.push(optionsBad);
                optionList.push(optionsVeryGood);
            }
            let optionGoodNumVotes = await votingPoll.methods.getVotingPollOptions(id, optionsGood.value).call();
            optionsGood.numVotes = Number(optionGoodNumVotes);

            let optionBadNumVotes = await votingPoll.methods.getVotingPollOptions(id, optionsBad.value).call();
            optionsBad.numVotes = Number(optionBadNumVotes);

            let optionVeryGoodNumVotes = await votingPoll.methods.getVotingPollOptions(id, optionsVeryGood.value).call();
            optionsVeryGood.numVotes = Number(optionVeryGoodNumVotes);

            setOptionsu(optionList);
        }


    }

    return  <div key = { id } className = "my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
               < article className = "overflow-hidden rounded-lg shadow-lg" >
                <Link href={{ pathname:`/voting-poll/${id}`
                }} >
        <img alt="Placeholder" className="block h-auto w-full" src={`https://picsum.photos/600/400/?random=${id}`} />
    </Link>

    <header className="flex items-center justify-between leading-tight p-2 md:p-4">
        <h1 className="text-lg">
            <a className="no-underline hover:underline text-black" href="#">
             Title: {title}
            </a>
        </h1>
     
    </header>

    <footer className="flex items-center justify-between leading-none p-2 md:p-4">
        <a className="flex items-center no-underline hover:underline text-black" href="#">
            <img alt="Placeholder" className="block rounded-full" src={`https://picsum.photos/32/32/?random=${id}`} />
           <p className="ml-2 text-sm">Options /</p><p className="ml-2 text-sm">Votes</p>
          
             {optionsu.map((option)=> 
                <><p className="ml-2 text-sm">
                  {option.label} 
                </p><p className="ml-2 text-sm">
                  {option.numVotes}
                    </p></>
           )} 
             
        
        </a>
        <a className="no-underline text-grey-darker hover:text-red-dark" href="#">
            <span className="hidden">Like</span>
            <i className="fa fa-heart"></i>
        </a>
    </footer>
</article >
</div>
}