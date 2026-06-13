import { useEffect, useState } from "react";

const STORAGE_KEY = "react-tareas";

export function useTodo() {
  const [task, setTask] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem(STORAGE_KEY);
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!task.trim()) {
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: task.trim(),
      complete: false,
    };

    setTodos((currentTodos) => [...currentTodos, newTodo]);
    setTask("");
  };

  const toggleTodo = (id) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, complete: !todo.complete } : todo,
      ),
    );
  };

  const deleteTodo = (id) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
    if (editingTodoId === id) {
      setEditingTodoId(null);
      setEditingText("");
    }
  };

  const startEditingTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);

    if (!todoToEdit) {
      return;
    }

    setEditingTodoId(id);
    setEditingText(todoToEdit.text);
  };

  const cancelEditingTodo = () => {
    setEditingTodoId(null);
    setEditingText("");
  };

  const saveEditingTodo = (id) => {
    const trimmedText = editingText.trim();

    if (!trimmedText) {
      return;
    }

    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, text: trimmedText } : todo,
      ),
    );
    setEditingTodoId(null);
    setEditingText("");
  };

  return {
    task,
    setTask,
    editingTodoId,
    editingText,
    setEditingText,
    todos,
    noTodos: todos.length === 0,
    addTodo,
    toggleTodo,
    deleteTodo,
    startEditingTodo,
    cancelEditingTodo,
    saveEditingTodo,
  };
}
