import { Card } from 'scoped-material-components/mwc-card';
import { StoreElement } from '@holochain-open-dev/common';
import { TransactorStore } from '../transactor.store';
export declare abstract class MyOffers extends StoreElement<TransactorStore> {
    _offerHash: string | undefined;
    render(): import("lit-html").TemplateResult;
    static get styles(): import("lit-element").CSSResult[];
    getScopedElements(): {
        'mwc-card': typeof Card;
        'pending-offer-list': import("lit-element").Constructor<HTMLElement>;
        'offer-detail': import("lit-element").Constructor<HTMLElement>;
    };
}
