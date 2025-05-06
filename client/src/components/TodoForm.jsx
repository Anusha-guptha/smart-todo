import { useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createTodo, updateTodo, getTodo } from "../services/todoService.js";

const TodoForm = ({mode}) => {

    const [form, setForm] = useState({
        title: '',
        description : '',
        priority : 2,
        mentions: '',
    });

    const { id } = useParams();
    const navigate = useNavigate();

    const priorityOptions = [
        { label : 'High', value : 1 },
        { label : 'Meduim', value : 2 },
        { label : 'Low', value : 3 },
    ]

    useEffect(() => {
        if(mode ==='edit' && id){
            getTodo(id).then((res) => setForm(res.data));
        }   
    },[mode,id]);

    const handleChange = (e)  => {
        setForm( {...form, [e.target.name] : e.target.value})
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if(mode == 'add') await createTodo(form);
        else await updateTodo(id, form);
        navigate('/');
    }
    return(
      <div className="container mt-4">
        <h2 className="mb-4 text-center">{mode === 'edit'? 'Update Todo': 'Add Todo'}</h2>
        <form onSubmit={handleSubmit} style={{ maxWidth: "700px", margin: "0 auto" }}>
        <div className="mb-3">
             <label htmlFor="title" className="form-label">Title</label>
            <input name="title" className="form-control" type="text" value={form.title} onChange={handleChange}  placeholder="Title"  required/>
        </div>

        <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea name="description" className="form-control" value={form.description} onChange={handleChange} placeholder="Description"  id=""></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="priority" className="form-label">Priority</label>
            <select name="priority" className="form-select" id="" value={form.priority} onChange={handleChange}>
               {priorityOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
               ))}
            </select>
        </div>

        <div className="mb-3">
          <label htmlFor="mentions" className="form-label">Mentions</label>
            <input type="text" name='mentions' className="form-control"  value={form.mentions} onChange={handleChange} placeholder="mentions (@username)"  />
        </div>
        <div className="d-flex justify-content-between mt-3">
            <button type='submt' className="btn btn-primary">submit</button>
            <button className="btn btn-secondary" onClick={() => navigate("/")}>
                    Cancel
                </button>
        </div>
        </form>
      </div>
    );

};

export default TodoForm