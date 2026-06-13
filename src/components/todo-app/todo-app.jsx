import { Todo } from "./todo";
import { TodoControllers } from "./todo-controllers";
import { useTodo } from "./hooks/use-todo";
import styles from "./todo-app.module.css";

export function TodoApp() {
  const {
    task,
    setTask,
    editingTodoId,
    editingText,
    setEditingText,
    todos,
    noTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    startEditingTodo,
    cancelEditingTodo,
    saveEditingTodo,
  } = useTodo();
  const completedTodos = todos.filter((todo) => todo.complete).length;

  return (
    <main className={styles.appContainer}>
      <div className={styles.heading}>
        <span className={styles.titleIcon} aria-hidden="true">
          <svg viewBox="0 0 24 24" className={styles.titleIconSvg}>
            <path d="M9 6h11" />
            <path d="M9 12h11" />
            <path d="M9 18h11" />
            <path d="M4 6h.01" />
            <path d="M4 12h.01" />
            <path d="M4 18h.01" />
          </svg>
        </span>
        <h1 className={styles.title}>Lista de tareas</h1>
      </div>
      <p className={styles.subtitle}>Agregar y organizar tareas.</p>

      <div className={styles.summary}>
        <span>Total: {todos.length}</span>
        <span>Completadas: {completedTodos}</span>
      </div>

      <TodoControllers task={task} setTask={setTask} addTodo={addTodo} />

      {noTodos ? (
        <p className={styles.noTodos}>Todavia no hay tareas. Agrega la primera.</p>
      ) : (
        <ul className={styles.todoList}>
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              isEditing={editingTodoId === todo.id}
              editingText={editingText}
              setEditingText={setEditingText}
              startEditingTodo={startEditingTodo}
              cancelEditingTodo={cancelEditingTodo}
              saveEditingTodo={saveEditingTodo}
            />
          ))}
        </ul>
      )}
    </main>
  );
}
