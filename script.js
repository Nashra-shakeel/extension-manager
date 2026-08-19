let container;

async function loadData() {
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
      if (input.checked) {
        extention.style.display = "";
      } else {
        extention.style.display = "none";
      }
    } else if (button.classList.contains("inactive-button")) {
      if (!input.checked) {
        extention.style.display = "";
      } else {
        extention.style.display = "none";
      }
    } else if (button.classList.contains("active")) {
      extention.style.display = "";
    }
  }
}
