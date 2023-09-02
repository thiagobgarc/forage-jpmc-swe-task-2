import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[],
  // It is a boolean value that determines the visibility of the graph component
// If 'showGraph' is true, the graph will be shown; if it's false, the graph will be hidden
  showGraph: boolean,
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      // data saves the server responds.
      // We use this state to parse data down to the child element (Graph) as element property
      data: [],
      showGraph: false,
    };
  }

  /**
   * Render Graph react component with state.data parse as property data
   */
  renderGraph() {
    // Check if the 'showGraph' property in the component's state is true
    if (this.state.showGraph) {
      // If 'showGraph' is true, render the 'Graph' component and pass the 'data' property from the component's state as a prop
      return (<Graph data={this.state.data}/>)
    }
  }

  /**
   * Get new data from server and update the state with the new data
   */
  getDataFromServer() {
    // Initialize a variable 'x' with a value of 0
    let x = 0;

    // Set up an interval that will execute the callback function every certain time interval
    const interval = setInterval(() => {
    // Call the 'getData' function from the 'DataStreamer' module and pass a callback function that will be executed when the data is received from the server
    DataStreamer.getData((serverResponds: ServerRespond[]) => {
    // Update the component's state by setting the 'data' property to the received server data and the 'showGraph' property to true
    this.setState({
      data: serverResponds,
      showGraph: true,
    });
  });

  // Increment the value of 'x' by 1
  x++;

  // Check if 'x' is greater than 10
  if (x > 10) {
    // If 'x' is greater than 10, clear the interval to stop executing the callback function
    clearInterval(interval);
  }
});
  }

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            // when button is click, our react app tries to request
            // new data from the server.
            // As part of your task, update the getDataFromServer() function
            // to keep requesting the data every 100ms until the app is closed
            // or the server does not return anymore data.
            onClick={() => {this.getDataFromServer()}}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
