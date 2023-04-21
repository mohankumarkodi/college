import React, { useState } from "react";
import { Table, Pagination } from "react-bootstrap";

const SampleTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const data = [
    { id: 1, name: "John", age: 25 },
    { id: 2, name: "Jane", age: 30 },
    { id: 3, name: "Bob", age: 45 },
    { id: 4, name: "Sally", age: 28 },
    { id: 5, name: "Mike", age: 33 },
    { id: 6, name: "Tom", age: 40 },
    { id: 7, name: "Jenny", age: 27 },
    { id: 8, name: "Dave", age: 52 },
    { id: 9, name: "Mary", age: 35 },
    { id: 10, name: "Bill", age: 42 },
  ];

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = data.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePaginationClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const renderPaginationItems = () => {
    const paginationItems = [];
    for (let i = 1; i <= totalPages; i++) {
      paginationItems.push(
        <Pagination.Item
          key={i}
          id={i}
          active={i === currentPage}
          onClick={handlePaginationClick}
        >
          {i}
        </Pagination.Item>
      );
    }
    return paginationItems;
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>{renderPaginationItems()}</Pagination>
    </>
  );
};

export default SampleTable;
