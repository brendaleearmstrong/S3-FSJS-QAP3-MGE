const express = require('express');
const router = express.Router();
const menuItems = require('../dal/menuItems');

router.get('/menu_items', async (req, res) => {
    console.log('API: GET request for all menu items');
    try {
        const items = await menuItems.getAllItems();
        console.log(`API: Successfully retrieved ${items.length} menu items`);
        res.json(items);
    } catch (error) {
        console.error('API Error: Failed to get all menu items', error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/menu_items/:id', async (req, res) => {
    console.log(`API: GET request for menu item with id ${req.params.id}`);
    try {
        const item = await menuItems.getItemById(req.params.id);
        if (item) {
            console.log(`API: Successfully retrieved menu item with id ${req.params.id}`);
            res.json(item);
        } else {
            console.log(`API: Menu item with id ${req.params.id} not found`);
            res.status(404).json({ error: 'Item not found' });
        }
    } catch (error) {
        console.error(`API Error: Failed to get menu item with id ${req.params.id}`, error);
        res.status(500).json({ error: error.message });
    }
});

router.post('/menu_items', async (req, res) => {
    console.log('API: POST request to create new menu item', req.body);
    try {
        const newItem = await menuItems.createItem(req.body);
        console.log('API: Successfully created new menu item', newItem);
        res.status(201).json(newItem);
    } catch (error) {
        console.error('API Error: Failed to create new menu item', error);
        res.status(500).json({ error: error.message });
    }
});

router.put('/menu_items/:id', async (req, res) => {
    console.log(`API: PUT request to update menu item with id ${req.params.id}`, req.body);
    try {
        const updatedItem = await menuItems.updateItem(req.params.id, req.body);
        if (updatedItem) {
            console.log(`API: Successfully updated menu item with id ${req.params.id}`);
            res.json(updatedItem);
        } else {
            console.log(`API: Menu item with id ${req.params.id} not found for update`);
            res.status(404).json({ error: 'Item not found' });
        }
    } catch (error) {
        console.error(`API Error: Failed to update menu item with id ${req.params.id}`, error);
        res.status(500).json({ error: error.message });
    }
});

router.patch('/menu_items/:id', async (req, res) => {
    console.log(`API: PATCH request to update menu item with id ${req.params.id}`, req.body);
    try {
        const patchedItem = await menuItems.patchItem(req.params.id, req.body);
        if (patchedItem) {
            console.log(`API: Successfully patched menu item with id ${req.params.id}`);
            res.json(patchedItem);
        } else {
            console.log(`API: Menu item with id ${req.params.id} not found for patch`);
            res.status(404).json({ error: 'Item not found' });
        }
    } catch (error) {
        console.error(`API Error: Failed to patch menu item with id ${req.params.id}`, error);
        res.status(500).json({ error: error.message });
    }
});

router.delete('/menu_items/:id', async (req, res) => {
    console.log(`API: DELETE request for menu item with id ${req.params.id}`);
    try {
        const deletedItem = await menuItems.deleteItem(req.params.id);
        if (deletedItem) {
            console.log(`API: Successfully deleted menu item with id ${req.params.id}`);
            res.json({ message: 'Item deleted successfully' });
        } else {
            console.log(`API: Menu item with id ${req.params.id} not found for deletion`);
            res.status(404).json({ error: 'Item not found' });
        }
    } catch (error) {
        console.error(`API Error: Failed to delete menu item with id ${req.params.id}`, error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
