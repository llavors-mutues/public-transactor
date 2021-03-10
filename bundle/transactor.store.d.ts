import { Dictionary } from '@compository/lib';
import { HoloHashed } from '@holochain-open-dev/core-types';
import { ProfilesStore } from '@holochain-open-dev/profiles/profiles.store';
import { PublicTransactorService } from './public-transactor.service';
import { Multiparty, Offer, Transaction } from './types';
export declare class TransactorStore {
    protected transactorService: PublicTransactorService;
    profilesStore: ProfilesStore;
    offers: Dictionary<Offer>;
    transactions: Dictionary<Transaction>;
    constructor(transactorService: PublicTransactorService, profilesStore: ProfilesStore);
    get myAgentPubKey(): string;
    get myPendingOffers(): HoloHashed<Offer>[];
    get myTransactions(): HoloHashed<Transaction>[];
    isOutgoing(multiparty: Multiparty): boolean;
    offer(offerHash: string): Offer;
    counterpartyKey(multiparty: Multiparty): string;
    counterpartyNickname(multiparty: Multiparty): string;
    get outgoingOffers(): Array<HoloHashed<Offer>>;
    get incomingOffers(): Array<HoloHashed<Offer>>;
    get myBalance(): number;
    fetchMyPendingOffers(): Promise<void>;
    fetchMyTransactions(): Promise<void>;
    createOffer(recipientPubKey: string, amount: number): Promise<void>;
    acceptOffer(offerHash: string): Promise<void>;
    storeOffer(offer: HoloHashed<Offer>): void;
    storeTransaction(transaction: HoloHashed<Transaction>): void;
}
