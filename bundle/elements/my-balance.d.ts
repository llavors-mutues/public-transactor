import { Card } from 'scoped-material-components/mwc-card';
import { StoreElement } from '@holochain-open-dev/common';
import { TransactorStore } from '../transactor.store';
export declare abstract class MyBalance extends StoreElement<TransactorStore> {
    render(): import("lit-html").TemplateResult;
    static get styles(): import("lit-element").CSSResult;
    getScopedElements(): {
        'transaction-list': import("lit-element").Constructor<HTMLElement>;
        'mwc-card': typeof Card;
    };
}
