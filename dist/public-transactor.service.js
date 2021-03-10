import { timestampToMillis } from '@holochain-open-dev/core-types';
export class PublicTransactorService {
    constructor(appWebsocket, cellId, zomeName = 'transactor') {
        this.appWebsocket = appWebsocket;
        this.cellId = cellId;
        this.zomeName = zomeName;
    }
    async getMyPublicKey() {
        return this.callZome('who_am_i', null);
    }
    async getAgentBalance(agentPubKey) {
        return this.callZome('get_balance_for_agent', agentPubKey);
    }
    async getAgentTransactions(agentPubKey) {
        const transactions = await this.callZome('get_transactions_for_agent', agentPubKey);
        return transactions.map((t) => ({
            hash: t.hash,
            content: {
                ...t.content,
                timestamp: timestampToMillis(t.content.timestamp),
            },
        }));
    }
    async queryMyPendingOffers() {
        return this.callZome('query_my_pending_offers', null);
    }
    async createOffer(recipientPubKey, amount) {
        return this.callZome('create_offer', {
            recipient_pub_key: recipientPubKey,
            amount,
        });
    }
    async acceptOffer(offerHash) {
        return this.callZome('accept_offer', offerHash);
    }
    /*
    async cancelOffer(offerHash: string) {
      await this.callZome('cancel_offer', {
        offer_hash: offerHash,
      });
    }
  
    async rejectOffer(offerHash: string) {
      await this.callZome('reject_offer', {
        offer_hash: offerHash,
      });
    } */
    callZome(fn_name, payload) {
        return this.appWebsocket.callZome({
            cap: null,
            cell_id: this.cellId,
            zome_name: this.zomeName,
            fn_name,
            payload,
            provenance: this.cellId[1],
        });
    }
}
//# sourceMappingURL=public-transactor.service.js.map