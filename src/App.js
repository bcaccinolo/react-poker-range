import React, { Component } from 'react';
import './App.css';
import prange from 'prange';
import { vanillaRange, convertToHands, updateRange } from './lib/generator';
import Range from './Range';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {value: '22+'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log('here');
  }

  handleSubmit(event) {
    this.setState({value: event.target.elements[0].value.trim()});
    event.preventDefault();
  }

   // activate JS on tooltip elements
   componentDidMount() {
    window.$('input[type=text]').val(this.state.value);
  }

  render() {
    const r1 = prange(this.state.value);
    const list = convertToHands(r1)
    const range = vanillaRange();
    const new_range = updateRange(range, list);

    const text_input_style = {
      width: '500px'
    }

    return (
      <div className="container">

        <form className="mt-3 mb-3" onSubmit={this.handleSubmit}>
          <input style={text_input_style} type="text" name='text' id='text' />
          <input type="submit" value="Submit" />
        </form>

        <Range hands={new_range}  />
      </div>
    );
  }
}

export default App;
