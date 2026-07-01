let form = document.getElementById("eventForm");
let container = document.getElementById("eventsContainer");
if(form){
    form.addEventListener('submit', (event)=> {
    event.preventDefault();
    let name = document.getElementById("eventName").value;
    let date = document.getElementById("eventDate").value;

    let newEvent = { name: name, date: date };
    localStorage.setItem("newEvent", JSON.stringify(newEvent));

    form.reset();
})

}

if(container){
    let newEvent = JSON.parse(localStorage.getItem("newEvent"));
    container.innerHTML += `
    <a href="form.html" id="eventCard">
                <img src="https://placehold.co/600x400">
                <h3>${newEvent.name}</h3>
                <p>${newEvent.date}</p>
            </a>
    
    
    `
}
