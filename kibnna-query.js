


GET / act_document / _search
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
                                "fullInfo.winner.id.keyword": "xxxxxxxxxx"
                            }
                        }
                    }
                }
            ]
        }
    }
}

GET / act_document / _search
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
                                "fullInfo.auction.companyInfo.name": "xxxxxxxx"
                            }
                        }
                    }
                }
            ]
        }
    }
}




GET / act_document / _search
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


// announceDate 
GET / act_document / _search
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


GET / act_document / _search
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



GET / act_document / _search
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


GET / act_document / _search
{
    "track_total_hits": true,
        "query": {
        "bool": {
            "must": [
                {
                    "match": {
                        "isCorruptPredictionPositive": "failCorruption"
                    }
                }
            ]
        }
    }
}

GET / act_document / _search
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

GET / act_document / _search
{
    "size": 1000,
        "query": {
        "match": {
            "projectId": "65047176657"
        }
    }
}




GET / act_document / _search
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

POST / act_company / _update / xxxxxxxxxxx
{
    "doc": {
        "address" : "368 หมู่ที่ 6 ต.บ่อวิน อ.ศรีราชา จ.ชลบุรี"
    }
}


GET / act_document / _search
{
    "query": {
        "bool": {
            "must_not": [
                {
                    "match": {
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

GET / act_document / _search
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


GET / act_document / _search
{
    "query": {

        "match": [
            {
                "projectId": "58025180721"
            }
        ]

    }
}

GET / act_document / _search
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




GET / act_document / _search
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


GET / act_document / _search
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
GET / act_document / _search
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


GET / act_document / _search
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
    "_source": ["winnerName", "projectStatus"]
}



GET / act_document / _search
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


GET / act_document / _search
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



GET / act_document / _search
{
    "track_total_hits": true,
        "size": 100,
            "query": {
        "bool": {
            "must": [
                {
                    "wildcard": {
                        "projectName.raw": ""
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


GET / act_document / _search
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

GET / act_document / _search
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





GET / act_document / _search
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


GET / act_document / _search
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



GET / act_document / _search
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


GET / act_document / _search
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

POST / act_company / _doc / 202313440135222320200833013114
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



DELETE / act_company / _doc /013408013223234827210449

DELETE / act_document / _doc / 61027348775

DELETE / act_company / _doc / 303130353532343031333131

POST / act_document / _update / 66017074473
{
    "script": {
        "source": "ctx._source.fullInfo.winner[0]['company'] = 'บริษัท ขอนแก่นวิโรจน์คอนสตรัคชั่น จำกัด'",
            "lang": "painless"
    }
}



GET / act_document / _search
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






POST / act_document / _update / 65117395889
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


POST / act_document / _update / 65117395889
{
    "script": {
        "source": "ctx._source.documents[1].information.data[4].remove",
            "lang": "painless"
    }
}



POST / act_document / _update / 65117395889
{
    "script": {
        "source": "ctx._source.documents[0].information.data[0].company = 'นางสาวณัฎฐนันท์ศิริเสถียร'",
            "lang": "painless"
    }
}
POST / act_document / _update / 65117395889
{
    "script": {
        "source": "ctx._source.documents[0].information.data[1].company = 'นายฟาอีสยีวาตานนทร์'",
            "lang": "painless"
    }
}


POST / act_document / _update / 63057011269
{
    "script": {
        "source": "ctx._source.priceBuild = 1992060",
            "lang": "painless"
    }
}


POST / act_document / _update / 63037295715
{
    "script": {
        "source": "ctx._source.sumPriceAgree = 93947434",
            "lang": "painless"
    }
}



POST / act_temp_company / _update /04312525312200833013114
{
    "script": {
        "source": "ctx._source.dbd = false",
            "lang": "painless"
    }
}

