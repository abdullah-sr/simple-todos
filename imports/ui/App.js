import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.js';


// App component - represents the whole app
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            textValue: ''
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        Tasks.insert({
            text: this.state.textValue.trim(),
            createdAt: new Date(), // current time
        });

        // Clear form
        this.setState({
            textValue: ''
        });
    }

    renderTasks() {
        return this.props.tasks.map((task) => (
            <Task key={task._id} task={task}/>
        ));
    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Todo List</h1>
                    <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
                        <input
                            type="text"
                            value={this.state.textValue}
                            onChange={(e) => {
                                this.setState({ textValue: e.target.value })
                            }}
                            placeholder="Type to add new tasks"
                        />
                    </form>

                </header>

                <ul>
                    {this.renderTasks()}
                </ul>
            </div>
        );
    }
}

export default withTracker(() => {
    return {
        tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch()
    };
})(App);
