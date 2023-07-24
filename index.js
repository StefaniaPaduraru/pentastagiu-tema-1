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
const strRegex = /^[a-zA-z0-9]+$/;
const taskList=document.getElementById("task-div");
const closeButton=document.getElementById("closeBtn");

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
    alert("Title must be filled out");
    event.preventDefault();
  } else if(y == "") {
    alert("Description must be filled out");
    event.preventDefault();
  } else if(z == "") {
    alert("Email field must be filled out");
    event.preventDefault();
  } 
}
//functia formularului => onsumbit in care se face stocarea datelor in localStorage
function submitFunc(event){
  let formInput = JSON.parse(localStorage.getItem("formInput"))|| [];
  formInput.push({
    Title: titleInput.value.trim(),
    Description: descriptionInput.value.trim(),
    Assignee: assigneeInput.value.trim()
  })
  const myJSON=JSON.stringify(formInput)
  localStorage.setItem("formInput",myJSON);
  dispData();
  event.preventDefault();
  taskForm.reset();
}
//eveniment declansat cand intreaga structura DOM a fost construita si este pregatita sa intearctioneze cu JS
document.addEventListener("DOMContentLoaded", function() {
  dispData();
});
//se afiseaza dialogul
showDialog.addEventListener("click", () => {
  createTask.showModal();
});
//
submitButton.addEventListener("click", (event) => {
  validateForm(event);
  event.preventDefault(); //opreste comportamentul implicit al formularului
});
//functie ce afiseaza datele stocate in local storage
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
    <input type="checkbox" name="completed">
    <p>Task is completed!</p>
    </section>
    <button id="deleteBtn" onclick="deleteTask(${index})">Delete Task</button>
    </div>
    <span class="separator"></span>
    `
  });
}  
}
//Stergere task
function deleteTask(index){
  var formInput = JSON.parse(localStorage.getItem("formInput"))|| [];
  formInput.splice(index,1);
  localStorage.setItem("formInput",JSON.stringify(formInput));
  dispData();
}

dispData();
//se inchide dialogul
closeButton.addEventListener('click',() => {
  createTask.close();
});