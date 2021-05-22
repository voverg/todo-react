import React from 'react';

import './search-panel.css';


export default class SearchPanel extends React.Component {
  state = {
    term: ''
  };

  changeItem = (event) => {
    const text = event.target.value;
    this.setState(({term}) => {
      return {
        term: text
      };
    });
    this.props.onSearch(text);
  };

  render() {
    return (
        <input type="text"
               className="search-panel"
               placeholder="Type to search..."
               value={this.state.term}
               onChange={this.changeItem}
        />
    );
  }
}
