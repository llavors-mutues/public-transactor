import { Constructor, LitElement } from 'lit-element';
import { TransactorStore } from '../../transactor.store';
import { Dictionary } from '@compository/lib';
declare const BaseElement_base: typeof LitElement & import("@open-wc/dedupe-mixin").Constructor<import("@open-wc/scoped-elements/types/src/types").ScopedElementsHost> & typeof import("@open-wc/scoped-elements/types/src/types").ScopedElementsHost;
export declare abstract class BaseElement extends BaseElement_base {
    connectedCallback(): void;
    abstract get transactorStore(): TransactorStore;
    getScopedElements(): Dictionary<Constructor<HTMLElement>>;
}
export declare function connectTransactor<T extends typeof BaseElement>(baseClass: T, store: TransactorStore): Constructor<HTMLElement>;
export {};
