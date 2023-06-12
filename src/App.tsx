import React, { useState } from 'react';
import './App.css';

function App() {
  const [input_values, setInputvalue] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  type Todo = {
    input_value: string;
    id: number;
    checked: boolean;
  }

  const handle_change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputvalue(e.target.value);
  }
  const handle_submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 新しいTODOを作成
    const new_todo: Todo = {
      input_value: input_values,
      id: todos.length,
      checked: false,
    };

    setTodos([new_todo, ...todos]);
    setInputvalue('');
  }
  const handle_edit = (id: number, value: string) => {
    const new_todos = todos.map((todo) => {
      if (todo.id === id) {
        todo.input_value = value;
      }
      return todo
    })
    
    setTodos(new_todos);
  };
  const handle_check = (id: number, checked: boolean) => {
    const new_todos = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo
    })
    
    setTodos(new_todos);  
  };
  
  const handle_delete = (id: number) => {
    const new_todos = todos.filter((todo) => todo.id !== id);
    setTodos(new_todos);  
  };

  return (
    <div className="App">
      <div>
        <h2>todoリスト with Typescript</h2>
        <form onSubmit={(e) => handle_submit(e)}>
          <input type='text' onChange={(e) => handle_change(e)} className='inputText'></input>
          <input type='submit' value='作成' className='submitButton'></input>
        </form>

        <ul className='todoList'>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input type='text' 
                onChange={(e) => handle_edit(todo.id, e.target.value)} 
                className='inputText'
                value={todo.input_value}
                disabled={todo.checked}></input>

              <input type='checkbox' 
                onChange={(e) => handle_check(todo.id, todo.checked)}></input>
            
              <button onClick={() => handle_delete(todo.id)}>消</button>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export default App;
