import axios from 'axios'
import searchProfile from './model/readfromcsv.js'


async function fetch () {
  
    const filenameUrl = "./model/csv/keyword.csv"
    const filenamePer = "./model/csv/profiles.csv"
    const UrlData = await searchProfile('test',filenameUrl)
    const PerData = await searchProfile('test',filenamePer)
    
    //insert proxy 
    await axios.post('http://localhost:3000/targetproxy',{
        "host":"95.164.205.251",
        "port":"8989",
        "username":"kb56c7c",
        "password":"oxqn8kp"
     },
     
     )
        .then((response)=> {
            console.log(response.data)
        })



    //insert product url & zip_code 
    await axios.post('http://localhost:3000/targetproduct',{
        "url":UrlData[0].item_url,
        "zip_code":PerData[0].zip_code
     },
     
     )
        .then((response)=> {
            console.log(response.data)
        })

    //get product info 
    await axios.get('http://localhost:3000/targetproductdata')
        .then((response)=> {
            console.log(response.data)
        })
    
    // check product in stock or no
    await axios.post('http://localhost:3000/targetproductstock',{
        "state":PerData[0].state,
        "latitude":PerData[0].latitude,
        "longitude":PerData[0].longitude
        })
        .then((response)=> {
            console.log(response.data)
        })
    //login 
    await axios.post('http://localhost:3000/targetloginUser',{
        "username":PerData[0].Email,
        "password":PerData[0].Password
        })
        .then((response)=> {
            console.log(response.data)
        })
    //add product into cart
    await axios.post('http://localhost:3000/targetaddproduct',{
        "quantity":UrlData[0].quantity
     })
        .then((response)=> {
            console.log(response.data)
        })
    //insert address
    await axios.post('http://localhost:3000/targetinsertaddress',{
        "first_name":PerData[0].first_name,
        "last_name":PerData[0].last_name,
        "phoneno":PerData[0].phoneno,
        "state":PerData[0].state,
        "country":PerData[0].country,
        "city":PerData[0].city,
        "zip_code":PerData[0].zip_code,
        "address":PerData[0].address
        })
        .then((response)=> {
            console.log(response.data)
        })
    //insert payment
    await axios.post('http://localhost:3000/targetinsertpayment',{
        "card_name":PerData[0].card_name,
        "card_number":PerData[0].card_number,
        "cvv":PerData[0].cvv,
        "expiry_month":PerData[0].expiry_month,
        "expiry_year":PerData[0].expiry_year,
        "first_name":PerData[0].first_name,
        "last_name":PerData[0].last_name,
        "phoneno":PerData[0].phoneno,
        "state":PerData[0].state,
        "country":PerData[0].country,
        "city":PerData[0].city,
        "zip_code":PerData[0].zip_code,
        "address":PerData[0].address
    })
    .then((response)=> {
        console.log(response.data)
    })

    //final checkout
    await axios.post('http://localhost:3000/targetcheckout')
    .then((response)=> {
        console.log(response.data)
    })
}


fetch()


