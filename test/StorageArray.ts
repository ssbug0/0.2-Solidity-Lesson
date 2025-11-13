import { expect } from "chai";
// import { ethers } from "hardhat";
import { network } from "hardhat";

const { ethers } = await network.connect();
import type { StorageArray } from "../typechain-types";


describe("StorageArray", function () {
    let storageArray: StorageArray;
    let owner: any;

    beforeEach(async function () {
        [owner] = await ethers.getSigners();

        const StorageArrayFactory = await ethers.getContractFactory("StorageArray");
        storageArray = await StorageArrayFactory.deploy() as StorageArray;
        await storageArray.waitForDeployment();
    });

    it("Should start with empty array", async function () {
        expect(await storageArray.length()).to.equal(0);
    });

    it("Should push elements and increase length", async function () {
        await storageArray.push(42);
        await storageArray.push(100);

        expect(await storageArray.length()).to.equal(2);
        expect(await storageArray.get(0)).to.equal(42);
        expect(await storageArray.get(1)).to.equal(100);
    });

    it("Should get element by index", async function () {
        await storageArray.push(999);
        const value = await storageArray.get(0);
        expect(value).to.equal(999);
    });

    it("Should revert when getting out-of-bounds index", async function () {
        await expect(storageArray.get(999))
            .to.be.revertedWith("Index out of bounds");
    });

    it("Should set element by index", async function () {
        await storageArray.push(10);
        await storageArray.set(0, 20);
        expect(await storageArray.get(0)).to.equal(20);
    });

    it("Should revert on set with out-of-bounds index", async function () {
        await expect(storageArray.set(999, 42)).revertedWith("Index out of bounds");
    });

    it("Should pop last element", async function () {
        await storageArray.push(1);
        await storageArray.push(2);

        await storageArray.pop();
        expect(await storageArray.length()).to.equal(1);
        expect(await storageArray.get(0)).to.equal(1);

        await storageArray.pop();
        expect(await storageArray.length()).to.equal(0);
    });

    it("Should revert when popping empty array", async function () {
        await expect(storageArray.pop())
            .to.be.revertedWith("Array is empty")
    });
});
