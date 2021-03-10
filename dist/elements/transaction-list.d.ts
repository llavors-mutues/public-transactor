import { StoreElement } from '@holochain-open-dev/common';
import { List } from 'scoped-material-components/mwc-list';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import { Icon } from 'scoped-material-components/mwc-icon';
import { ListItem } from 'scoped-material-components/mwc-list-item';
import { TransactorStore } from '../transactor.store';
export declare abstract class TransactionList extends StoreElement<TransactorStore> {
    /** Public attributes */
    /** Private properties */
    _loading: boolean;
    static styles: import("lit-element").CSSResult;
    firstUpdated(): Promise<void>;
    render(): import("lit-element").TemplateResult;
    renderContent(): import("lit-element").TemplateResult;
    getScopedElements(): {
        'mwc-circular-progress': typeof CircularProgress;
        'mwc-icon': typeof Icon;
        'mwc-list-item': typeof ListItem;
        'mwc-list': typeof List;
    };
}
