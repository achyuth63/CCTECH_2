let searchInputEl = document.getElementById("searchInput");
let spinnerEl = document.getElementById("spinner");
let resultDetailsEl = document.getElementById("resultDetailsEl");

let searchInputVal = "";
let DetailsList = [];

function createAndAppendDetails(Details) {
  console.log(Details);
  console.log(Details.location.street.name);
  let displayEle = document.createElement("div");
  displayEle.classList.add(
    "display-card",
    "col-11",
    "col-md-8",
    "mr-auto",
    "ml-auto",
    "d-flex",
    "flex-row"
  );
  resultDetailsEl.appendChild(displayEle);

  let profile = document.createElement("img");
  profile.src = Details.picture.thumbnail;
  profile.classList.add("profile");
  displayEle.appendChild(profile);

  let personInfoEl = document.createElement("div");
  personInfoEl.classList.add("person-border", "d-flex", "flex-column", "ml-4");
  displayEle.appendChild(personInfoEl);

  let personNameEl = document.createElement("p");
  personNameEl.textContent =
    Details.name.title + " " + Details.name.first + Details.name.last;
  personNameEl.classList.add("person-name");
  personInfoEl.appendChild(personNameEl);

  let personNameEle = document.createElement("p");
  personNameEle.textContent = Details.email;
  personInfoEl.appendChild(personNameEle);

  let personAddressEl = document.createElement("p");
  personAddressEl.textContent =
    Details.location.street.number + "," + Details.location.street.name + ",";
  let personAddressEl1 = document.createElement("p");
  personAddressEl1.textContent =
    Details.location.city + "," + Details.location.state + ",";
  let personAddressEl2 = document.createElement("p");
  personAddressEl1.textContent =
    Details.location.country + "," + Details.location.postcode;
  personInfoEl.appendChild(personAddressEl);
  personInfoEl.appendChild(personAddressEl1);
  personInfoEl.appendChild(personAddressEl2);
}

function displaySearchResults() {
  for (let i of DetailsList) {
    let Name = i.name.first + i.name.last;
    console.log(Name);
    if (Name.includes(searchInputVal)) {
      createAndAppendDetails(i);
    }
  }
}

function getDetails() {
  let url = "https://randomuser.me/api/?results=10";
  let options = {
    method: "GET",
  };
  resultDetailsEl.textContent = "";

  spinnerEl.classList.remove("d-none");
  resultDetailsEl.classList.add("d-none");

  fetch(url, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonData) {
      resultDetailsEl.classList.remove("d-none");
      spinnerEl.classList.add("d-none");

      DetailsList = jsonData.results;
      displaySearchResults();
    });
}

function onChangeSearchInput(event) {
  searchInputVal = event.target.value;
  getDetails();
}
getDetails();

searchInputEl.addEventListener("keyup", onChangeSearchInput);
