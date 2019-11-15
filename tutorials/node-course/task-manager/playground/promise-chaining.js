require('../src/db/mongoose');
const User = require('../src/models/user_model');

User.findByIdAndUpdate('5dceee200b826d7b8843f85e', {age: 1}).then((user) => {
    console.log(user);
    return User.countDocuments({age: 1}).then((user_count) => {
        console.log(user_count);
    })
}).catch((e) => {console.log(e)});