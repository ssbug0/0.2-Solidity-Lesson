// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import "forge-std/Test.sol";
import "../contracts/StorageArray.sol";


contract StorageArrayTest is Test {
    StorageArray storageArray;

    function setUp() public {
        storageArray = new StorageArray();
    }

    function testInitialLength() public {
        assertEq(storageArray.length(), 0);
    }

    function testPushAndLength() public {
        storageArray.push(42);
        storageArray.push(100);

        assertEq(storageArray.length(), 2);
        assertEq(storageArray.get(0), 42);
        assertEq(storageArray.get(1), 100);
    }

    function testGetElement() public {
        storageArray.push(999);
        uint256 value = storageArray.get(0);
        assertEq(value, 999);
    }

    function testGetOutOfBounds() public {
        vm.expectRevert();
        storageArray.get(999);
    }

    function testSetElement() public {
        storageArray.push(10);
        storageArray.set(0, 20);
        assertEq(storageArray.get(0), 20);
    }

    function testSetOutOfBounds() public {
        vm.expectRevert();
        storageArray.set(999, 42);
    }

    function testPopElement() public {
        storageArray.push(1);
        storageArray.push(2);

        storageArray.pop();
        assertEq(storageArray.length(), 1);
        assertEq(storageArray.get(0), 1);

        storageArray.pop();
        assertEq(storageArray.length(), 0);
    }

    function testPopEmptyArray() public {
        vm.expectRevert();
        storageArray.pop();
    }
}
