import { utils } from 'ethers';
import { createTransactionEvent, Receipt, TransactionEvent } from 'forta-agent';

export class TestUtils {

    createTxEvent(
      from: string ,
      to: string,
      value: string
    ): TransactionEvent {
      return createTransactionEvent({
        traces: {} as any,
        transaction: {
          from,
          to,
          value
        } as any,
        addresses: { [from]: true, [to]: true },
        receipt: {} as any,
        block: {} as any
      });
    }
}
