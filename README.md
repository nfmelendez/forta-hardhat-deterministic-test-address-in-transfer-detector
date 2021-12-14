# Hardhat deterministic test address in-transfer agent

## Description

This agent detects when a distracted developer send funds to a hardhat deterministic test address in mainnet. Since everybody knows the private keys of these test addresses, there are bots that are fishing all the time trying to steal the funds. Hardhat has a warning but sadly there are still developer feeding the bots. 

***Hardhat warning:**

>Do not send mainnet Ether to the addresses above. Those addresses are deterministic: they are the same for all Hardhat users. Accordingly, the private keys for these addresses >are well known, so there are probably bots monitoring those addresses on mainnet, waiting to withdraw any funds sent to them. If you add any of these accounts to a wallet (eg .Metamask), be very careful to avoid sending any mainnet Ether to them: consider naming the account something like "Hardhat - Unsafe" in order to prevent any mistakes.

## Supported Chains

- Ethereum

## Alerts

- HH-DETERMINISTIC-ADDRESS-IN-TRANSFER-1
  - Fired when someone send funds to a hardhat deterministic test address in mainnet
  - Severity is always set to `low` as is just somebody feeding the bots
  - Type is always set to `Info` as is just to inform
  - Metadata
    - `devAddress` address of the developer that sent the funds
    - `cryptoLoss` Amount of crypto sent and loss

## Test Data

The agent behaviour can be verified with the following transactions:

- 0x1438ddb867dbc4328f9932fe0cd35a357087f105e30e9b59c662259d15792c86 (fires HH-DETERMINISTIC-ADDRESS-IN-TRANSFER-1)
- 0x7310f2da1ec0708e767cca058e6594339e78c820e3bbe7709b6eebdadc7af30d (fires HH-DETERMINISTIC-ADDRESS-IN-TRANSFER-1)
- 0x576e89e9d7b486818f04b10701cb2653da09d7d17a19ead42313cfc6161413fc (fires HH-DETERMINISTIC-ADDRESS-IN-TRANSFER-1)
