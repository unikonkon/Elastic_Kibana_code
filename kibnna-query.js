

GET / act_document / _search
{
    "from": 10, // from กำหนดจำนวนข้อมูลตำแหน่ง ที่ 10 ขึ้นไป
    "size": 1000,
        "query": {
        "bool": {
            "must": [  //must เลือกที่ต้องการ
                {
                    "nested": { // ค้นหาไปที่ ตำหน่งที่ต้องการ 
                        "path": "fullInfo.winner",
                        "query": {
                            "match_phrase": {  // match_phrase ข้อมูลที่ตรงกัน
                                "fullInfo.winner.id.keyword": "xxxxxxxxxx"
                            }
                        }
                    }
                }
            ],
            must_not :[ //must_not ไม่เลือกที่ต้องการ
                
            ]
        }
    }
}

"aggs": {  // เพิ่ม file ที่ต้องการ ค้นหาข้อมูล แบบเพิ่ม file 
    "exists": {   // exists ต้องการตามนี้
      "filters": {
        "filters": {
          "nofileData": {  // ชื่อ file ที่ำด้จะเป็น nofileData ที่กำหนด
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
          "MultiContractsNormal": {
            "term": {
              "isCorruptPredictionPositive.keyword": "MultiContractsNormal"
            }
          }
        }
      }
    }
  }


  "aggs": {  // aggs เขียนเพิ่มข้อมูล แบบ การคำนวณผลรวมตาม field ที่ค้นหามาได้
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


  "must": [
    {
      "wildcard": {  // wildcard การค้นหาแบบ ระบุเฉพาะคำได้
        "projectId": "*03"
      }
    }
  ],

  "must": [
    {
      "terms": {  // terms การค้นหา แบบเลือกได้หลายตัว เชน เลื่อก tax 8 , 1 , 4
        "tax": [ "8", "1" ,"4"]  
      }
    }
  ],

  "range": {  // range กำหนด ระยะเวลาที่ต้องการค้นหา
    "pullDate": {
      "gte": "2023-10-26T07:00:00.000Z",
      "lte": "2023-10-26T08:00:00.000Z",
      "format": "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
    }
  }


  POST /act_document/_update/66079299433
{
  "script": {  //  script เขียนคำสั่งเฉพาะเจาะจงที่ต้องการค้นหา ใน source
    "source": "if (ctx._source.fullInfo.winner == null) { ctx._source.fullInfo.winner = []; } ctx._source.fullInfo.winner.add(params.newData)",
    "lang": "painless",  
    "params": {    // params ทำการ เพิ่มข้อมูลเข้าไปได้
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

POST /act_document/_update/66017074473    // script เขียนคำสั่ง update โดยใส่คำสั่งเฉพาะ
{ 
  "script": {  
    "source": "ctx._source.fullInfo.winner[0]['name'] = 'บริษัท ขอนแก่นวิโรจน์คอนสตรัคชั่น จำกัด'",
    "lang": "painless"
  }
}


"bool": {
    "should": [  // should การค้นหา แบบรวมการค้นหาเข้าด้วยกัน
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


  "must": [  //  ใน must เขียน match ค้นหามากกว่า 2 ที่ได้  
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



  "query": {  // query ให้ _source ตาม field ที่กำหนดได้
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


OST /act_document/_update_by_query  // เขียน update ตามคำสั่งเฉพาะ ให้ update ตาม id ได้
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

//เช็กข้อมูลต้นทางจากเอกสารข้อมูลสาระสำคัญในสัญญาและเอกสารการเสนอราคา
GET /act_document/_search  // เขียน ค้นหาข้อมูล แบบ เลือกเฉพาะ field ที่ต้องการได้ 
{
  "track_total_hits": true,
  "size": 10,
  "query": {
    "bool": {
      "must": [
        {
          "wildcard": {
            "projectId": "66*"
          }
        }
      ],
      "must_not": [
        {
          "terms": {  //  terms ใน must_not เลือกตัวที่ไม่ต้องการข้อมูล ข้อมูลสาระสำคัญในสัญญา , ข้อมูลการเสนอราคา ตามนี้
            "documents.filename": [
              "ข้อมูลสาระสำคัญในสัญญา",
              "ข้อมูลการเสนอราคา"
            ]
          }
        }
      ]
    }
  }
}


DELETE /act_company/_doc/013408013223234827210449322025492013223223493207   // ลบข้อมูล ตาม id ที่กำหนดได้


POST /act_company/_bulk  // การเพิ่มข้อมูล กำหนด id ได้
{
  "index": {
    "_id": "0993000446984"
  }
}
{
  "_index": "act_company",
  "_score": "-",
  "_type": "_doc",
  "name": "กิจการร่วมค้า ล้อการสร้าง",
  "processTax": 1,
  "tax": 0,
  "taxType": "ระบุไม่ได้",
  "winner.count": 13,
  "winner.price": 85671000
}
