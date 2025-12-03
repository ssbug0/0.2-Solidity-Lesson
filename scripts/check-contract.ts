import { network } from "hardhat";

const { ethers } = await network.connect();


async function main() {
  const CONTRACT_ADDRESS = process.env.CONTRACT_ADDR;

  const [signer] = await ethers.getSigners();

  console.log("Contract address:", CONTRACT_ADDRESS);

  // Проверка наличия байт-кода по адресу
  const code = await ethers.provider.getCode(CONTRACT_ADDRESS);
  if (code === "0x") {
    console.error("❌ Контракт не найден по адресу:", CONTRACT_ADDRESS);
    return;
  }

  console.log("✅ Контракт найден");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });
