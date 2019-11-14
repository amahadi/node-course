// CRUD create read update delete

// const mongodb = require('mongodb');
// const mongoClient = mongodb.MongoClient;
// const objectID = mongodb.ObjectID;

const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';


MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if(error){ return console.log('Unable to connect to database!'); }
    
    const db = client.db(databaseName);

    // db.collection('users').findOne({ _id: new ObjectID("5dcc88062a07317ff0341b86") }, (error, user) => {
    //     if(error) { console.log('Unable to fetch!'); }
    //     console.log(user);
    // });

    // db.collection('users').find({ age: 26 }).toArray((error, users) => {
    //     console.log(users);
    // });

    // db.collection('users').find({ age: 26 }).count((error, count) => {
    //     console.log(count);
    // });

    // db.collection('tasks').findOne( { _id: new ObjectID("5dcc976e38da071dbc9db01f") }, (error, task) => {
    //     if(error) { return console.log('Unable to fetch by id!'); }
    //     console.log(task);
    // });

    // db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
    //     if(error) { return console.log('Unable to fetch!'); }
    //     console.log(tasks);
    // });

    // db.collection('users').updateOne({
    //     _id: new ObjectID("5dcc8b5fad3498060cc267fd")
    // }, {
    //     $set: {
    //         name: 'Sadia'
    //     }
    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // });

    // db.collection('users').updateOne({
    //     _id: new ObjectID("5dcc8b5fad3498060cc267fd")
    // }, {
    //     $inc: {
    //         age: 1
    //     }
    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // });

    // db.collection('tasks').updateMany({
    //     completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error);
    // });

    db.collection('tasks').deleteOne({
        description: "promises"
    }).then((result) => {
        console.log(`Task: '${result.deletedCount}' was deleted!`);
    }).catch((error) => {
        console.log(error);
    });
});