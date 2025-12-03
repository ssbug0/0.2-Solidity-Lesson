// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;



contract StorageSimple {
    address public owner;
    bytes32 private hash;
    uint8 private value;


    modifier checkOwner() {
        require(msg.sender == owner, "Access denied");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function setValue(uint8 newValue) public checkOwner {
        value = newValue;
    }

    function resetValue() public checkOwner {
        value = 0;
    }

    function getValue() public view returns(uint8) {
        return value;
    }

    function setHashedValue(bytes32 newHash) public checkOwner {
        hash = newHash;
    }

    function getHashedValue() public view returns (bytes32) {
        return hash;
    }

    function verifyMessage(
        string memory message,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public view returns (bool) {
        bytes32 messageHash = keccak256(abi.encodePacked(message));
        bytes32 ethSignedHash = 
            keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", messageHash));

        return owner == ecrecover(ethSignedHash, v, r, s);
    }
}










// contract StorageSimple {
//     uint8 private value;
//     address private owner;
//     bytes32 private hash;


//     constructor() {
//         owner = msg.sender;
//     }

//     modifier onlyOwner() {
//         require(msg.sender == owner, "Caller is not the owner");
//         _;
//     }

//     /**
//     * @notice Add value to storage
//     */
//     function setValue(uint8 newValue) public onlyOwner {
//         value = newValue;
//     }

//     /**
//     * @notice Reset saved value
//     */
//     function resetValue() public onlyOwner {
//         value = 0;
//     }

//     /**
//     * @notice Get saved value
//     */
//     function getValue() public view returns (uint8) {
//         return value;
//     }

//     /**
//     * @notice Set some hashed value
//     */
//     function setHashedValue(bytes32 newHash) public onlyOwner {
//         hash = newHash;
//     }

//     /**
//     * @notice Get saved hash
//     */
//     function getHashedValue() public returns (bytes32) {
//         return hash;
//     }
// }

