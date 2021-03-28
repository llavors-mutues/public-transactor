use hdk::prelude::*;
pub mod entries;
mod all_offerings_anchor;
use holo_hash::EntryHashB64;
use holo_hash::AgentPubKeyB64;

use all_offerings_anchor::OFFERING_PATH;

use entries::offering::{
    Offering,
    OfferingDTO
};

// TODO

#[hdk_extern]
fn create_offering(input:OfferingDTO) -> ExternResult<HeaderHash>{

    let offering_entry = Offering{

        title: input.title,
        description: input.description,
        amount: input.amount,
        author_address: AgentPubKeyB64::from(agent_info()?.agent_latest_pubkey),
    };
    
    // create new entry
    let offering_header_hash: HeaderHash = create_entry(offering_entry.clone())?;
    let offering_entry_hash: EntryHash = hash_entry(offering_entry)?;

    // create link from all_offerings_anchor->new_entry
    let all_offerings_path_entry_hash: EntryHash = get_all_offering_path_entryhash()?;

    create_link(
        all_offerings_path_entry_hash,
        offering_entry_hash,
        LinkTag::new("offering")
    )?;

    Ok(offering_header_hash)
}
#[hdk_extern]
fn get_all_offerings(_:())-> ExternResult<Vec<(EntryHashB64, Offering)>>{ //entries::offering::AllOffersResultDTO

    let all_offerings_path_entry_hash: EntryHash = get_all_offering_path_entryhash()?;

    let mut all_offerings_entries: Vec<(EntryHashB64, Offering)> = Vec::new(); 
    
    // query all entries based on all_offerings_anchor
    let linked_offerings: Vec<Link> = get_links(all_offerings_path_entry_hash, Some(LinkTag::new("offering")))?.into_inner();

    for link in linked_offerings.into_iter(){

        match get(link.target.clone(), GetOptions::content())?{

            Some(element) =>{

                let offering_option: Option<Offering> = element.entry().to_app_option()?;

                match offering_option{

                    Some(offering_entry)=> {


                        all_offerings_entries.push((EntryHashB64::from(link.target), offering_entry));
                    },
                    None =>{},
                }
            },
            None =>{},
        }
    }
    Ok(all_offerings_entries)
}

//helper function 

pub fn get_all_offering_path_entryhash()->ExternResult<EntryHash>{

    let all_offerings_path:Path = Path::from(OFFERING_PATH);
    all_offerings_path.ensure()?;
    let all_offerings_path_entry_hash: EntryHash = all_offerings_path.hash()?;

    return Ok(all_offerings_path_entry_hash);
}





// TODO 
// fn get_all_offerings() -> Vec<entries::offering::AllOffersResultDTO>{
// // loop on each item, add new item to list of AllOffersResultDTO
// }



// TODO: Validation Rules for later not today
