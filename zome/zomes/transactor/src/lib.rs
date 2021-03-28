use hdk::prelude::*;

mod offer;
mod signals;
mod transaction;
mod offerings;
mod utils;

pub fn err(reason: &str) -> WasmError {
    WasmError::Guest(String::from(reason))
}

entry_defs![
    Path::entry_def(),
    offer::Offer::entry_def(),
    transaction::Transaction::entry_def(),
    offerings::entries::offering::Offering::entry_def()    
];

#[hdk_extern]
pub fn init(_: ()) -> ExternResult<InitCallbackResult> {
    let mut functions = GrantedFunctions::new();
    functions.insert((zome_info()?.zome_name, "receive_offer".into()));

    let grant = ZomeCallCapGrant {
        access: CapAccess::Unrestricted,
        functions,
        tag: "".into(),
    };
    create_cap_grant(grant)?;

    functions = GrantedFunctions::new();
    functions.insert((zome_info()?.zome_name, "notify_accepted_offer".into()));

    let grant2 = ZomeCallCapGrant {
        access: CapAccess::Unrestricted,
        functions,
        tag: "".into(),
    };
    create_cap_grant(grant2)?;

    Ok(InitCallbackResult::Pass)
}
