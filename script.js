let toggle = document.querySelector(".sun-div ");
toggle.addEventListener("click", function () {
  let body = document.querySelector("body");
  body.classList.toggle("light");
  const img = document.querySelector(".image");
  if (body.classList.contains("light")) {
    img.src =
      "/browser-extensions-manager-ui-main//assets/images/icon-moon.svg";
  } else {
    toggle.classList.toggle("light");
    img.src = "/browser-extensions-manager-ui-main//assets/images/icon-sun.svg";
  }
});
let search = document.querySelector(".search");
let searchDiv = document.querySelector(".search-div");
search.addEventListener("click", function () {
  searchDiv.style.display = "";
});

let input = document.querySelector("input");
input.addEventListener("input", function () {
  searchByDescription(input.value);
});
let container;

function searchByDescription(description) {
  for (let extention of container.children) {
    const para = extention.querySelector(".para");
      if (para.textContent.includes(description)) {
        extention.style.display = "";
      } else {
        extention.style.display = "none";
      }
  }
}

async function loadData() {
  searchDiv.style.display = "none";
  container = document.querySelector(".container");
  const response = await fetch("data.json");
  if (!response.ok) {
    throw new Error("data not found");
  }
  const jsonData = await response.json();
  let htmlstring = "";
  for (let extention of jsonData) {
    htmlstring += ` <div class="extention border">
        <div class="main">
          <img
            src="${extention.logo}"
          />
          <div class="content">
            <p class="devlens"><b>${extention.name}</b></p>
            <p class="para">
              ${extention.description}
            </p>
          </div>
        </div>
        <button class="remove border">Remove</button>
        <div class="switch-div">
          <label class="switch">
            <input type="checkbox" ${extention.isActive ? "checked" : ""} />
            <span class="slider round"></span>
          </label>
        </div>
      </div>`;
  }
  container.innerHTML = htmlstring;
}

async function statusUpdate(event) {
  let buttonList = document.querySelector(".buttons");
  for (const button of buttonList.children) {
    button.classList.remove("active");
  }
  let button = event.target;

  button.classList.add("active");

  for (let extention of container.children) {
    const input = extention.querySelector("input");
    if (button.classList.contains("active-button")) {
      searchDiv.style.display = "none";
      if (input.checked) {
        extention.style.display = "";
      } else {
        extention.style.display = "none";
      }
    } else if (button.classList.contains("inactive-button")) {
      searchDiv.style.display = "none";
      if (!input.checked) {
        extention.style.display = "";
      } else {
        extention.style.display = "none";
      }
    } else {
      searchDiv.style.display = "none";
      extention.style.display = "";
    }
  }
}
