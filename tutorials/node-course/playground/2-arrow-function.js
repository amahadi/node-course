// const square = function(x){
//     return x * x;
// }

// const square = (x) => x * x;

// console.log(2);

const event = {
    name: 'Birthday Party',
    guestList: ['Alvi', 'Mahadi', 'Utsab'],
    printGuestList() {
        console.log('Guest list for ' + this.name);

        this.guestList.forEach((guest) => {
            console.log(`${guest} is attending the ${this.name}`)
        });
    }
}

event.printGuestList();