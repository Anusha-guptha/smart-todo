import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTodo } from "../services/todoService";

const TodoDetails = () => {

    const [todo, setTodo] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();


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


    useEffect(() => {
        if (id) {
            getTodo(id).then((res) => setTodo(res.data));
        }
    }, [id]);

    return (

        <div className="container mt-4" style={{ maxWidth: "700px" }}>
            <div className="d-flex justify-content-between mb-3">
                <button className="btn btn-secondary" onClick={() => navigate("/")}>
                    ← Back
                </button>
                <button className="btn btn-primary" onClick={() => navigate(`/edit/${id}`)}>
                    Update Todo
                </button>
            </div>

            <div className="card shadow">
                <div className="card-body">
                    <h3 className="card-title">{todo.title}</h3>
                    <p className="card-text">{todo.description}</p>

                    <p>Priority: {getPriorityBadge(todo.priority)}</p>


                    {todo.mentions && Array.isArray(todo.mentions) && (
                        <>
                            <h5>Mentions</h5>
                            <ul className="list-group mb-3">
                                {todo.mentions.map((mention, index) => (
                                    <li className="list-group-item" key={index}>
                                        {mention.trim()}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}


                    <h5>Notes</h5>
                    {todo.notes && todo.notes.length > 0 ? (
                        <ul className="list-group">
                            {todo.notes.map((note, index) => (
                                <li key={index} className="list-group-item">
                                    {note}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-muted">No notes yet.</p>
                    )}
                </div>
            </div>
        </div>
    );

};

export default TodoDetails