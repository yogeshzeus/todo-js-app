let tasklist = [];

let Change;
let flag = true;
start();

function items(todo) {
  start();
  const list = document.querySelector(".text-row-list");
  var child = list.lastElementChild;
  while (child) {
    list.removeChild(child);
    child = list.lastElementChild;
  }

  for (let i = 0; i < tasklist.length; i++) {
    const node = document.createElement("div");
    node.setAttribute("class", `card`);
    node.setAttribute("data-key", tasklist[i].id);
    node.innerHTML = `<p class="card-heading" onclick="redirect(this)">${tasklist[i].heading}</p>
      <ul style="list-style-type:none;">
      </ul>
      <div class='footer'>
          <button class='btn-completed' onclick="removeToDo(this)"><i class="fa fa-trash" aria-hidden="true"></i></button> 
          <p class = 'btn-add' onclick="toggleAddItem(this)"><i class="fa fa-plus-circle"></i></p>
      </div>
      `;
    console.log(node.childNodes);
    list.append(node);
    let currentTodo = tasklist[i];
    for (let j = 0; j < currentTodo.subTask.length; j++) {
      let classToPut = currentTodo.subTask[j].marked
        ? "card-item card-item-checked"
        : "card-item";
      let rest = currentTodo.subTask[j].marked
        ? ""
        : '<button class = "markDone" onclick="markCompleted(this)">Mark Done</button>';
      const liNode = document.createElement("li");
      liNode.setAttribute("class", classToPut);
      liNode.setAttribute("data-key", currentTodo.subTask[j].id);
      liNode.innerHTML = ` ${currentTodo.subTask[j].name} ${rest}`;
      node.childNodes[2].append(liNode);
    }
  }
}
function start() {
    if (flag) {
      document.getElementById("seconddiv").style.display = "none";
      document.getElementById("firstdiv").style.display = "block";
    } else {
      document.getElementById("firstdiv").style.display = "none";
      document.getElementById("seconddiv").style.display = "block";
    }
    if (tasklist.length === 0) {
      console.log(document.getElementById("empty"));
      console.log(tasklist);
      document.getElementById("empty").style.display = "block";
    } else {
      console.log("inside");
      document.getElementById("empty").style.display = "none";
    }
  }
  
  
  

function markCompleted(element) {
  let classToPut = flag
    ? "card-item card-item-checked"
    : "card-item-2 card-item-checked";
  element.parentNode.setAttribute("class", classToPut);
  let id = element.parentNode.parentNode.parentNode.getAttribute("data-key");
  let subTaskId = element.parentNode.getAttribute("data-key");

  // Find in the todo array
  for (let i = 0; i < tasklist.length; i++) {
    if (tasklist[i].id == id) {
      for (let j = 0; j < tasklist[i].subTask.length; j++) {
        if (tasklist[i].subTask[j].id == subTaskId) {
          tasklist[i].subTask[j].marked = true;
        }
      }
    }
  }
  element.parentNode.removeChild(element);
}

function addTodo() {
  let heading = document.getElementById("listHeading").value;
  if (heading !== "") {
    const todo = {
      heading,
      completed: false,
      subTask: [],
      id: Date.now(),
    };
    tasklist.push(todo);
    toggle();
    goBack();
  }
}

function addSubTodo() {
  let taskHeading = document.getElementById("subListHeading").value;
  if (taskHeading !== "") {
    let list;
    if (flag) {
      list = Change.parentNode.parentNode.childNodes[2];
    } else {
      list = Change.parentNode.parentNode.childNodes[3];
    }
    console.log(Change.parentNode, Change.parentNode.parentNode);
    let id = Change.parentNode.parentNode.getAttribute("data-key");
    console.log(Change.parentNode.parentNode);

    const node = document.createElement("li");
    node.setAttribute("class", flag ? `card-item` : `card-item-2`);
    node.setAttribute("data-key", Date.now());
    node.innerHTML = ` ${taskHeading}<button class = 'markDone' onclick="markCompleted(this)">Mark Done</button>`;

    let currentTodo;
    //Find in the todo array
    for (let i = 0; i < tasklist.length; i++) {
      if (tasklist[i].id == id) {
        tasklist[i].subTask.push({
          name: taskHeading,
          marked: false,
          id: node.getAttribute("data-key"),
        });
      }
    }

    list.append(node);
    toggleAddItem();
  }
  console.log(tasklist);
}

function removeToDo(element) {
  let tempElement = element.parentNode.parentNode;
  console.log(tempElement);

  //Find in the todo array and remove
  for (let i = 0; i < tasklist.length; i++) {
    if (tasklist[i].id == tempElement.getAttribute("data-key")) {
      tasklist.splice(i, 1);
    }
  }
  if (!flag) {
    goBack();
  } else {
    tempElement.parentNode.removeChild(tempElement);
    start();
  }
}

function toggle() {
  var blur;
  if (flag) {
    blur = document.getElementById("firstdiv");
  } else {
    blur = document.getElementById("seconddiv");
  }
  blur.classList.toggle("active");

  var popup = document.getElementById("pop");
  popup.classList.toggle("active");
}

function toggleAddItem(item) {
  Change = item;
  var blur;
  if (flag) {
    blur = document.getElementById("firstdiv");
  } else {
    blur = document.getElementById("seconddiv");
  }
  blur.classList.toggle("active");

  var popup = document.getElementById("popAddItem");
  popup.classList.toggle("active");
}

function redirect(element) {
  let id = element.parentNode.getAttribute("data-key");

  let currentTodo;
  //Find in the todo array
  for (let i = 0; i < tasklist.length; i++) {
    if (tasklist[i].id == id) {
      currentTodo = tasklist[i];
    }
  }
  flag = false;
  start();
  document.getElementById("currentHeading").textContent = currentTodo.heading;
  document.getElementById("currentHeading-1").textContent = currentTodo.heading;
  document
    .getElementById("currentHeading-1")
    .parentNode.setAttribute("data-key", currentTodo.id);

  console.log(currentTodo);
  let e = document.getElementById("singleList");
  var child = e.lastElementChild;
  while (child) {
    e.removeChild(child);
    child = e.lastElementChild;
  }
  for (let i = 0; i < currentTodo.subTask.length; i++) {
    let classToPut = currentTodo.subTask[i].marked
      ? "card-item-2 card-item-checked"
      : "card-item-2";
    let rest = currentTodo.subTask[i].marked
      ? ""
      : '<button class = "markDone" onclick="markCompleted(this)">Mark Done</button>';
    const node = document.createElement("li");
    node.setAttribute("class", classToPut);
    node.setAttribute("data-key", currentTodo.subTask[i].id);
    node.innerHTML = ` ${currentTodo.subTask[i].name} ${rest}`;
    e.append(node);
  }
}
function goBack() {
  flag = true;
  items();
}