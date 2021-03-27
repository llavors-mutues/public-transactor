use hdk::prelude::*;



#[hdk_entry(id = "offering", visibility = "public")]
#[derive(Clone)]
#[serde(rename_all = "camelCase")]
pub struct Offering {
    pub title: String,
    pub description: String,
    pub amount: u32,
    pub author_address: AgentPubKey,
}

#[derive(Clone, Serialize, Deserialize, Debug, SerializedBytes)]
#[serde(rename_all = "camelCase")]
pub struct OfferingDTO {
    pub title: String,
    pub description: String,
    pub amount: u32,
}

#[derive(Clone, Serialize, Deserialize, Debug, SerializedBytes)]
#[serde(rename_all = "camelCase")]
pub struct AllOffersResultDTO{
    pub offer_address:EntryHash,
    pub amount:u32,
    pub author_address:AgentPubKey,
 }


impl Offering{

    pub fn get_author(&self)->AgentPubKey{
        self.author_address.clone()
    }
    pub fn get_amount(&self)-> u32{
        self.amount.clone()
    }
    pub fn get_entry_hash(&self)->ExternResult<EntryHash>{
        hash_entry(self.clone())
    }
}