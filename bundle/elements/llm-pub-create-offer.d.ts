import { TextField } from 'scoped-material-components/mwc-textfield';
import { Button } from 'scoped-material-components/mwc-button';
import { Dialog } from 'scoped-material-components/mwc-dialog';
import { AgentProfile, HodSearchAgent } from '@holochain-open-dev/profiles';
import { BaseElement } from './base-element';
export declare class LlmPubCreateOffer extends BaseElement {
    /** Private properties */
    _amountField: TextField;
    _dialog: Dialog;
    _recipientAgentProfile: AgentProfile | undefined;
    static styles: import("lit-element").CSSResult;
    firstUpdated(): void;
    createOffer(): Promise<void>;
    renderConfirmDialog(): import("lit-element").TemplateResult;
    onAgentSelected(e: CustomEvent): void;
    render(): import("lit-element").TemplateResult;
    static get scopedElements(): {
        'mwc-textfield': typeof TextField;
        'mwc-button': typeof Button;
        'mwc-dialog': typeof Dialog;
        'hod-search-agent': typeof HodSearchAgent;
    };
}
