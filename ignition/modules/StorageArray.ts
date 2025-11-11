import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const StorageArrayModule = buildModule("StorageArrayModule", (m) => {
  // Деплой контракта StorageArray
  const storageArray = m.contract("StorageArray", []);
  return { storageArray };
});

export default StorageArrayModule;