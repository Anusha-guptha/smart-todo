import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL;

export const getAllTodos = (params={}) =>axios.get(`${API_URL}/todos`,{params});

export const getTodo = (id) =>axios.get(`${API_URL}/todos/${id}`);

export const createTodo =  (todo) => axios.post(`${API_URL}/todos`, todo);

export const updateTodo =  (id, todo) => axios.put(`${API_URL}/todos/${id}`, todo);

export const deleteTodo = (id) => axios.delete(`${API_URL}/todos/${id}`);

export const addNoteToTodo = (id, note) => axios.post(`${API_URL}/todos/${id}/note`,{note});