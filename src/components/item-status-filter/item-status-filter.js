import React from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends React.Component {
  buttonsList = [
    {name: 'all', label: 'All'},
    {name: 'active', label: 'Active'},
    {name: 'done', label: 'Done'}
  ];

  render() {
    const {filter, onFilter} = this.props;

    const buttonsElems = this.buttonsList.map(({name, label}) => {
      const isActive = filter === name;
      const clazz = isActive ? 'btn-info' : 'btn-outline-secondary';

      return (
        <button type="button"
                className={`btn ${clazz}`}
                key={name}
                onClick={() => onFilter(name)}
        >
          {label}
        </button>
      );
    });

    return (
      <div className="btn-group item-status-filter">
        {buttonsElems}
      </div>
    );
  }
}
