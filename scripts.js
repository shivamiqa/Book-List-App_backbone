// Backbone Model
var Book = Backbone.Model.extend({
	defaults: {
		author: '',
		title: '',
		body: ''
	}
});

// Backbone Collection
var Books = Backbone.Collection.extend({});
var books = new Books();

//View for book
var BookView = Backbone.View.extend({
	model: new Book(),
	tagName: 'tr',
	initialize: function() {
		this.template = _.template($('.book-list-template').html());
	},
	events: {
		'click .delete-book': 'delete'
	},
	delete: function() {
		this.model.destroy();
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

// Backbone View for all books

var BooksView = Backbone.View.extend({
	collection: books,
	el: $('.book-list'),
	initialize: function() {
		var self = this;
		this.collection.on('add', this.render, this);
		this.collection.on('change', function() {
			setTimeout(function() {
				self.render();
			}, 30);
		},this);
		this.collection.on('remove', this.render, this);
	},
	render: function() {
		var self = this;
		this.$el.html('');
		_.each(this.collection.toArray(), function(book) {
			self.$el.append((new BookView({model: book})).render().$el);
		});
		return this;
	}
});

var booksView = new BooksView();

var validate = function() {
	if ($(".author-input").val().length > 0 && $(".title-input").val().length > 0 &&$(".body-input").val().length > 0) {
	  return true;
	}
};

$(document).ready(function() {
		$('.add-book').on('click', function() {
			if(validate()){
				var book = new Book({
					author: $('.author-input').val(),
					title: $('.title-input').val(),
					body: $('.body-input').val()
				});
				// clear all feilds
				$('.author-input').val('');
				$('.title-input').val('');
				$('.body-input').val('');
				console.log(book.toJSON());
				books.add(book);
	}
	else{
		alert('Please fill all feilds');
	}
})
})