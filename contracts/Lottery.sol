// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@identity.com/gateway-protocol-eth/contracts/Gated.sol";

contract Lottery is Gated {
    address payable[] public players;
    mapping (address => bool) public uniquePlayers;
    address public manager;
    address payable public winner;

    constructor(address gatewayTokenContract, uint256 gatekeeperNetwork) Gated(gatewayTokenContract, gatekeeperNetwork){
        manager = msg.sender;
    }

    receive() external payable {}

    function getTicket() external gated {
        require(uniquePlayers[msg.sender] == false, "You already have a ticket");
        players.push(payable(msg.sender));
        uniquePlayers[msg.sender] = true;
    }

    function getBalance() public view returns(uint) {
        return address(this).balance;
    }

    function random() public view returns(uint) {
        return uint(keccak256(abi.encodePacked(block.prevrandao, block.timestamp, players.length)));
    }

    function pickWinner() public {
        require(msg.sender == manager);
        uint r = random();

        uint index = r % players.length;
        winner = players[index];

        winner.transfer(getBalance());
        players = new address payable[](0);
    }

    function totalPlayers() public view returns(uint) {
        return players.length;
    }
}