# О проекте
Учебный проект с solidity смартконтрактами на базе фреймворка hardhat.

# Описание

## Проект включает:
- 3 смарт контракта (array, simple, mapping)
- Юнит тесты на mocha и solidity для каждого контракта
- Деплой скрипты

## Требования:
- hardhat ^3.0.10
- solidity ^0.8.30
- mocha ^11.7.4
- ethers ^6.15.0


# Установка

### Установка solidity
Для MacOs
```bash
brew tap ethereum/ethereum
brew install solidity@latest
```

или
```bash
npm install solc
```

### Проверка версии
```bash
solc --version
```

### Актуализация NPM
```bash
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
```

### Установка зависимостей проекта
```bash
npm install
```

# Использование

## Компиляция смарт контрактов
```bash
npx hardhat compile
```

## Запуск тестов
Все тесты
```bash
npx hardhat test
```
Выборочный запуск solidity/mocha тестов
```bash
npx hardhat test solidity
npx hardhat test mocha
```

## Запуск эмулятора ETH блокчейна
```bash
npx hardhat node
```

# Деплой контрактов
```bash
npx hardhat ignition deploy ignition/modules/StorageArray.ts --network localMetaMask
npx hardhat ignition deploy ignition/modules/StorageMapping.ts --network localMetaMask
npx hardhat ignition deploy ignition/modules/StorageSimple.ts --network localMetaMask
```
или
```bash
npx hardhat run scripts/deploy-storage-mapping.ts --network localMetaMask
npx hardhat run scripts/deploy-storage-array.ts --network localMetaMask
npx hardhat run scripts/deploy-storage-simple.ts --network localMetaMask
```

# Конфигурация
Инструкция по интеграции hardhat с Metamask
https://medium.com/@cyri113/tutorial-adding-hardhat-accounts-to-metamask-1c602cfbcf05

Создайте .env файл в root дирректории со приватными ключами (пример)
```bash
HARDHAT_ACCOUNT_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
HARDHAT_ACCOUNT_PRIVATE_KEY_2=
HARDHAT_ACCOUNT_PRIVATE_KEY_3=
```

Опционально в .env для скрипта check-contract можно добавить
```bash
CONTRACT_ADDR=[адрес контракта]
```
после чего проверить задеплоен ли контракт
```bash
npx hardhat run scripts/check-contract.ts --network localMetaMask
```

# Рефлексия

## Различие паттернов хранения и сценарии использования.

### Массив
Целесообразно использовать:
- когда необходима итерация по значениям(возможно с последующей аггрегацией), возможность быстро получить размер хранимых данных
- когда удобно хранить данные по целочисленному индексу с последующим доступом за O(1)

Пример юзкейса: Получение среза(топ N) от пулла пользователей с позициями, где позиция каждого может меняться в зависимости от ранжирования.

### Хэш таблица(map)
Целесообразно использовать:
- когда необходим быстрый доступ за O(1) по ключу, имеющему тип отличный от целочисленного
- когда нет необходимости в итерации по все значениям

Пример юзкейса: данные о балансе аккаунтов, индивидуальные счетчики.

## Что было изучено/освоено:
- Развертывание и конфигурация hardhat фреймворка
- Написание логики смарт контрактов по работе с базовыми структурами данных
- Добавление проверок и тестирование контрактов на переполнение
- Использование Hardhat Ignition для деплоя контрактов
- Тестирование контрактов с Mocha/Chai, проверять revert условия
- Принципы размещения данных в памяти (memory, storage, calldata)
- События логгирования

## С чем возникли трудности:
- Частично поломана обратная совместимость ether библиотеки. В сети часть мануалов устарела.
- Проверки на переполнение, которые повлияли на тесты. (Узнал что есть различие между старыми и новыми EVM в плане проверки на переполнения в compile time)
















