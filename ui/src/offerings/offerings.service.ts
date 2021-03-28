import { Dictionary } from '@compository/lib';
import { AppWebsocket, CellId } from '@holochain/conductor-api';
import { CreateOfferingInput, Offering } from './types';

export class OfferingsService {
  constructor(
    public appWebsocket: AppWebsocket,
    public cellId: CellId,
    public zomeName = 'transactor'
  ) {}

  createOffering(offering: CreateOfferingInput): Promise<string> {
    return this.callZome('create_offering', offering);
  }
  async getAllOfferings(): Promise<Dictionary<Offering>> {
    const offerings: Array<[string, Offering]> = await this.callZome(
      'get_all_offerings',
      null
    );

    const result: Dictionary<Offering> = {};

    for (const offering of offerings) {
      result[offering[0]] = offering[1];
    }
    return result;
  }

  private callZome(fn_name: string, payload: any) {
    return this.appWebsocket.callZome({
      cap: null as any,
      cell_id: this.cellId,
      zome_name: this.zomeName,
      fn_name,
      payload,
      provenance: this.cellId[1],
    });
  }
}
