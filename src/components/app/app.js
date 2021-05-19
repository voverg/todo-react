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
      {label: 'first item', important: false, id: 1},
      {label: 'second item', important: false, id: 2},
      {label: 'third item', important: false, id: 3}
    ]
  };

  addItem = (text) => {
    const newItem = {
      label: `${text}`,
      important: false,
      id: this.maxId++
    };

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

  render() {
    const {todoData} = this.state;

    return (
      <div className="todo-app">
        <AppHeader toDo={1} done={3} />
        <div className="top-panel">
          <SearchPanel />
          <ItemStatusFilter />
        </div>

        <TodoList
          todos={todoData}
          onDeleted={this.deleteItem} />

        <ItemAddForm onItemAdd={() => this.addItem('zhopa')} />
      </div>
    );
  }
}
