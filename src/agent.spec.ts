import {
  FindingType,
  FindingSeverity,
  Finding,
} from "forta-agent"
import agent from "./agent"

import {
  HH_DETERMINISTIC_ADDRESS_MAINNET_TRANSFER_1_ALERTID,
  HH_DETERMINISTIC_ADDRESS_MAINNET_TRANSFER_1_NAME,
  HH_DETERMINISTIC_ADDRESS_MAINNET_TRANSFER_1_DESCRIPTION,
  PROTOCOL,
  DETERMINISTIC_ADDRESSES
 } from './constants'
 
 import { TestUtils } from './testUtils'

const utils = new TestUtils();

const testAmount: string = '0xb1a2bc2ec50000'; // 0.05 eth
const devAddress = '0xf8d9e965c61f20f244f1b98e9446bf8d1deaa08a'


describe("Hardhat deterministic test addresses agent", () => {

  describe("handleTransaction", () => {
    it("returns empty findings as it can't find a deterministic address", async () => {
      const txEvent = utils.createTxEvent(devAddress, '0xOtherAddress', testAmount)

      const findings = await agent.handleTransaction(txEvent)

      expect(findings).toStrictEqual([])
    })

    it("returns a findings if a distracted developer send ETH to a hardhat deterministic test address", async () => {
      const from = DETERMINISTIC_ADDRESSES[0]
      const txEvent = utils.createTxEvent(devAddress, from, testAmount)

      const findings = await agent.handleTransaction(txEvent)

      const finding = Finding.fromObject({
        name: HH_DETERMINISTIC_ADDRESS_MAINNET_TRANSFER_1_NAME + "0.05 ETH",
        description: HH_DETERMINISTIC_ADDRESS_MAINNET_TRANSFER_1_DESCRIPTION,
        alertId: HH_DETERMINISTIC_ADDRESS_MAINNET_TRANSFER_1_ALERTID,
        protocol: PROTOCOL,
        severity: FindingSeverity.Low,
        type: FindingType.Info,
        metadata: {
          devAddress: devAddress,
          cryptoLoss: "0.05 ETH"
        }
      });

      expect(findings).toStrictEqual([finding]);

    })

  })
})
