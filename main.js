let API = " http://localhost:8000/contactBook";
let name = document.querySelector("#name");
let surname = document.querySelector("#surname");
let photoUrl = document.querySelector("#photo");
let num = document.querySelector("#number");
let email = document.querySelector("#email");
let addBtn = document.querySelector("#btn");
let ul = document.querySelector(".list");

console.log(name, surname, photoUrl, num, email, addBtn);

addBtn.addEventListener("click", async () => {
  let obj = {
    name: name.value,
    surname: surname.value,
    url: photoUrl.value,
    number: num.value,
    email: email.value,
  };
  console.log(obj);
  if (
    !obj.name.trim() ||
    !obj.surname.trim() ||
    !obj.url.trim() ||
    !obj.number.trim() ||
    !obj.email.trim()
  ) {
    alert("fill to the blank");
    return;
  }
  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(obj),
  });

  name.value = "";
  surname.value = "";
  photoUrl.value = "";
  num.value = "";
  email.value = "";

  //   render(todo);
  getTodos();
});

async function getTodos() {
  try {
    let res = await fetch(API);

    let todo = await res.json();
    render(todo);
  } catch (error) {
    console.log(error);
  }
}
getTodos();

function render(todo) {
  ul.innerHTML = "";

  todo.forEach((item) => {
    ul.innerHTML += `<div class="contactBook">
          <img class='w-1 b-radius-100' src=${item.url}>
          <h2>${item.name}</h2> <h2>${item.surname}
          <p>${item.email}</p>
          <p>${item.number}</p>
          <button onclick="deleteTodo(${item.id})" class="btn btn-warning">delete</button>

          <button onclick="editContact(${item.id})" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-warning">edit</button> </div> 
          
          `;
  });
}
getTodos();

// !delete===========

async function deleteTodo(id) {
  try {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    // getTodos();
  } catch (error) {
    console.log(error);
  }
  getTodos();
}

// !edit=============================

let inpEditName = document.querySelector(".inpName-edit");
let inpEditSurname = document.querySelector(".inpSurname-edit");
let inpEditPhoto = document.querySelector(".inpPhoto-edit");
let inpEditNumber = document.querySelector(".inpNumber-edit");
let inpEditEmail = document.querySelector(".inpEmail-edit");

let saveBtn = document.querySelector(".save-btn");
let editModal = document.querySelector("#exampleModal");

let editedObj = {};

function inpEdit() {
  editedObj = {
    name: inpEditName.value,
    surname: inpEditSurname.value,
    photo: inpEditPhoto.value,
    number: inpEditNumber.value,
    email: inpEditEmail.value,
  };
}
// inpEdit();

saveBtn.addEventListener("click", async (e) => {
  let id = e.target.id;
  inpEdit();

  try {
    await fetch(`${API}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(editedObj),
    });
  } catch (error) {
    console.log(error);
  }
  getTodos();
  let modal = bootstrap.Modal.getInstance(editModal);
  modal.hide();
});

async function editContact(id) {
  try {
    let res = await fetch(`${API}/${id}`);
    let objToEdit = await res.json();
    inpEditName.value = objToEdit.name;
    inpEditSurname.value = objToEdit.surname;
    inpEditPhoto.value = objToEdit.photo;
    inpEditNumber.value = objToEdit.number;
    inpEditEmail.value = objToEdit.email;
    saveBtn.setAttribute("id", `${id}`);
  } catch (error) {
    console.log(error);
  }
  getTodos();
}
