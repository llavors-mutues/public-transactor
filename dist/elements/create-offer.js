import { __decorate } from "tslib";
import { html, property, query } from 'lit-element';
import { TextField } from 'scoped-material-components/mwc-textfield';
import { Button } from 'scoped-material-components/mwc-button';
import { Dialog } from 'scoped-material-components/mwc-dialog';
import { SearchAgent } from '@holochain-open-dev/profiles';
import { sharedStyles } from './utils/shared-styles';
import { Card } from 'scoped-material-components/mwc-card';
import { connectStore, StoreElement } from '@holochain-open-dev/common';
export class CreateOffer extends StoreElement {
    constructor() {
        /** Private properties */
        super(...arguments);
        this._recipientAgentProfile = undefined;
    }
    firstUpdated() {
        this._amountField.validityTransform = newValue => {
            this.requestUpdate();
            try {
                const amount = parseFloat(newValue);
                if (amount > 0)
                    return { valid: true };
            }
            catch (e) { }
            this._amountField.setCustomValidity(`Offer amount has to be greater than 0`);
            return {
                valid: false,
            };
        };
    }
    async createOffer() {
        var _a;
        const recipientPubKey = (_a = this._recipientAgentProfile) === null || _a === void 0 ? void 0 : _a.agent_pub_key;
        const amount = parseFloat(this._amountField.value);
        await this.store.createOffer(recipientPubKey, amount);
        this.dispatchEvent(new CustomEvent('offer-created', {
            detail: { recipientPubKey, amount },
            composed: true,
            bubbles: true,
        }));
    }
    renderConfirmDialog() {
        var _a, _b;
        return html `
      <mwc-dialog heading="Confirm offer" id="dialog">
        <span>
          You are about to create an offer to
          ${(_a = this._recipientAgentProfile) === null || _a === void 0 ? void 0 : _a.profile.nickname}, with public key
          ${(_b = this._recipientAgentProfile) === null || _b === void 0 ? void 0 : _b.agent_pub_key}. This would lower your
          balance by the amount of the transaction and raise the recipient's
          value by the same amount.
        </span>

        <mwc-button slot="secondaryAction" dialogAction="cancel">
          Cancel
        </mwc-button>
        <mwc-button
          .disabled=${!this._amountField || !this._amountField.validity.valid}
          slot="primaryAction"
          @click=${() => this.createOffer()}
          dialogAction="create"
        >
          Confirm
        </mwc-button>
      </mwc-dialog>
    `;
    }
    onAgentSelected(e) {
        this._recipientAgentProfile = e.detail.agent;
    }
    render() {
        return html `
      ${this.renderConfirmDialog()}
      <mwc-card style="width: auto; flex: 1;">
        <div class="column" style="margin: 16px;">
          <span class="title" style="margin-bottom: 8px;"
            >Create New Offer</span
          >
          <search-agent
            field-label="Recipient"
            @agent-selected=${(e) => this.onAgentSelected(e)}
          ></search-agent>

          <mwc-textfield
            style="padding-top: 16px; margin-bottom: 16px;"
            label="Amount"
            type="number"
            id="amount"
            min="0.1"
            step="0.1"
            autoValidate
            outlined
          ></mwc-textfield>

          <mwc-button
            label="CREATE OFFER"
            .disabled=${!(this._recipientAgentProfile && this._amountField.value)}
            @click=${() => this._dialog.show()}
          ></mwc-button>
        </div>
      </mwc-card>
    `;
    }
    getScopedElements() {
        return {
            'mwc-textfield': TextField,
            'mwc-card': Card,
            'mwc-button': Button,
            'mwc-dialog': Dialog,
            'search-agent': connectStore(SearchAgent, this.store.profilesStore),
        };
    }
}
CreateOffer.styles = sharedStyles;
__decorate([
    query('#amount')
], CreateOffer.prototype, "_amountField", void 0);
__decorate([
    query('#dialog')
], CreateOffer.prototype, "_dialog", void 0);
__decorate([
    property({ type: Object })
], CreateOffer.prototype, "_recipientAgentProfile", void 0);
//# sourceMappingURL=create-offer.js.map