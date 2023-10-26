const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors');
const app=express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors())
const {google}=require('googleapis')
const cx="" // Your Engine ID
const API_KEY="" // Your API KEY
const search=google.customsearch('v1')

app.get('/search-query',(request,response)=>{
  const query=JSON.parse(request.query.search_query).keyword //QUERY KEYWORD
  search.cse.list({auth:API_KEY,cx:cx,q:query},(err,res)=>{
    if(err){
      response.json({error:err})
      return
  }
    response.json({res:res})
  })
})

const port=3001
app.listen(port,()=>{
  console.log(`Server Listening on Port ${port}`)
})