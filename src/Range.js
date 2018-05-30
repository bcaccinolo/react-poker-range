import React, { Component } from 'react';
import './Range.css';

class RangeRow extends Component {
  render() {
    const cells = this.props.row.map(hand => {
      const style = {
        backgroundColor: hand.color
      }
      return (
        <td style={style} key={hand.hand} >{hand.hand}</td>
      )
    })

    return (
      <tr>
        { cells }
      </tr>
    )
  }
}

export default class Range extends Component {
  render() {
    const res = this.props.hands.map(row => {
      return (
        <RangeRow row={row} />
      )
    });

    return (
      <table className="table range">
        <tbody>
          { res }
        </tbody>
      </table>
    );
  }
}
