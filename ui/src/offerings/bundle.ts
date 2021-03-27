import { Lenses } from '@compository/lib';
import { AppWebsocket, CellId } from '@holochain/conductor-api';
import { Constructor } from 'lit-element';
//@ts-ignore
import { createUniqueTag } from '@open-wc/scoped-elements/src/createUniqueTag';
import { ProfilesService } from '@holochain-open-dev/profiles';
import { ProfilesStore } from '@holochain-open-dev/profiles/profiles.store';
import { connectDeps } from '@holochain-open-dev/common';
import { PublicTransactorService } from '../public-transactor.service';
import { TransactorStore } from '../transactor.store';
import { OfferingList } from './elements/offering-list';
import { OfferingsService } from './offerings.service';
import { CreateOffering } from './elements/create-offering';

function renderUnique(
  tag: string,
  baseClass: Constructor<HTMLElement>,
  root: ShadowRoot
) {
  const registry = customElements;
  const uniqueTag = createUniqueTag(tag, registry);
  root.innerHTML = `
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
          <${uniqueTag}></${uniqueTag}>
        `;

  registry.define(
    uniqueTag,
    (class extends baseClass {} as unknown) as Constructor<HTMLElement>
  );
}

export default function lenses(
  appWebsocket: AppWebsocket,
  cellId: CellId
): Lenses {
  const profilesService = new ProfilesService(appWebsocket, cellId);
  const profilesStore = new ProfilesStore(profilesService);

  const service = new PublicTransactorService(appWebsocket, cellId);
  const store = new TransactorStore(service, profilesStore);

  const signalReceiver = AppWebsocket.connect(
    appWebsocket.client.socket.url,
    12000,
    signal => {
      const payload = signal.data.payload;
      if (payload.OfferReceived) {
        store.storeOffer(payload.OfferReceived);
      } else if (payload.OfferAccepted) {
        store.storeTransaction(payload.OfferAccepted);
      }
    }
  );

  const offeringService = new OfferingsService(appWebsocket, cellId);

  return {
    standalone: [
      {
        name: 'Offering List',
        render(root: ShadowRoot) {
          renderUnique(
            'offering-list',
            connectDeps(OfferingList, { store, offeringService }),
            root
          );
        },
      },
      {
        name: 'Create Offering',
        render(root: ShadowRoot) {
          renderUnique(
            'create-offering',
            connectDeps(CreateOffering, { store, offeringService }),
            root
          );
        },
      },
    ],
    entryLenses: {},
    attachmentsLenses: [],
  };
}
