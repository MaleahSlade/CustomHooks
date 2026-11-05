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

const PageSize = 10;

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData: Row[] = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  return (
    <>
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
        totalCount={data.length}
        pageSize={PageSize}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </>
  );
}
