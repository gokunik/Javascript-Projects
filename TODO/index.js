console.log("This is a todo application developed by Nitesh Khatri");

let todoList = [];

function check() {
  if (localStorage.todo && JSON.parse(localStorage.todo).length) {
    todoList = JSON.parse(localStorage.todo);
  } else {
    document.querySelector("#pHide").classList.remove("hide");
  }
}

// dom elements
let todoBox = document.querySelector(".todoBox");
let showModalBtn = document.querySelector("#showModal");
let closeModalBtn = document.querySelector("#closeModalBtn");
let todoModal = document.querySelector(".todoModal");
let addTodo = document.querySelector("#addTodo");
let messsage = document.querySelector("#message");

// event listeners
window.addEventListener("load", printList);
showModalBtn.addEventListener("click", toggleModal);
closeModalBtn.addEventListener("click", toggleModal);
addTodo.addEventListener("click", addDetails);

// methods
function toggleModal() {
  document.querySelector(".wrapper").classList.toggle("hide");
  todoModal.classList.toggle("show");
}

function addDetails() {
  let todoName = document.querySelector("#todoName");
  let todoDesc = document.querySelector("#todoDesc");
  let todoDate = document.querySelector("#todoDate");
  let todoPriority = document.querySelector("#todoPriority");

  let details = [todoName, todoDesc, todoDate, todoPriority];

  let todoObject = {
    name: todoName.value,
    desc: todoDesc.value,
    date: todoDate.value,
    priority: todoPriority.value,
    status: false,
  };

  if (todoName.value == "") {
    messsage.innerHTML = "";
    document.querySelector(".alert").classList.add("show");
    messsage.appendChild(document.createTextNode("Todo name is empty!"));
    return 1;
  }

  todoList.push(todoObject);

  todoList.sort((a,b) => a.priority - b.priority);

  localStorage.setItem("todo", JSON.stringify(todoList));

  printList();

  details.pop();
  details.forEach((item) => {
    item.value = "";
  });

  todoModal.classList.remove("show");
  document.querySelector(".wrapper").classList.toggle("hide");
  document.querySelector("#pHide").classList.add("hide");
}

// printList function for updating the todo List
function printList() {
  check();

  while (todoBox.firstChild) {
    todoBox.removeChild(todoBox.firstChild);
  }
  counter = 0;
  todoList.forEach((element) => {
    let todoTemplate = document.querySelector(".todoTemplate").cloneNode(true);
    todoTemplate.classList.remove("disabled");
    todoTemplate.classList.remove("todoTemplate");

    let todo = todoTemplate.children[0];
    let collapse = todoTemplate.children[1];

    // todo
    todo.children[1].dataset["bsTarget"] = "#collapse" + counter;
    collapse.id = "collapse" + counter;
    todo.children[1].innerHTML = element.name;

    if(element.priority == 1)
    {
      todo.children[2].innerHTML = "High";
    }
    else if(element.priority==2)
    {
      todo.children[2].innerHTML = "Medium";
    }
    else if(element.priority==3)
    {
      todo.children[2].innerHTML = "Low";
    }
    else if(element.priority==4)
    {
      todo.children[2].style.display = "none";
    }
    
    todo.children[3].id = counter;

    collapse.children[0].innerHTML = element.desc;
    collapse.children[1].children[1].value = element.date
      .split("-")
      .reverse()
      .join("-");

    

    if (element.status) {
      todo.children[0].checked = true;
    } else {
      todo.children[0].checked = false;
    }

    todoBox.appendChild(todoTemplate);
    counter++;
  });

  localStorage.setItem("counter", counter);
}

// delete a todo and upadte the todo list
function deleteTodo(event) {
  counter = 0;
  todoList = [];

  let id = event.target.parentElement.id;
  let list = JSON.parse(localStorage.todo);

  for (let i = 0; i < list.length; i++) {
    if (!(i == id)) {
      todoList[i] = list[i];
    }
  }

  todoList = todoList.filter( elm => { return elm != null });

  localStorage.setItem("todo", JSON.stringify(todoList));
  printList();
  check();
  todoList;
}

// change the status of todo to complete or incomplete
function toggleStatus(event) {
  let id = event.target.parentElement.children[3].id;

  let elm = 0;
  for (i = 0; i < todoList.length; i++) {
    let s = todoList[i].status;
    if (i == id) {
      elm = i;
      todoList[i].status = s === false ? true : false;
    }
  }

  localStorage.setItem("todo", JSON.stringify(todoList));
}
