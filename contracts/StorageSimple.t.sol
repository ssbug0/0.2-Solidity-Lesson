// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import "forge-std/Test.sol";
import "../contracts/StorageSimple.sol";


contract StorageSimpleTest is Test {
    StorageSimple storageSimple;

    /**
    * @notice Test addresses
    */
    // address constant USER_1 = address(0x1);
    // address constant USER_2 = address(0x2);
    address owner = makeAddr("owner");
    address attacker = makeAddr("attacker");

    function setUp() public {
        storageSimple = new StorageSimple();
    }

    /**
    * @notice Check that the default value should be zero
    */
    function testInitialValueIsZero() public {
        assertEq(storageSimple.getValue(), 0);
    }

    /**
    * @notice Init value
    */
    function testSetValue() public {
        storageSimple.setValue(42);
        assertEq(storageSimple.getValue(), 42);
    }

    /**
    * @notice Value reset
    */
    function testResetValue() public {
        storageSimple.setValue(100);
        storageSimple.resetValue();
        assertEq(storageSimple.getValue(), 0);
    }

    /**
    * @notice Overflow check
    * @dev Create bytes array manually and pack value for ABI signature
    * of target method.
    */
    function testUint8Overflow() public {
        bytes4 selector = bytes4(keccak256("setValue(uint8)"));
        bytes1 arg = bytes1(0); // 256 & 0xFF = 0
        bytes memory payload = abi.encodePacked(selector, arg);

        (bool success, ) = address(storageSimple).call(payload);
        assertEq(success, false);
    }

    /**
    * @notice Multiple value initialization
    */
    function testMultipleSets() public {
        storageSimple.setValue(10);
        storageSimple.setValue(20);
        assertEq(storageSimple.getValue(), 20);
    }

    /**
    * @notice Get stored value
    */
    function testGetValueAccessible() public {
        storageSimple.setValue(99);
        assertEq(storageSimple.getValue(), 99);
    }

    /**
     * @notice Set test hash
     */
    function testSetHash() public {
        string memory message = "test";
        bytes32 messageHash = keccak256(abi.encodePacked(message));
        storageSimple.setHashedValue(messageHash);
        assertEq(storageSimple.getHashedValue(), messageHash);
    }
}
