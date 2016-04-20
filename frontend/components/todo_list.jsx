var React = require('react');
var TodoStore = require('../stores/todo_store');
var TodoListItem = require('./todo_list_item');
var TodoForm = require('./todo_form');

var todoList = React.createClass({
  getInitialState: function() {
    return { list: TodoStore.all() };
  },

  todosChanged: function () {
    this.setState({list: TodoStore.all()});
  },

  componentDidMount: function () {
    TodoStore.addChangedHandler(this.todosChanged);
    TodoStore.fetch();
  },

  componentWillUnmount: function (){
    TodoStore.removeChangedHandler(this.todosChanged);
  },

  render: function(){
    var list = this.state.list;

      list = list.map(function(el, idx) {
        return <TodoListItem
                    title={el.title}
                    body={el.body}
                    id={el.id}
                    done={el.done} 
                    key={el.id}/>;
      });

    return (
      <div>
        <ul>
          {list}
        </ul>
        <TodoForm callback={this.create}/>
      </div>
    );
  }
});



module.exports = todoList;
