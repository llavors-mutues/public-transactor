import { List } from 'scoped-material-components/mwc-list';
import { ListItem } from 'scoped-material-components/mwc-list-item';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import { Offer } from '../types';
import { StoreElement } from '@holochain-open-dev/common';
import { HoloHashed } from '@holochain-open-dev/core-types';
import { Icon } from 'scoped-material-components/mwc-icon';
import { TransactorStore } from '../transactor.store';
export declare abstract class PendingOfferList extends StoreElement<TransactorStore> {
    /** Public attributes */
    /** Private properties */
    _lastSelectedOfferHash: string | undefined;
    _loading: boolean;
    static styles: import("lit-element").CSSResult[];
    firstUpdated(): Promise<void>;
    renderPlaceholder(type: string): import("lit-element").TemplateResult;
    offerSelected(offerHash: string): void;
    renderOfferList(title: string, offers: Array<HoloHashed<Offer>>): import("lit-element").TemplateResult;
    render(): import("lit-element").TemplateResult;
    getScopedElements(): {
        'mwc-circular-progress': typeof CircularProgress;
        'mwc-list': typeof List;
        'mwc-list-item': typeof ListItem;
        'mwc-icon': typeof Icon;
    };
}
