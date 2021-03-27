import { html } from 'lit-html';
import { Card } from 'scoped-material-components/mwc-card';
import { connectDeps, DepsElement } from '@holochain-open-dev/common';
import { TransactionList } from './transaction-list';
import { sharedStyles } from './utils/shared-styles';
import { TransactorStore } from '../transactor.store';
import { TransactorDeps } from '../types';

export abstract class MyBalance extends DepsElement<TransactorDeps> {
  render() {
    const balance = Math.round(this.deps.store.myBalance * 100) / 100;
    return html`
      <div class="column center-content" style="flex: 1;">
        <span style="font-size: 24px; margin: 16px;">
          ${balance > 0 ? '+' : ''}${balance} credits
        </span>
        <mwc-card style="width: auto; flex: 1;">
          <transaction-list></transaction-list>
        </mwc-card>
      </div>
    `;
  }

  static get styles() {
    return sharedStyles;
  }

  getScopedElements() {
    return {
      'transaction-list': connectDeps(TransactionList, this.deps),
      'mwc-card': Card,
    };
  }
}
