const db = require('../config/db');

module.exports = {
    getAllItems: async () => {
        const result = await db.query('SELECT * FROM public."Menu_Items");
        return result.rows;
    },
    getItemById: async (id) => {
        const result = await db.query('SELECT * FROM public."Menu_Items" WHERE menu_id = $1', [id]);
        return result.rows[0];
    },
    createItem: async (item) => {
        const availability = item.availability === 'true';
        const result = await db.query(
            'INSERT INTO public."Menu_Items" (name, description, price, category, calories, availability, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [item.name, item.description, item.price, item.category, item.calories, availability, item.image_url]
        );
        return result.rows[0];
    },
    updateItem: async (id, item) => {
        const availability = item.availability === 'true';
        const result = await db.query(
            'UPDATE public."Menu_Items" SET name = $1, description = $2, price = $3, category = $4, calories = $5, availability = $6, image_url = $7 WHERE menu_id = $8 RETURNING *',
            [item.name, item.description, item.price, item.category, item.calories, availability, item.image_url, id]
        );
        return result.rows[0];
    },
    patchItem: async (id, updates) => {
        if (updates.availability !== undefined) {
            updates.availability = updates.availability === 'true';
        }
        const setClause = Object.keys(updates).map((key, index) => `${key} = $${index + 1}`).join(', ');
        const values = [...Object.values(updates), id];
        const result = await db.query(
            `UPDATE public."Menu_Items" SET ${setClause} WHERE menu_id = $${values.length} RETURNING *`,
            values
        );
        return result.rows[0];
    },
    deleteItem: async (id) => {
        const result = await db.query('DELETE FROM public."Menu_Items" WHERE menu_id = $1 RETURNING *', [id]);
        return result.rows[0];
    }
};
