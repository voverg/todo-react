import React from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter';
import TodoList from '../todo-list';
import ItemAddForm from '../item-add-form';
import './app.css';

export default class App extends React.Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('first fucking item'),
      this.createTodoItem('second fucking item'),
      this.createTodoItem('third fucking item')
    ]
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    };
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({todoData}) => {
      const newArray = [...todoData, newItem];

      return {
        todoData: newArray
      }
    });
  };

  deleteItem = (id) => {
    this.setState(({todoData}) => {
      const index = todoData.findIndex((el) => el.id === id);

      const before = todoData.slice(0, index);
      const after = todoData.slice(index + 1);
      const newArray = [...before, ...after];

      return {
        todoData: newArray
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const index = arr.findIndex((el) => el.id === id);

    const oldItem = arr[index];
    const newItem = {...oldItem, [propName]: !oldItem[propName]};

    const before = arr.slice(0, index);
    const after = arr.slice(index + 1);

    return [...before, newItem, ...after];
  }

  toggleImportant = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };
    });
  };

  toggleDone = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };
    });
  };

  render() {
    const {todoData} = this.state;

    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel">
          <SearchPanel />
          <ItemStatusFilter />
        </div>

        <TodoList
          todos={todoData}
          onDeleted={this.deleteItem}
          onToggleImportant={this.toggleImportant}
          onToggleDone={this.toggleDone} />

        <ItemAddForm onItemAdd={(text) => this.addItem(text)} />
      </div>
    );
  }
}
