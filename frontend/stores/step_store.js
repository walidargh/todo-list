var _todoSteps = [];
var _callbacks = [];

var TodoStep = {
  all: function() {
    return _todoSteps;
  },

  fetch: function(id) {
    var self = this;
    $.ajax({
      url: "/api/todos/" + id + "/todo_steps",
      type: "GET",
      success: function (data) {
        _todoSteps = data;
        self.changed();
      }
    });
  },

  create: function(id, todoStep) {
    var self = this;
    $.ajax({
      url: "/api/todos/" + id + "/todo_steps",
      type: "POST",
      data: {todoStep: todoStep},
      success: function (data) {
        console.log('created');
        _todoSteps.push(data);
        self.changed();
      }
    });
  },

  destroy: function(id) {
    var self = this;
    var exists = false;
    for (var i = 0; i < _todoSteps.length; i++) {
      if (_todoSteps[i].id === id) {
        exists = true;
        break;
      }
    }
    if (exists) {
      $.ajax({
        url: "/api/todo_steps/" + id,
        type: "DELETE",
        success: function (data) {
          console.log(data);
          _todoSteps = _todoSteps.filter(function (el) {
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
    for (var i = 0; i < _todoSteps.length; i++) {
      if (_todoSteps[i].id === id) {
        todoItem = _todoSteps[i];
        _todoSteps[i].done = !(_todoSteps[i].done);
      }
    }

    $.ajax({
      url: "/api/todo_steps/" + id,
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


module.exports = TodoStep;
