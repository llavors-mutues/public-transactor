use hdk::prelude::*;
mod entries;
mod all_offerings_anchor;

pub fn err(reason: &str) -> WasmError {
    WasmError::Guest(String::from(reason))
}

entry_defs![
    Path::entry_def(), /// define path
    entries::offering::Offering::entry_def(), // define offering entry
    entires::   /// define anchor 
]; 

// TODO
fn create_offering(OfferingDTO) -> Result<HeaderHash>{
 /// create new entry
 /// create link from all_offerings_anchor->new_entry
// return HeaderHash
}
 /// 



/// TODO 
fn get_all_offerings() -> Vec<entries::offering::AllOffersResultDTO>{
// query all entries based on all_offerings_anchor
// loop on each item, add new item to list of AllOffersResultDTO
}



// TODO: Validation Rules for later not today
