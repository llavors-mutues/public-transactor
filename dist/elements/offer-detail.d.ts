import { Button } from 'scoped-material-components/mwc-button';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import { Offer } from '../types';
import { StoreElement } from '@holochain-open-dev/common';
import { TransactorStore } from '../transactor.store';
export declare abstract class OfferDetail extends StoreElement<TransactorStore> {
    /** Public attributes */
    /**
     * The offer to show the details of
     * This argument is mandatory, either in property or in attribute form
     */
    offerHash: string;
    /** Private properties */
    _loading: boolean;
    _accepting: boolean;
    _rejecting: boolean;
    _canceling: boolean;
    static styles: import("lit-element").CSSResult[];
    /** Actions */
    firstUpdated(): Promise<void>;
    acceptOffer(): Promise<void>;
    get offer(): Offer;
    /** Renders */
    render(): import("lit-element").TemplateResult;
    renderCounterparty(): import("lit-element").TemplateResult;
    placeholderMessage(): "Accepting offer..." | "Canceling offer..." | "Rejecting offer..." | "Loading offer...";
    renderAcceptOffer(): import("lit-element").TemplateResult;
    getScopedElements(): {
        'mwc-button': typeof Button;
        'mwc-circular-progress': typeof CircularProgress;
    };
}
