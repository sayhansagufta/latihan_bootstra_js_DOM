const todos = [];
const RENDER_EVENT = "render-todo";
// inisialisasi custom event dengan variabel SAVED_EVENT dengan nama = "saved-todo"
const SAVED_EVENT = "saved-todo";
// inisialisasi key local storage dengan variabel STORAGE_KEY dengan key = 'TODO_APPS'
const STORAGE_KEY = "TODO_APPS";

document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("form");
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addTodo();
  });

  // memanggil fungsi tersebut pada saat semua elemen HTML sudah selesai dimuat menjadi DOM.
  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

// membuat function untuk saveData()
function saveData() {
  // function untuk memastikan bahwa browser yang dipakai mendukung localStorage
  // function isStorageExist() mengembalikan nilai boolean untuk menentukan apakah memang benar didukung atau tidak
  if (isStorageExist()) {
    // localStorage hanya menyimpan data berupa tipe data teks maka diperlukan konversi data object ke string agar data disimpan dengan menggunakan JSON.stringify() untuk mengonversi.
    const parsed = JSON.stringify(todos);
    // menyimpan data ke storage sesuai dengan key yang sudah ditentukan. Dalam hal ini key yang digunakan adalah "TODO_APPS" dalam variabel STORAGE_KEY
    localStorage.setItem(STORAGE_KEY, parsed);
    // untuk mempermudah debugging pada saat perubahan data, kita akan memanggil sebuah custom event baru yang bernama "saved-todo" dalam variabel SAVED_EVENT.
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

// membuat function isStorageExist()
function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }
  return true;
}

document.addEventListener(SAVED_EVENT, function () {
  // mengambil data dari localStorage dengan function getItem()
  console.log(localStorage.getItem(STORAGE_KEY));
});

// membuat function ketika browser memuat data sehingga data tidak hilang di tampilan
function loadDataFromStorage() {
  // inisialisasi variabel serializedData
  // mengambil data dari localStorage dengan function getItem dengan variabel STORAGE_KEY
  const serializedData = localStorage.getItem(STORAGE_KEY);
  // inisialisasi variabel data
  // setelah data diambil dari localStorage dengan variabel serializedData dalam format teks JSON. kemudian variabel data memparse data JSON tadi menjadi sebuah objek.
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const todo of data) {
      todos.push(todo);
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
}

function addTodo() {
  const textTodo = document.getElementById("title").value;
  const timeStamp = document.getElementById("date").value;

  // Validasi untuk input kosong
  if (textTodo === "" || timeStamp === "") {
    alert("Title and Date cannot be empty!");
    return;
  }

  const generatedID = generateID();
  const todoObject = generateTodoObject(generatedID, textTodo, timeStamp, false);
  todos.push(todoObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData(); // menambahkan function saveData pada function addTodo
}

function generateID() {
  return +new Date();
}

function generateTodoObject(id, task, timestamp, isCompleted) {
  return {
    id,
    task,
    timestamp,
    isCompleted,
  };
}

// Listen for the custom event to render and log todos array
document.addEventListener(RENDER_EVENT, function () {
  //console.log(todos);
  const uncompletedTODOList = document.getElementById("todos");
  uncompletedTODOList.innerHTML = "";

  const completedTODOList = document.getElementById("completed-todos");
  completedTODOList.innerHTML = "";

  for (const todoItem of todos) {
    const todoElement = makeTodo(todoItem);
    if (!todoItem.isCompleted) {
      uncompletedTODOList.append(todoElement);
    } else {
      completedTODOList.append(todoElement);
    }
  }
});

// membuat fungsi untuk menghasilkan sebuah item
function makeTodo(todoObject) {
  const textTitle = document.createElement("h2");
  textTitle.innerText = todoObject.task;

  const textTimeStamp = document.createElement("p");
  textTimeStamp.innerText = todoObject.timestamp;

  const textContainer = document.createElement("div");
  textContainer.classList.add("inner");
  textContainer.append(textTitle, textTimeStamp);

  const container = document.createElement("div");
  container.classList.add("item", "shadow");
  container.append(textContainer);
  container.setAttribute("id", `todo-${todoObject.id}`);

  if (todoObject.isCompleted) {
    const undoButton = document.createElement("button");
    undoButton.classList.add("undo-button");

    undoButton.addEventListener("click", function () {
      undoTaskFromCompleted(todoObject.id);
    });

    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-button");

    trashButton.addEventListener("click", function () {
      removeTaskFrommCompleted(todoObject.id);
    });

    container.append(undoButton, trashButton);
  } else {
    const checkButton = document.createElement("button");
    checkButton.classList.add("check-button");

    checkButton.addEventListener("click", function () {
      addTaskToCompleted(todoObject.id);
    });

    container.append(checkButton);
  }

  function addTaskToCompleted(todoId) {
    const todoTarget = findTodo(todoId);

    if (todoTarget == null) return;

    todoTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData(); // menambahkan function saveData pada function addTaskToCompleted
  }

  function findTodo(todoId) {
    for (const todoItem of todos) {
      if (todoItem.id === todoId) {
        return todoItem;
      }
    }
    return null;
  }

  function removeTaskFrommCompleted(todoId) {
    const todoTarget = findTodoIndex(todoId);

    if (todoTarget == -1) return;

    todos.splice(todoTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData(); // menambahkan function saveData pada function removeTaskFrommCompleted
  }

  function undoTaskFromCompleted(todoId) {
    const todoTarget = findTodo(todoId);

    if (todoTarget == null) return;

    todoTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData(); // menambahkan function saveData pada function undoTaskFromCompleted
  }

  function findTodoIndex(todoId) {
    for (const index in todos) {
      if (todos[index].id === todoId) {
        return index;
      }
    }
  }

  return container;
}
