const createTask = document.getElementById("createTask");
const showDialog = document.getElementById("showDialog");
const submitButton = document.getElementById("submitBtn");
const outputTitle = document.getElementById("outputTitle");
const outputDescription = document.getElementById("outputDescription");
const outputAssignee = document.getElementById("outputAssignee");
const taskForm = document.getElementById("taskForm");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const assigneeInput = document.getElementById("assignee");
const strRegex = /^[a-zA-z0-9]+$/;


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
// Funcție pentru a stoca valorile în localStorage
function storeValuesInLocalStorage() {
  const inputTitle = titleInput.value.trim();
  const inputDescription = descriptionInput.value.trim();
  const inputAssignee = assigneeInput.value.trim();

  localStorage.setItem("title", inputTitle);
  localStorage.setItem("description", inputDescription);
  localStorage.setItem("assignee", inputAssignee);
}

// Funcție pentru a afișa valorile salvate în câmpurile corespunzătoare
function showValuesFromLocalStorage() {
  outputTitle.value = localStorage.getItem("title") || "";
  outputDescription.value = localStorage.getItem("description") || "";
  outputAssignee.value = localStorage.getItem("assignee") || "";
}

// Verificare valori existente salvate în localStorage + afișare în câmpuri
showValuesFromLocalStorage();

showDialog.addEventListener("click", () => {
  createTask.showModal();
});

submitButton.addEventListener("click", (event) => {
  validateForm(event);
  storeValuesInLocalStorage();
  createTask.close();
});