const {Router} = require('express');
const router = Router();
const Todo = require('../models/Todo');

router.get('/', async (req, res) => {
    const todos = await Todo.find({});
    res.render('index', {
        title: 'ToDo List',
        isIndex: true,
        todos: todos.filter(t => t.archived == false)
    });
});

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create ToDo',
        isCreate: true
    });
});

router.get('/archive', async (req, res) => {
    const todos = await Todo.find({});
    res.render('archive', {
        title: 'Archive',
        isArchive: true,
        todos: todos.filter(t => t.archived == true)
    });
});

router.post('/create', async (req, res) => {
    const todo = new Todo({
        title: req.body.title || "" //body.title - name, указанное в input
    });
    await todo.save(); //сохраняем в базу данных
    res.redirect('/'); //перенапрявляем на домашнюю страницу, чтобы сразу увидеть список
});

router.post('/complete', async (req, res) => {
    const todo = await Todo.findById(req.body.id);
    todo.completed = !!req.body.completed;
    await todo.save();
    res.redirect('/');
});

router.post('/archiving', async (req, res) => {
    const todo = await Todo.findById(req.body.id);
    todo.archived = true;
    await todo.save();
    res.redirect('/');
});

router.post('/unarchiving', async (req, res) => {
    const todo = await Todo.findById(req.body.id);
    todo.archived = false;
    await todo.save();
    res.redirect('/archive');
});

module.exports = router;