console.log("JS");

$(readyNow);

let employees = [];

function readyNow() {
  console.log("JQ");
  $("#submit").on("click", addToEmployees);
  $("#tableMain").on("click", "#delete", deleteEmployee);

  renderToDom();
} // end readyNow

function addToEmployees() {
  // create newEmployee object, collect values of inputs from DOM
  let newEmployee = {};
  newEmployee.firstName = $("#firstName").val();
  newEmployee.lastName = $("#lastName").val();
  newEmployee.idNumber = $("#idNumber").val();
  newEmployee.jobTitle = $("#jobTitle").val();
  newEmployee.annualSalary = Number($("#annualSalary").val());

  // won't push values to array unless all fields are completed
  if (
    !newEmployee.firstName ||
    !newEmployee.lastName ||
    !newEmployee.idNumber ||
    !newEmployee.jobTitle ||
    !newEmployee.annualSalary
  ) {
    console.log("Information missing!");
  } else {
    // push newEmployee object to array
    employees.push(newEmployee);
    console.log("Added to employees:", newEmployee);

    // clear input values
    $("#firstName").val("");
    $("#lastName").val("");
    $("#idNumber").val("");
    $("#jobTitle").val("");
    $("#annualSalary").val("");
  }
  renderToDom();
} // end addToEmployees

function renderToDom() {
  // empty table to display new employees array contents
  $("#employeeEntry").empty();

  // loop through employee array to display info, assign ID's to <tr> and <button>
  for (let i = 0; i < employees.length; i++) {
    $("#employeeEntry").append(`
    <tr id='${i}' class="td">
      <td>${employees[i].firstName}</td>
      <td>${employees[i].lastName}</td>
      <td>${employees[i].idNumber}</td>
      <td>${employees[i].jobTitle}</td>
      <td>$ ${accounting.formatNumber(employees[i].annualSalary)}</td>
      <td><button type="button" id="delete" class="delete-button">Delete</button></td>
    </tr>
    `);
    // assign .data() index number to each <tr> for deleteEmployee()
    $(`#${i}`).data("index", i);

  }

  calculateMonthlyLabor();
} //end renderToDom

function calculateMonthlyLabor() {
  $("#monthlyLabor").empty();
  let monthlyLaborTotal = 0;
  for (person of employees) {
    monthlyLaborTotal += person.annualSalary;
  }
  monthlyLaborTotal = Math.round(monthlyLaborTotal / 12);
  $("#monthlyLabor").append(` $ ${accounting.formatNumber(monthlyLaborTotal)}`);

  // conditional to display red if over budget
  if (monthlyLaborTotal > 20000) {
    $("#budgetColor").addClass("over-budget");
  } else {
    $("#budgetColor").removeClass("over-budget");
  }
} // end calculateMonthlyLabor

function deleteEmployee() {
  // find .data() index number of parent <tr> of clicked delete button
  let indexNumber = $(this).parent().parent().data("index");
  console.log('Deleting:', employees[indexNumber]);

  // delete employee object from array
  employees.splice(indexNumber, 1);

  renderToDom();
} // end deleteEmployee
