var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': __dirname + '/basic-sqlite-database.sqlite'
});

var Todo = sequelize.define('todo', {
	description: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [1, 250]
		}
	},
	completed: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
});

var User = sequelize.define('user', {
	email: {
		type: Sequelize.STRING
	}
});

// Associations create and filter by 'userId'
// This allows me to link tables automatically by sql commands.
// Needed for cabbyMe web applications. Future implementation for SD SaaS
Todo.belongsTo(User);
User.hasMany(Todo);

sequelize.sync({
	// force: true // force set to true will wipe the database and recreate it. **BE CAREFUL**
}).then(function() {
	console.log('Everything is synced');

	User.findById(1).then(function (user) {
		user.getTodos({
			where: {
				completed: false
			}
		}).then(function (todos) {
			todos.forEach(function(todo) {
				console.log(todo.toJSON());
			});
		});
	});

	// User.create({
	// 	email: 'jasonthkim@gmail.com'
	// }).then(function () {
	// 	return Todo.create({
	// 		description: 'clean carpet'
	// 	});
	// }).then(function (todo) {
	// 	User.findById(1).then(function (user) {
	// 		user.addTodo(todo);
	// 	});
	// });
});