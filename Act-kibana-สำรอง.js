GET /act_document/_search
{
  "size": 1000,
  "query": {
    "bool": {
      "must": [
        {
          "nested": {
            "path": "fullInfo.winner",
            "query": {
              "match_phrase": {
                "fullInfo.winner.id.keyword": "0943552000218"
              }
            }
          }
        }
      ]
    }
  }
}

GET /act_document/_search
{
  "size": 1000,
  "query": {
    "bool": {
      "must": [
        {
          "nested": {
            "path": "fullInfo.auction",
            "query": {
              "match_phrase": {
                "fullInfo.auction.companyInfo.name": "บริษัท ทาลอนเน็ต จำกัด"
              }
            }
          }
        }
      ]
    }
  }
}


GET /act_document/_search
{
  "size": 1000,
  "_source": [
    "documents.information.data.ชื่อผู้เสนอราคา",
    "priceBuild",
    "documents.information.data.ราคาที่เสนอ",
    "budgetYear"
  ],
   "sort": [{"budgetYear": "asc"}], 
  "query": {
    "bool": {
      "must": [
        {
          "nested": {
            "path": "fullInfo.auction",
            "query": {
              "match_phrase": {
                "fullInfo.auction.companyInfo.name": "ทาลอนเน็ต"
              }
            }
          }
        }
      ]
    }
    
  }
}

GET /act_document/_search
{
  "size": 0,
  "query": {
    "bool": {
      "must": [
        {
          "exists": {
            "field": "winnerName"
          }
        },
        {
          "exists": {
            "field": "winnerPrice"
          }
        },
        {
          "nested": {
            "path": "fullInfo.auction",
            "query": {
              "exists": {
                "field": "fullInfo.auction"
              }
            }
          }
        }
      ],
      "must_not": [
        {
          "match": {
            "processed": 4
          }
        },
        {
          "match_phrase": {
            "methodId": "19"
          }
        },
        {
          "match_phrase": {
            "methodId": "01"
          }
        },
        {
          "match_phrase": {
            "projectMoney": {
              "query": 0
            }
          }
        }
      ]
    }
  },
  "_source": {
    "includes": [
      "projectId",
      "departmentName",
      "projectName",
      "projectMoney",
      "fullInfo",
      "announceType",
      "method",
      "winnerName",
      "winnerPrice"
    ]
  }
}



GET /act_document/_search
{
  "size": 0,
  "query": {
    "_source": {
      "includes": [
        "projectId",
        "departmentName",
        "projectName",
        "projectMoney",
        "fullInfo",
        "announceType",
        "method",
        "winnerName",
        "winnerPrice"
      ]
    },
    "query": {
      "bool": {
        "must": [
          {
            "exists": {
              "field": "winnerName"
            }
          },
          {
            "exists": {
              "field": "winnerPrice"
            }
          },
          {
            "nested": {
              "path": "fullInfo.auction",
              "query": {
                "exists": {
                  "field": "fullInfo.auction"
                }
              }
            }
          },
          {
            "match": {
              "_id": "65097174858"
            }
          }
        ],
        "must_not": [
          {
            "match": {
              "processed": 4
            }
          },
          {
            "match_phrase": {
              "methodId": "19"
            }
          },
          {
            "match_phrase": {
              "
              ": "01"
            }
          },
          {
            "match_phrase": {
              "projectMoney": {
                "query": 0
              }
            }
          }
        ]
      }
    }
  }
}

POST /act_document/_update/62117209576
{
  "doc": {
    "priceBuild" : "จัดทำสัญญา/PO แล้ว"
  }
}

GET /act_document/_search
{
  "size": 1000,
  "query": {
    "bool": {
      "must": [
        {
          "nested": {
            "path": "fullInfo.winner",
            "query": {
              "match_phrase": {
                "fullInfo.winner.id.keyword": "0943552000218"
              }
            }
          }
        }
      ]
    }
  }
}

GET /act_company/_search
{
  "size": 1000,
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "name": "บริษัท ทาลอนเน็ต จำกัด"
          }
        }
      ]
    }
  }
}


GET /act_company/_search
{
  "size": 1000,
  "query": {
   "exists": {
      "field": "id.keyword"
    }
  }
}

GET /act_company/_search
{
  "query": {
    "match": {
      "id.keyword": "65047176657"
    }
  }
}




GET /act_document/_search
{
  "size": 1000,
  "from": 40,
  "sort": [
    {
      "projectId": {
        "order": "asc"
      }
    }
  ], 
  "query": {
    "bool": {
      "must": [
        {
          "range": {
            "announceDate": {
              "gte": "2023-01-01T00:00:00.000Z",
              "lte": "2023-06-08T00:00:00.000Z"
            }
          }
        }
      ]
    }
  }
}

GET /act_document/_search
{
  "size": 1000,
  "query": {
    "match_all": {}
  }
}

GET /act_company/_search
{
  "size": 0,
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "name.keyword": "วีรวุฒิ"
          }
        }
      ]
    }
  }
}




GET /act_document/_search
{
  "size": 0,
  "skip": 40,
  "query": {
    "bool": {
      "must": [
        {
          "nested": {
            "path": "fullInfo.winner",
            "query": {
              "match_phrase": {
                "fullInfo.winner.companyInfo.name": "วีรวุฒิ คอนกรีต"
              }
            }
          }
        },
        {
          "exists": {
            "field": "announceDate"
          }
        }
      ]
    }
  },
  "aggs": {
    "date": {
      "date_histogram": {
        "field": "announceDate",
        "format": "yyyy", 
        "interval": "year"
      },
      "aggs": {
        "sum": {
          "sum": {
            "field": "winnerPrice"
          }
        }
      }
    }
  }
}

GET /act_document/_search
{
  "size": 1000,
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "winnerName": "วีรวุฒิ คอนกรีต"
          }
        }
      ]
    }
  },
  "aggs": {
    "date": {
      "date_histogram": {
        "field": "announceDate",
        "format": "yyyy", 
        "interval": "year"
      },
      "aggs": {
        "sum": {
          "sum": {
            "field": "winnerPrice"
          }
        }
      }
    }
  }
}

GET /act_company/_search
{
  "size": 1000,
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "name": "บริษัท ปากน้ำโพ วีรวุฒิ จำกัดชั่น"
          }
        }
      ]
    }
  }
}


GET /act_document/_search
{
  "size": 1000,
  "query": {
    "bool": {
      "must": [
        {
          "nested": {
          "path": "fullInfo.winner",
          "query": {
            "match_phrase": {
              "fullInfo.winner.id.keyword": "0943552000218"
            }
          }
        }
        }
      ]
    }
  }
}

GET /act_document/_search
{
  "track_total_hits": true,
  "query": {
    "bool": {
      "must_not": [
        {
          "match": {
            "isCorruptPredictionPositive": "normal"
          }
        },
        {
          "match": {
            "isCorruptPredictionPositive": "overProfit"
          }
        },
        {
          "match": {
            "isCorruptPredictionPositive": "bidRigging"
          }
        },
        {
          "match": {
            "isCorruptPredictionPositive": "failCorruption"
          }
        },
        {
          "match": {
            "isCorruptPredictionPositive": "unknown"
          }
        }
      ]
    }
  }
}

GET /act_document/_search
{
  "track_total_hits": true,
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "isCorruptPredictionPositive": "normal" 
          }
        }
      ]
    }
  }
}

GET /act_document/_search
{
  "track_total_hits": true,
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "isCorruptPredictionPositive": "normal"
          }
        }
      ]
    }
  }
}

GET /act_document/_search
{
  "track_total_hits": true,
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "isCorruptPredictionPositive": "bidRigging"
          }
        }
      ]
    }
  }
}

GET /act_document/_search
{
  "track_total_hits": true,
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "isCorruptPredictionPositive": "MultiContracts"
          }
        },
        
        {
          "match": {
            "method.raw": "สอบราคา"
          }
        }
      ],
      "must_not": [
        {
          "match_phrase": {
            "projectMoney": {
              "query": 0
            }
          }
        }
      ]
    }
  }
}

GET /act_document/_search
{
  "track_total_hits": true,
    "size": 100,
  "query": {
    "bool": {
      "must_not": [
       {
          "exists": {
            "field": "documents"
          }
        }
      ]
    }
  }
}

GET /act_document/_search
{
  "track_total_hits": true,
  "query": {
    "bool": {
      "must": [
        {
          "exists": {
            "field": "winnerName"
          }
        },
        {
          "exists": {
            "field": "winnerPrice"
          }
        }
      ], 
      "must_not": [
        {
          "match_phrase": {
            "projectMoney": {
              "query": 0
            }
          }
        },
         {
          "match": {
            "isCorruptPredictionPositive": "MultiContracts"
          }
        }
      ]
    }
  }
}

GET /act_document/_search
{
  "track_total_hits": true,
  "query": {
    "bool": {
      "must": [
       
      
         {
          "match": {
            "isCorruptPredictionPositive": "MultiContracts"
          }
        }
      ]
    }
  }
}

GET /act_document/_search
{
  "track_total_hits": true,
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "isCorruptPredictionPositive": "unknown"
          }
        }
      ]
    }
  }
}

GET /act_document/_search
{
  "size": 1000,
  "query": {
    "match": {
      "projectId": "65047176657"
    }
  }
}




GET /act_document/_search
{
  "from": 0,
      "size": 0,
      "query": {
        "bool": {
          "must": [
            {
              "bool": {
                "should": [
                  {
                    "match_phrase": {
                      "isCorruptPredictionPositive.keyword": "failCorruption"
                    }
                  },
                  {
                    "match_phrase": {
                      "isCorruptPredictionPositive.keyword": "bidRigging"
                    }
                  },
                  {
                    "match_phrase": {
                      "isCorruptPredictionPositive.keyword": "overProfit"
                    }
                  }
                ],
                "minimum_should_match": 1
              }
            },
            {
              "nested": {
                "path": "fullInfo.winner",
                "query": {
                  "query_string": {
                    "fields": ["fullInfo.winner.companyInfo.name"],
                    "query": "this.replaceCompanyPrefix(term)",
                    "minimum_should_match": "100%"
                  }
                }
              }
            }
          ],
          "must_not": [
            {
              "match_phrase": {
                "departmentName.raw": {
                  "query": ""
                }
              }
            }
          ]
        }
      },
      "aggs": {
        "byDepartment": {
          "terms": {
            "field": "departmentName.raw",
            "size": 1000
          },
          "aggs": {
            "nestedAuction": {
              "nested": {
                "path": "fullInfo.auction"
              },
              "aggs": {
                "byAuction": {
                  "terms": {
                    "field": "fullInfo.auction.ชื่อผู้เสนอราคา.keyword",
                    "size": 1000
                  }
                }
              }
            }
          }
        }
      }
}

POST /act_company/_update/0105551048569
{
  "doc": {
    "address" : "368 หมู่ที่ 6 ต.บ่อวิน อ.ศรีราชา จ.ชลบุรี"
  }
}

POST /act_document/_update/61027127812
{
  "doc": {
    "processed" : "1 จ.ชลบุรี"
  }
}





GET /act_document/_search
{
  "query": {
   "bool": {
      "must_not": [
            {"match": {
                "processed": 4
                }
        }
        ]
   }
  }
}

{
          "nested": {
            "path": "fullInfo.winner",
            "query": {
              "query_string": {
                "fields": ["fullInfo.winner.companyInfo.name"],
                "query": "บริษัท ปากน้ำโพ วีรวุฒิ จำกัด"
              }
            }
          }
        }

GET /act_document/_search
{
  "track_total_hits": true,
  "size": 100,
  "query": {
    "bool": {
      "must": [
        {
          "nested": {
            "path": "fullInfo.auction",
            "query": {
              "query_string": {
                "fields": [
                  "fullInfo.auction.ชื่อผู้เสนอราคา"
                ],
                "query": "บริษัท ปากน้ำโพ วีรวุฒิ จำกัด"
              }
            }
          }
        }
      ],
      "must_not": [
        {
          "match_phrase": {
            "departmentName.raw": {
              "query": ""
            }
          }
        }
      ]
    }
  },
  "aggs": {
    "groupByDate": {
      "date_histogram": {
        "field": "announceDate",
        "interval": "1y"
      }
    }
  }
}


GET /act_document/_search
{
  "query": {
   
      "match": [
        {
          "projectId": "58025180721"
        }
      ]
    
  }
}

GET /act_document/_search
{
  "size": 0,
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "winnerName": "บุรีรัมย์ ดี แอนด์ บี"
          }
        },
        {
          "nested": {
            "path": "fullInfo.auction",
            "query": {
              "match_phrase": {
                "fullInfo.auction.name": "บุรีรัมย์ ดี แอนด์ บี"
              }
            }
          }
        }
      ],
      "must_not": [
        {
          "exists": {
            "field": "fullInfo.auction"
          }
        }
      ]
    }
  }
}







POST /act_document/_update/57125214123
{
  "script": {
    "source": "ctx._source.fullInfo.auction[2]['ราคาที่เสนอ'] = 1730000",
    "lang": "painless"
  }
}



POST /act_document/_update/57125214123
{
  "script": {
    "source": "ctx._source.sumPriceAgree = 1397000",
    "lang": "painless"
  }
}











GET /act_document/_search
{
  "size": 100,
  "query": {
    "bool": {
      "must": [
        {
          "script": {
            "script": {
              "source": "doc.containsKey('priceBuild') && doc.containsKey('projectMoney') && doc['projectMoney'].size() > 0 && doc['priceBuild'].size() > 0 && doc['projectMoney'][0] < doc['priceBuild'].value"
            }
          }
        },
        {
          "script": {
            "script": {
              "source": "doc.containsKey('fullInfo.auction') && doc['fullInfo.auction'].size() == 1"
            }
          }
        }
      ]
    }
  }
}


GET /act_document/_search
{
  "size": 100,
  "query": {
    "bool": {
      "must": [
        {
          "script": {
            "script": {
              "source": "doc.containsKey('sumPriceAgree') && doc.containsKey('winnerPrice') && doc['winnerPrice'].size() > 0 && doc['sumPriceAgree'].size() > 0 && doc['winnerPrice'][0] < doc['sumPriceAgree'].value"
            }
          }
        },
        {
          "script": {
            "script": {
              "source": "doc.containsKey('winnerPrice') && doc['winnerPrice'].size() == 1"
            }
          }
        }
      ]
    }
  }
}












POST /act_company/_update/0105550063246
{
  "script": {
    "source": "ctx._source.fullInfo.auction[1].companyInfo.commitee = ctx._source.fullInfo.auction[0].companyInfo.commitee",
    "lang": "painless"
  }
}

POST /act_company/_update/0105550063246
{
  "script": {
    "source": "ctx._source.commitee = '1. นายสมพงษ์ จรุงกีรติวงศ์\n2. นางอมราภรณ์ จรุงกีรติวงศ์\n3. นายไพศาล จรุงกีรติวงศ์/'",
    "lang": "painless"
  }
}




POST /act_document/_update/63057011269
{
  "script": {
    "source": "ctx._source.fullInfo.auction[3]['ชื่อผู้เสนอราคา'] = 'หจก.ไทพิพัฒน์'",
    "lang": "painless"
  }
}


POST /act_document/_update/63057011269
{
  "script": {
    "source": "ctx._source.fullInfo.auction[3]['ชื่อผู้เสนอราคา'] = 'ห้างหุ้นส่วนจำกัด ไทพิพัฒน์'",
    "lang": "painless"
  }
}



POST /act_document/_update/63057011269
{
  "script": {
    "source": "ctx._source.winnerName = 'ห้างหุ้นส่วนจำกัด ไทพิพัฒน์'",
    "lang": "painless"
  }
}

POST /act_document/_update/63057011269
{
  "script": {
    "source": "ctx._source.fullInfo.winner[0]['name'] = 'ห้างหุ้นส่วนจำกัด ไทพิพัฒน์'",
    "lang": "painless"
  }
}
POST /act_document/_update/63057011269
{
  "script": {
    "source": "ctx._source.fullInfo.winner[0]['company'] = 'ห้างหุ้นส่วนจำกัด ไทพิพัฒน์'",
    "lang": "painless"
  }
}






POST /act_document/_update/63057011269
{
  "script": {
    "source": "ctx._source.fullInfo.auction[2]['ราคาที่เสนอ'] = 696383500",
    "lang": "painless"
  }
}

POST /act_document/_update/63057011269
{
  "script": {
    "source": "ctx._source.fullInfo.auction[2]['auctionPrice'] = 696383500",
    "lang": "painless"
  }
}
POST /act_document/_update/63057011269
{
  "script": {
    "source": "ctx._source.fullInfo.auction[3]['ราคาที่เสนอ'] = 697939371",
    "lang": "painless"
  }
}

POST /act_document/_update/63057011269
{
  "script": {
    "source": "ctx._source.fullInfo.auction[3]['auctionPrice'] = 697939371",
    "lang": "painless"
  }
}




POST /act_document/_update/64117462474
{
  "script": {
    "source": "ctx._source.fullInfo.auction.remove(5)",
    "lang": "painless"
  }
}















GET /act_document/_search
{
  "size": 10,
  "query": {
    "bool": {
      "must": [
        {
          "nested": {
            "path": "fullInfo.auction",
            "query": {
              "match_phrase": {
                "fullInfo.auction.companyInfo.name": "วีรวุฒิ คอนกรีต"
              }
            }
          }
        }
      ]
    }
  },
  "aggs": {
    "sumAuction": {
      "nested": {
        "path": "fullInfo.auction"
      },
      "aggs": {
        "totalAuctionPrice": {
          "sum": {
            "field": "fullInfo.auction.auctionPrice"
          }
        }
      }
    }
  }
}
GET /act_document/_search
{
  "size": 5,
  "query": {
    "bool": {
      "must": [
        {
          "nested": {
            "path": "fullInfo.auction",
            "query": {
              "match_phrase": {
                "fullInfo.auction.companyInfo.name": "วีรวุฒิ คอนกรีต"
              }
            }
          }
        },
        {
          "nested": {
            "path": "fullInfo.winner",
            "query": {
              "match_phrase": {
                "fullInfo.winner.companyInfo.name": "วีรวุฒิ คอนกรีต"
              }
            }
          }
        }
      ]
    }
  },
  "aggs": {
    "sumAuction": {
      "nested": {
        "path": "fullInfo.auction"
      },
      "aggs": {
        "totalAuctionPrice": {
          "sum": {
            "field": "fullInfo.auction.auctionPrice"
          }
        }
      }
    },
    "sumWinner": {
      "sum": {
        "field": "fullInfo.winner.winnerPrice"
      }
    }
  }
}




GET /act_document/_search
{
  "track_total_hits": true, 
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "winnerName": "นางสาวเฉลิมพร สุขสำราญ"
          }
        }
      ]
    }
  }
}

GET /act_document/_search
{
  "track_total_hits": true, 
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "winnerName": "นางสาวเฉลิมพร สุขสำราญ"
          }
        }
      ]
    }
  },
  "_source": ["winnerName","projectStatus"]
}



GET /act_document/_search
{
  "track_total_hits": true,
  "size": 100,
  "query": {
    "bool": {
      "should": [
        {
          "nested": {
            "path": "fullInfo.auction",
            "query": {
              "match_phrase": {
                "fullInfo.auction.companyInfo.name": "วีรวุฒิ คอนกรีต"
              }
            }
          },
          "must": [
            {
              "match": {
                "departmentName": "เทศบาลตำบลนากลาง"
              }
            }
          ]
        },
        {
          "nested": {
            "path": "fullInfo.winner",
            "query": {
              "match_phrase": {
                "fullInfo.winner.companyInfo.name": "วีรวุฒิ คอนกรีต"
              }
            }
          },
          "must": [
            {
              "match": {
                "departmentName": "เทศบาลตำบลนากลาง"
              }
            }
          ]
        }
      ]
    }
  },
  "aggs": {
    "sumWinner": {
      "sum": {
        "field": "winnerPrice"
      }
    }
  }
}


GET /act_document/_search
{
  "track_total_hits": true,
  "size": 100,
  "query": {
    "bool": {
      "should": [
        {
          "bool": {
            "must": [
              {
                "nested": {
                  "path": "fullInfo.auction",
                  "query": {
                    "match_phrase": {
                      "fullInfo.auction.companyInfo.name": "วีรวุฒิ คอนกรีต"
                    }
                  }
                }
              },
              {
                "script": {
                  "script": {
                    "source": "doc['announceDate'].value.year == params.year",
                    "params": {
                      "year": 20
                    }
                  }
                }
              }
            ]
          }
        },
        {
          "bool": {
            "must": [
              {
                "nested": {
                  "path": "fullInfo.winner",
                  "query": {
                    "match_phrase": {
                      "fullInfo.winner.companyInfo.name": "วีรวุฒิ คอนกรีต"
                    }
                  }
                }
              },
              {
                "script": {
                  "script": {
                    "source": "doc['announceDate'].value.year == params.year",
                    "params": {
                      "year": 20
                    }
                  }
                }
              }
            ]
          }
        }
      ],
       "must" : []
    }
  },
  "aggs": {
    "sumWinner": {
      "sum": {
        "field": "winnerPrice"
      }
    }
  }
}













GET /act_document/_search
{
  "track_total_hits": true,
  "size": 100,
  "query": {
    "bool": {
      "must": [
        {
          "bool": {
            "should": [
              {
                "nested": {
                  "path": "fullInfo.auction",
                  "query": {
                    "match_phrase": {
                      "fullInfo.auction.companyInfo.name": "วีรวุฒิ คอนกรีต"
                    }
                  }
                }
              },
              {
                "nested": {
                  "path": "fullInfo.winner",
                  "query": {
                    "match_phrase": {
                      "fullInfo.winner.companyInfo.name": "วีรวุฒิ คอนกรีต"
                    }
                  }
                }
              }
             
            ]
          }
        }
       
      ]
    }
  },
  "aggs": {
    "sumWinner": {
      "sum": {
        "field": "winnerPrice"
      }
    }
  }
}


GET /act_document/_search
{
  "track_total_hits": true,
  "size": 100,
  "query": {
    "bool": {
      "must": [
        {
          "bool": {
            "should": [
              {
                "nested": {
                  "path": "fullInfo.auction",
                  "query": {
                    "match_phrase": {
                      "fullInfo.auction.companyInfo.name": "วีรวุฒิ คอนกรีต"
                    }
                  }
                }
              },
              {
                "nested": {
                  "path": "fullInfo.winner",
                  "query": {
                    "match_phrase": {
                      "fullInfo.winner.companyInfo.name": "วีรวุฒิ คอนกรีต"
                    }
                  }
                }
              }
            ]
          }
        },
        {
          "range": {
            "announceDate": {
              "gte": "2023-01-01T00:00:00.000Z",
              "lte": "2023-12-31T23:59:59.999Z"
            }
          }
        }
      ]
    }
  },
  "aggs": {
    "sumWinner": {
      "sum": {
        "field": "winnerPrice"
      }
    }
  }
}



GET /act_document/_search
{
  "track_total_hits": true,
  "size": 100,
  "query": {
    "bool": {
      "must": [
        {
          "wildcard": {
            "departmentName.raw": "*ดอนพ*"
          }
        },
        {
          "bool": {
            "should": [
              {
                "nested": {
                  "path": "fullInfo.auction",
                  "query": {
                    "match_phrase": {
                      "fullInfo.auction.companyInfo.name": "ป.พัฒนารุ่งโรจน์ก่อสร้าง"
                    }
                  }
                }
              },
              {
                "nested": {
                  "path": "fullInfo.winner",
                  "query": {
                    "match_phrase": {
                      "fullInfo.winner.companyInfo.name": "ป.พัฒนารุ่งโรจน์ก่อสร้าง"
                    }
                  }
                }
              }
            ]
          }
        }
      ]
    }
  },
  "aggs": {
    "sumWinner": {
      "sum": {
        "field": "winnerPrice"
      }
    }
  }
}


GET /act_document/_search
{
  "track_total_hits": true,
  "size": 100,
  "query": {
    "bool": {
      "must": [
        {
          "nested": {
            "path": "fullInfo.auction",
            "query": {
              "match_phrase": {
                "fullInfo.auction.companyInfo.name": "นางสาวเฉลิมพร สุขสำราญ"
              }
            }
          }
        }
      ]
    }
  },
  "aggs": {
    "sumWinner": {
      "sum": {
        "field": "winnerPrice"
      }
    }
  }
}

GET /act_document/_search
{
  "track_total_hits": true,
  "size": 100,
  "query": {
    "bool": {
      "must": [
        {
               "match": {
            "winnerName": "นางสาวเฉลิมพร สุขสำราญ"
          }
        }
      ]
    }
  },
  "aggs": {
    "sumWinner": {
      "sum": {
        "field": "winnerPrice"
      }
    }
  }
}





GET /act_document/_search
{
  "track_total_hits": true,
  "size": 100,
  "query": {
    "bool": {
      "must_not": [
        {
          "match": {
            "methodId": "19"
          }
        },
        {
          "match": {
            "method": "เฉพาะเจาะจง"
          }
        }
      ],
      "must": [
        {
          "match": {
            "processed": 8
          }
        },
        {
          "match": {
            "isCorruptPredictionPositive": "normal"
          }
        }
      ]
    }
  }
}


GET /act_document/_search
{
  "track_total_hits": true,
  "size": 100,
  "query": {
    "bool": {
      "must": [
         {
          "match": {
            "processed": 8
          }
        },
        {
          "match": {
           "isCorruptPredictionPositive": "RiskBidRigging"
          }
        }
        ]
    }
  }
}


GET /act_document/_search
{
  "track_total_hits": true,
  "size": 10,
  "query": {
    "bool": {
      "must": [
         {
          "match": {
            "processed": 9
          }
        },
        {
          "match": {
           "isCorruptPredictionPositive": "MultiContractsNormal"
          }
        },
        {
            "match": {
              "methodId": "16"
            }
          }
        
        ],
        "must_not": [
          {
            "match": {
              "methodId": "19"
            }
          },
          {
            "match": {
              "method.raw": "เฉพาะเจาะจง"
            }
          }
        ]
    }
  }
}

POST /act_document/_update/58035026181
{
  "script": {
    "source": "ctx._source.sumPriceAgree = 143442",
    "lang": "painless"
  }
}
POST /act_document/_update/58035026181
{
  "script": {
    "source": "ctx._source.fullInfo.auction[0]['ราคาที่เสนอ'] = 144234.1",
    "lang": "painless"
  }
}







GET /act_document/_search
{
  "track_total_hits": true,
  "size": 100,
  "query": {
    "bool": {
      "must_not": [
         {
          "match": {
            "processed": 8
          }
        }
        ]
    }
  }
}


GET /act_document/_search
{
  "track_total_hits": true,
  "size": 100,
  "query": {
    "bool": {
      "must": [
         {
          "match": {
            "winnerName.raw": "บริษัท ป.พัฒนารุ่งโรจน์ก่อสร้าง จำกัด"
          }
        }
        ]
    }
  }
}


GET /act_document/_search
{
  "track_total_hits": true,
  "size": 100,
  "query": {
    "bool": {
      "should": [
        {
          "nested": {
            "path": "fullInfo.auction",
            "query": {
              "match_phrase": {
                "fullInfo.auction.companyInfo.name": "ป.พัฒนารุ่งโรจน์ก่อสร้าง"
              }
            }
          }
        },
        {
          "nested": {
            "path": "fullInfo.winner",
            "query": {
              "match_phrase": {
                "fullInfo.winner.companyInfo.name": "ป.พัฒนารุ่งโรจน์ก่อสร้าง"
              }
            }
          }
        }
      ]
    }
  }
}

GET /act_document/_search
{
  "track_total_hits": true,
  "size": 100,
  "query": {
    "bool": {
      "should": [
        {
          "nested": {
            "path": "fullInfo.auction",
            "query": {
              "match_phrase": {
                "fullInfo.auction.companyInfo.name": "ป.รวีกนก ก่อสร้าง"
              }
            }
          }
        },
        {
          "nested": {
            "path": "fullInfo.winner",
            "query": {
              "match_phrase": {
                "fullInfo.winner.companyInfo.name": "ป.รวีกนก ก่อสร้าง"
              }
            }
          }
        }
      ]
    }
  }
}





GET /act_document/_search
{
  "track_total_hits": true,
  "size": 1000000,
  "query": {
    "bool": {
      "must": [
        {
          "wildcard": {
            "projectStatus": "ระหว่างดำเนินกา*"
          }
        },
        {
          "nested": {
            "path": "fullInfo.winner",
            "query": {
              "match_phrase": {
                "fullInfo.winner.companyInfo.name": "นายบำรุง เนตรตรี"
              }
            }
          }
        }
      ]
    }
  }
}

GET /act_document/_search
{
  "track_total_hits": true,
  "size": 100,
  "query": {
    "bool": {
      "must": [
       
 
        {
          "range": {
            "pullDate": {
              "gte": "2023-10-01T00:00:00.000Z",
              "lte": "2023-10-30T00:00:00.000Z"
            }
          }
        }
      ]
    }
  }
}



GET /act_document/_search
{
  "track_total_hits": true,
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "winnerName": "นายบำรุง  เนตรตรี"
          }
        }
      ]
    }
  },
  "_source": ["winnerName", "projectStatus", "budgetYear"]
}




POST /act_company/_doc/202313440135222320200833013114
{
  "noCoBenefit": {
    "price": 0,
    "count": 0
  },
  "buyDoc": {
    "price": 0,
    "count": 0
  },
  "winner": {
    "price": 0,
    "count": 0
  },
  "submit": {
    "price": 0,
    "count": 0
  },
  "name": "บริษัท  ภรณ์เพียร  จำกัด",
  "pullDate": "2023-08-29T09:21:21.936Z",
  "id": "202313440135222320200833013114",
  "tempComp": "202313440135222320200833013114",
  "rid": "202313440135222320200833013114",
  "passVerification": {
    "price": 0,
    "count": 0
  },
  "processDBD": "wait",
  "auction": {
    "price": 0,
    "count": 0
  }
}




POST /act_document/_update/66017074473
{
  "script": {
    "source": "ctx._source.fullInfo.auction[3]['ชื่อผู้เสนอราคา'] = 'บริษัท ขอนแก่นวิโรจน์คอนสตรัคชั่น จำกัด'",
    "lang": "painless"
  }
}

POST /act_document/_update/66017074473
{
  "script": {
    "source": "ctx._source.winnerName = 'บริษัท ขอนแก่นวิโรจน์คอนสตรัคชั่น จำกัด'",
    "lang": "painless"
  }
}

POST /act_document/_update/66017074473
{
  "script": {
    "source": "ctx._source.fullInfo.winner[0]['name'] = 'บริษัท ขอนแก่นวิโรจน์คอนสตรัคชั่น จำกัด'",
    "lang": "painless"
  }
}
POST /act_document/_update/66017074473
{
  "script": {
    "source": "ctx._source.fullInfo.winner[0]['company'] = 'บริษัท ขอนแก่นวิโรจน์คอนสตรัคชั่น จำกัด'",
    "lang": "painless"
  }
}






DELETE /act_company/_doc/0107574800471

DELETE /act_document/_doc/66079299433

DELETE /act_company/_doc/303130353532343031333131

POST /act_document/_update/66017074473
{
  "script": {
    "source": "ctx._source.fullInfo.winner[0]['company'] = 'บริษัท ขอนแก่นวิโรจน์คอนสตรัคชั่น จำกัด'",
    "lang": "painless"
  }
}

POST /act_document/_update/65087015742
{
  "script": {
    "source": "ctx._source.winnerName = [\"บริษัท พี.ประชุม จำกัด\", \"บริษัท คัลลัส จำกัด\"]",
    "lang": "painless"
  }
}





GET /act_document/_search
{
  "track_total_hits": true,
  
  "query": {
    "bool": {
      "should": [
        {
          "nested": {
            "path": "fullInfo.auction",
            "query": {
              "match_phrase": {
                "fullInfo.auction.companyInfo.name": "ป.พัฒนารุ่งโรจน์ก่อสร้าง"
              }
            }
          }
        },
        {
          "nested": {
            "path": "fullInfo.winner",
            "query": {
              "match_phrase": {
                "fullInfo.winner.companyInfo.name": "ป.พัฒนารุ่งโรจน์ก่อสร้าง"
              }
            }
          }
        }
      ]
    }
  }
}



GET /act_document/_search
{
  "track_total_hits": true,
  "size": 100,
  "query": {
    "bool": {
      "should": [
        {
          "nested": {
            "path": "fullInfo.auction",
            "query": {
              "match_phrase": {
                "fullInfo.auction.companyInfo.name": "ป.รวีกนก ก่อสร้าง"
              }
            }
          }
        },
        {
          "nested": {
            "path": "fullInfo.winner",
            "query": {
              "match_phrase": {
                "fullInfo.winner.companyInfo.name": "ป.รวีกนก ก่อสร้าง"
              }
            }
          }
        }
      ]
    }
  }
}






POST /act_document/_update/65117395889
{
  "script": {
    "source": "ctx._source.documents[0].information.data.add(params.newData)",
    "lang": "painless",
    "params": {
      "newData": {
        "price": "๑๓๕,๐๐๐.๐๐บาท(หนึ่งแสนสามหมื่นห้าพันบาทถ้วน)",
        "company": "นางสาวณัฎฐนันท์ศิริเสถียร"
      }
    }
  }
}


POST /act_document/_update/65117395889
{
  "script": {
    "source": "ctx._source.documents[1].information.data[4].remove",
    "lang": "painless"
  }
}





POST /act_document/_update/65117395889
{
  "script": {
    "source": "ctx._source.documents[0].information.data[0].company = 'นางสาวณัฎฐนันท์ศิริเสถียร'",
    "lang": "painless"
  }
}
POST /act_document/_update/65117395889
{
  "script": {
    "source": "ctx._source.documents[0].information.data[1].company = 'นายฟาอีสยีวาตานนทร์'",
    "lang": "painless"
  }
}


POST /act_document/_update/63057011269
{
  "script": {
    "source": "ctx._source.priceBuild = 1992060",
    "lang": "painless"
  }
}


POST /act_document/_update/63037295715
{
  "script": {
    "source": "ctx._source.sumPriceAgree = 93447433.5",
    "lang": "painless"
  }
}

POST /act_temp_company/_update/04312525312200833013114
{
  "script": {
    "source": "ctx._source.dbd = false",
    "lang": "painless"
  }
}



POST /act_document/_update/66079299433
{
  "script": {
    "source": "ctx._source.winnerName = 'ห้างหุ้นส่วนจำกัด วีระชัยอินเตอร์เนชั่นแนล'",
    "lang": "painless"
  }
}

POST /act_document/_update/66079299433
{
  "script": {
    "source": "ctx._source.winnerPrice = 13359000",
    "lang": "painless"
  }
}


POST /act_document/_update/66079299433
{
  "script": {
    "source": "ctx._source.fullInfo.winner[0].add(params.newData)",
    "lang": "painless",
    "params": {
      "newData": {
        "date": "13/07/2566",
        "price": 13359000,
        "name": "ห้างหุ้นส่วนจำกัด วีระชัยอินเตอร์เนชั่นแนลิจชัยทวี",
        "company": "ห้างหุ้นส่วนจำกัด วีระชัยอินเตอร์เนชั่นแนลิจชัยทวี",
        "tempComp": "-",
        "type": "ข้อมูลสาระสำคัญในสัญญา"
      }
    }
  }
}

GET /act_document/_search
{
  "query": {
    "bool": {
      "must": [
        
        {
          "nested": {
            "path": "fullInfo.winner",
            "query": {
              "match": {
                "tempComp": 2.735233003122234e+23
              }
            }
          }
        }
      ]
    }
  }
}

POST /act_document/_delete_by_query
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "name": "ห้างหุ้นส่วนจำกัด วีระชัยอินเตอร์เนชั่นแนลิจชัยทวี"
          }
        },
        {
          "match": {
            "tempComp": 2.735233003122234e+23
          }
        }
      ]
    }
  }
}







POST /act_document/_update/66079299433
{
  "script": {
    "source": "if (ctx._source.fullInfo.winner == null) { ctx._source.fullInfo.winner = []; } ctx._source.fullInfo.winner.add(params.newData)",
    "lang": "painless",
    "params": {
      "newData": {
        "date": "13/07/2566",
        "price": 13359000,
        "name": "ห้างหุ้นส่วนจำกัด วีระชัยอินเตอร์เนชั่นแนลิจชัยทวี",
        "company": "ห้างหุ้นส่วนจำกัด วีระชัยอินเตอร์เนชั่นแนลิจชัยทวี",
        "tempComp": "273523300312223419401522",
        "type": "ข้อมูลสาระสำคัญในสัญญา"
      }
    }
  }
}






GET /act_document/_search
{
  "track_total_hits": true,
  "size": 1000000,
  "query": {
    "bool": {
      "must": [
       
        {
          "wildcard": {
            "projectId": "*660*"
          }
        }
      ]
    }
  }
}

GET /act_document/_search
{
  "track_total_hits": true,
  "size": 1000000,
  "query": {
    "bool": {
      "must": [
        {
          "wildcard": {
            "projectId.keyword": "64*"
          }
        }
      ]
    }
  }
}







GET /act_company/_search
{
  "track_total_hits": true,
  "size": 100,
  "query": {
    "bool": {
      "must": [
        {
          "script": {
            "script": {
              "source": "doc['id.keyword'].length() == params.length",
              "params": {
                "length": 13
              }
            }
          }
        },
        {
          "exists": {
            "field": "typeOfEntity"
          }
        }
      ]
    }
  }
}


GET /act_company/_search
{
  "track_total_hits": true,
  "size": 100,
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "id.keyword": "3209900325608"
          }
        }
      ]
    }
  }
}


GET /act_company/_search
{
  "track_total_hits": true,
  "size": 100,
  "query": {
    "bool": {
      "must": [
        {
          "range": {
            "pullDate": {
              "gte": "2023-10-26T07:00:00.000Z",
              "lte": "2023-10-26T08:00:00.000Z",
              "format": "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
            }
          }
        }
      ]
    }
  }
}




GET /act_company/_search
{
  "track_total_hits": true,
  "size": 100,
  "query": {
    "bool": {
      "must_not": [
        {
          "exists": {
            "field": "tax"
          }
        }
      ]
    }
  }
}

GET /act_company/_search
{
  "track_total_hits": true,
  "size": 100,
  "query": {
    "bool": {
      "must": [
        {
          "exists": {
            "field": "tax"
          }
        }
      ]
    }
  }
}
GET /act_company/_search
{
  "track_total_hits": true,
  "size": 34,
  "query": {
    "bool": {
  
      "must": [
        {
          "match": {
            "tax": 1
          }
        }
        
      ]
    }
  }
}
GET /act_company/_search
{
  "track_total_hits": true,
  "size": 14,
  "query": {
    "bool": {
      "must": [
        {
          "terms": {
            "tax": [
              "8",
              "1"
            ]
          }
        }
      ],
      "must_not": [
        {
          "match": {
            "processTax": 1
          }
        }
      ]
    }
  }
}
GET /act_company/_search
{
  "track_total_hits": true,
  "size": 14,
  "query": {
    "bool": {
      "must": [
        {
          "terms": {
            "tax": [
              "8",
              "1"
            ]
          }
        }
      ]
    }
  }
}

GET /act_company/_search
{
  "track_total_hits": true,
  "size": 14,
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "id": "0343556000986"
          }
        }
      ]
    }
  }
}
GET /act_company/_search
{
  "track_total_hits": true,
  "size": 14,
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "name.keyword": "หจ. สวนคูณ พร็อพเพอร์ตี้"
          }
        }
      ]
    }
  }
}
GET /act_company/_search
{
  "track_total_hits": true,
  "size": 20,
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "tax": 0
          }
        }
      ],
      "must_not": [
        {
          "exists": {
            "field": "tempComp"
          }
        },
        {
          "exists": {
            "field": "typeOfEntity"
          }
        },
        {
          "exists": {
            "field": "commitee"
          }
        }
        ,
        {
          "exists": {
            "field": "registerCapitalTHB"
          }
        },
        {
          "exists": {
            "field": "rid"
          }
        }
      ]
    }
  }
}

GET /act_company/_search
{
  "track_total_hits": true,
  "size": 5,
  "query": {
    "bool": {
      "must": [
        {
          "exists": {
            "field": "typeOfEntity"
          }
        }
      ],
      "must_not": [
        {
          "match": {
            "tax": 0
          }
        }
      ]
    }
  }
}
GET /act_company/_search
{
  "track_total_hits": true,
  "size": 20,
  "query": {
    "bool": {
      "must_not": [
        {
          "match": {
            "tax": 0
          }
        },
        {
          "exists": {
            "field": "tempComp"
          }
        },
        {
          "exists": {
            "field": "typeOfEntity"
          }
        },
        {
          "exists": {
            "field": "commitee"
          }
        }
        ,
        {
          "exists": {
            "field": "registerCapitalTHB"
          }
        },
        {
          "exists": {
            "field": "rid"
          }
        }
      ]
    }
  }
}







GET /act_company/_search
{
  "track_total_hits": true,
  "size": 5,
  "query": {
    "bool": {
      "must": [
      
        {
          "exists": {
            "field": "taxType"
          }
        }
      ]
    }
  }
}


GET /act_document/_search
{
  "track_total_hits": true,
  "size": 100,
  "query": {
    "bool": {
      "must": [ 
        {
                    "wildcard": {
                      "projectName.raw": "ดอน"
                    }
                    
        }         
      ]
    }
  }
}


POST /act_document/_update/59095144001
{
  "script": {
    "source": "ctx._source.fullInfo.winner[0]['name'] =  'หจ. เกียรติเจริญชัยการโยธา'",
    "lang": "painless"
  }
}



POST /act_document/_update_by_query
{
  "script": {
    "source": "ctx._source.fullInfo.auction.removeIf(item -> item.tempComp == '422101340820042192152331')"
  },
  "query": {
    "match": {
      "_id" : "65037330632"
    }
  }
}

POST /act_document/_update_by_query
{
  "script": {
    "source": "ctx._source.fullInfo.auction.removeIf(item -> item.tempComp == '200427200132230483207202')"
  },
  "query": {
    "match": {
      "_id" : "64117384992"
    }
  }
}









POST /act_document/_update_by_query
{
  "script": {
    "source": "ctx._source.fullInfo.auction.removeIf(item -> item.tempComp == '400135222315344008233400')"
  },
  "query": {
    "match": {
      "_id" : "61107325066"
    }
  }
}


POST /act_document/_update_by_query
{
  "script": {
    "source": "ctx._source.fullInfo.auction.removeIf(item -> item.tempComp == '402222322342035204024719083440193522233448072001233841')"
  },
  "query": {
    "match": {
      "_id" : "64027039394"
    }
  }
}


POST /act_document/_update/64027039394
{
  "script": {
    "source": "ctx._source.sumWinnerPrice = 544960",
    "lang": "painless"
  }
}


POST /act_document/_update/64027039394
{
  "script": {
    "source": "ctx._source.fullInfo.auction[0]['ราคาที่เสนอ'] = 454743",
    "lang": "painless"
  }
}



GET /act_document/_search
{
  "track_total_hits": true,
  "size": 100,
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "methodId": "12"
          }
        }
      ]
    }
  }
}

GET /act_document/_search
{
  "track_total_hits": true,
  "size": 100,
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "methodId": "04"
          }
        },
        {
          "terms": {
            "budgetYear": ["2021", "2022", "2023","2020"]
          }
        }
      ]
    }
  }
}


GET /act_document/_search
{
  "track_total_hits": true,
  "from": 10000, 
  "size": 10000,
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "methodId": "16"
          }
        },
        {
          "match": {
            "typeId": "01"
          }
        },
        {
          "terms": {
            "budgetYear": ["2021"]
          }
        }
      ]
    }
  }
}

GET /act_document/_search
{
  "track_total_hits": true,
  "size": 100,
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "methodId": "16"
          }
        },
        {
          "match": {
            "typeId": "01"
          }
        },
        {
          "match": {
            "budgetYear": "2021"
          }
        }
      ]
    }
  }
}


POST /act_document/_update/64087400163
{
  "script": {
    "source": "ctx._source.documents[8].information.auctionData[0].รายชื่อผู้เสนอราคา = ['บริษัท ธรรมศักดิ์ จำกัด','บริษัท เหล็กตรัง จำกัด','กิจการร่วมค้า มหาทรัพย์ 99','บริษัท ชุมราษฎร์ วิศวกร จำกัด']",
    "lang": "painless"
  }
}


POST /act_document/_update/64087400163
{
  "script": {
    "source": "ctx._source.documents[8].information.auctionData[0]['รายชื่อผู้เสนอราคา'] = ['บริษัท ธรรมศักดิ์ จำกัด','บริษัท เหล็กตรัง จำกัด','กิจการร่วมค้า มหาทรัพย์ 99','บริษัท ชุมราษฎร์ วิศวกร จำกัด']",
    "lang": "painless"
  }
}


POST /act_document/_update/61027348775
{
  "script": {
    "source": "if (ctx._source.documents[7].information.data.empty) { ctx._source.documents[7].information.data = params.data } else { ctx._source.documents[7].information.data[0] = params.data }",
    "lang": "painless",
    "params": {
      "data": [
        {
          "price": "145,398,448",
          "company": "บริษัท ตรีเพชรอีซูซุเซลส์ จำกัด",
          "order": "รถบรรทุก 3 ตัน 6 ล้อ"
        },
        {
          "price": "71,323,632",
          "company": "บริษัท ตรีเพชรอีซูซุเซลส์ จำกัด",
          "order": "รถบรรทุก 4 ตัน 4 ประตู แบบมีกระบะท้าย"
        },
        {
          "price": "12,792,000",
          "company": "บริษัท ท็อปเบสท์ มอเตอร์ เซลส์ จำกัด",
          "order": "รถบรรทุก 6 ตัน และ 6 ตันบริการ"
        }
      ]
    }
  }
}


GET /act_document/_search
{
  "track_total_hits": true,
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "_id": "64027301954" 
          }
        }
      ]
    }
  }
}

GET /act_document/_search
{
  "query": {
    "bool": {
      "must_not": [
        
          {
          "exists": {
            "field": "method"
          }
        }
        
      ]
    }
  }
}

GET /act_document/_search
{
  "track_total_hits": true,
  "size": 100,
  "query": {
    "bool": {
      "must_not": [
       {
          "exists": {
            "field": "documents"
          }
        }
        
      ]
    }
  }
}

GET /act_document/_search
{
  "track_total_hits": true,
  "size": 100,
  "query": {
    "bool": {
      "must_not": [
       
       {
          "exists": {
            "field": "documents"
          }
        }
        
      ]
    }
  }
}

GET /act_document/_search
{
  "track_total_hits": true,
  "size": 100,
  "query": {
    "bool": {
      "must_not": [
        {
          "exists": {
            "field": "documents"
          }
        },
         {
          "script": {
            "script": {
              "source": "if (doc.containsKey('documents') && doc['documents'].empty) { return false; } else { return true; }",
              "lang": "painless"
            }
          }
        }
      ]
    }
  }
}


GET /act_document/_search
{
  "track_total_hits": true,
  "size": 10,
  "query": {
    "bool": {
      "must": [
        {
          "wildcard": {
            "projectId": "*"
          }
        },
        {
          "match": {
            "isCorruptPredictionPositive": "MultiContracts"
          }
        }
      ],
      "must_not": [
        {
          "exists": {
            "field": "priceBuild"
          }
        }
      ]
    }
  }
}



GET /act_document/_search
{
  "track_total_hits": true,
  "size": 10,
  "query": {
    "bool": {
      "must": [
        {
          "wildcard": {
            "projectId": "*0383561000107"
          }
        }
      ],
      "must_not": [
        {
          "terms": {
            "documents.filename": []
          }
        }
      ]
    }
  }
}

GET /act_document/_search
{
   "size": 10,
     "query": {
      "bool": {
         "must_not": [
            {
               "exists": {
                 "field": "isCorruptPredictionPositive"
               }
            }
         ]
      }
   }
}




GET /act_document/_search
{
  "size": 0,
  "track_total_hits": true,
  "query": {
    "bool": {
      "must": [
        {
          "match_all": {}
        }
      ]
    }
  },
  "aggs": {
    "exists": {
      "filters": {
        "filters": {
          "nofile": {
            "bool": {
              "must_not": [
                {
                  "exists": {
                    "field": "isCorruptPredictionPositive"
                  }
                }
              ]
            }
          },
          "PriceAsGroup": {
            "term": {
              "isCorruptPredictionPositive.keyword": "PriceAsGroup"
            }
          },
          "BidderIsSmall": {
            "term": {
              "isCorruptPredictionPositive.keyword": "BidderIsSmall"
            }
          },
          "normal": {
            "term": {
              "isCorruptPredictionPositive.keyword": "normal"
            }
          },
          "Normal": {
            "term": {
              "isCorruptPredictionPositive.keyword": "Normal"
            }
          },
          "Comparative": {
            "term": {
              "isCorruptPredictionPositive.keyword": "Comparative"
            }
          },
          "MidRange": {
            "term": {
              "isCorruptPredictionPositive.keyword": "MidRange"
            }
          },
          "DeliberateHigh": {
            "term": {
              "isCorruptPredictionPositive.keyword": "DeliberateHigh"
            }
          },
          "BothSamePrice": {
            "term": {
              "isCorruptPredictionPositive.keyword": "BothSamePrice"
            }
          },
          "Undercutting": {
            "term": {
              "isCorruptPredictionPositive.keyword": "Undercutting"
            }
          },
          "BelowPriceBuild": {
            "term": {
              "isCorruptPredictionPositive.keyword": "BelowPriceBuild"
            }
          },
          "HigherThanPriceBuild": {
            "term": {
              "isCorruptPredictionPositive.keyword": "HigherThanPriceBuild"
            }
          },
          "EndBudgetYear": {
            "term": {
              "isCorruptPredictionPositive.keyword": "EndBudgetYear"
            }
          },
          "RiskBidRigging": {
            "term": {
              "isCorruptPredictionPositive.keyword": "RiskBidRigging"
            }
          },
          "IssuePricing": {
            "term": {
              "isCorruptPredictionPositive.keyword": "IssuePricing"
            }
          },
          "MultiContracts": {
            "term": {
              "isCorruptPredictionPositive.keyword": "MultiContracts"
            }
          },
          "MultiContractsPositive": {
            "term": {
              "isCorruptPredictionPositive.keyword": "MultiContractsPositive"
            }
          },
          "MultiContractsNormal": {
            "term": {
              "isCorruptPredictionPositive.keyword": "MultiContractsNormal"
            }
          }
        }
      }
    }
  }
}



