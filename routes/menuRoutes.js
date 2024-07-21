const express = require('express');
const router = express.Router();

const mockMenuItems = [
    { id: 1, name: 'Mock Item 1', description: 'Description 1', price: 9.99, category: 'Category 1', calories: 200, image_url: '/images/codtacos.png' },
    { id: 2, name: 'Mock Item 2', description: 'Description 2', price: 14.99, category: 'Category 2', calories: 300, image_url: '/images/beer.png' },
    // add more mock items as needed
];

router.get('/', (req, res) => {
    console.log('UI: GET request for home page');
    res.render('index', { title: 'Martha\'s Good Eats' });
});

router.get('/menu', (req, res) => {
    console.log('UI: GET request for menu page');
    res.render('menu', { title: 'Menu', menuItems: mockMenuItems });
});

router.get('/add', (req, res) => {
    console.log('UI: GET request for add item page');
    res.render('add', { title: 'Add Menu Item' });
});

router.post('/add', (req, res) => {
    console.log('UI: POST request to add new menu item', req.body);
    const newItem = { id: mockMenuItems.length + 1, ...req.body };
    mockMenuItems.push(newItem);
    res.redirect('/menu');
});

router.get('/update/:id', (req, res) => {
    console.log(`UI: GET request for update page for item ${req.params.id}`);
    const item = mockMenuItems.find(item => item.id === parseInt(req.params.id));
    if (item) {
        res.render('update', { title: 'Update Menu Item', item });
    } else {
        res.status(404).render('error', { error: 'Item not found' });
    }
});

router.post('/update/:id', (req, res) => {
    console.log(`UI: POST request to update item ${req.params.id}`, req.body);
    const itemIndex = mockMenuItems.findIndex(item => item.id === parseInt(req.params.id));
    if (itemIndex !== -1) {
        mockMenuItems[itemIndex] = { ...mockMenuItems[itemIndex], ...req.body };
        res.redirect('/menu');
    } else {
        res.status(404).render('error', { error: 'Item not found' });
    }
});

router.get('/delete/:id', (req, res) => {
    console.log(`UI: GET request for delete page for item ${req.params.id}`);
    const item = mockMenuItems.find(item => item.id === parseInt(req.params.id));
    if (item) {
        res.render('delete', { title: 'Delete Menu Item', item });
    } else {
        res.status(404).render('error', { error: 'Item not found' });
    }
});

router.post('/delete/:id', (req, res) => {
    console.log(`UI: POST request to delete item ${req.params.id}`);
    const itemIndex = mockMenuItems.findIndex(item => item.id === parseInt(req.params.id));
    if (itemIndex !== -1) {
        mockMenuItems.splice(itemIndex, 1);
        res.redirect('/menu');
    } else {
        res.status(404).render('error', { error: 'Item not found' });
    }
});

module.exports = router;
