document.querySelectorAll(".addingElement").forEach(element => {
    element.addEventListener('click', (event) => {
        if (localStorage.getItem("clickedEventIndex")) {
            localStorage.removeItem("clickedEventIndex");
        }
    });
});

document.getElementById("navButton").addEventListener('click', () => {
    const sideBar = document.getElementById("sideBar");
    
    if (window.getComputedStyle(sideBar).display === 'none') {
        sideBar.style.display = 'grid';   
    } else {
        sideBar.style.display = 'none';  
    }
});
let form = document.getElementById("eventForm");
let container = document.getElementById("eventsContainer");
if(form){
    let editIndex = localStorage.getItem("clickedEventIndex");
    if (editIndex !== null) {
        let newEventsList = JSON.parse(localStorage.getItem("newEventsList"));
        let clickedEvent = newEventsList[editIndex];

        if (clickedEvent) {
            document.getElementById("eventName").value = clickedEvent.name;
            document.getElementById("eventDate").value = clickedEvent.date;
        }
        
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            newEventsList[editIndex].name = document.getElementById("eventName").value;
            newEventsList[editIndex].date = document.getElementById("eventDate").value;
            localStorage.setItem("newEventsList", JSON.stringify(newEventsList));

            localStorage.removeItem("clickedEventIndex");
            form.reset();
        });

    }
    else{
        form.addEventListener('submit', (event)=> {
            event.preventDefault();
            let name = document.getElementById("eventName").value;
            let date = document.getElementById("eventDate").value;

            let newEvent = { name: name, date: date};
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
}

if(container){
    let newEventsList = JSON.parse(localStorage.getItem("newEventsList")) || [];
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    
    function decideColor(newEvent){
        let newEventDate = new Date(newEvent.date);
        newEventDate.setHours(0, 0, 0, 0);
        if(newEventDate > today)
        {
            return "purple";
        }
        else if(newEventDate < today){
            return "red";

        }
        else return "blue";

    }
    newEventsList.forEach((newEvent, index) => {
        container.innerHTML += `
        <div class="eventCard" data-index="${index}" style="background-color:${decideColor(newEvent)}">
        <h3 class="eventNameOnCard">${newEvent.name}</h3>
        <p class="eventDateOnCard">${newEvent.date}</p>
        </div>
    `
    });

    container.addEventListener('click', (event) => {
        let card = event.target.closest('.eventCard');
        if (card) {
            let clickedIndex = card.dataset.index;
            console.log(clickedIndex);
            localStorage.setItem("clickedEventIndex", clickedIndex);
            
            window.location.href = "form.html";
        }
    });

    function cleanIfAdding(){
        if(localStorage.getItem("clickedEventIndex")) localStorage.removeItem("clickedEventIndex");
    }
}
