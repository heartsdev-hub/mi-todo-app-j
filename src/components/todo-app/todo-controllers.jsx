import styles from "./todo-controllers.module.css";

export function TodoControllers({ task, setTask, addTodo }) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div className={styles.controllersContainer}>
      <input
        type="text"
        value={task}
        onChange={(event) => setTask(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Escribe una tarea"
        className={styles.taskInput}
      />
      <button onClick={addTodo} className={styles.addButton}>
        Agregar
      </button>
    </div>
  );
}
