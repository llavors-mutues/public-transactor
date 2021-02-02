use crate::{offer::Offer, transaction::Transaction};
use hdk3::prelude::*;

#[derive(Serialize, Deserialize, SerializedBytes)]
pub enum SignalType {
    OfferReceived(Offer),
    OfferAccepted(Transaction),
}
