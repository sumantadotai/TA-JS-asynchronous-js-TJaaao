let container = document.querySelector(".container");
let root = document.querySelector(".todo-list");
let todoInput = document.querySelector('input[type="text"]');

let url = "https://basic-todo-api.vercel.app/api/todo";

function getDataFromApiAndCreateUI() {
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      createUI(res.todos);
    });
}

function addNewTodo(title) {
  let data = {
    todo: {
      title: title,
    },
  };
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(() => {
    getDataFromApiAndCreateUI();
  });
}

function deleteTodo(id) {
  fetch(url + `/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(() => {
    getDataFromApiAndCreateUI();
  });
}

function toggleCheckbox(id, value) {
  let data = {
    todo: {
      isCompleted: !value,
    },
  };
  fetch(url + `/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(() => {
    getDataFromApiAndCreateUI();
  });
}

function editTodo(event, id) {
  let editInput = document.createElement("input");
  editInput.value = event.target.innerText;
  p = event.target;
  p.parentElement.replaceChild(editInput, p);
  editInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter" && event.target.value.trim()) {
      let data = {
        todo: {
          title: event.target.value,
        },
      };
      fetch(url + `/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(() => {
        getDataFromApiAndCreateUI();
      });
    }
  });
}

function createUI(todos) {
  root.innerHTML = "";
  todos.forEach((todo) => {
    let li = document.createElement("li");
    li.classList.add("todo-item", "flex");
    let checkbox = document.createElement("input");
    checkbox.classList.add("checkbox");
    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = todo.isCompleted;
    checkbox.setAttribute("data-id", todo._id);
    checkbox.addEventListener("click", () =>
      toggleCheckbox(todo._id, todo.isCompleted)
    );
    let p = document.createElement("p");
    p.innerText = todo.title;
    p.addEventListener("dblclick", (event) => editTodo(event, todo._id));
    let span = document.createElement("span");
    span.innerText = "X";
    span.setAttribute("data-id", todo._id);
    span.addEventListener("click", () => deleteTodo(todo._id));
    li.append(checkbox, p, span);
    root.append(li);
  });
}

todoInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter" && event.target.value.trim()) {
    addNewTodo(event.target.value);
    event.target.value = "";
  }
});

getDataFromApiAndCreateUI();
/*
<div class="container">
  <input type="text" name="todo" placeholder="Enter Todo">  
  <ul class="todo-list">
    <li class="todo-item flex"><input type="checkbox" class="checkbox"> <p>lorem</p> <span>X</span></li>
    <li class="todo-item flex"><input type="checkbox" class="checkbox"> <p>lorem</p> <span>X</span></li>
    <li class="todo-item flex"><input type="checkbox" class="checkbox"> <p>lorem</p> <span>X</span></li>
    <li class="todo-item flex"><input type="checkbox" class="checkbox"> <p>lorem</p> <span>X</span></li>
    <li class="todo-item flex"><input type="checkbox" class="checkbox"> <p>lorem</p> <span>X</span></li>
    <li class="todo-item flex"><input type="checkbox" class="checkbox"> <p>lorem</p> <span>X</span></li>
  </ul>
</div>
*/
