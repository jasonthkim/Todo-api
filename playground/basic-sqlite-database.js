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

sequelize.sync({
	//force: true // force set to true will wipe the database and recreate it. **BE CAREFUL**
}).then(function() {
	console.log('Everything is synced');

	// Fetch a todo item by id
	// print to screen by json or if error print it out

	Todo.findById(32).then(function (todo) {
		if (todo) {
			console.log(todo.toJSON());
		} else {
			console.log('Todo not found');
		}
	});


	// Todo.create({
	// 	description: 'Take out the trash',
	// 	//completed: false
	// }).then(function(todo) {
	// 	return Todo.create({
	// 		description: 'Clean office later'
	// 	});
	// }).then(function () {
	// 	//return Todo.findById(1)
	// 	return Todo.findAll ({
	// 		where: {
	// 			description: {
	// 				$like: '%trash%'
	// 			}
	// 		}
	// 	});
	// }).then(function (todos) {
	// 	if (todos) {
	// 		todos.forEach(function (todo) {
	// 			console.log(todo.toJSON());
	// 		});
	// 	} else {
	// 		console.log('no todo found!');
	// 	}
	// }).catch(function (e) {
	// 	console.log(e);
	// });
});