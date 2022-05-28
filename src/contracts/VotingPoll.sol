//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract VotingPoll{

    uint private id;
    string public  title;
    mapping(string=>uint) private  options_list;
    uint  public vote;
    address public owner;
    address private _factory;

      modifier onlyFactory() {
        require(msg.sender == _factory, "You need to use the factory");
        _;
    }

    constructor( string memory _title_f,address _owner, uint _id) {
    id=_id;
    title=_title_f;
    owner=_owner;
    vote=0;
    _factory= msg.sender;
    }
    
    function getVotingPoll(uint count) public onlyFactory view returns(uint ,string memory ,uint){
            require(count==id,"No existe");
            return(id,title,vote);
    }
    function setVote(uint _vote,string memory _options) public onlyFactory{
        vote=_vote;
        options_list[_options]++;
    }
    function getOptionsList(string memory _options)public view returns(uint){
        return options_list[_options];
    }
 

}