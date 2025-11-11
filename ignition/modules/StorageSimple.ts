import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const StorageSimpleModule = buildModule("StorageSimpleModule", (m) => {
  // Деплой контракта StorageSimple
  const storageSimple = m.contract("StorageSimple", []);
  return { storageSimple };
});

export default StorageSimpleModule;