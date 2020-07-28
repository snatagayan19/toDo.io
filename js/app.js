const clear= document.querySelector(".clear");
const dateElement = document.getElementById('date');
const list = document.getElementById('list');
const input = document.getElementById('input')
const addBtn = document.getElementById('addBtn');

//constants for the class names
const CHECK = "fa-check-circle";
const UNCHECK ="fa-genderless";
const LINE_THROUGH = "lineThrough";

//variables
let LIST ,id ;


// get item from localstorage
let data = localStorage.getItem("TODO");
// check if data is not empty

if(data){
    LIST = JSON.parse(data);
    id=LIST.length;
    loadList(LIST);
}
else{
    LIST = [];
    id = 0;

}
// load item to user interface
function loadList(array){
  array.forEach( function(item){
      addToDo(item.name, item.id, item.done,item.trash);

  });
}
//clear locale storage
clear.addEventListener('click',function(){
 
    localStorage.clear();
    location.reload();

});





//show date
const options = {weekday: "long" , month:"short", day:"2-digit"};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US",options);

// add to do function

function addToDo(toDo , id , done , trash){

    if(trash){ return; }
     
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : ""; 

    const item = ` <li class="item">

    <i class="fa ${DONE} co" aria-hidden="true" job="complete"id="${id}"></i>
    <p class="text ${LINE}"> ${toDo}</p> 
    <i class="fa fa-trash de" job="delete" id="${id}"></i>
  </li> `;
  const position = "beforeend";

   list.insertAdjacentHTML(position, item);  
}

//add an item to the list when user enter the enter key


addBtn.addEventListener('click',function(event){
 
    const toDo = input.value;
    if(toDo){
        addToDo(toDo , id, false ,false);
        LIST.push({
            name : toDo, 
            id : id,
            done : false,
            trash : false

        });
        // add item to localstorage
localStorage.setItem("TODO", JSON.stringify(LIST));
        
        id++; 
    }
    
    input.value = "";

});

//complete to do
function completeToDo(element){
     
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}
 
// remove to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

//target the items created dynamically

list.addEventListener('click', function(event){
  
    const element = event.target;

    const elementJob = element.attributes.job.value;

    if(elementJob == "complete"){
        completeToDo(element);
    }
    else if(elementJob == "delete"){
        removeToDo(element);
    }

    // add item to localstorage
localStorage.setItem("TODO", JSON.stringify(LIST));

});








