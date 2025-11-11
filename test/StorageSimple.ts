import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();
import { id } from "ethers";

import type { StorageSimple } from "../typechain-types";


describe("StorageSimple", function () {
    let storageSimple: StorageSimple;

    beforeEach(async function () {
        const factory = await ethers.getContractFactory("StorageSimple");
        storageSimple = (await factory.deploy()) as StorageSimple;
        await storageSimple.waitForDeployment();
    });

    it("Should start with value 0", async function () {
        expect(await storageSimple.getValue()).to.equal(0);
    });

    it("Should set value to 42", async function () {
        await storageSimple.setValue(42);
        expect(await storageSimple.getValue()).to.equal(42);
    });

    it("Should reset value to 0", async function () {
        await storageSimple.setValue(100);
        await storageSimple.resetValue();
        expect(await storageSimple.getValue()).to.equal(0);
    });

    it("Should revert when setting uint8 to 256 (overflow)", async function () {
        // Формируем сырые байты вызова: селектор + аргумент (256 mod 256 = 0)
        const selector = id("setValue(uint8)").slice(0, 10); // "0x736d7855"
        const arg = "0x00"; // 256 & 0xFF = 0
        const data = selector + arg.slice(2);

        const tx = {
            to: await storageSimple.getAddress(),
            data: data,
        };

        // EVM попытается записать 256 в uint8 → panic → revert
        await expect(ethers.provider.call(tx)).to.be.revertedWithoutReason();
    });

    it("Should allow values in range 0-255", async function () {
        for (let i = 0; i <= 255; i++) {
            await storageSimple.setValue(i);
            expect(await storageSimple.getValue()).to.equal(i);
        }
    });
});
