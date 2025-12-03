// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import {Test} from "forge-std/Test.sol";
import "../contracts/StorageMapping.sol";


contract StorageMappingTest is Test {
    StorageMapping public storageMapping;

    /**
    * @notice Test addresses
    */
    address constant USER_1 = address(0x1);
    address constant USER_2 = address(0x2);
    address constant NON_EXISTENT = address(0x3);
    address constant ZERO_ADDRESS = address(0);

    function setUp() public {
        storageMapping = new StorageMapping();
    }

    /**
    * @notice Set account balance for new address
    */
    function testSetAccountBalance() public {
        uint256 balance = 100 ether;

        storageMapping.setAccountBalance(USER_1, balance);

        (uint256 returnedBalance, bool exists) = storageMapping.getAccountBalance(USER_1);
        assertEq(returnedBalance, balance, "The balance must be equivalent");
        assertTrue(exists, "Flag exists can be true for existing address");
    }

    /**
    * @notice Rewrite account balance
    */
    function testOverwriteBalance() public {
        uint256 firstBalance = 50 ether;
        uint256 secondBalance = 200 ether;

        storageMapping.setAccountBalance(USER_2, firstBalance);
        storageMapping.setAccountBalance(USER_2, secondBalance);

        (uint256 returnedBalance, bool exists) = storageMapping.getAccountBalance(USER_2);
        assertEq(returnedBalance, secondBalance, "A balance must be rewritten");
        assertTrue(exists, "A flag 'exists' must be stayed true");
    }

    /**
    * @notice Get balance for existing account
    */
    function testGetExistingBalance() public {
        uint256 balance = 75 ether;

        storageMapping.setAccountBalance(USER_1, balance);

        (uint256 returnedBalance, bool exists) = storageMapping.getAccountBalance(USER_1);
        assertEq(returnedBalance, balance, "The returned balance must match");
        assertTrue(exists, "A flag 'exists' must be stayed true");
    }

    /**
    * @notice Get a balance for a non-existent account
    */
    function testGetNonExistentBalance() public {
        (uint256 balance, bool exists) = storageMapping.getAccountBalance(NON_EXISTENT);

        assertEq(balance, 0, "The balance for a non-existent address must be 0");
        assertFalse(exists, "The exists flag must be false for a non-existent address");
    }

    /**
    * @notice Extract balance for null address
    */
    function testZeroAddress() public {
        (uint256 balance, bool exists) = storageMapping.getAccountBalance(ZERO_ADDRESS);

        assertEq(balance, 0, "The balance of the zero address must be 0");
        assertFalse(exists, "The exists flag must be false for address zero");
    }

    /**
    * @notice Check on zero balance for existing account
    */
    function testZeroBalance() public {
        storageMapping.setAccountBalance(USER_1, 0);

        (uint256 balance, bool exists) = storageMapping.getAccountBalance(USER_1);
        assertEq(balance, 0, "The balance can be nullable");
        assertTrue(exists, "The address must exist even with a zero balance");
    }
}
