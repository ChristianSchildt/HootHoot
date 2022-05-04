import React from 'react';
import '../css/MenuNavigation.css';

class MenuNavigation extends React.Component {
  
  render() {
    return (
      <nav>
        <ul className={this.props.className}>
          <li><a href="/teacher/homeMenu">HOME</a></li>
          <li><a href="/teacher/libraryMenu">BIBLIOTHEK</a></li>
          <li><a href="/teacher/analysesMenu">ANALYSEN</a></li>
          <li><a href="/teacher/groupsMenu">GRUPPEN</a></li>
        </ul>
      </nav>
    )
  }
}

export default MenuNavigation;