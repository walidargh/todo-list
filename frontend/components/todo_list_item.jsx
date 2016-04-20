var React = require('react');
var TodoList = require('./todo_list');
var TodoStore = require('../stores/todo_store');
var TodoDetailView = require('./todo_detail_view');


var TodoListItem = React.createClass({
  getInitialState: function () {
    return {detailView: false};
  },

  handleToggleDone: function(event) {
    event.preventDefault();

    TodoStore.toggleDone(this.props.id);
  },

  handleToggleView: function(event) {
    console.log("I'm handling it");
    this.setState({detailView: !this.state.detailView});
  },

  render: function(){
    var detailView;
    if (this.state.detailView) {
      detailView = <TodoDetailView body={this.props.body} id={this.props.id} />;
    }
    var done = this.props.done ? "Undone" : "Done";
    return (
      <div>
        <div onClick={this.handleToggleView} className="title">{this.props.title}</div>
        {detailView}
        <input type="button" onClick={this.handleToggleDone} value={done}/>
      </div>
    );
  }
});



module.exports = TodoListItem;
