require('../src/db/mongoose');
const Task = require('../src/models/task_model');

// Task.findByIdAndDelete('5dceee6b0b826d7b8843f862').then((task) => {
//     console.log(`Task: ${task.description} is deleted`);
//     return Task.countDocuments({completed: false}).then((task_count) => { console.log(task_count) });
// }).catch((e) => {console.log(e)});

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({completed: false});
    return count;
}

deleteTaskAndCount('5dcd1a04fb2e5f790d14884c').then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e.message);
});