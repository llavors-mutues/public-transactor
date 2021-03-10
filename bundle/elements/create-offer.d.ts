import { TextField } from 'scoped-material-components/mwc-textfield';
import { Button } from 'scoped-material-components/mwc-button';
import { Dialog } from 'scoped-material-components/mwc-dialog';
import { AgentProfile } from '@holochain-open-dev/profiles';
import { Card } from 'scoped-material-components/mwc-card';
import { StoreElement } from '@holochain-open-dev/common';
import { TransactorStore } from '../transactor.store';
export declare abstract class CreateOffer extends StoreElement<TransactorStore> {
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
    getScopedElements(): {
        'mwc-textfield': typeof TextField;
        'mwc-card': typeof Card;
        'mwc-button': typeof Button;
        'mwc-dialog': typeof Dialog;
        'search-agent': import("lit-element").Constructor<HTMLElement>;
    };
}
