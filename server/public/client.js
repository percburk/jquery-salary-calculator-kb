console.log('JS');

$(readyNow);

function readyNow() {
  console.log('JQ');
  $('#submit').on('click', addToEmployees);
  $('#employeeData').on('click', '.delete', deleteEmployee);

  renderToDom();
} // end readyNow

function addToEmployees() {
  // create newEmployee object, collect values of inputs from DOM
  let newEmployee = {};
  newEmployee.firstName = $('#firstName').val();
  newEmployee.lastName = $('#lastName').val();
  newEmployee.idNumber = $('#idNumber').val();
  newEmployee.jobTitle = $('#jobTitle').val();
  newEmployee.annualSalary = Number($('#annualSalary').val());

  // won't push values to array unless all fields are completed
  if (
    !newEmployee.firstName ||
    !newEmployee.lastName ||
    !newEmployee.idNumber ||
    !newEmployee.jobTitle ||
    !newEmployee.annualSalary
  ) {
    console.log('Information missing!');
  } else {
    console.log('Added to employees:', newEmployee);

    $.ajax({
      url: '/data',
      type: 'POST',
      data: newEmployee,
      success: renderToDom(),
    }).then(function (response) {
      console.log(response);
    });
    // clear input values in .input-bar
    $('.input-bar input').val('');
  }
} // end addToEmployees

let monthlyLabor = 0;

function renderToDom() {
  // get route for employees array from server
  $.ajax({
    url: '/data',
    type: 'GET',
  }).then(function (response) {
    console.log(response);
    append(response);
  });

  function append(employees) {
    // empty table to display new employees array contents
    monthlyLabor = 0;
    $('#employeeData').empty();
    $('#monthlyLabor').empty();
    // loop through employee array to display info, assign ID's to <tr> and <button>
    for (let object of employees) {
      monthlyLabor += Number(object.annualSalary);
      $('#employeeData').append(`
      <tr data-number="${object.idNumber}" class="employee-row">
        <td>${object.firstName}</td>
        <td>${object.lastName}</td>
        <td>${object.idNumber}</td>
        <td>${object.jobTitle}</td>
        <td>$ ${accounting.formatNumber(object.annualSalary)}</td>
        <td><button type="button" class="delete delete-btn">Delete</button></td>
      </tr>
      `);
    }

    monthlyLabor = monthlyLabor / 12;

    $('#monthlyLabor').append(` 
      $ ${accounting.formatNumber(monthlyLabor)}
    `);
    // conditional to display red if over budget
    if (monthlyLabor > 20000) {
      $('#budgetColor').addClass('over-budget');
    } else {
      $('#budgetColor').removeClass('over-budget');
    }
  }
} //end renderToDom

function deleteEmployee() {
  // find data-index of closest <tr> of clicked delete button
  let idData = $(this).closest('tr').data();
  console.log(idData);
  $.ajax({
    url: '/data',
    type: 'DELETE',
    data: idData,
  }).then(function (response) {
    console.log(response);
    renderToDom();
  });
} // end deleteEmployee
