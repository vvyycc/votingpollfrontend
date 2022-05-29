import type { NextPage } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { getContract, getCurrentAccount } from '../utils/webprovider'
const CreateVotingPoll = ({isActive}:any) => {
  

   
    const [vote, setVote] = useState(1);
    const [option,setOption]=useState("");
    const [title,setTitle]=useState("");
    const options = [
        { value: 'good', label: 'Good' },
        { value: 'bad', label: 'Bad' },
        { value: 'verygood', label: 'Very good' }
    ]
    useEffect(() => {
      
        load();
    }, []);

    async function createVotingPoll(){
        const votingPollContract = await getContract();
        let currentAccount:string= await getCurrentAccount()
    
     
        votingPollContract.methods.createVotingPoll(title,currentAccount,option).send({from: currentAccount})
        .then((receipt:string)=>{
              console.log(receipt);
              votingPollContract.methods.votesAvailable().call({from: currentAccount}).then( (result:any)=>{
                console.log(result);
                setVote(Number(result));
           }
           );
        });
      }
    const getOption=(e:any)=>{
        setOption(e.value);
    }
 
    async function load() {
        let currentAccount: string = await getCurrentAccount()
        const votingPollContract = await getContract();


        votingPollContract.methods.votesAvailable().call({ from: currentAccount }).then(async (result: any) => {
            console.log(result);
            setVote(Number(result));
        }
        );
        
    }

    return (
        <>
           {isActive? <div x-cloak className="w-3/5 mx-auto mt-20 mb-10">
                <Link href="/">
                    <button className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'> Home</button>
                </Link>
                <div className="mb-12">
                    <h1 className="text-4xl mb-6"> Create a VotingPoll</h1>
                    <div>
                        <p>
                        If you create a VotingPoll you won´t vote after that, because you vote with create as well.
                            <br />
                        </p>
                    </div>
                </div>

                <div className="flex flex-col mb-10">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Options</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"># Votes</th>
                                            <th scope="col" className="relative px-6 py-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody id="movies" className="bg-white divide-y divide-gray-200" />
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="form-new-movie">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg h-[310px]">
                        {vote ? <div className="px-4 py-5 bg-white space-y-6 sm:p-6">

                            <div className="mb-12">
                                <h1 className="text-2xl mb-3">New Voting Poll</h1>
                            </div>

                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="title" className="block text-sm font-medium">title</label>
                                    <input required onChange={event => setTitle(event.target.value)} type="text" name="title" id="title" className="mt-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 border p-2 rounded-md" />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="coverUrl" className="block text-sm font-medium">Options</label>
                                    <Select onChange={getOption}  className="mt-2 z-10 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 border p-2 rounded-md" options={options} />
                                </div>
                            </div>
                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button  onClick={createVotingPoll} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                    Add Voting Poll
                                </button>
                            </div>
                        </div> :
                            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">

                                <div className="mb-12">
                                         <h1 className="text-2xl mb-3">You can´t create VotingPoll because you have voted</h1>
                                </div>

                            </div>}

                    </div>
                </div>
            </div>:""}
        </>)
}
export default CreateVotingPoll;