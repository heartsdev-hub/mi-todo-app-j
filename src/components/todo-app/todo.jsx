import styles from "./todo.module.css";

export function Todo({
  todo,
  toggleTodo,
  deleteTodo,
  isEditing,
  editingText,
  setEditingText,
  startEditingTodo,
  cancelEditingTodo,
  saveEditingTodo,
}) {
  const textClass = todo.complete ? styles.completedText : styles.todoText;

  const handleEditingKeyDown = (event) => {
    if (event.key === "Enter") {
      saveEditingTodo(todo.id);
    }

    if (event.key === "Escape") {
      cancelEditingTodo();
    }
  };

  return (
    <li className={styles.todoItem}>
      <label className={styles.todoLabel}>
        <input
          type="checkbox"
          checked={todo.complete}
          onChange={() => toggleTodo(todo.id)}
          className={styles.checkbox}
        />
        {isEditing ? (
          <input
            type="text"
            value={editingText}
            onChange={(event) => setEditingText(event.target.value)}
            onKeyDown={handleEditingKeyDown}
            className={styles.editInput}
            autoFocus
          />
        ) : (
          <span className={textClass}>{todo.text}</span>
        )}
      </label>

      <div className={styles.actions}>
        {isEditing ? (
          <>
            <button onClick={() => saveEditingTodo(todo.id)} className={styles.editButton}>
              Guardar
            </button>
            <button onClick={cancelEditingTodo} className={styles.cancelButton}>
              Cancelar
            </button>
          </>
        ) : (
          <button onClick={() => startEditingTodo(todo.id)} className={styles.editButton}>
            Editar
          </button>
        )}
        <button onClick={() => deleteTodo(todo.id)} className={styles.deleteButton}>
          Eliminar
        </button>
      </div>
    </li>
  );
}
