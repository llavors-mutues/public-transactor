import { html, property, query } from 'lit-element';

import { TextField } from 'scoped-material-components/mwc-textfield';
import { TextArea } from 'scoped-material-components/mwc-textarea';
import { Button } from 'scoped-material-components/mwc-button';
import { Dialog } from 'scoped-material-components/mwc-dialog';
import { AgentProfile, SearchAgent } from '@holochain-open-dev/profiles';

import { sharedStyles } from '../../elements/utils/shared-styles';
import { Card } from 'scoped-material-components/mwc-card';
import { connectDeps, DepsElement } from '@holochain-open-dev/common';
import { OfferingDeps } from '../types';

export abstract class CreateOffering extends DepsElement<OfferingDeps> {
  /** Private properties */

  @property()
  _title!: string;
  @property()
  _description!: string;
  @property()
  _amount!: string;

  static styles = sharedStyles;

  get _createEnabled() {
    return this._title && this._description && this._amount;
  }

  async createOffering() {
    const amount = parseFloat(this._amount);

    await this.deps.offeringService.createOffering({
      amount,
      title: this._title,
      description: this._description,
    });
  }

  render() {
    return html`
      <mwc-card style="width: auto; flex: 1;">
        <div class="column" style="margin: 16px;">
          <span class="title" style="margin-bottom: 8px;"
            >Create New Proposal</span
          >

          <mwc-textfield
            style="padding-top: 16px; margin-bottom: 12px;"
            label="Title"
            id="title"
            required
            outlined
            @input=${(e: CustomEvent) => {
              this._title = (e.target as any)?.value as any;
            }}
          ></mwc-textfield>

          <mwc-textfield
            style="padding-top: 16px; margin-bottom: 12px;"
            label="Description"
            id="description"
            required
            outlined
            @input=${(e: CustomEvent) => {
              this._description = (e.target as any)?.value as any;
            }}
          ></mwc-textfield>

          <mwc-textfield
            style="padding-top: 16px; margin-bottom: 12px;"
            label="Amount"
            type="number"
            id="amount"
            min="0.1"
            step="0.1"
            required
            autoValidate
            outlined
            @input=${(e: CustomEvent) => {
              this._amount = (e.target as any)?.value as any;
            }}
          ></mwc-textfield>

          <mwc-button
            style="margin-top: 12px;"
            raised
            label="CREATE OFFERING"
            .disabled=${!this._createEnabled}
            @click=${() => this.createOffering()}
          ></mwc-button>
        </div>
      </mwc-card>
    `;
  }

  getScopedElements() {
    return {
      'mwc-textfield': TextField,
      'mwc-textarea': TextArea,
      'mwc-card': Card,
      'mwc-button': Button,
      'mwc-dialog': Dialog,
      'search-agent': connectDeps(SearchAgent, this.deps.store.profilesStore),
    };
  }
}
