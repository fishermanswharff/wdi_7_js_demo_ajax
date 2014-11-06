'use strict';

var taskManager = {};

// helpers
taskManager.fetchCategories = function() {
    $.ajax({
        url: 'http://localhost:3000/categories',
        type: 'GET'
    }).done(function(response) {
        taskManager.buildCategorySelect(response);
    });
};

taskManager.fetchTasks = function() {
    $.ajax({
        url: 'http://localhost:3000/tasks',
        type: 'GET'
    }).done(function(response) {
        taskManager.buildTaskList(response);
    });
};

taskManager.buildCategorySelect = function(categories) {
    $.each(categories, function(index, item) {
        var option = $('<option>').val(item.id).text(item.name);
        
        $('select[name="category"]').append(option);
    });
};

taskManager.buildTaskList = function(tasks) {
    $.each(tasks, function(index, item) {
        var li = $('<li>').attr('data-id', item.id).attr('data-status', item.status);
        $('<a>').attr('href', '#').text(item.name).appendTo(li);
        
        $('.js-taskList').append(li);
    });
};

taskManager.createCategory = function(category) {
  if (category === '') {
    return;
  }
  // var data = { "name": category }
  $.ajax({
    url: 'http://localhost:3000/categories',
    type: 'POST',
    data: JSON.stringify({"name":category}),
    contentType: 'application/json',
    dataType: 'text'
  }).done(function(response){
    var categoryField = $('select[name="category"]');
    $('<option>').val(category).text(category).appendTo(categoryField);
    categoryField.val(category);
  });
};

taskManager.createTask = function(task, category) {
  if (category === '' || category === '') {
    return;
  }
  $.ajax({
    url: 'http://localhost:3000/tasks',
    type: 'POST',
    data: JSON.stringify({"name": task, "category": category}),
    contentType: 'application/json',
    dataType: 'text'
  }).done(function(response){
    var item = $('<a>').attr('href', '#').text(task).wrap("<li></li>").parent();
    item.appendTo('.js-taskList ul').hide().fadeIn();
  });
};

// event actions
taskManager.submitCategoryForm = function(e) {
  e.preventDefault();

  var categoryField = $(this).find('input[name="category"]');

  taskManager.createCategory(categoryField.val());

  categoryField.val('');
};

taskManager.submitTaskForm = function(e) {
  e.preventDefault();

  var task = $(this).find('input[name="task"]').val();
  var category = $(this).find('select[name="category"]').val();

  taskManager.createTask(task, category);

  $(this).find('input[name="task"]').val('');
  $(this).find('select[name="category"]').val('');
};

taskManager.clickTaskItem = function(e) {
  e.preventDefault();

  var eventContext = this;

  var id = $(eventContext).parent().attr('data-id');
  var status = $($(this).parent().attr("data-status") === "2") ? 0 : 2;
  $.ajax({
    url: 'http://localhost:3000/tasks/' + id,
    type: 'PUT',
    data: JSON.stringify({
      status: status
    })
  }).done(function(response) {
    $(eventContext).parent().attr('data-status', status);
  });

  // $(e.target).toggleClass('completed');
};

taskManager.clickRemoveCompleted = function(e) {
  e.preventDefault();
  $('.js-taskList li[data-status="2"]').each(function() {
    var iteratorContext = this;
    
    var id = $(iteratorContext).attr('data-id');
    
    $.ajax({
      url: 'http://localhost:3000/tasks/' + id,
      type: 'DELETE'
    }).done(function(response) {
      $(iteratorContext).fadeOut(function() {
          $(this).remove();
      });
    });
  });
  
};

taskManager.printCategories = function(e){
  var categoryField = $('select[name="category"]');
  $(e).each(function(index,item){
    $('<option>').val(item.name).text(item.name).appendTo(categoryField);
    categoryField.val(item.name);
  });
};

taskManager.printTasks = function(e){
  $('.js-taskList li[data-status="2"]').each(function() {
      var iteratorContext = this;
      
      var id = $(iteratorContext).attr('data-id');
      
      $.ajax({
          url: 'http://localhost:3000/tasks/' + id,
          type: 'DELETE'
      }).done(function(response) {
          $(iteratorContext).fadeOut(function() {
              $(this).remove();
          });
      });
  });
};

// event listeners
taskManager.addEvents = function() {
  $('.js-categoryForm').on('submit', taskManager.submitCategoryForm);
  $('.js-taskForm').on('submit', taskManager.submitTaskForm);
  $('.js-taskList ul').on('click', 'a', taskManager.clickTaskItem);
  $('.js-removeCompleted').on('click', taskManager.clickRemoveCompleted);

  $.ajax({
    url: 'http://localhost:3000/categories',
    type: 'GET'
  }).done(function(response){
    taskManager.printCategories(response);
  }).fail(function(jqXHR, statusText, errorCode){
    console.log(jqXHR, statusText, errorCode);
  });

  $.ajax({
    url: 'http://localhost:3000/tasks',
    type: 'GET'
  }).done(function(response){
    taskManager.printTasks(response);
  }).fail(function(jqXHR, statusText, errorCode){
    console.log(jqXHR, statusText, errorCode);
  });
};

// DOM ready
$(function() {
  taskManager.addEvents();
    $.ajaxSetup({
        contentType: 'application/json'
    });
    
    taskManager.addEvents();
});