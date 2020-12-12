console.log("JS");

$(readyNow);

let employees = [];

function readyNow() {
  console.log("JQ");
  $("#submit").on("click", addToEmployees);
  $("#tableMain").on("click", "#delete", deleteEmployee);

  renderToDom();
}

function addToEmployees() {
  let newEmployee = {};
  newEmployee.firstName = $("#firstName").val();
  newEmployee.lastName = $("#lastName").val();
  newEmployee.idNumber = $("#idNumber").val();
  newEmployee.jobTitle = $("#jobTitle").val();
  newEmployee.annualSalary = Number($("#annualSalary").val());

  if (
    !newEmployee.firstName ||
    !newEmployee.lastName ||
    !newEmployee.idNumber ||
    !newEmployee.jobTitle ||
    !newEmployee.annualSalary
  ) {
    console.log("Information missing!");
  } else {
    employees.push(newEmployee);
    console.log("Added to employees:", newEmployee);
    $("#firstName").val("");
    $("#lastName").val("");
    $("#idNumber").val("");
    $("#jobTitle").val("");
    $("#annualSalary").val("");
  }
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
  for (let i = 0; i < employees.length; i++) {
    $("#employeeEntry").append(`
    <tr id="employee${i}">
      <td>${employees[i].firstName}</td>
      <td>${employees[i].lastName}</td>
      <td>${employees[i].idNumber}</td>
      <td>${employees[i].jobTitle}</td>
      <td>$ ${accounting.formatNumber(employees[i].annualSalary)}</td>
      <td><button type="button" id="delete" class="btn btn-dark">Delete</button></td>
    </tr>
    `);
    $(`#employee${i}`).data("index", i);
  }
  calculateMonthlyLabor();
}

function calculateMonthlyLabor() {
  let monthlyLaborTotal = 0;
  for (person of employees) {
    monthlyLaborTotal += person.annualSalary;
  }

  monthlyLaborTotal = Math.round(monthlyLaborTotal / 12);

  $("#monthlyLabor").text(`
    Monthly Labor Total: $ ${accounting.formatNumber(monthlyLaborTotal)}`);
}

function deleteEmployee() {
  let indexNumber = $(this).parent().parent().data("index");
  console.log("Deleting:", employees[indexNumber]);
  employees.splice(indexNumber, 1);

  renderToDom();
}
