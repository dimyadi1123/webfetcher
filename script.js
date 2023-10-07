document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("form").addEventListener("submit", function (event) {
    // Prevent the form from submitting the usual way
    event.preventDefault();

    // Get the value of the input field
    const link = document.getElementById("linkdata").value;

    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // Configure the request
    xhr.open("GET", link, true);

    xhr.onload = function () {
      // Check if the request was successful
      if (xhr.status === 200) {
        // Parse the JSON data
        const data = JSON.parse(xhr.responseText);

        // Get the table header and body elements
        const header = document.getElementById("table-header");
        const body = document.getElementById("table-body");

        // Clear the previous table data
        header.innerHTML = "";
        body.innerHTML = "";

        // Create table header
        for (let key in data[0]) {
          let th = document.createElement("th");
          th.textContent = key;
          header.appendChild(th);
        }

        // Create table rows
        for (let row of data) {
          let tr = document.createElement("tr");
          for (let key in row) {
            let td = document.createElement("td");
            td.textContent = row[key];
            tr.appendChild(td);
          }
          body.appendChild(tr);
        }
      } else {
        // Handle the error
        console.error("Request failed with status " + xhr.status);
      }
    };

    xhr.send();
  });
});
