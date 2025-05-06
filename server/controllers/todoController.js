import Todo from '../models/Todo.js';

export const getAllTodos = async(req, res) => {
    try{
        const { priority, user, note, sortBy = 'createdAt', order = 'desc', page=1, limit=5} = req.query;

        let query = {};

        if (priority) query.priority = priority;
        if (user) query.mentions = { $in: [user] };
        if (note) query.notes = { $regex: note, $options: 'i' };

        const sortOptions = {};
        sortOptions[sortBy] = order === 'asc' ? 1 : -1;


        const todos = await Todo.find(query)
        .sort(sortOptions)
        .skip((page - 1) * limit)
        .limit(Number(limit));


        const total = await Todo.countDocuments(query);
        const totalPages = Math.ceil(total / limit);


        res.status(200).json({todos,
            totalPages,
            currentPage: Number(page)
        });


    }catch (error){
        res.status(500).json({message: "Failed to fetch todos", error:error.message});  
    }
    
};

export const getTodo = async(req, res) => {
    try{
        const todo = await Todo.findById(req.params.id);
        res.status(200).json(todo);
    }catch (error){
        res.status(500).json({message: "Failed to fetch todos", error:error.message});  
    }
    
};

export const createTodo = async(req, res) => {
    try{
        const todo = new Todo(req.body);
        await todo.save();
        res.status(201).json({ msg: 'Todo Created successfully' });
    }catch(err){
        res.status(500).json({ msg: 'Server Error', error: err.message });
    }
}

export const updateTodo = async(req, res) => {
    try{
        const updated = await Todo.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).json({ msg: 'Todo updated  successfully' });
    }catch(err){
        res.status(500).json({ msg: 'Server Error', error: err.message });
    }
}


export const deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: 'Todo deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
};


export const addNoteToTodo = async(req, res) => {
    try{
        const { note } = req.body;
        const updatedNotes = await Todo.findByIdAndUpdate(
            req.params.id,
            { $push: { notes: note } },
            {new:true});
        res.status(200).json({ msg: 'Todo Notes Added successfully' });
    }catch(err){
        res.status(500).json({ msg: 'Server Error', error: err.message });
    }
}





