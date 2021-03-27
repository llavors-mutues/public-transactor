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

  renderOfferingsList() {
    if (Object.keys(this._offerings).length === 0)
      return html`<div class="padding">
        <span class="placeholder">There are no offerings yet</span>
      </div>`;

    return html`
      <mwc-list style="width: 100%;">
        ${Object.entries(this._offerings).map(
          ([offeringHash, offering], i) => html`
            <div class="row" style="align-items: center;">
              <mwc-list-item
                twoline
                noninteractive
                graphic="avatar"
                style="flex: 1;"
                @click=${() => (this._selectedOfferingHash = offeringHash)}
              >
                <span> ${offering.title} </span>
                <span slot="secondary">
                  ${this.deps.store.profilesStore.profileOf(
                    offering.author_address
                  )}
                </span>
              </mwc-list-item>

              <span style="font-size: 20px; margin: 0 24px;">
                ${offering.amount} credits
              </span>
            </div>
            ${i < Object.entries(this._offerings).length - 1
              ? html`<li divider padded role="separator"></li> `
              : html``}
          `
        )}
      </mwc-list>
    `;
  }

  renderContent() {
    if (this._loading)
      return html`
        <div class="padding center-content column">
          <mwc-circular-progress indeterminate></mwc-circular-progress>
          <span class="placeholder" style="margin-top: 18px;"
            >Fetching offerings...</span
          >
        </div>
      `;

    return html`
      <mwc-card style="width: auto; flex: 1;">
        <div class="row" style="flex: 1;">
          ${this.renderOfferingsList()}
          <span class="vertical-divider"></span>
          ${this._selectedOffering
            ? html`
                <div class="column">
                  <span class="item">${this._selectedOffering.title}</span>
                  <span class="item"
                    >${this._selectedOffering.description}</span
                  >
                  <span class="item"
                    >By
                    ${this.deps.store.profilesStore.profileOf(
                      this._selectedOffering.author_address
                    )},
                    Agend ID: ${this._selectedOffering.author_address}
                  </span>
                  <mwc-button
                    raised
                    label="TAKE"
                    @click=${() => {
                      this.deps.store.createOffer(
                        this._selectedOffering?.author_address as string,
                        this._selectedOffering?.amount as number
                      );
                    }}
                  >
                  </mwc-button>
                </div>
              `
            : html`<div class="fill center-content">
                <span class="placeholder" style="margin: 16px;"
                  >Select an offering to see its details</span
                >
              </div>`}
        </div>
      </mwc-card>
    `;
  }

  render() {
    return html`<div class="column center-content">
      ${this.renderContent()}
    </div>`;
  }
  getScopedElements() {
    return {
      'mwc-circular-progress': CircularProgress,
      'mwc-icon': Icon,
      'mwc-button': Button,
      'mwc-list-item': ListItem,
      'mwc-list': List,
    };
  }
}
