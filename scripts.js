let form = document.getElementById("eventForm");
let container = document.getElementById("eventsContainer");
if(form){
    form.addEventListener('submit', (event)=> {
    event.preventDefault();
    let name = document.getElementById("eventName").value;
    let date = document.getElementById("eventDate").value;

    let newEvent = { name: name, date: date };
    let newEventsList;
    if(localStorage.getItem("newEventsList")){
        newEventsList = JSON.parse(localStorage.getItem("newEventsList"));
    }
    else newEventsList = [];
    newEventsList.push(newEvent);
    localStorage.setItem("newEventsList", JSON.stringify(newEventsList));

    form.reset();
})
}

if(container){
    let newEventsList = JSON.parse(localStorage.getItem("newEventsList"));
    for(newEvent of newEventsList){
    container.innerHTML += `
        <a href="form.html" class="eventCard">
        <img src="https://placehold.co/600x400">
        <h3>${newEvent.name}</h3>
        <p>${newEvent.date}</p>
        </a>
    `
    }
}
