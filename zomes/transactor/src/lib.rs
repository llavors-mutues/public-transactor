use hdk3::prelude::*;

mod offer;
mod transaction;
mod utils;

pub fn err(reason: &str) -> HdkError {
    HdkError::Wasm(WasmError::Zome(String::from(reason)))
}

pub fn defs() -> EntryDefs {
    vec![Path::entry_def(), offer::Offer::entry_def()].into()
}

#[hdk_extern]
fn entry_defs(_: ()) -> ExternResult<EntryDefsCallbackResult> {
    Ok(EntryDefsCallbackResult::Defs(defs()))
}
