import { TransactorStore } from '../transactor.store';
import { OfferingsService } from './offerings.service';

export interface CreateOfferingInput {
  title: string;
  description: string;
  amount: number;
}
export interface Offering {
  title: string;
  description: string;
  amount: number;
  author_address: string;
}

export interface OfferingDeps {
  store: TransactorStore;
  offeringService: OfferingsService;
}
