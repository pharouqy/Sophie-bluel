const url = "http://localhost:5678/api/";

const gallery = document.querySelector(".gallery");
const portfolio = document.getElementById("portfolio");

// Create filters for the gallery
const filters = document.createElement("div");
filters.classList.add("filters");
portfolio.insertBefore(filters, gallery); // After portfolio insert filter before gallery

// function create filters for the gallery
function createFilters(tag, classes = [], content) {
  const filter = document.createElement(tag);
  classes.forEach((classe) => filter.classList.add(classe));
  filter.textContent = content;
  filters.appendChild(filter);
}

// Filter handeling for the gallery

function handelingFilter() {
  const filters = document.getElementsByClassName("filter");
  Array.from(filters).forEach((filter, index) => {
    filter.addEventListener("click", (e) => {
      e.preventDefault();
      // Handlling active filter from the gallery
      const activeFilters = document.getElementsByClassName("active_filter");
      Array.from(activeFilters).forEach((activeFilter) => {
        activeFilter.classList.remove("active_filter");
      });
      filter.classList.add("active_filter");
      // Apply active filter
      const cards = Array.from(document.getElementsByClassName("card"));
      cards.forEach((card) => {
        card.style.display = "none";
        if (parseInt(card.dataset.category) == index || index === 0) {
          card.style.display = "block";
        }
      });
    });
  });
}

// create filters for the gallery
const data = localStorage.getItem("token");

if (!data) {
  createFilters("button", ["filter", "active_filter"], "Tous");

  fetch(`${url}categories`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((categories) => {
      categories.forEach((category) => {
        createFilters("button", ["filter"], category.name);
      });
    })
    .catch((error) => {
      console.log(error);
    });
} else {
  const logout = document.querySelector(
    "header > nav > ul > li:nth-child(3) > a"
  );
  logout.innerHTML = "Logout";
  logout.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.replace("./");
  });
}

// Create cards
function card(imgUrl, title, categoryId) {
  const figure = document.createElement("figure");
  figure.classList.add("card");
  figure.dataset.category = categoryId;
  gallery.appendChild(figure);
  const img = document.createElement("img");
  img.crossOrigin = "anonymous";
  img.src = imgUrl;
  img.alt = title;
  const figcaption = document.createElement("figure");
  figcaption.textContent = title;
  figure.appendChild(img);
  figure.appendChild(figcaption);
}

// Display cards in the gallery
fetch(`${url}works`)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((projects) => {
    projects.forEach((project) => {
      card(project.imageUrl, project.title, project.categoryId);
      handelingFilter();
    });
  })
  .catch((error) => console.log(error));
