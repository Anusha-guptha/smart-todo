import { useState, useEffect } from "react";
import Notemodal from "./NoteModal.jsx";
import { useNavigate, Link } from 'react-router-dom';
import { getAllTodos, deleteTodo } from "../services/todoService.js";
const TodoList = () => {

    const [todos, setTodos] = useState([]);
    const navigate = useNavigate();
    const [selectedTodo, setSelectedTodo] = useState(null);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [filters, setFilters] = useState({
        priority: '',
        user: '',
        note: '',
    })

    const [sorts, setSorts] = useState({
        sortBy: 'createdAt',
        order: 'desc'
    });

    const getPriorityBadge = (value) => {
        switch (value) {
            case 1:
                return <span className="badge bg-danger">High</span>;
            case 2:
                return <span className="badge bg-warning text-dark">Medium</span>;
            case 3:
                return <span className="badge bg-success">Low</span>;
            default:
                return <span className="badge bg-secondary">Unknown</span>;
        }
    };

    

    const handleNotes = (todo) => {
        setSelectedTodo(todo);
    }

    const handleCloseModal = () => {
        setSelectedTodo(null);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this todo?')) {
            // try{
                const response = await deleteTodo(id);

                if (response.status === 200) {
                    alert('Todo deleted successfully');
                    fetchTodos();
                }else {
                    alert('Error deleting todo');
                  }         
            // }catch(err){
            //     alert('An error occurred while deleting the todo');
            // }
        
        }
    }

   

    const fetchTodos = async () => {
        const res = await getAllTodos({ ...filters, ...sorts, page, limit: 5 });
        setTodos(res.data.todos);
        setTotalPages(res.data.totalPages);
      };

      useEffect(() => {
        fetchTodos();
    }, [filters, sorts, page]);
   
    

    return (
        <div className="container mt-3">
            <h1 className="text-center mb-4">All Todos</h1>

            <hr />

            <div className="mb-4 text-end">
            <button className="btn btn-success" onClick={() => navigate('/add')}> Add Todo</button>
            </div>

           <div>
           <h4 className="m-4">Toolbar</h4>

           
           <div className="row g-3 m-4">
                <div className="col-md-2">
                    <select value={filters.priority}  onChange={(e) => setFilters({ ...filters, priority: e.target.value })}>
                        <option value="">All Priorities</option>
                        <option value="1">High</option>
                        <option value="2">Medium</option>
                        <option value="3">Low</option>
                    </select>
                </div>

                <div className="col-md-2">
                    <input
                        type="text"
                        placeholder="Search by user (@username)"
                        value={filters.user}
                        onChange={(e) => setFilters({ ...filters, user: e.target.value })}
                    />
                </div>
               
                <div className="col-md-2">
                    <input
                    type="text"
                    placeholder="Search in notes"
                    value={filters.note}
                    onChange={(e) => setFilters({ ...filters, note: e.target.value })}
                    />
                </div>


                <div className="col-md-1 d-grid">

                <button onClick={fetchTodos}>Filter</button>
               </div>
              
            </div>
               <div className="row g-3 m-4">
                <div className="col-md-2">
                    <select value={sorts.sortBy} onChange={(e) => setSorts({ ...sorts, sortBy: e.target.value })}>
                        <option value="createdAt">Sort by Created Date</option>
                        <option value="priority">Sort by Priority</option>
                    </select>
                </div>

                <div className="col-md-2">
                    <select value={sorts.order} onChange={(e) => setSorts({ ...sorts, order: e.target.value })}>
                        <option value="desc">Descending</option>
                        <option value="asc">Ascending</option>
                    </select>
                </div>


                <div className="col-md-1 d-grid">
                <button onClick={fetchTodos}>Sort</button>
                </div>

               
            </div>
           
            
           </div>
           

            <hr />

         
         <h4 className="m-4">List of all todos</h4>
         <div>
        <div className="table-responsive">

        

            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Priority</th>
                        <th>Mention</th>
                    </tr>

                </thead>

                <tbody>
                {todos && todos.length > 0 ? (
                    todos.map((todo, index) => (
                        <tr key={index}>
                            <td>
                                <Link to={`/todo/${todo._id}`} className="text-decoration-none">{todo.title}</Link>
                            </td>

                            <td>
                                <p>{todo.description}</p>
                            </td>

                            <td>
                            {getPriorityBadge(todo.priority)} 
                            </td>

                            <td>
                                <p>{todo.mentions}</p>
                            </td>

                            <td>
                            
                                <button className="btn btn-primary me-2" onClick={() => navigate(`/edit/${todo._id}`)}> <i className="bi bi-pencil-square"></i> Update</button>                       

                             <button onClick={() => handleNotes(todo)} className="btn btn-info me-2"><i className="bi bi-journal-plus"></i></button> 

                            <button className="btn btn-danger me-2" onClick={() => handleDelete(todo._id)}><i className="bi bi-trash"></i> Delete</button></td>

                        </tr>

                    ))
                ):(
                   <tr colSpan='2'>
                    <td>No todos</td>
                   </tr>
                )}
                </tbody>



            </table>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-4">
                <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}  className="btn btn-outline-primary">
                    Previous
                </button>
                
                <span>Page {page} of {totalPages}</span>

                <button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} disabled={page === totalPages} className="btn btn-outline-primary">
                    Next
                </button>
            </div>

            

            

            {selectedTodo && (
                <Notemodal todo={selectedTodo} onClose={handleCloseModal} />
            )}
        </div>
        </div>
    )

};

export default TodoList