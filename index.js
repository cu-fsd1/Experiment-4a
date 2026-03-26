const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Employee {
  constructor(name, position, salary) {
    this.id = Date.now();
    this.name = name;
    this.position = position;
    this.salary = parseFloat(salary);
  }
}

class EmployeeManagementSystem {
  constructor() {
    this.employees = [];
  }

  displayMenu() {
    console.log('\nEmployee Management System');
    console.log('1. Add Employee');
    console.log('2. List Employees');
    console.log('3. Update Employee');
    console.log('4. Delete Employee');
    console.log('5. Exit');
  }

  async askQuestion(query) {
    return new Promise((resolve) => rl.question(query, resolve));
  }

  async addEmployee() {
    const name = await this.askQuestion('Employee Name: ');
    const position = await this.askQuestion('Position: ');
    const salary = await this.askQuestion('Salary: ');

    if (isNaN(salary)) {
      console.log('Invalid salary. Please enter a number.');
    } else {
      const newEmployee = new Employee(name, position, salary);
      this.employees.push(newEmployee);
      console.log('Employee added successfully!');
    }
  }

  listEmployees() {
    if (this.employees.length === 0) {
      console.log('\nNo employees found.');
      return;
    }

    console.log('\nEmployee List:');
    this.employees.forEach(emp => {
      console.log(`ID: ${emp.id}, Name: ${emp.name}, Position: ${emp.position}, Salary: $${emp.salary}`);
    });
    console.log(`Total employees: ${this.employees.length}`);
  }

  async updateEmployee() {
    if (this.employees.length === 0) {
      console.log('\nNo employees to update.');
      return;
    }

    const idInput = await this.askQuestion('Enter Employee ID to update: ');
    const id = parseInt(idInput);
    const index = this.employees.findIndex(emp => emp.id === id);

    if (index !== -1) {
      const emp = this.employees[index];
      const name = await this.askQuestion(`Enter new Name (current: ${emp.name}): `);
      const position = await this.askQuestion(`Enter new Position (current: ${emp.position}): `);
      const salary = await this.askQuestion(`Enter new Salary (current: ${emp.salary}): `);

      if (name) emp.name = name;
      if (position) emp.position = position;
      if (salary && !isNaN(salary)) emp.salary = parseFloat(salary);

      console.log('Employee updated successfully!');
    } else {
      console.log('Employee ID not found.');
    }
  }

  async deleteEmployee() {
    if (this.employees.length === 0) {
      console.log('\nNo employees to delete.');
      return;
    }

    const idInput = await this.askQuestion('Enter Employee ID to delete: ');
    const id = parseInt(idInput);
    const index = this.employees.findIndex(emp => emp.id === id);

    if (index !== -1) {
      this.employees.splice(index, 1);
      console.log('Employee deleted successfully!');
    } else {
      console.log('Employee ID not found.');
    }
  }

  async run() {
    while (true) {
      this.displayMenu();
      const choice = await this.askQuestion('Select an option: ');

      switch (choice) {
        case '1':
          await this.addEmployee();
          break;
        case '2':
          this.listEmployees();
          break;
        case '3':
          await this.updateEmployee();
          break;
        case '4':
          await this.deleteEmployee();
          break;
        case '5':
          console.log('Exiting...');
          rl.close();
          return;
        default:
          console.log('Invalid choice, please try again.');
      }
    }
  }
}

const ems = new EmployeeManagementSystem();
ems.run();
