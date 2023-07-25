const createTask = document.getElementById("createTask");
const showDialog = document.getElementById("showDialog");
const submitButton = document.getElementById("submitBtn");
const outputTitle = document.getElementById("outputTitle");
const outputDescription = document.getElementById("outputDescription");
const outputAssignee = document.getElementById("outputAssignee");
const taskForm = document.getElementById("task-form");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const assigneeInput = document.getElementById("assignee");
const taskList=document.getElementById("task-div");
const taskList2=document.getElementById("task-div2")
const closeButton=document.getElementById("closeBtn");
const clrAllBtn=document.getElementById("clearAll");

const strRegex = /^[a-zA-z0-9]+$/;
let completedTasks = [];  //array pentr task-uri finalizate

//functie pentru validare campului title
titleInput.addEventListener("blur",()=>{
  if(strRegex.test(titleInput.value.trim())){
        console.log('Valid title');
  }else{
    alert('Invalid title! The title should contain only alphanumeric characters.')
  }
});

//functie de validare a formularului
function validateForm(event) {
  let x = titleInput.value.trim();
  let y = descriptionInput.value.trim();
  let z = assigneeInput.value.trim();
  if (x == "") {
    alert("Title field must be filled out");
    event.preventDefault();
  } else if(y == "") {
    alert("Description field must be filled out");
    event.preventDefault();
  } else if(z == "") {
    alert("Email field must be filled out");
    event.preventDefault();
  } 
}

//functia formularului in care se face stocarea datelor in localStorage (in formInput)
function submitFunc(event){
  let formInput = JSON.parse(localStorage.getItem("formInput"))|| [];
  formInput.push({
    Title: titleInput.value.trim(),
    Description: descriptionInput.value.trim(),
    Assignee: assigneeInput.value.trim()
  })
  const myJSON=JSON.stringify(formInput);  //Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
  localStorage.setItem("formInput",myJSON);
  dispData();
  dispCompletedData();
  event.preventDefault();  //cand se apasa pe submit nu se doreste inchiderea formularului
  taskForm.reset();  //reseteaza valorile input-urilor
}

//eveniment declansat cand intreaga structura DOM a fost construita si este pregatita sa intearctioneze cu JS
document.addEventListener("DOMContentLoaded", function() {
  //obtinere valori existente din local storage pentru completedTasks
  let storedCompletedTasks = JSON.parse(localStorage.getItem("completedTasks"));

  //verificare existenta valori in local storage pentru completedTasks și actualizare array
  if (storedCompletedTasks && Array.isArray(storedCompletedTasks)) {
    completedTasks = storedCompletedTasks;
  } else {
    //daca completedTasks nu exista in local storage, se initializeaza cu array gol
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }
  dispData();
  dispCompletedData();
});

//se afiseaza dialogul
showDialog.addEventListener("click", () => {
  createTask.showModal();
});

submitButton.addEventListener("click", (event) => {
  validateForm(event);
  alert("Your task has been added successfully!");
  event.preventDefault();  //opreste comportamentul implicit al formularului
});

//functie ce afiseaza datele pentru task-urile noi, stocate in local storage
function dispData(){
  if(localStorage.getItem("formInput")){
    var output = taskList;
    output.innerHTML="";
  }
  if(JSON.parse(localStorage.getItem("formInput"))!==null){
  JSON.parse(localStorage.getItem("formInput")).forEach((formInput,index) =>{
    output.innerHTML +=`
    <div class="individual-task">
    <h2>${formInput.Title}</h2>
    <h4>${formInput.Description}</h4>
    <p>Assignee: ${formInput.Assignee}</p>
    <section style="display:flex;">
    <input type="checkbox" onclick="taskComplete(this)" name="completed" data-index="${index}">
    <p>Task is completed!</p>
    </section>
    <button id="deleteBtn" onclick="deleteTask(${index})">Delete Task</button>
    </div>
    <span class="separator"></span>
    `
  });
}  
}

//functie ce v-a muta task-ul din div-ul inProgress in div-ul Complete
function taskComplete(checkbox) {
  var index = checkbox.getAttribute("data-index");
  var tasks = JSON.parse(localStorage.getItem("formInput"));

  if (tasks[index]) {
    var completedTask = tasks.splice(index, 1)[0];
    completedTasks.push(completedTask);
    localStorage.setItem("formInput", JSON.stringify(tasks));
    
    //actualizare doar completedTasks in local storage, fara a-l suprascrie complet
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }
  dispData();
  dispCompletedData();
}

//functie de afiseaza datele pentru task-urile complete
function dispCompletedData() {
  if (localStorage.getItem("completedTasks")) {
    var output = taskList2;
    output.innerHTML = "";
  
    JSON.parse(localStorage.getItem("completedTasks")).forEach((formInput) => {
      output.innerHTML +=`
        <div class="individual-task">
          <h2>${formInput.Title}</h2>
          <h4>${formInput.Description}</h4>
          <p>Assignee: ${formInput.Assignee}</p>
          <h5 style="font-size:24px; color:#008b8bc9; margin:10px 0px;">Task is completed!</h5>
        </div>
        <span class="separator"></span>
      `
    });
  }
}

//stergere task individual
function deleteTask(index){
  var formInput = JSON.parse(localStorage.getItem("formInput"))|| [];
  formInput.splice(index,1);
  localStorage.setItem("formInput",JSON.stringify(formInput));
  dispData();
  dispCompletedData();
}

//stergere totala task-uri complete
clrAllBtn.addEventListener('click',()=>{
  if(completedTasks!=[]){
  completedTasks=[];
  localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }
  else if(completedTasks==[]){
    alert("All tasks have already been deleted!")
  }
  dispCompletedData();
})

dispData();
dispCompletedData();

closeButton.addEventListener('click',() => {
  createTask.close();  //inchiderea dialogului
});