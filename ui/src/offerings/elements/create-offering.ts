import { html, property, query } from 'lit-element';

import { TextField } from 'scoped-material-components/mwc-textfield';
import { Button } from 'scoped-material-components/mwc-button';
import { Dialog } from 'scoped-material-components/mwc-dialog';
import { AgentProfile, SearchAgent } from '@holochain-open-dev/profiles';

import { sharedStyles } from '../../elements/utils/shared-styles';
import { Card } from 'scoped-material-components/mwc-card';
import { connectDeps, DepsElement } from '@holochain-open-dev/common';
import { OfferingDeps } from '../types';

export abstract class CreateOffering extends DepsElement<OfferingDeps> {
  /** Private properties */

  @query('#title')
  _titleField!: TextField;
  @query('#description')
  _descriptionField!: TextField;
  @query('#amount')
  _amountField!: TextField;

  static styles = sharedStyles;

  get _createEnabled() {
    return (
      this._titleField &&
      this._titleField.value &&
      this._descriptionField &&
      this._descriptionField.value &&
      this._amountField &&
      this._amountField.value
    );
  }

  async createOffering() {
    const amount = parseFloat(this._amountField.value);

    await this.deps.offeringService.createOffering({
      amount,
      title: this._titleField.value,
      description: this._descriptionField.value,
    });
  }

  render() {
    return html`
      <mwc-card style="width: auto; flex: 1;">
        <div class="column" style="margin: 16px;">
          <span class="title" style="margin-bottom: 8px;"
            >Create New Offering</span
          >

          <mwc-textfield
            style="padding-top: 16px; margin-bottom: 16px;"
            label="Title"
            id="title"
            required
            outlined
          ></mwc-textfield>

          <mwc-textfield
            style="padding-top: 16px; margin-bottom: 16px;"
            label="Description"
            id="description"
            required
            outlined
          ></mwc-textfield>

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
            label="CREATE OFFERING"
            .disabled=${!this._createEnabled}
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
      'search-agent': connectDeps(SearchAgent, this.deps.store.profilesStore),
    };
  }
}
