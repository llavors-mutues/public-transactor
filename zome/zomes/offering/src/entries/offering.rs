
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
    offer_address:EntryHash,
    amount:u32,
    author_address:AgentPubKey,
 }


impl Offering{
    pub fn new()->Self{
        /// todo
    }
}