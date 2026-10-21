
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let items = [
    {
        id: 1,
        itemName: "Black Wallet",
        category: "Personal Item",
        location: "School Library",
        status: "Lost",
        reportedBy: "Juan Dela Cruz"
    },  
    {
        id: 2,
        itemName: "Blue Water Bottle",
        category: "Bottle",
        location: "School Canteen",
        status: "Found",
        reportedBy: "Maria Santos"
    }
];

let nextId = 3;

app.get("/", (req, res) => {
    res.json({
        message: "CampusLost & Found API is running!"
    });
});

// 1. Get all items
app.get("/api/items", (req, res) => {
    res.status(200).json(items);
});

// 2. Get one item by ID
app.get("/api/items/:id", (req, res) => {
    const id = Number(req.params.id);

    const item = items.find(item => item.id === id);

    if (!Number.isInteger(id) || id < 1 || !item) {
        return res.status(404).json({
            message: "Item not found."
        });
    }

    res.status(200).json(item);
});

// 3. Create a new item
app.post("/api/items", (req, res) => {
    const { itemName, category, location, status, reportedBy } = req.body;

    if (
        typeof itemName !== "string" || !itemName.trim() ||
        typeof category !== "string" || !category.trim() ||
        typeof location !== "string" || !location.trim() ||
        typeof reportedBy !== "string" || !reportedBy.trim() ||
        typeof status !== "string" ||
        !["Lost", "Found"].includes(status.trim().toLowerCase().replace(/^./, c => c.toUpperCase()))
    ) {
        return res.status(400).json({
            message: "All fields are required. Status must be Lost or Found."
        });
    }

    const newItem = {
        id: nextId++,
        itemName: itemName.trim(),
        category: category.trim(),
        location: location.trim(),
        status: status.trim().toLowerCase() === "lost" ? "Lost" : "Found",
        reportedBy: reportedBy.trim()
    };

    items.push(newItem);

    res.status(201).json({
        message: "Item reported successfully.",
        item: newItem
    });
});

// 4. Update an existing item
app.put("/api/items/:id", (req, res) => {
    const id = Number(req.params.id);

    const item = items.find(item => item.id === id);

    if (!Number.isInteger(id) || id < 1 || !item) {
        return res.status(404).json({
            message: "Item not found."
        });
    }

    const { itemName, category, location, status, reportedBy } = req.body;

    if (
        typeof itemName !== "string" || !itemName.trim() ||
        typeof category !== "string" || !category.trim() ||
        typeof location !== "string" || !location.trim() ||
        typeof reportedBy !== "string" || !reportedBy.trim() ||
        typeof status !== "string" ||
        !["Lost", "Found"].includes(status.trim().toLowerCase().replace(/^./, c => c.toUpperCase()))
    ) {
        return res.status(400).json({
            message: "All fields are required. Status must be Lost or Found."
        });
    }

    item.itemName = itemName.trim();
    item.category = category.trim();
    item.location = location.trim();
    item.status = status.trim().toLowerCase() === "lost" ? "Lost" : "Found";
    item.reportedBy = reportedBy.trim();

    res.status(200).json({
        message: "Item updated successfully.",
        item: item
    });
});

// 5. Delete an item
app.delete("/api/items/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = items.findIndex(item => item.id === id);

    if (!Number.isInteger(id) || id < 1 || index === -1) {
        return res.status(404).json({
            message: "Item not found."
        });
    }

    const deletedItem = items.splice(index, 1)[0];

    res.status(200).json({
        message: "Item deleted successfully.",
        item: deletedItem
    });
});

app.listen(PORT, () => {
    console.log(`CampusLost & Found API is running on port ${PORT}`);
});
