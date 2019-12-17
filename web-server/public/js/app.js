const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#messageOne');
const messageTwo = document.querySelector('#messageTwo');

weatherForm.addEventListener('submit', (e) => {
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    e.preventDefault();
    const location = search.value;
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error) { return messageOne.textContent = data.error; }
        messageOne.textContent = data.summary;
        messageTwo.textContent = data.location;
    });
});
});