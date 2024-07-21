const express = require('express');
const router = express.Router();
const menuItems = require('../dal/menuItems');

router.get('/', (req, res) => {
    console.log('UI: GET request for home page');
    res.render('index', { title: 'Martha\'s Good Eats' });
});

router.get('/menu', async (req, res) => {
    console.log('UI: GET request for menu page');
    try {
        const items = await menuItems.getAllItems();
        console.log(`UI: Retrieved ${items.length} menu items for display`);
        res.render('menu', { title: 'Menu', menuItems: items });
    } catch (error) {
        console.error('UI Error: Failed to get menu items for display', error);
        res.status(500).render('error', { error: error.message });
    }
});

router.get('/add', (req, res) => {
    console.log('UI: GET request for add item page');
    res.render('add', { title: 'Add Menu Item' });
});

router.post('/add', async (req, res) => {
    console.log('UI: POST request to add new menu item', req.body);
    try {
        await menuItems.createItem(req.body);
        console.log('UI: Successfully added new menu item');
        res.redirect('/menu');
    } catch (error) {
        console.error('UI Error: Failed to add new menu item', error);
        res.status(500).render('error', { error: error.message });
    }
});

router.get('/update/:id', async (req, res) => {
    console.log(`UI: GET request for update page for item ${req.params.id}`);
    try {
        const item = await menuItems.getItemById(req.params.id);
        if (item) {
            console.log(`UI: Retrieved item ${req.params.id} for update`);
            res.render('update', { title: 'Update Menu Item', item });
        } else {
            console.log(`UI: Item ${req.params.id} not found for update`);
            res.status(404).render('error', { error: 'Item not found' });
        }
    } catch (error) {
        console.error(`UI Error: Failed to get item ${req.params.id} for update`, error);
        res.status(500).render('error', { error: error.message });
    }
});

router.post('/update/:id', async (req, res) => {
    console.log(`UI: POST request to update item ${req.params.id}`, req.body);
    try {
        await menuItems.updateItem(req.params.id, req.body);
        console.log(`UI: Successfully updated item ${req.params.id}`);
        res.redirect('/menu');
    } catch (error) {
        console.error(`UI Error: Failed to update item ${req.params.id}`, error);
        res.status(500).render('error', { error: error.message });
    }
});

router.get('/delete/:id', async (req, res) => {
    console.log(`UI: GET request for delete page for item ${req.params.id}`);
    try {
        const item = await menuItems.getItemById(req.params.id);
        if (item) {
            console.log(`UI: Retrieved item ${req.params.id} for delete`);
            res.render('delete', { title: 'Delete Menu Item', item });
        } else {
            console.log(`UI: Item ${req.params.id} not found for delete`);
            res.status(404).render('error', { error: 'Item not found' });
        }
    } catch (error) {
        console.error(`UI Error: Failed to get item ${req.params.id} for delete`, error);
        res.status(500).render('error', { error: error.message });
    }
});

router.post('/delete/:id', async (req, res) => {
    console.log(`UI: POST request to delete item ${req.params.id}`);
    try {
        await menuItems.deleteItem(req.params.id);
        console.log(`UI: Successfully deleted item ${req.params.id}`);
        res.redirect('/menu');
    } catch (error) {
        console.error(`UI Error: Failed to delete item ${req.params.id}`, error);
        res.status(500).render('error', { error: error.message });
    }
});

router.get('/patch/:id', async (req, res) => {
    console.log(`UI: GET request for patch page for item ${req.params.id}`);
    try {
        const item = await menuItems.getItemById(req.params.id);
        if (item) {
            console.log(`UI: Retrieved item ${req.params.id} for patch`);
            res.render('patch', { title: 'Patch Menu Item', item });
        } else {
            console.log(`UI: Item ${req.params.id} not found for patch`);
            res.status(404).render('error', { error: 'Item not found' });
        }
    } catch (error) {
        console.error(`UI Error: Failed to get item ${req.params.id} for patch`, error);
        res.status(500).render('error', { error: error.message });
    }
});

router.post('/patch/:id', async (req, res) => {
    console.log(`UI: POST request to patch item ${req.params.id}`, req.body);
    try {
        await menuItems.patchItem(req.params.id, req.body);
        console.log(`UI: Successfully patched item ${req.params.id}`);
        res.redirect('/menu');
    } catch (error) {
        console.error(`UI Error: Failed to patch item ${req.params.id}`, error);
        res.status(500).render('error', { error: error.message });
    }
});

module.exports = router;
