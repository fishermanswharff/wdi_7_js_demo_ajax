// handlebars templates/> templates/templates.js

var Router = Backbone.Router.extend({
    routes: {
        '': 'home',
        'home': 'home',
        'about': 'about',
        'users': 'users',
        'page/:id': 'page'
    },

    home: function() {
        var template = Handlebars.templates['home'];
        
        $('#content').html(template({
            name: 'Ella'
        }));
    },
    
    about: function() {
        var template = Handlebars.templates['about'];
        $('#content').html(template({
            name: 'Ava'
        }));
    },
    
    users: function() {
        $.ajax({
            url: 'http://localhost:3000/users',
            type: 'GET'
        }).done(function(response) {
            var template = Handlebars.templates['users'];
            $('#content').html(template({
                users: response
            }));
        });
    },
    
    page: function(id) {
        console.log(id);
    }
});

var router = new Router();

$('#content').on('submit', '.js-userForm', function(e) {
    e.preventDefault();
    
    var data = {
        user: {
            username: $(this).find('input[name="username"]').val()
        }
    };
    
    $.ajax({
        url: 'http://localhost:3000/users',
        type: 'POST',
        data: data
    }).done(function(response) {
        console.log(response);
    });
});

$('#content').on('click', '.js-deleteUser', function(e) {
    e.preventDefault();
    
    var id = $(this).attr('data-id');
    
    $.ajax({
        url: 'http://localhost:3000/users/'+id,
        type: 'DELETE'
    }).done(function(response) {
        console.log(response);
    });
});

Backbone.history.start();