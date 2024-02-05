const data = {
  employees: require("./../model/employees.json"),
  setEmployees: (data) => {
    this.employees = data;
  },
};

const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

const createEmployee = (req, res) => {
    console.log("CREATE employee", req.body);
  const newEmployee = {
    id: data.employees?.length
      ? data.employees[data.employees.length - 1].id + 1
      : 1,
    name: req.body.name,
    age: req.body.age,
    city: req.body.city,
  };

  if (!newEmployee.name || !newEmployee.age || !newEmployee.city) {
    res.status(400).json({ error: "Please provide a name, age and city" });
  }

  data.setEmployees([...data.employees, newEmployee]);
  res.status(201).json(data.employees);
  console.log("created", data.employees);
};

const updateEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee) {
    return res
      .status(404)
      .json({ message: ` Employee ID ${req.body.id} not found` });
  }

  if (req.body.name) employee.name = req.body.name;
  if (req.body.age) employee.age = req.body.age;
  if (req.body.city) employee.city = req.body.city;

  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  const unsortedArray = [...filteredArray, employee];

  data.setEmployees(
    unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  );
  res.json(data.employees);
};

const deleteEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee) {
    return res
      .status(404)
      .json({ message: ` Employee ID ${req.body.id} not found` });
  }

  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );

  data.setEmployees([...filteredArray]);
  res.json(data.employees);
};

const getEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.params.id)
  );

  if (!employee) {
    return res
      .status(404)
      .json({ message: ` Employee ID ${req.body.id} not found` });
  }

  res.json(employee);
};

module.exports = {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
