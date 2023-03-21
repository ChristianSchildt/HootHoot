import React from 'react';
import '../css/MenuNavigation.css';

class MenuNavigation extends React.Component {
  
  render() {
    return (
      <nav>
        <ul className={this.props.className}>
          <li><a id ={this.props.id1} href="/teacher/libraryMenu">BIBLIOTHEK</a></li>
          <li><a id ={this.props.id2} href="/teacher/analysesMenu">ANALYSEN</a></li>
          <li><a id ={this.props.id3} href="/teacher/newsMenu">NEUIGKEITEN</a></li>
        </ul>
      </nav>
    )
  }
}

export default MenuNavigation;