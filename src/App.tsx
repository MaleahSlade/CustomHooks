import { useState, useMemo } from 'react';
import Pagination from './Pagination.jsx';
import data from './data/mock-data.json';
import './style.scss';

interface Row {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

// Sort by id once, outside the component (below the imports and interface).
const sortedData: Row[] = [...data].sort((a, b) => a.id - b.id);

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);

 //Page size is now state, with 10 as the starting value.
  const [pageSize, setPageSize] = useState(10);

 // Uses pageSize and sortedData, and adds pageSize to the [ ] list.
  const currentTableData: Row[] = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return sortedData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, pageSize]);

  return (
    <>
        <h1>The Plank Ledger 🪝 ☠️ 🔪</h1>
        <h2>Official Employee Database of Captain Hook ®</h2>
{/* Label to sort Employees */}
<label>
        Pirates per page:{' '}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          {[5, 10, 15, 20].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </label>

{/* Pirate Employee Table */}
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
          {currentTableData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={sortedData.length}
        pageSize={pageSize}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </>
  );
}
