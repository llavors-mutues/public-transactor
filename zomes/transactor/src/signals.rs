use crate::{offer::Offer, transaction::Transaction};
use hdk3::prelude::*;

#[derive(Serialize, Deserialize, Debug)]
pub enum SignalType {
    OfferReceived(Offer),
    OfferAccepted(Transaction),
}
