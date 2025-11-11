// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;


contract StorageMapping  {
    /**
    * @notice Structure for storing account balances
    */
    struct AccountBalance {
        uint256 balance;
        bool flag;
    }

    mapping(address => AccountBalance) public addressBalances;

    /**
    * @notice Add a new account
    * @param newAddr New address to add
    */
    function setAccountBalance(address newAddr, uint256 balance) public {
        addressBalances[newAddr] = AccountBalance(balance, true);
    }

    /**
    * @notice Get account balance by addr
    * @param addr The address where the balance will be displayed
    * @return tuple with balance and flag of account existing
    */
    function getAccountBalance(address addr) public view returns (uint256, bool) {
        if (addressBalances[addr].flag == true) {
            return (addressBalances[addr].balance, true);
        }
        return (0, false);
    }
}
