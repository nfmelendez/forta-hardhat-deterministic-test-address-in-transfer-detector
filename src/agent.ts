import { ethers } from 'ethers'
const{ BigNumber } = require('@ethersproject/bignumber');

import { 
  Finding, 
  TransactionEvent, 
  FindingSeverity, 
  FindingType 
} from 'forta-agent'

import {
  HH_DETERMINISTIC_ADDRESS_MAINNET_TRANSFER_1_ALERTID,
  HH_DETERMINISTIC_ADDRESS_MAINNET_TRANSFER_1_NAME,
  HH_DETERMINISTIC_ADDRESS_MAINNET_TRANSFER_1_DESCRIPTION,
  PROTOCOL,
  DETERMINISTIC_ADDRESSES
 } from './constants'

  async function handleTransaction(txEvent: TransactionEvent) {
    const findings: Finding[] = []

    if (txEvent.to != null && DETERMINISTIC_ADDRESSES.includes(txEvent.to)) {
      const loss = BigNumber.from(txEvent.transaction.value)
      const formatedLoss = ethers.utils.formatEther(loss) + ' ETH';
      findings.push(
        Finding.fromObject({
          name: HH_DETERMINISTIC_ADDRESS_MAINNET_TRANSFER_1_NAME + formatedLoss,
          description: HH_DETERMINISTIC_ADDRESS_MAINNET_TRANSFER_1_DESCRIPTION,
          alertId: HH_DETERMINISTIC_ADDRESS_MAINNET_TRANSFER_1_ALERTID,
          severity: FindingSeverity.Low,
          type: FindingType.Info,
          protocol : PROTOCOL,
          metadata: {
            devAddress: txEvent.from,
            cryptoLoss: formatedLoss
          },
        })
      );
    }

    return findings
}

export default {
  handleTransaction : handleTransaction,
}