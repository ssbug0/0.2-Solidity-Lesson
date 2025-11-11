import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();

import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { StorageMapping } from "../typechain-types";


describe("StorageMapping", function () {
    let contract: StorageMapping;
    let owner: HardhatEthersSigner;
    let user1: HardhatEthersSigner;
    let user2: HardhatEthersSigner;

    beforeEach(async function () {
        [owner, user1, user2] = await ethers.getSigners();
        const storageMappingFactory = await ethers.getContractFactory("StorageMapping");
        contract = await storageMappingFactory.deploy() as StorageMapping;
        await contract.waitForDeployment();
        console.log("Contract deployed at:", await contract.target);
    });

    it("Should set balance for a new address", async function () {
        const balance = 1000n;
        await contract.setAccountBalance(user1.address, balance);

        const [storedBalance, exists] = await contract.getAccountBalance(user1.address);
        expect(storedBalance).to.equal(balance);
        expect(exists).to.be.true;
    });

    it("Should overwrite balance if address already exists", async function () {
        await contract.setAccountBalance(user1.address, 500n);
        await contract.setAccountBalance(user1.address, 1500n);

        const [storedBalance, exists] = await contract.getAccountBalance(user1.address);
        expect(storedBalance).to.equal(1500n);
        expect(exists).to.be.true;
    });

    it("Should set flag to true after setting balance", async function () {
        await contract.setAccountBalance(user2.address, 777n);

        const [, exists] = await contract.getAccountBalance(user2.address);
        expect(exists).to.be.true;
    });

    it("Should not affect other addresses", async function () {
        await contract.setAccountBalance(user1.address, 100n);

        const [balance, exists] = await contract.getAccountBalance(user2.address);
        expect(balance).to.equal(0n);
        expect(exists).to.be.false;
    });

    describe("getAccountBalance", function () {
        it("Should return (0, false) for unknown address", async function () {
            const [balance, exists] = await contract.getAccountBalance(user1.address);
            expect(balance).to.equal(0n);
            expect(exists).to.be.false;
        });

        it("Should return correct balance and flag for existing address", async function () {
            const initialBalance = 2000n;
            await contract.setAccountBalance(user1.address, initialBalance);

            const [balance, exists] = await contract.getAccountBalance(user1.address);

            expect(balance).to.equal(initialBalance);
            expect(exists).to.be.true;
        });

        it("Should return (0, false) after reset (not possible, but check idempotency)", async function () {
            // Check that reading does not change the state.
            const [balance1, exists1] = await contract.getAccountBalance(user1.address);
            const [balance2, exists2] = await contract.getAccountBalance(user1.address);

            expect(balance1).to.equal(balance2);
            expect(exists1).to.equal(exists2);
        });

        it("Should handle zero balance correctly", async function () {
            await contract.setAccountBalance(user1.address, 0n);

            const [balance, exists] = await contract.getAccountBalance(user1.address);
            expect(balance).to.equal(0n);
            expect(exists).to.be.true;
        });
    });

    describe("Edge Cases", function () {
        it("Should allow setting balance to zero", async function () {
            await contract.setAccountBalance(user1.address, 0n);

            const [balance, exists] = await contract.getAccountBalance(user1.address);
            expect(balance).to.equal(0n);
            expect(exists).to.be.true;
        });

        it("Should distinguish between 'not exists' and 'zero balance'", async function () {
            // Address isn't added (0, false)
            const [balance1, exists1] = await contract.getAccountBalance(user2.address);
            expect(balance1).to.equal(0n);
            expect(exists1).to.be.false;

            // Address with zero balance (0, true)
            await contract.setAccountBalance(user2.address, 0n);
            const [balance2, exists2] = await contract.getAccountBalance(user2.address);
            expect(balance2).to.equal(0n);
            expect(exists2).to.be.true;
        });
    });
});
