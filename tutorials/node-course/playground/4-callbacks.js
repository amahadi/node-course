// setTimeout(()=>{
//     console.log('2 seconds are up');
// }, 2000);

// const names = ['alvi', 'mahadi', 'utsab'];

// const shortnames = names.filter((name) => {
//     return name.length <= 4;
// });

// const geocode = (address, callback) => {
//     setTimeout(() => {
//         const data = {
//             latitude: 0,
//             longitude: 0
//         };
    
//         callback(data);
//     }, 2000);
// }

// geocode('Victoria', (data) => {
//     console.log(data);
// });

const add = (a, b, callback) => {
    setTimeout(() => {
        const sum = a + b;
        callback(sum);
    }, 2000)
};

add(1, 4, (sum) => {
    console.log(sum) // Should print: 5
})