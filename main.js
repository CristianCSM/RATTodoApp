// JavaScript source code
let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let add = document.getElementById("add");

let data = []; //Almacenar información

let idDiv = 2;

let tasks = document.getElementById("tasks");

form.addEventListener('submit', (e) => {
    e.preventDefault();//Cuando se carga el formulario se limpian los campos
    formValidation();
});

let LoadForm = () => {

}

let formValidation = () => {

    if (textInput.value === "") {
        console.log("Failure");
        msg.innerHTML = "Task Title cannot be empty";
    }
    else {
        console.log("Success");
        msg.innerHTML = "";
        acceptData();
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();

        (() => {
            add.setAttribute("data-bs-dismiss", "modal");
        })
    }
}

let acceptData = () => {
    //data["tittle"] = textInput.value;
    //data["date"] = dateInput.value;
    //data["description"] = textarea.value;
    //console.log(data);
    //createTask();

    data.push({
        tittle: textInput.value,
        date: dateInput.value,
        description: textarea.value
    });

    localStorage.setItem("data", JSON.stringify(data));

    console.log(data);
    createTask();
}

let createTask = () => {

    tasks.innerHTML = "";

    data.map((x, y) => {
        idDiv = idDiv + 1;
        return (tasks.innerHTML += `
        <div id="task${idDiv}">
            <span class="fw-bold">${x.tittle}</span>
            <span class="small text-secondary">${x.date}</span>
            <span>${x.description}</span>
                <span class="options">
                <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fa-solid fa-pen-to-square"></i>
                <i onClick="deleteTask(task${idDiv})" class="fa-solid fa-trash-can"></i>
            </span>
        </div>`);
    });


    //form.reset();
    resetForm();
}

let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
}

let deleteTask = (e) => {
    e.remove();
    data.splice(e.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
}

let editTask = (e) => {

    let selectTask = e.parentElement.parentElement;

    textInput.value = selectTask.children[0].innerHTML;
    dateInput.value = selectTask.children[1].innerHTML;
    textarea.value = selectTask.children[2].innerHTML;

    selectTask.remove();
}

(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    createTask();
    console.log(data);
})();