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

  // add the modify element on each div
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
  clearForm();
  closeModal(adding);
});

back.addEventListener("click", (e) => {
  e.preventDefault();
  clearForm();
  closeModal(adding);
  openModal(galery);
});

// function create cards

function createCard(project) {
  const modal = document.querySelector(".modal_content");

  const figure = document.createElement("figure");
  figure.classList.add("editing-card");

  const img = document.createElement("img");
  img.crossOrigin = "anonymous";
  img.src = project.imageUrl;
  img.alt = project.title;
  figure.appendChild(img);

  const desciption = document.createElement("figcaption");
  const edit = document.createElement("p");
  edit.innerHTML = "éditer";
  const trash = document.createElement("i");
  trash.classList.add("fa-solid", "fa-trash-can", "delete-card");
  trash.dataset.id = project.id;
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
  .then(() => {
    const cards = document.querySelectorAll("i.delete-card");
    Array.from(cards).forEach((card) => {
      deleteItem(card);
    });
    const deleteBtn = document.querySelector(".delete_all_photos");
    deleteBtn.addEventListener("click", () => {
      cards.forEach((card) => {
        const datasetId = card.closest(".delete-card").dataset.id;
        fetch(`${url}works/${datasetId}`, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + "" + localStorage.token,
            "Content-Type": "application/json;charset=utf-8",
          },
        })
          .then(() => {
            console.log("Deleted");
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });
  })
  .catch((error) => {
    console.log(error);
  });

// handeling delete cards

function deleteItem(item) {
  const datasetId = item.closest(".delete-card").dataset.id;
  item.addEventListener("click", (e) => {
    e.preventDefault();
    fetch(`${url}works/${datasetId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + "" + localStorage.token,
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then(() => {
        console.log("Deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

// display image on upload

function displayImage(input, container) {
  input.addEventListener("change", (e) => {
    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      container.style.backgroundImage = `url(${reader.result})`;
    });
    reader.readAsDataURL(input.files[0]);
    const divUpload = document.querySelector(".adding > form > div > div ");
    divUpload.style.zIndex = 999999;
    container.style.display = "block";
  });
}

const inputImage = document.getElementById("image_upload");
const containerImg = document.querySelector(".display_img");
const submitBtn = document.getElementById("modal_form_validation");

displayImage(inputImage, containerImg);

const form = document.querySelector(".adding form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);

  const errorDiv = document.querySelector(".error");

  if (errorDiv) {
    form.removeChild(errorDiv);
  } else {
    const errorContainer = document.createElement("div");
    errorContainer.classList.add("error");
    form.insertBefore(errorContainer, submitBtn);
    if (!data.get("title") || !data.get("title") || !data.get("image").name) {
      errorContainer.innerHTML = "Veuillez remplir tout les champs !!!";
    } else if (
      data.get("title") &&
      data.get("title") &&
      data.get("image").name
    ) {
      fetch(`${url}works`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + "" + localStorage.token,
        },
        body: data,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
});

//reset the modal adding

function clearForm() {
  form.reset();
  containerImg.style.backgroundImage = "";
  containerImg.style.display = "none";
  const errorContainer = document.querySelector(".error");
  if (errorContainer) {
    form.removeChild(errorContainer);
  }
}

// toggle button

function toggleBtn(button) {
  const image = document.querySelector("#modal_form_validation");
  const title = document.querySelector("#title_input");
  const category = document.querySelector("#category_input");
  if (image.value != "valider" && title.value && category.value != 0) {
    button.classList.remove("inactive_button");
  } else {
    button.classList.add("inactive_button");
  }
}

form.addEventListener("input", () => toggleBtn(submitBtn));
