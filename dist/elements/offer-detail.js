import { __decorate } from "tslib";
import { css, html, property } from 'lit-element';
import { Button } from 'scoped-material-components/mwc-button';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import { sharedStyles } from './utils/shared-styles';
import { StoreElement } from '@holochain-open-dev/common';
export class OfferDetail extends StoreElement {
    constructor() {
        /** Public attributes */
        super(...arguments);
        /** Private properties */
        this._loading = true;
        this._accepting = false;
        this._rejecting = false;
        this._canceling = false;
    }
    /** Actions */
    async firstUpdated() {
        await this.store.fetchMyPendingOffers();
        this._loading = false;
    }
    async acceptOffer() {
        this._accepting = true;
        await this.store.acceptOffer(this.offerHash);
        this.dispatchEvent(new CustomEvent('offer-completed', {
            detail: { offerHash: this.offerHash },
            composed: true,
            bubbles: true,
        }));
        this._accepting = false;
    }
    get offer() {
        return this.store.offer(this.offerHash);
    }
    /** Renders */
    render() {
        if (this._loading || this._accepting || this._canceling || this._rejecting)
            return html `<div class="column fill center-content">
        <mwc-circular-progress indeterminate></mwc-circular-progress>
        <span style="margin-top: 18px;" class="placeholder"
          >${this.placeholderMessage()}</span
        >
      </div>`;
        return html `
      <div class="column">
        ${this.renderCounterparty()}
        <div class="row center-content">${this.renderAcceptOffer()}</div>
      </div>
    `;
    }
    renderCounterparty() {
        return html `
      <div class="row" style="flex: 1;">
        <div class="column">
          <span class="item title">
            Offer ${this.store.isOutgoing(this.offer) ? ' to ' : ' from '}
            ${this.store.counterpartyNickname(this.offer)}
          </span>
          <span class="item">Agend ID: ${this.offer.recipient_pub_key}</span>

          <span class="item">
            Transaction amount: ${this.offer.amount} credits
          </span>
        </div>
      </div>
    `;
    }
    placeholderMessage() {
        if (this._accepting)
            return 'Accepting offer...';
        if (this._canceling)
            return 'Canceling offer...';
        if (this._rejecting)
            return 'Rejecting offer...';
        return 'Loading offer...';
    }
    renderAcceptOffer() {
        if (this.store.isOutgoing(this.offer)) {
            return html `<mwc-button
        style="flex: 1;"
        label="Awaiting for approval"
        disabled
        raised
      >
      </mwc-button>`;
        }
        else {
            return html `
        <mwc-button
          style="flex: 1;"
          label="ACCEPT OFFER"
          raised
          @click=${() => this.acceptOffer()}
        ></mwc-button>
      `;
        }
    }
    getScopedElements() {
        return {
            'mwc-button': Button,
            'mwc-circular-progress': CircularProgress,
        };
    }
}
OfferDetail.styles = [
    sharedStyles,
    css `
      :host {
        display: flex;
      }
    `,
];
__decorate([
    property({ type: String, attribute: 'offer-hash' })
], OfferDetail.prototype, "offerHash", void 0);
__decorate([
    property({ type: Boolean })
], OfferDetail.prototype, "_loading", void 0);
__decorate([
    property({ type: Boolean })
], OfferDetail.prototype, "_accepting", void 0);
__decorate([
    property({ type: Boolean })
], OfferDetail.prototype, "_rejecting", void 0);
__decorate([
    property({ type: Boolean })
], OfferDetail.prototype, "_canceling", void 0);
//# sourceMappingURL=offer-detail.js.map