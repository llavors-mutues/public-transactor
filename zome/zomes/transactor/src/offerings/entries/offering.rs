use hdk::prelude::*;
use holo_hash::AgentPubKeyB64;


#[hdk_entry(id = "offering", visibility = "public")]
#[derive(Clone)]
pub struct Offering {
    pub title: String,
    pub description: String,
    pub amount: f32,
    pub author_address: AgentPubKeyB64,
}

#[derive(Clone, Serialize, Deserialize, Debug, SerializedBytes)]
pub struct OfferingDTO {
    pub title: String,
    pub description: String,
    pub amount: f32,
}

impl Offering{

    pub fn get_author(&self)->AgentPubKeyB64{
        self.author_address.clone()
    }
    pub fn get_amount(&self)-> f32{
        self.amount.clone()
    }
    pub fn get_entry_hash(&self)->ExternResult<EntryHash>{
        hash_entry(self.clone())
    }
}