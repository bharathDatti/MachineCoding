import React, { useState, useEffect } from "react";


const PaginatedUserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://dummyjson.com/users");
        const data = await response.json();
        setUsers(data.users || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Paginated User List</h2>
      <div className="user-container p-3">
        <div className="row d-flex justify-content-center">
          {currentUsers.map((user) => (
            <div key={user.id} className="col-md-3 colg-lg-4">
              <div className="card text-start  user-card p-3 mb-3 shadow-sm">
                <img src={user.image} alt={user.firstName} className="user-image img-fluid rounded-circle mb-2" />
                <h4>{user.firstName} {user.lastName}</h4>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pagination-buttons d-flex justify-content-center mt-3">
        <button 
          className="btn btn-primary mx-2" 
          onClick={prevPage} 
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`btn mx-1 ${currentPage === index + 1 ? "btn-dark" : "btn-outline-primary"}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button 
          className="btn btn-primary mx-2" 
          onClick={nextPage} 
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginatedUserList;
