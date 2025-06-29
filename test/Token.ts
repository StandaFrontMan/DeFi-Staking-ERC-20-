import { expect } from "chai";
import hre from "hardhat";

import { Token } from "../typechain-types";

describe("Token", () => {
  let token: Token;
  let owner: any;
  let addr1: any;

  const TOKE_NAME = "Token";
  const TOKEN_SYMBOL = "TKN";

  const MINT_AMOUNT = hre.ethers.parseEther("100");

  const initialSupply = hre.ethers.parseEther("1000");

  const stakeAmount = hre.ethers.parseEther("100");

  beforeEach(async () => {
    [owner, addr1] = await hre.ethers.getSigners();

    const TokenFactory = await hre.ethers.getContractFactory("Token");
    token = await TokenFactory.deploy(initialSupply);
    await token.waitForDeployment();
  });

  describe("Deployment", () => {
    it("Shold be deployed", async () => {
      const tokenAddr = await token.getAddress();

      expect(tokenAddr).to.be.properAddress;
      expect(tokenAddr).to.not.equal(hre.ethers.ZeroAddress);
    });

    it("Should have correct name and symbol", async () => {
      expect(await token.name()).to.equal(TOKE_NAME);
      expect(await token.symbol()).to.equal(TOKEN_SYMBOL);
    });
  });

  describe("Minting", () => {
    it("Should allow minting", async () => {
      await token.mint(addr1.address, MINT_AMOUNT);

      const balance = await token.balanceOf(addr1.address);
      expect(balance).to.equal(MINT_AMOUNT);
    });

    it("Should allow transfers", async () => {
      const transferAmount = hre.ethers.parseEther("100");
      await token.transfer(addr1.address, transferAmount);

      const addr1Balance = await token.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(transferAmount);
    });

    it("Should assign initial supply to the owner", async () => {
      const ownerBalance = await token.balanceOf(owner.address);
      expect(ownerBalance).to.equal(initialSupply);
    });

    it("Should update totalSupply after mint", async () => {
      const prevSupply = await token.totalSupply();
      await token.mint(addr1.address, MINT_AMOUNT);
      const curSupply = await token.totalSupply();

      expect(curSupply).to.be.equal(prevSupply + MINT_AMOUNT);
    });
  });

  describe("Staking", () => {
    it("Should allow user to stake token", async () => {
      await token.transfer(addr1.address, stakeAmount);
      await token.connect(addr1).stake(stakeAmount);

      const staked = await token.staked(addr1.address);
      const contractBalance = await token.balanceOf(token.getAddress());

      expect(staked).to.equal(stakeAmount);
      expect(contractBalance).to.equal(stakeAmount);
    });

    it("Should accumulate rewards over the time", async () => {
      await token.transfer(addr1.address, stakeAmount);
      await token.connect(addr1).stake(stakeAmount);

      await hre.ethers.provider.send("evm_increaseTime", [365 * 24 * 60 * 60]);
      await hre.ethers.provider.send("evm_mine", []);

      await token.connect(addr1).claim();

      const newUserBalance = await token.balanceOf(addr1.address);

      expect(newUserBalance).to.be.greaterThan(0);
    });

    it("Should allow unstake and return tokens", async () => {
      await token.transfer(addr1.address, stakeAmount);
      await token.connect(addr1).stake(stakeAmount);

      await token.connect(addr1).unstake(stakeAmount);

      const staked = await token.staked(addr1.address);
      const userBalance = await token.balanceOf(addr1.address);

      expect(staked).to.equal(0);
      expect(userBalance).to.be.gte(stakeAmount);
    });
  });
});
