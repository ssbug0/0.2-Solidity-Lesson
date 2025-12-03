import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();
import { id } from "ethers";

import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import type { StorageSimple } from "../typechain-types";


describe("StorageSimple", function () {
    let storageSimple: StorageSimple;
    // let owner: ethers.Wallet;
    // let attacker: ethers.Wallet;
    let owner: HardhatEthersSigner;
    let attacker: HardhatEthersSigner;

    const message = "Secure Message";
    const messageHash = ethers.keccak256(ethers.toUtf8Bytes(message));

    beforeEach(async function () {
        [owner, attacker] = await ethers.getSigners();
        const factory = await ethers.getContractFactory("StorageSimple");
        storageSimple = await factory.deploy();
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

    it("Should be rejected if not owned", async function () {
       await expect(storageSimple.connect(attacker).setValue(40)).to.be.rejectedWith("Access denied");
    });

    it("Set hash", async function () {
        const input = "Hello, Hardhat!";
        const hash = ethers.keccak256(ethers.toUtf8Bytes(input));
        storageSimple.setHashedValue(hash);
    });

    it("Verify message under owner", async function () {
        const signature = await owner.signMessage(ethers.getBytes(messageHash));
        const sig = ethers.Signature.from(signature);
        const v = sig.v === 0 || sig.v === 1 ? sig.v + 27 : sig.v;
        // Проверяем в контракте
        const isEqual = await storageSimple.verifyMessage(message, v, sig.r, sig.s);
        expect(isEqual).to.be.true;
    });

    it("Verify message under other user", async function () {
        const signature = await attacker.signMessage(ethers.getBytes(messageHash));
        const sig = ethers.Signature.from(signature);
        const v = sig.v === 0 || sig.v === 1 ? sig.v + 27 : sig.v;
        // Проверяем в контракте
        const isEqual = await storageSimple.verifyMessage(message, v, sig.r, sig.s);
        expect(isEqual).to.be.false;
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
});
