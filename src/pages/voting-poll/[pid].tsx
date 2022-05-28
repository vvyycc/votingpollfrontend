import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {getContract,getCurrentAccount} from '../../utils/webprovider'
import {OptionList, VotingPoll} from '../../components/listVotingPoll/listVotingPoll';
import Select from 'react-select'
import Link from 'next/link';
const VotingPollPage: NextPage= () => {
  const [vote,setVote]=useState(1);
  const [option,setOption]=useState("");
  const [votingPoll,setVotingPoll]= useState(new VotingPoll());
  const [optionsu,setOptionsu] = useState([{value:'',numVotes:0,label:''}]);
  const [active, setActive] = useState(false);
  let optionList:OptionList[]=[];
  const router = useRouter()
  const { pid }= router.query
  let votingPollModel = new VotingPoll();
  const options = [
    { value: 'good', label: 'Good' },
    { value: 'bad', label: 'Bad' },
    { value: 'verygood', label: 'Very good' }
  ]

  setInterval(() => {

    let chainIds = localStorage.getItem("chainId");
    if (chainIds != null) {

        setActive(true)
    }
    else {
        setActive(false)
    }

}, 2000)
  useEffect(() => {
       
    load();
  }, []);
 
  async function doVote(){
    const votingPollContract = await getContract();
    let currentAccount:string= await getCurrentAccount()
 

    votingPollContract.methods.vote(pid,option).send({from: currentAccount})
    .then((receipt:string)=>{
          console.log(receipt);
          votingPollContract.methods.votesAvailable().call({from: currentAccount}).then( async (result:any)=>{
           setVote(Number(result));
           await getOptionsList(votingPollContract);
       }
       );
    });
  }
  const getOption=(e:any)=>{
      setOption(e.value);
  }

 
 async function load() { 
    let currentAccount:string= await getCurrentAccount()
    const votingPollContract = await getContract();
    await getOptionsList(votingPollContract);

    await votingPollData(votingPollContract);
   
     votingPollContract.methods.votesAvailable().call({from: currentAccount}).then( async (result:any)=>{
      setVote(Number(result));
       await votingPollData(votingPollContract)
  }
  );
  
  }
   return (
   <>{active ? <div key={pid?.toString()} className="grid grid-cols-2">
       <div  className='absolute float-right top-[90px] left-[60px]'> <Link href="/">
                    <button className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'> Home</button>
                </Link></div>
   <div  className="my-1 col-span-1 mx-10 px-1 w-full md:w-1/2 lg:my-40 lg:px-4 lg:w-full">

<article className="overflow-hidden rounded-lg shadow-lg">

              
        <img alt="Placeholder" className="block h-auto w-full" src={`https://picsum.photos/600/400/?random=${pid}`} />

    <header className="flex items-center justify-between leading-tight p-2 md:p-4">
        <h1 className="text-lg">
            <a className="no-underline hover:underline text-black" href="#">
             Title: {votingPoll.title} 
            </a>
        </h1>
     
    </header>

    <footer className="flex items-center justify-between leading-none p-2 md:p-4">
        <a className="flex items-center no-underline hover:underline text-black" href="#">
            <img alt="Placeholder" className="block rounded-full" src={`https://picsum.photos/32/32/?random=${pid}`} />
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

</article>

</div>

   <div className='col-span-1'id="form-new-movie">
   <div className="mx-[50px] my-[160px] shadow overflow-hidden border-b border-gray-200 sm:rounded-lg h-[310px] w-[700px] bg-gray-600 ">
       <div className="px-4 py-5 space-y-6 sm:p-6">
          { vote?
           <><div className="mb-12">
               <h1 className="text-2xl text-white mb-3">Vote!!</h1>
             </div><div className="grid grid-cols-6 gap-6">

                 <div className="col-span-6 sm:col-span-3">
                   <label htmlFor="coverUrl" className="block text-sm text-white font-medium">Options</label>
                   <Select onChange={getOption}  className="mt-2 z-10 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 border p-2 rounded-md" options={options} />
                 </div>
               </div></>:
               <><div className="mb-12">
                 <h1 className="text-2xl text-white mb-3">You don´t have vote :(</h1>
               </div></> 
            }

       </div>
       <div className="px-4 py-3 text-right sm:px-6">
         
           {vote? <button type="submit" onClick={doVote}  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"> Vote</button>  :""}
       </div>
   </div>
</div>

</div>:""}</>
  )

  async function getOptionsList(votingPollContract:any) {
    let optionsGood: OptionList = { value: 'good', numVotes: 0, label: 'Good' };
    let optionsBad: OptionList = { value: 'bad', numVotes: 0, label: 'Bad' };
    let optionsVeryGood: OptionList = { value: 'verygood', numVotes: 0, label: 'Very Good' };
    if (optionList.length == 0) {
      optionList.push(optionsGood);
      optionList.push(optionsBad);
      optionList.push(optionsVeryGood);
    }
    let optionGoodNumVotes = await votingPollContract.methods.getVotingPollOptions(pid, optionsGood.value).call();
    optionsGood.numVotes = Number(optionGoodNumVotes);
    let optionBadNumVotes = await votingPollContract.methods.getVotingPollOptions(pid, optionsBad.value).call();
    optionsBad.numVotes = Number(optionBadNumVotes);
    let optionVeryGoodNumVotes = await votingPollContract.methods.getVotingPollOptions(pid, optionsVeryGood.value).call();
    optionsVeryGood.numVotes = Number(optionVeryGoodNumVotes);
    setOptionsu(optionList);
  }

  async function votingPollData(votingPollContract:any) {
    let votingPoll = await votingPollContract.methods.getVotingPollF(pid).call();

    getVotingPoll(votingPollModel, votingPoll);
  }

  function getVotingPoll(votingPollModel: VotingPoll, votingPoll: any) {
    votingPollModel.id = votingPoll[0];
    votingPollModel.title = votingPoll[1];
    votingPollModel.numVotes = votingPoll[3];
    setVotingPoll(votingPollModel);
  }
}

export default VotingPollPage;