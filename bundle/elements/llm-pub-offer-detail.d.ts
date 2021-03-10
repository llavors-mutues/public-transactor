import { PropertyValues } from 'lit-element';
import { Button } from 'scoped-material-components/mwc-button';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import { Offer } from '../types';
import { BaseElement } from './base-element';
export declare class LlmPubOfferDetail extends BaseElement {
    /** Public attributes */
    /**
     * The offer to show the details of
     * This argument is mandatory, either in property or in attribute form
     */
    offerHash: string;
    /** Private properties */
    _myAgentPubKey: string;
    _offer: Offer | undefined;
    _accepting: boolean;
    _rejecting: boolean;
    _canceling: boolean;
    static styles: import("lit-element").CSSResult;
    updated(changedValues: PropertyValues): void;
    /** Actions */
    loadOffer(): Promise<void>;
    acceptOffer(): Promise<void>;
    /** Renders */
    render(): import("lit-element").TemplateResult;
    renderCounterparty(): import("lit-element").TemplateResult;
    placeholderMessage(): "Accepting offer..." | "Canceling offer..." | "Rejecting offer..." | "Loading offer...";
    renderAcceptOffer(): import("lit-element").TemplateResult;
    /** Helpers */
    isOutgoing(): boolean;
    static get scopedElements(): {
        'mwc-button': typeof Button;
        'mwc-circular-progress': typeof CircularProgress;
    };
}
