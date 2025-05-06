import express from 'express'
import { getAllTodos, createTodo, getTodo, updateTodo, addNoteToTodo, deleteTodo } from '../controllers/todoController.js'


const router = express.Router();

router.get('/',getAllTodos);
router.get('/:id',getTodo)
router.post('/',createTodo);
router.put('/:id',updateTodo);
router.post('/:id/note', addNoteToTodo);
router.delete('/:id', deleteTodo);

export default router