// app.js
import express from 'express';
const app = express();
app.use(express.json());

// In-memory data store for users (for simplicity)
let users = [];

// Create a new user
app.post('/api/users', (req, res) => {
    const user = req.body;
    user.id = users.length + 1;
    users.push(user);
    res.status(201).json(user);
});

// Get all users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// Get a specific user by ID
app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    res.json(user);
});

// Update a user
app.put('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    res.json(user);
});

// Delete a user
app.delete('/api/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).send('User not found');
    users.splice(userIndex, 1);
    res.status(204).send();
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;  // Export app using ESM export