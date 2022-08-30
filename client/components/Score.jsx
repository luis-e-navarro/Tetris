import React, { Component } from 'react';

class Score extends Component {
    render() {  
      return (
        <li style={styles.container} className={'feedItem'} id={`Div${this.props.id}`}>
            {this.name},
            {this.score}
        </li>
      );
    }
  }
  
  
  const styles = {
    container: {
      border: '1px solid black',
      flex: 1,
    },
  };
  
  export default Score;
  