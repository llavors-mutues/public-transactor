use hc_utils::{WrappedAgentPubKey, WrappedEntryHash};
use hdk3::prelude::*;

use crate::{transaction, utils};

#[hdk_entry(id = "offer", visibility = "private")]
#[derive(Clone)]
pub struct Offer {
    pub spender_pub_key: WrappedAgentPubKey,
    pub recipient_pub_key: WrappedAgentPubKey,
    pub amount: f64,
}

#[derive(Serialize, Deserialize, SerializedBytes)]
pub struct CreateOfferInput {
    recipient_pub_key: WrappedAgentPubKey,
    amount: f64,
}
#[hdk_extern]
pub fn create_offer(input: CreateOfferInput) -> ExternResult<WrappedEntryHash> {
    let agent_info = agent_info()?;

    let offer = Offer {
        spender_pub_key: WrappedAgentPubKey(agent_info.agent_latest_pubkey),
        amount: input.amount,
        recipient_pub_key: input.recipient_pub_key.clone(),
    };

    let my_offer_hash = internal_create_offer(&offer)?;

    let _offer_hash: WrappedEntryHash = call_remote(
        input.recipient_pub_key.0,
        zome_info()?.zome_name,
        "receive_offer".into(),
        None,
        &offer,
    )?;

    Ok(my_offer_hash)
}

#[hdk_extern]
pub fn receive_offer(offer: Offer) -> ExternResult<WrappedEntryHash> {
    internal_create_offer(&offer)
}

#[hdk_extern]
pub fn accept_offer(offer_hash: WrappedEntryHash) -> ExternResult<WrappedEntryHash> {
    let maybe_offer = query_offer(offer_hash.0)?;

    let offer = maybe_offer.ok_or(crate::err("Offer not found"))?;

    let entry_hash = transaction::create_transaction_for_offer(offer)?;

    Ok(WrappedEntryHash(entry_hash))
}

#[derive(Clone, Serialize, Deserialize, SerializedBytes)]
pub struct HashedOffer {
    hash: WrappedEntryHash,
    content: Offer,
}
#[derive(Clone, Serialize, Deserialize, SerializedBytes)]
pub struct QueryMyPendingOffersOutput(Vec<HashedOffer>);
#[hdk_extern]
pub fn query_my_pending_offers(_: ()) -> ExternResult<QueryMyPendingOffersOutput> {
    let offers_elements = query_all_offers()?;

    let offers: Vec<HashedOffer> = offers_elements
        .into_iter()
        .map(|element| {
            let offer = utils::try_from_element(element.clone())?;
            Ok(HashedOffer {
                hash: WrappedEntryHash(element.header().entry_hash().unwrap().clone()),
                content: offer,
            })
        })
        .collect::<ExternResult<Vec<HashedOffer>>>()?;

    Ok(QueryMyPendingOffersOutput(offers))
}

/** Helper functions */
fn internal_create_offer(offer: &Offer) -> ExternResult<WrappedEntryHash> {
    create_entry(offer)?;

    let offer_hash = hash_entry(offer)?;
    Ok(WrappedEntryHash(offer_hash))
}

fn offer_entry_type() -> ExternResult<AppEntryType> {
    let defs = crate::defs();
    let entry_def_position = defs
        .entry_def_id_position(EntryDefId::App("offer".into()))
        .unwrap() as u8;
    Ok(AppEntryType::new(
        entry_def_position.into(),
        zome_info()?.zome_id,
        EntryVisibility::Private,
    ))
}

fn query_all_offers() -> ExternResult<Vec<Element>> {
    let filter = ChainQueryFilter::new()
        .entry_type(EntryType::App(offer_entry_type()?))
        .include_entries(true);
    let query_result = query(filter)?;

    Ok(query_result.0)
}

fn query_offer(offer_hash: EntryHash) -> ExternResult<Option<Offer>> {
    let all_offers = query_all_offers()?;

    let maybe_offer_element = all_offers.into_iter().find(|offer_element| {
        let maybe_entry_hash = offer_element.header().entry_hash();
        maybe_entry_hash.is_some() && maybe_entry_hash.unwrap().eq(&offer_hash)
    });

    match maybe_offer_element {
        None => Ok(None),
        Some(offer_element) => utils::try_from_element(offer_element).map(|o| Some(o)),
    }
}
