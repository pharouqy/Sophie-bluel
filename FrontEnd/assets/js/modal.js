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
}
