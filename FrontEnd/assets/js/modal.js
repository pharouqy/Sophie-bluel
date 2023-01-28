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
