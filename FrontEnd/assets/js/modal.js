// add the modify element on each div
if (data) {
  // create the modify element in the DOM
  let edit;
  function modifyEl(id) {
    edit = document.createElement("div");
    edit.setAttribute("id", id);
    const span = document.createElement("span");
    span.textContent = "modifier";
    const tag = document.createElement("i");
    tag.classList.add("fa-regular", "fa-pen-to-square");
    edit.appendChild(span);
    edit.insertBefore(tag, span);
  }
  modifyEl("modify_title");
  const article = document.querySelector("#introduction > article");
  const title = document.querySelector("article > h2");
  article.insertBefore(edit, title);

  modifyEl("modify_img");
  const figure = document.querySelector("#introduction > figure");
  figure.appendChild(edit);

  modifyEl("modify_projet");
  const project = document.querySelector("#portfolio > h2");
  project.appendChild(edit);

  // create the banner in the DOM
  const body = document.querySelector("body");
  let banner;

  function createBanner(id) {
    banner = document.createElement("div");
    const divModify = document.createElement("div");
    const divBtn = document.createElement("div");
    banner.setAttribute("id", id);
    const spanModify = document.createElement("span");
    spanModify.textContent = "Mode édition";
    const tag = document.createElement("i");
    tag.classList.add("fa-regular", "fa-pen-to-square");
    divModify.appendChild(tag);
    divModify.appendChild(spanModify);
    const btn = document.createElement("button");
    btn.textContent = "publier les changements";
    divBtn.appendChild(btn);
    banner.appendChild(divModify);
    banner.appendChild(divBtn);
  }

  createBanner("banner");
  body.insertBefore(banner, body.firstChild);
}

// handeling of the modals

const overlay = document.querySelector(".overlay");
const galery = document.querySelector(".galery");
const adding = document.querySelector(".adding");

const btnAdd = document.querySelector(".add_photo");

const closeX1 = document.querySelector(".galery > header > i");
const closeX2 = document.querySelector(".adding > header > i + i");
const back = document.querySelector(".adding > header > i");

function openModal(modal) {
  modal.style.display = "flex";
  overlay.style.position = "fixed";
}

function closeModal(modal) {
  modal.style.display = "none";
  overlay.style.position = "unset";
}

const modifyProject = document.getElementById("modify_projet");

modifyProject.addEventListener("click", (e) => {
  e.preventDefault();
  openModal(galery);
});

closeX1.addEventListener("click", (e) => {
  e.preventDefault();
  closeModal(galery);
});

btnAdd.addEventListener("click", (e) => {
  e.preventDefault();
  closeModal(galery);
  openModal(adding);
});

closeX2.addEventListener("click", (e) => {
  e.preventDefault();
  closeModal(adding);
});

back.addEventListener("click", (e) => {
  e.preventDefault();
  closeModal(adding);
  openModal(galery);
});

// function create cards

function createCard(project) {
  const modal = document.querySelector(".modal_content");

  const figure = document.createElement("figure");
  figure.classList.add("editing-card");
  figure.dataset.id = project.id;

  const img = document.createElement("img");
  img.crossOrigin = "anonymous";
  img.src = project.imageUrl;
  img.alt = project.title;
  figure.appendChild(img);

  const desciption = document.createElement("figcaption");
  const edit = document.createElement("p");
  edit.innerHTML = "éditer";
  const trash = document.createElement("i");
  trash.classList.add("delete-card", "fa-solid", "fa-trash-can");
  desciption.appendChild(edit);
  desciption.appendChild(trash);

  figure.appendChild(desciption);
  modal.appendChild(figure);
}

// display card in content modal galery

fetch(`${url}works`)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((projects) => {
    projects.forEach((project) => {
      createCard(project);
    });
  })
  .catch((error) => {
    console.log(error);
  });
