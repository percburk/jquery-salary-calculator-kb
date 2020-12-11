console.log("JS");

$(readyNow);

let employees = [];

function readyNow() {
  console.log("JQ");
  $("#submit").on("click", addToEmployees);
  $("#delete").on("click", '.employeeRow', deleteEmployee);
  renderToDom();
}

function addToEmployees() {
  let newEmployee = {};
  newEmployee.firstName = $("#firstName").val();
  newEmployee.lastName = $("#lastName").val();
  newEmployee.idNumber = $("#idNumber").val();
  newEmployee.jobTitle = $("#jobTitle").val();
  newEmployee.annualSalary = Number($("#annualSalary").val());

  employees.push(newEmployee);
  console.log("Added to employees:", newEmployee);

  $("#firstName").val("");
  $("#lastName").val("");
  $("#idNumber").val("");
  $("#jobTitle").val("");
  $("#annualSalary").val("");

  renderToDom();
}

function renderToDom() {
  $("#employeeEntry").empty();
  $("#employeeEntry").append(`
    <tr>
      <th scope="col">First Name</th>
      <th scope="col">Last Name</th>
      <th scope="col">ID Number</th>
      <th scope="col">Job Title</th>
      <th scope="col">Annual Salary</th>
      <th></th>
    </tr>
  `);
  for (person of employees) {
    $("#employeeEntry").append(`
    <tr class="employeeRow">
      <td>${person.firstName}</td>
      <td>${person.lastName}</td>
      <td>${person.idNumber}</td>
      <td>${person.jobTitle}</td>
      <td>${person.annualSalary}</td>
      <td><button type="button" id="delete" class="btn btn-dark">Delete</button></td>
    </tr>
    `);
  }
  calculateMonthlyLabor();
}

function calculateMonthlyLabor() {
  let monthlyLaborTotal = 0;
  for (person of employees) {
    monthlyLaborTotal += person.annualSalary;
  }

  monthlyLaborTotal = monthlyLaborTotal / 12;

  $("#monthlyLabor").text(
    `Monthly Labor Total: ${Math.round(monthlyLaborTotal)}`
  );
}

function deleteEmployee() {
  let clickedThing = $(this).text();
  console.log("you clicked on", clickedThing);
}
