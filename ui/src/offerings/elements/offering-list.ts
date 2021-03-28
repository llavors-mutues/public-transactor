import { LitElement, property, html, PropertyValues } from 'lit-element';
import { DepsElement } from '@holochain-open-dev/common';

import { List } from 'scoped-material-components/mwc-list';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';

import { Icon } from 'scoped-material-components/mwc-icon';
import { ListItem } from 'scoped-material-components/mwc-list-item';
import { Offering, OfferingDeps } from '../types';
import { Dictionary } from '@compository/lib';
import { sharedStyles } from '../../elements/utils/shared-styles';
import { Button } from 'scoped-material-components/mwc-button';
import { Card } from 'scoped-material-components/mwc-card';

export abstract class OfferingList extends DepsElement<OfferingDeps> {
  /** Public attributes */

  /** Private properties */

  @property({ type: Boolean })
  _loading = true;

  @property({ type: Object })
  _offerings!: Dictionary<Offering>;

  @property({ type: String })
  _selectedOfferingHash: string | undefined;

  static styles = sharedStyles;

  async firstUpdated() {
    this._offerings = await this.deps.offeringService.getAllOfferings();
    await this.deps.store.profilesStore.fetchAllProfiles();

    this._loading = false;
  }

  get _selectedOffering(): Offering | undefined {
    return this._selectedOfferingHash
      ? this._offerings[this._selectedOfferingHash]
      : undefined;
  }

  get _offeringsFromOthers(): Array<[string, Offering]> {
    return this._offerings
      ? Object.entries(this._offerings).filter(
          ([_, o]) => o.author_address !== this.deps.store.myAgentPubKey
        )
      : [];
  }

  renderOfferingsList() {
    if (this._offeringsFromOthers.length === 0)
      return html`<div class="fill padding center-content">
        <span class="placeholder">There are no proposals yet</span>
      </div>`;

    return html`
      <mwc-list style="width: 100%;">
        ${this._offeringsFromOthers.map(
          ([offeringHash, offering], i) => html`
            <div class="row center-content" style="flex: 1;">
              <mwc-list-item
                twoline
                style="flex: 1;"
                @click=${() => (this._selectedOfferingHash = offeringHash)}
              >
                <span> ${offering.title} </span>
                <span slot="secondary">
                  ${this.deps.store.profilesStore.profileOf(
                    offering.author_address
                  ).nickname}
                </span>
              </mwc-list-item>

              <span style="margin-right: 24px;">
                ${Math.round(offering.amount * 100) / 100} credits
              </span>
            </div>
            ${i < this._offeringsFromOthers.length - 1
              ? html`<li divider padded role="separator"></li> `
              : html``}
          `
        )}
      </mwc-list>
    `;
  }

  renderOfferingDetail(offering: Offering) {
    return html`
      <div class="column padding fill">
        <span class="item" style="font-size: 22px;">${offering.title}</span>
        <p class="item">${offering.description}</p>
        <span class="item"
          >By
          ${this.deps.store.profilesStore.profileOf(offering.author_address)
            .nickname}
        </span>
        <span style="flex: 1;">
          Agent ID: ${offering.author_address.substring(0, 15)}...
        </span>
        <mwc-button
          raised
          label="TAKE"
          @click=${() => {
            this.deps.store.createOffer(
              offering.author_address,
              offering.amount
            );
          }}
        >
        </mwc-button>
      </div>
    `;
  }

  render() {
    if (this._loading)
      return html`
        <div class="padding center-content column fill">
          <mwc-circular-progress indeterminate></mwc-circular-progress>
          <span class="placeholder" style="margin-top: 18px;"
            >Fetching proposals...</span
          >
        </div>
      `;

    return html`
      <mwc-card class="fill">
        <div class="column" style="flex: 1;">
          <span class="title" style="margin-top: 16px; margin-left: 16px;"
            >All Proposals</span
          >
          <div class="row" style="flex: 1;">
            <div class="fill column">${this.renderOfferingsList()}</div>
            <span class="vertical-divider"></span>
            <div class="fill column">
              ${this._selectedOffering
                ? this.renderOfferingDetail(this._selectedOffering)
                : html` <div class="fill center-content">
                    <span class="placeholder" style="margin: 16px;"
                      >Select a proposal to see its details</span
                    >
                  </div>`}
            </div>
          </div>
        </div>
      </mwc-card>
    `;
  }

  getScopedElements() {
    return {
      'mwc-circular-progress': CircularProgress,
      'mwc-icon': Icon,
      'mwc-button': Button,
      'mwc-list-item': ListItem,
      'mwc-list': List,
      'mwc-card': Card,
    };
  }
}
