const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const connectionURL = 'mongodb+srv://adityapulast16:adi14916@cluster0.nwpm5gw.mongodb.net/test'
// const databaseName = 'LEARNING MOGODB'

console.log("fgchgvjbknlhvghcf");
// MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
//     console.log("fgchgvjbknlhvghcf");
//     if (error) {
//         return console.log('Unable to connect to database!')
//     }
//     console.log("connected")

//     const db = client.db(databaseName)
    
//     db.collection('users').insertOne({
//         name: 'Andrew',
//         age: 27
//     })
// })
// console.log("fgchgvjbknlhvghcf");

MongoClient.connect('mongodb+srv://adityapulast16:adi14916@cluster0.nwpm5gw.mongodb.net/test',{ useNewUrlParser: true ,useUnifiedTopology:true},function(err,connect) {
  if(err){
    console.log("Error!")
  } else {
    console.log('Database connected.')
  }
})