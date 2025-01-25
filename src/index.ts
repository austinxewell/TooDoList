import { v4 as uuidV4 } from "uuid";

type Task = { id: string; title: string; completed: boolean; createdAt: Date };

const list = document.querySelector<HTMLUListElement>("#list");
const form = document.querySelector<HTMLFormElement>("#new-task-form");
const input = document.querySelector<HTMLInputElement>("#new-task-title");
const tasks: Task[] = loadTasks();

tasks.forEach(addListItem);

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input?.value == "" || input?.value == null) return;

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };

  tasks.push(newTask);

  addListItem(newTask);
  input.value = "";
});

function addListItem(task: Task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const deleteBtn = document.createElement("button");
  const checkbox = document.createElement("input");

  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    saveTasks();
  });

  deleteBtn.addEventListener("click", () => {
    const taskIndex = tasks.indexOf(task);

    if (taskIndex > -1) {
      tasks.splice(taskIndex, 1);
      saveTasks();
      item.remove();
    }
  });

  item.id = "list-item";

  checkbox.type = "checkbox";
  checkbox.checked = task.completed;

  deleteBtn.id = "delete-button";
  deleteBtn.textContent = "X";

  label.append(checkbox, task.title);
  item.append(label);
  item.append(deleteBtn);
  list?.append(item);

  saveTasks();
}

function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
}

function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("TASKS");

  if (taskJSON === null) return [];

  return JSON.parse(taskJSON);
}
