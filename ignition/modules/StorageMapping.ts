import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const StorageMappingModule = buildModule("StorageMappingModule", (m) => {
  // Деплой контракта StorageMapping
  const storageMapping = m.contract("StorageMapping", []);
  return { storageMapping };
});

export default StorageMappingModule;