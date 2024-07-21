// dal/menuItems.js
const db = require('../config/db');

module.exports = {
    getAllItems: async () => {
        console.log('DAL: Fetching all menu items');
        const result = await db.query('SELECT * FROM public."Menu_Items"');
        console.log(`DAL: Found ${result.rows.length} menu items`);
        return result.rows;
    },
    getItemById: async (id) => {
        console.log(`DAL: Fetching menu item with id ${id}`);
        const result = await db.query('SELECT * FROM public."Menu_Items" WHERE menu_id = $1', [id]);
        console.log(`DAL: ${result.rows.length ? 'Found' : 'Did not find'} menu item with id ${id}`);
        return result.rows[0];
    },
    createItem: async (item) => {
        console.log('DAL: Creating new menu item', item);
        const result = await db.query(
            'INSERT INTO public."Menu_Items" (name, description, price, category, calories, availability, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [item.name, item.description, item.price, item.category, item.calories, item.availability, item.image_url]
        );
        console.log('DAL: Created new menu item with id', result.rows[0].menu_id);
        return result.rows[0];
    },
    updateItem: async (id, item) => {
        console.log(`DAL: Updating menu item with id ${id}`, item);
        const result = await db.query(
            'UPDATE public."Menu_Items" SET name = $1, description = $2, price = $3, category = $4, calories = $5, availability = $6, image_url = $7 WHERE menu_id = $8 RETURNING *',
            [item.name, item.description, item.price, item.category, item.calories, item.availability, item.image_url, id]
        );
        console.log(`DAL: ${result.rows.length ? 'Updated' : 'Failed to update'} menu item with id ${id}`);
        return result.rows[0];
    },
    patchItem: async (id, updates) => {
        console.log(`DAL: Patching menu item with id ${id}`, updates);
        const setClause = Object.keys(updates).map((key, index) => `${key} = $${index + 1}`).join(', ');
        const values = [...Object.values(updates), id];
        const result = await db.query(
            `UPDATE public."Menu_Items" SET ${setClause} WHERE menu_id = $${values.length} RETURNING *`,
            values
        );
        console.log(`DAL: ${result.rows.length ? 'Patched' : 'Failed to patch'} menu item with id ${id}`);
        return result.rows[0];
    },
    deleteItem: async (id) => {
        console.log(`DAL: Deleting menu item with id ${id}`);
        const result = await db.query('DELETE FROM public."Menu_Items" WHERE menu_id = $1 RETURNING *', [id]);
        console.log(`DAL: ${result.rows.length ? 'Deleted' : 'Failed to delete'} menu item with id ${id}`);
        return result.rows[0];
    }
};