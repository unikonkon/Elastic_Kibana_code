POST /_sql?format=txt
{
  "query" : "describe act_document"
}


POST /_sql?format=txt
{
  "query" : "select * from act_company where name like '%นวภูมิการโยธา%'"
}


POST /_sql?format=csv
{
  "query" : "select * from act_company where name like '%นวภูมิการโยธา%'"
}


POST /_sql?format=json
{
  "query" : "select * from act_company where name like '%นวภูมิการโยธา%'"
}

POST /_sql?format=txt
{
  "query" : "select budgetYear,count() as totalproject from act_document where budgetYear between 2000 and 2024 group by budgetYear"
}

POST /_sql?format=txt
{
  "query" : "select count() from act_company",
  "fetch_size": 3
}
