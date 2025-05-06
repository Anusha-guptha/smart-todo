import mongoose  from  'mongoose'

const TodoSchema = new mongoose.Schema({
    title : { type : String, required : true, },
    description : { type : String, },
    mentions : [String],
    priority : { type: Number, enum : [1, 2, 3]  , default : 2},
    notes: [String],
}, { timestamps:true});

const Todo = mongoose.model('Todo', TodoSchema);

export default Todo;