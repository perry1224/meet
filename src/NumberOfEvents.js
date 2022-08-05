import React, { Component } from 'react';



class NumberOfEvents extends Component {
    handleInputChanged = (event) => {
        if (event.target.value <= 0 || event.target.value > 32) {
            this.setState({
                renderNumber: event.target.value,
                errorText: 'Please enter a number between 1 and 32'
            })
        } else {
            this.props.updateEvents(undefined, event.target.value);
            this.setState({
                renderNumber: event.target.value,
                errorText: ''
            });
        }
    }

    constructor() {
        super();
        this.state = {
            renderNumber: 32,
            errorText: ''
        }
    }

    render() {

        return (
            <div className="number-of-events">
                <p className="input-label">Number of Events:</p>
            <input type="number"
            className="number-input"
            placeholder="Enter number"
            value={this.state.numOfEvents}
            onChange={this.handleInputChanged} />
            </div>
        );
    }
}

export default NumberOfEvents;