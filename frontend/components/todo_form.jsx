var React = require('react');
var TodoList = require('./todo_list');
var TodoStore = require('../stores/todo_store');


var TodoForm = React.createClass({
  getInitialState: function() {
    return { title: "", body: "" };
  },

  updateTitle: function(event){
    this.setState({title: event.currentTarget.value});
  },

  updateBody: function(event){
    this.setState({body: event.currentTarget.value});
  },

  handleSubmit: function(event){
    event.preventDefault();
    TodoStore.create(this.state);
    this.setState({title: "", body: ""});
  },

  render: function(){
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Title
          <input type="text" onChange={this.updateTitle} value={this.state.title}/>
        </label>
        <label>Body
        <input type="text" onChange={this.updateBody} value={this.state.body}/>
        </label>
        <input type="submit" value="Create New Todo List Item!"/>
      </form>
    );
  }
});



module.exports = TodoForm;
