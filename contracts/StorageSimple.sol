// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;


contract StorageSimple {
    uint8 private value;

    /**
    * @notice Add value to storage
    */
    function setValue(uint8 newValue) public {
        value = newValue;
    }

    /**
    * @notice Reset saved value
    */
    function resetValue() public {
        value = 0;
    }

    /**
    * @notice Get saved value
    */
    function getValue() public view returns (uint8) {
        return value;
    }
}
