import { HoloHashed } from '@holochain-open-dev/core-types';
import { AppWebsocket, CellId } from '@holochain/conductor-api';
import { Offer, Transaction } from './types';
export declare class PublicTransactorService {
    appWebsocket: AppWebsocket;
    cellId: CellId;
    zomeName: string;
    constructor(appWebsocket: AppWebsocket, cellId: CellId, zomeName?: string);
    getMyPublicKey(): Promise<string>;
    getAgentBalance(agentPubKey: string): Promise<number>;
    getAgentTransactions(agentPubKey: string): Promise<Array<HoloHashed<Transaction>>>;
    queryMyPendingOffers(): Promise<Array<HoloHashed<Offer>>>;
    createOffer(recipientPubKey: string, amount: number): Promise<string>;
    acceptOffer(offerHash: string): Promise<string>;
    private callZome;
}
