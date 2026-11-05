export interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

// "Employees" is the component, "employees" is the prop, and "employee" is the
// variable that represents each person in the array.
export default function Employees({ employees }: { employees: Employee[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>FIRST NAME</th>
          <th>LAST NAME</th>
          <th>EMAIL</th>
          <th>PHONE</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.id}</td>
            <td>{employee.first_name}</td>
            <td>{employee.last_name}</td>
            <td>{employee.email}</td>
            <td>{employee.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
