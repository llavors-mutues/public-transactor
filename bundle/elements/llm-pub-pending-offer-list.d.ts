import { PropertyValues } from 'lit-element';
import { List } from 'scoped-material-components/mwc-list';
import { ListItem } from 'scoped-material-components/mwc-list-item';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import { Offer } from '../types';
import { BaseElement } from './base-element';
import { Hashed } from '@holochain-open-dev/common';
import { Icon } from 'scoped-material-components/mwc-icon';
export declare class LlmPubPendingOfferList extends BaseElement {
    /** Public attributes */
    /** Private properties */
    _myAgentId: string;
    _offers: Array<Hashed<Offer>>;
    _lastSelectedOfferHash: string | undefined;
    static styles: import("lit-element").CSSResult[];
    loadOffers(): Promise<void>;
    updated(changedValues: PropertyValues): Promise<void>;
    renderPlaceholder(type: string): import("lit-element").TemplateResult;
    offerSelected(offerId: string): void;
    isOutgoing(offer: Hashed<Offer>): boolean;
    getOutgoing(): Array<Hashed<Offer>>;
    getIncoming(): Array<Hashed<Offer>>;
    counterparty(offer: Hashed<Offer>): string;
    renderOfferList(title: string, offers: Array<Hashed<Offer>>): import("lit-element").TemplateResult;
    render(): import("lit-element").TemplateResult;
    static get scopedElements(): {
        'mwc-circular-progress': typeof CircularProgress;
        'mwc-list': typeof List;
        'mwc-list-item': typeof ListItem;
        'mwc-icon': typeof Icon;
    };
}
