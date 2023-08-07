const DATA_FILE = "./todo.json";
const option = Deno.args[0];
const args = Deno.args[1];

interface Todo {
  contents: string;
  isCompleted: boolean;
}

export const todo = async () => {
  const todoData = {
    contents: args,
    isCompleted: false,
  };
  switch (option) {
    case "--add":
      await addTodo(todoData);
      showTodo();
      break;
    case "--complete":
      await completeTodo();
      showTodo();
      break;
    case "--list":
      showTodo();
      break;
    default:
      console.log("Please enter an option.");
      break;
  }
};

const loadTodo = async () => {
  try {
    const data = await Deno.readTextFile(DATA_FILE);
    // Do not read empty files in JSON.parse.
    if (data === "") {
      return [];
    }
    return JSON.parse(data);
  } catch (e) {
    console.log("Not Found Data : ", e);
    return [];
  }
};

const saveTodo = async (todos: Todo[]) => {
  await Deno.writeTextFile(DATA_FILE, JSON.stringify(todos));
};

const addTodo = async (todoData: Todo) => {
  const todos = await loadTodo();
  todos.push(todoData);
  await saveTodo(todos);
};

const completeTodo = async () => {
  const todos = await loadTodo();
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].contents === args) {
      todos[i].isCompleted = true;
    }
  }
  saveTodo(todos);
};

const showTodo = async () => {
  const todos = await loadTodo();
  console.log(todos);
};
