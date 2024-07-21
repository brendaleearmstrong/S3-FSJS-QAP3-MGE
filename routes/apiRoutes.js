const express = require('express');
const router = express.Router();

const mockMenuItems = [
    { id: 1, name: 'Mock Item 1', description: 'Description 1', price: 9.99, category: 'Category 1', calories: 200, image_url: '/images/codtacos.png' },
    { id: 2, name: 'Mock Item 2', description: 'Description 2', price: 14.99, category: 'Category 2', calories: 300, image_url: '/images/beer.png' },
    // add more mock items as needed
];

router.get('/menu_items', (req, res) => {
    console.log('API: GET request for all menu items');
    res.json(mockMenuItems);
});

router.get('/menu_items/:id', (req, res) => {
    console.log(`API: GET request for menu item with id ${req.params.id}`);
    const item = mockMenuItems.find(item => item.id === parseInt(req.params.id));
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});

router.post('/menu_items', (req, res) => {
    console.log('API: POST request to create new menu item', req.body);
    const newItem = { id: mockMenuItems.length + 1, ...req.body };
    mockMenuItems.push(newItem);
    res.status(201).json(newItem);
});

router.put('/menu_items/:id', (req, res) => {
    console.log(`API: PUT request to update menu item with id ${req.params.id}`, req.body);
    const itemIndex = mockMenuItems.findIndex(item => item.id === parseInt(req.params.id));
    if (itemIndex !== -1) {
        mockMenuItems[itemIndex] = { ...mockMenuItems[itemIndex], ...req.body };
        res.json(mockMenuItems[itemIndex]);
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});

router.patch('/menu_items/:id', (req, res) => {
    console.log(`API: PATCH request to update menu item with id ${req.params.id}`, req.body);
    const itemIndex = mockMenuItems.findIndex(item => item.id === parseInt(req.params.id));
    if (itemIndex !== -1) {
        mockMenuItems[itemIndex] = { ...mockMenuItems[itemIndex], ...req.body };
        res.json(mockMenuItems[itemIndex]);
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});

router.delete('/menu_items/:id', (req, res) => {
    console.log(`API: DELETE request for menu item with id ${req.params.id}`);
    const itemIndex = mockMenuItems.findIndex(item => item.id === parseInt(req.params.id));
    if (itemIndex !== -1) {
        mockMenuItems.splice(itemIndex, 1);
        res.json({ message: 'Item deleted successfully' });
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});

module.exports = router;
