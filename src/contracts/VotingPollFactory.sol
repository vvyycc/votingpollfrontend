//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
 import "./VotingPoll.sol";

 contract VotingFactory{
       uint public constant MAX_VOTES_PER_VOTER = 1;
         event Voted ();
        event NewVotingPoll();

    VotingPoll votingPoll;
  
    mapping(uint => VotingPoll) public votingPolls;
    mapping(uint => uint) private votingCountByVotingPoll;
    mapping(address => uint) public votes_by_address;
    uint public votingPollCount;

    constructor(){
        votingPollCount=0;
    }
    function createVotingPoll(string memory title,address voter, string memory options) external {
        votingPollCount++;
        votingPoll = new VotingPoll(title,voter,votingPollCount);
        votingPolls[votingPollCount]=votingPoll;
        vote(votingPollCount,options);

        emit NewVotingPoll();

    }

      function vote(uint _votingPollID, string memory options) public {
    require(votes_by_address[msg.sender] < MAX_VOTES_PER_VOTER, "Voter has no votes left.");
    require(_votingPollID > 0 && _votingPollID <= votingPollCount, "VotingPoll ID is out of range.");
    votes_by_address[msg.sender]++;
    votingCountByVotingPoll[_votingPollID]++;
    votingPolls[_votingPollID].setVote(votingCountByVotingPoll[_votingPollID], options);

    emit Voted();
  }
  function getVotingPollF(uint id) public view returns(uint ,string memory ,uint){
      require(votingPollCount > 0,"The list is empty, you should create a VotingPoll");
     return votingPolls[id].getVotingPoll(id);
  }
  function votesAvailable() public view returns( uint){
      return MAX_VOTES_PER_VOTER -votes_by_address[msg.sender];
  }

  function getVotingPollOptions(uint _votingPollID,string memory options) public view returns(uint){
       require(_votingPollID > 0 && _votingPollID <= votingPollCount, "VotingPoll ID is out of range.");
      return votingPolls[_votingPollID].getOptionsList(options);
  }
}