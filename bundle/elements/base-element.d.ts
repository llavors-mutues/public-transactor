import { Constructor, LitElement } from 'lit-element';
import { PublicTransactorService } from '../public-transactor.service';
declare const BaseElement_base: Constructor<LitElement> & Constructor<{
    membraneContext: import("@holochain-open-dev/membrane-context").MembraneContext;
}>;
export declare class BaseElement extends BaseElement_base {
    get _transactorService(): PublicTransactorService;
}
export {};
