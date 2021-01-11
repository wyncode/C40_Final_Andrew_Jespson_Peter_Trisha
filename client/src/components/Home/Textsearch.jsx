import React from 'react';
import { view } from '@risingstack/react-easy-state';
import SearchBar from 'material-ui-search-bar';

const NavBar = () => (
  <div className="searchbar">
    <SearchBar
      onRequestSearch={}
      placeholder="Eat something foo ..."
      autoFocus
    />
  </div>
);

export default view(NavBar);
