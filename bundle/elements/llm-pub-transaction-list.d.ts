import { PropertyValues } from 'lit-element';
import { Hashed } from '@holochain-open-dev/common';
import { List } from 'scoped-material-components/mwc-list';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import type { Transaction } from '../types';
import { BaseElement } from './base-element';
import { Icon } from 'scoped-material-components/mwc-icon';
import { ListItem } from 'scoped-material-components/mwc-list-item';
export declare class LlmPubTransactionList extends BaseElement {
    /** Public attributes */
    /** Private properties */
    _myAgentPubKey: string;
    _transactions: Array<Hashed<Transaction>>;
    static styles: import("lit-element").CSSResult;
    updated(changedValues: PropertyValues): Promise<void>;
    loadTransactions(): Promise<void>;
    isOutgoing(transaction: Hashed<Transaction>): boolean;
    getCounterparty(transaction: Hashed<Transaction>): string;
    render(): import("lit-element").TemplateResult;
    renderContent(): import("lit-element").TemplateResult;
    static get scopedElements(): {
        'mwc-circular-progress': typeof CircularProgress;
        'mwc-icon': typeof Icon;
        'mwc-list-item': typeof ListItem;
        'mwc-list': typeof List;
    };
}
