import { __decorate } from "tslib";
import { serializeHash } from '@holochain-open-dev/core-types';
import { observable, action, runInAction, computed, makeObservable, } from 'mobx';
export class TransactorStore {
    constructor(transactorService, profilesStore) {
        this.transactorService = transactorService;
        this.profilesStore = profilesStore;
        this.offers = {};
        this.transactions = {};
        makeObservable(this);
    }
    get myAgentPubKey() {
        return serializeHash(this.transactorService.cellId[1]);
    }
    get myPendingOffers() {
        return Object.entries(this.offers)
            .filter(([hash, offer]) => !Object.values(this.transactions).find(t => t.offer_hash == hash))
            .map(([hash, offer]) => ({
            hash,
            content: offer,
        }));
    }
    get myTransactions() {
        return Object.entries(this.transactions)
            .sort(([_, transaction1], [__, transaction2]) => transaction2.timestamp - transaction1.timestamp)
            .map(([hash, transaction]) => ({
            hash,
            content: transaction,
        }));
    }
    isOutgoing(multiparty) {
        return multiparty.spender_pub_key === this.myAgentPubKey;
    }
    offer(offerHash) {
        return this.offers[offerHash];
    }
    counterpartyKey(multiparty) {
        return multiparty.recipient_pub_key === this.myAgentPubKey
            ? multiparty.spender_pub_key
            : multiparty.recipient_pub_key;
    }
    counterpartyNickname(multiparty) {
        const counterpartyKey = this.counterpartyKey(multiparty);
        return this.profilesStore.profileOf(counterpartyKey).nickname;
    }
    get outgoingOffers() {
        return this.myPendingOffers.filter(offer => this.isOutgoing(offer.content));
    }
    get incomingOffers() {
        return this.myPendingOffers.filter(offer => !this.isOutgoing(offer.content));
    }
    get myBalance() {
        return Object.values(this.transactions).reduce((acc, next) => acc + (this.isOutgoing(next) ? -next.amount : next.amount), 0);
    }
    async fetchMyPendingOffers() {
        const offers = await this.transactorService.queryMyPendingOffers();
        const promises = offers.map(o => this.profilesStore.fetchAgentProfile(this.counterpartyKey(o.content)));
        await Promise.all(promises);
        offers.forEach(o => this.storeOffer(o));
    }
    async fetchMyTransactions() {
        const transactions = await this.transactorService.getAgentTransactions(this.myAgentPubKey);
        const promises = transactions.map(t => this.profilesStore.fetchAgentProfile(this.counterpartyKey(t.content)));
        await Promise.all(promises);
        transactions.forEach(t => this.storeTransaction(t));
    }
    async createOffer(recipientPubKey, amount) {
        await this.transactorService.createOffer(recipientPubKey, amount);
        this.fetchMyPendingOffers();
    }
    async acceptOffer(offerHash) {
        await this.transactorService.acceptOffer(offerHash);
        runInAction(() => {
            this.fetchMyTransactions();
        });
    }
    storeOffer(offer) {
        this.offers[offer.hash] = offer.content;
    }
    storeTransaction(transaction) {
        this.transactions[transaction.hash] = transaction.content;
    }
}
__decorate([
    observable
], TransactorStore.prototype, "offers", void 0);
__decorate([
    observable
], TransactorStore.prototype, "transactions", void 0);
__decorate([
    computed
], TransactorStore.prototype, "myPendingOffers", null);
__decorate([
    computed
], TransactorStore.prototype, "myTransactions", null);
__decorate([
    computed
], TransactorStore.prototype, "outgoingOffers", null);
__decorate([
    computed
], TransactorStore.prototype, "incomingOffers", null);
__decorate([
    computed
], TransactorStore.prototype, "myBalance", null);
__decorate([
    action
], TransactorStore.prototype, "fetchMyPendingOffers", null);
__decorate([
    action
], TransactorStore.prototype, "fetchMyTransactions", null);
__decorate([
    action
], TransactorStore.prototype, "createOffer", null);
__decorate([
    action
], TransactorStore.prototype, "acceptOffer", null);
__decorate([
    action
], TransactorStore.prototype, "storeOffer", null);
__decorate([
    action
], TransactorStore.prototype, "storeTransaction", null);
//# sourceMappingURL=transactor.store.js.map