import { AppWebsocket } from '@holochain/conductor-api';
import { CreateOffer } from './elements/create-offer';
//@ts-ignore
import { createUniqueTag } from '@open-wc/scoped-elements/src/createUniqueTag';
import { TransactorStore } from './transactor.store';
import { PublicTransactorService } from './public-transactor.service';
import { MyOffers } from './elements/my-offers';
import { ProfilesService } from '@holochain-open-dev/profiles';
import { ProfilesStore } from '@holochain-open-dev/profiles/profiles.store';
import { connectStore } from '@holochain-open-dev/common';
import { MyBalance } from './elements/my-balance';
function renderUnique(tag, baseClass, root) {
    const registry = customElements;
    const uniqueTag = createUniqueTag(tag, registry);
    root.innerHTML = `
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
          <${uniqueTag}></${uniqueTag}>
        `;
    registry.define(uniqueTag, class extends baseClass {
    });
}
export default function lenses(appWebsocket, cellId) {
    const profilesService = new ProfilesService(appWebsocket, cellId);
    const profilesStore = new ProfilesStore(profilesService);
    const service = new PublicTransactorService(appWebsocket, cellId);
    const store = new TransactorStore(service, profilesStore);
    const signalReceiver = AppWebsocket.connect(appWebsocket.client.socket.url, 12000, signal => {
        const payload = signal.data.payload;
        if (payload.OfferReceived) {
            store.storeOffer(payload.OfferReceived);
        }
        else if (payload.OfferAccepted) {
            store.storeTransaction(payload.OfferAccepted);
        }
    });
    return {
        standalone: [
            {
                name: 'My Offers',
                render(root) {
                    renderUnique('my-offers', connectStore(MyOffers, store), root);
                },
            },
            {
                name: 'My Balance',
                render(root) {
                    renderUnique('my-balance', connectStore(MyBalance, store), root);
                },
            },
            {
                name: 'Create Offer',
                render(root) {
                    renderUnique('create-offer', connectStore(CreateOffer, store), root);
                },
            },
        ],
        entryLenses: {},
        attachmentsLenses: [],
    };
}
//# sourceMappingURL=bundle.js.map