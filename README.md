# Civic Pass EVM Sample Lottery Project

This project demonstrates the integration of Civic Pass into an Ethereum smart contract.

It is a simple lottery contract that allows users to enter the lottery for free.

The contract owner can then draw a winner and pay out the prize.

By adding Civic's Uniqueness Pass to the contract, we can ensure that each user can only enter the lottery once.

## Getting started

Install dependencies:

```shell
yarn
```

Run a local hardhat node:
(This project uses hardhat-deploy to set up a lottery contract.)

```shell
yarn local:start
```

Start the frontend:

```shell
yarn app:start
```

Deploy to testnet:

```shell
yarn deploy:testnet
```

Start the frontend pointing to testnet:

```shell
yarn app:start:testnet
```