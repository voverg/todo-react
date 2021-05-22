import React from 'react';

import './search-panel.css';

const SearchPanel = () => {
    return (
        <input type="text"
               className="search-panel"
               placeholder="Type to search..."
        />
    );
};

export default SearchPanel;
