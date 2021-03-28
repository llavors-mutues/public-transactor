import { MobxReactionUpdate } from '@adobe/lit-mobx';
import { BaseElement, DepsElement } from '@holochain-open-dev/common';
import { TransactorStore } from '../../transactor.store';

export abstract class TransactorElement
  extends MobxReactionUpdate(BaseElement)
  implements DepsElement<{ store: TransactorStore }> {
  abstract get _deps(): { store: TransactorStore };
}
