// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {

    mapping(address => uint256) public staked;

    mapping(address => uint256) private stakedFormTimeStamp;

    constructor(uint256 initialSupply) ERC20("Token", "TKN") {
        _mint(msg.sender, initialSupply);
    }

     function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }

    function stake(uint256 amount) external {
        require(amount > 0, "Amont shold be more than 0");
        require(balanceOf(msg.sender) >= amount, "balance is less than amount");

        _transfer(msg.sender, address(this), amount);

        if (staked[msg.sender] > 0) {
            claim();
        }

        stakedFormTimeStamp[msg.sender] = block.timestamp;
        staked[msg.sender] += amount;
    }

    function unstake(uint256 amount) external {
        require(amount > 0, "Amount shold be more than 0");
        require(staked[msg.sender] >= amount, "Stake amount shold be more than amount");

        claim();
        staked[msg.sender] -= amount;
        _transfer(address(this), msg.sender, amount);
    }

    function claim() public {
        require(staked[msg.sender] > 0, "Staked amount should be more than 0");

        uint256 secondsStaked = block.timestamp - stakedFormTimeStamp[msg.sender];
        uint256 rewards = staked[msg.sender] * secondsStaked / 3.154e7;

        _mint(msg.sender, rewards);
        stakedFormTimeStamp[msg.sender] = block.timestamp;
    }

}