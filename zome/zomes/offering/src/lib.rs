use hdk::prelude::*;
mod entries;
mod all_offerings_anchor;

use all_offerings_anchor::ALL_OFFER_ANCHOR;

use entries::offering::{

    Offering,
    OfferingDTO
};


pub fn err(reason: &str) -> WasmError {
    WasmError::Guest(String::from(reason))
}

entry_defs![
    Path::entry_def(), 
    entries::offering::Offering::entry_def()    
]; 

// TODO

#[hdk_extern]
fn create_offering(input:OfferingDTO) -> ExternResult<HeaderHash>{

    let offering_entry = Offering{

        title: input.title,
        description: input.description,
        amount: input.amount,
        author_address: agent_info()?.agent_latest_pubkey,
    };
    
    // create new entry
    let offering_header_hash: HeaderHash = create_entry(offering_entry.clone())?;
    let offering_entry_hash: EntryHash = hash_entry(offering_entry)?;

    // create link from all_offerings_anchor->new_entry
    let all_offerings_path_entry_hash: EntryHash = get_all_offering_path_entry_hash()?;

    create_link(
        all_offerings_path_entry_hash,
        offering_entry_hash,
        LinkTag::new("offering")
    )?;

    Ok(offering_header_hash)
}
#[hdk_extern]
fn get_all_offerings(_:())-> ExternResult<()>{ //entries::offering::AllOffersResultDTO

    let all_offerings_path_entry_hash: EntryHash = get_all_offering_path_entry_hash()?;
    
    // query all entries based on all_offerings_anchor
    let linked_offerings: Vec<Link> = get_links(all_offerings_path_entry_hash, Some(LinkTag::new("offering")))?.into_inner();

    for _link in linked_offerings.into_iter(){





    }

    Ok(())
}

//helper function 

pub fn get_all_offering_path_entry_hash()->ExternResult<EntryHash>{

    let all_offerings_path:Path = Path::from(ALL_OFFER_ANCHOR);
    all_offerings_path.ensure()?;
    let all_offerings_path_entry_hash: EntryHash = all_offerings_path.hash()?;

    return Ok(all_offerings_path_entry_hash);
}





// TODO 
// fn get_all_offerings() -> Vec<entries::offering::AllOffersResultDTO>{
// // loop on each item, add new item to list of AllOffersResultDTO
// }



// TODO: Validation Rules for later not today
