var React = require('react');
var TodoList = require('./todo_list');
var TodoStore = require('../stores/todo_store');
var TodoStep = require('../stores/step_store');

var TodoDetailView = React.createClass({
  handleDestroy: function(event) {
    event.preventDefault();

    TodoStore.destroy(this.props.id);
  },

  render: function(){
    var done = this.props.done ? "Undone" : "Done";
    TodoStep.fetch(this.props.id);
    var todoSteps = TodoStep.all().map(function(todoStep){
      return <TodoListItem
                  title={todoStep.title}
                  body={todoStep.body}
                  id={todoStep.id}
                  done={todoStep.done}
                  key={todoStep.id}/>;
    });
    return (
      <div>
        <div className="body">{this.props.body}</div>
        {todoSteps}
        <input type="button" onClick={this.handleDestroy} value="Delete Todo"/>
      </div>
    );
  }
});

module.exports = TodoDetailView;
