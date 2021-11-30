import React from 'react';

import './item-add-form.css';

export default class ItemAddForm extends React.Component {
  state = {
    label: ''
  };

  labelChange = (event) => {
    this.setState(({label}) => {
      return {
        label: event.target.value
      };
    });
  };

  submitLabel = (event) => {
    event.preventDefault();
    if (this.state.label.trim() === '') return;

    this.props.onItemAdd(this.state.label.trim());
    this.setState(({label}) => {
      return {
        label: ''
      };
    });
  }

  render() {
    return (
      <form className="item-add-form" onSubmit={this.submitLabel}>
        <input type="text"
                className="form-control new-task"
                onChange={this.labelChange}
                placeholder="New task..."
                value={this.state.label}
                autoFocus
         />
        <button type="submit"
                className="btn btn-outline-secondary add-btn"
        >
            Add
        </button>
      </form>
    );
  }
}
