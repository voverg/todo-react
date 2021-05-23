import React from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter';
import TodoList from '../todo-list';
import ItemAddForm from '../item-add-form';
import './app.css';

export default class App extends React.Component {
  // Create max id for items
  maxId = 100;

  // Initial state
  state = {
    todoData: [
      this.createTodoItem('first fucking item'),
      this.createTodoItem('second fucking item'),
      this.createTodoItem('third fucking item')
    ],
    searchFilter: '',
    filter: 'all'
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

// Search functions
   search = (arr, text) => {
    if (text.trim() === '') {
      return arr;
    }

    const filterResult = arr.filter((item) => {
      return item.label
        .toLowerCase()
        .includes(text.toLowerCase());
    });

    return filterResult;
  }

  searchChange = (text) => {
    this.setState(({searchFilter}) => {
      return {
        searchFilter: text
      };
    });
  };

  // Filter functions
  filterSwitch(arr, filterValue) {
    switch(filterValue) {
      case 'all':
        return arr;
      case 'active':
        return arr.filter((item) => !item.done);
      case 'done':
        return arr.filter((item) => item.done);
      default:
        return arr;
    }
  }

  filterChange = (filterVal) => {
    this.setState(({filter}) => {
      return {
        filter: filterVal
      };
    });
  };


  render() {
    const {todoData, searchFilter, filter} = this.state;

    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;
    const visibleItems = this.filterSwitch(this.search(todoData, searchFilter), filter);

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel">
          <SearchPanel onSearch={this.searchChange} />
          <ItemStatusFilter
            filter={filter}
            onFilter={this.filterChange}
          />
        </div>

        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.toggleImportant}
          onToggleDone={this.toggleDone} />

        <ItemAddForm onItemAdd={this.addItem} />
      </div>
    );
  }
}
