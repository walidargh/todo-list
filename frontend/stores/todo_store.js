var _todos = [];
var _callbacks = [];

var TodoStore = {
  all: function() {
    return _todos;
  },

  fetch: function() {
    var self = this;
    $.ajax({
      url: "/api/todos",
      type: "GET",
      success: function (data) {
        _todos = data;
        self.changed();
      }
    });
  },

  create: function(todo) {
    var self = this;
    $.ajax({
      url: "/api/todos",
      type: "POST",
      data: {todo: todo},
      success: function (data) {
        console.log('created');
        _todos.push(data);
        self.changed();
      }
    });
  },

  destroy: function(id) {
    var self = this;
    var exists = false;
    for (var i = 0; i < _todos.length; i++) {
      if (_todos[i].id === id) {
        exists = true;
        break;
      }
    }
    if (exists) {
      $.ajax({
        url: "/api/todos/" + id,
        type: "DELETE",
        success: function (data) {
          console.log(data);
          _todos = _todos.filter(function (el) {
            return el.id !== id;
          });
          self.changed();
        }

      });
    }
  },

  toggleDone: function(id) {
    var self = this;
    var todoItem;
    for (var i = 0; i < _todos.length; i++) {
      if (_todos[i].id === id) {
        todoItem = _todos[i];
        _todos[i].done = !(_todos[i].done);
      }
    }

    $.ajax({
      url: "/api/todos/" + id,
      type: "PATCH",
      data: {todo: todoItem},
      success: function (data) {
        self.changed();
      }
    });
  },

  changed: function() {
    for (var i = 0; i < _callbacks.length; i++) {
      _callbacks[i]();
    }
  },

  addChangedHandler: function(cb) {
    _callbacks.push(cb);
  },

  removeChangedHandler: function(cb) {
    _callbacks = _callbacks.filter(function(el) {
      return el !== cb;
    });
  }

};


module.exports = TodoStore;
