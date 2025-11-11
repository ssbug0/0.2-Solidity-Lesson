// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;


contract StorageArray {
    // Public dynamic array
    uint[] public data;

    /**
    * @notice Add item into storage
    * @param  _value Value to store
    */
    function push(uint _value) public {
        data.push(_value);
    }

    /**
    * @notice Get saved value
    * @param _index Index of value 
    * @return Value by index or error
    */
    function get(uint _index) public view returns (uint) {
        require(data.length > _index, "Array out of bounds");
        return data[_index];
    }

    /**
    * @notice Get current storage size
    */
    function length() public view returns (uint) {
        return data.length;
    }

    /**
    * @notice Extract the last item
    */
    function pop() public {
        require(data.length > 0, "Array is empty");
        data.pop();
    }

    /**
    * @notice Swap array value by index
    */
    function set(uint _index, uint _value) public {
        require(_index < data.length, "Index out of bounds");
        data[_index] = _value;
    }
}

