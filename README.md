# CampusLost & Found API

A RESTful API for reporting and managing lost and found items on campus.

## Technologies Used
- Node.js
- Express.js

## Installation & Local Setup

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
npm install
npm start
```

The server runs on `http://localhost:3000` by default.

## Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/items` | Retrieve all items |
| GET | `/api/items/:id` | Retrieve one item by ID |
| POST | `/api/items` | Report a new lost/found item |
| PUT | `/api/items/:id` | Update an existing item |
| DELETE | `/api/items/:id` | Delete an item |

## Example Request Body (POST /api/items)

```json
{
  "itemName": "Black Wallet",
  "category": "Personal Item",
  "location": "School Library",
  "status": "Lost",
  "reportedBy": "Juan Dela Cruz"
}
```

## Status Values
- `Lost` — item has been reported missing
- `Found` — item has been turned in

## Known Limitations
- Data is stored in-memory. All records are reset when the server restarts.

## Links
- **GitHub Repository:** https://github.com/your-username/your-repo-name
- **Render Deployment:** https://your-service-name.onrender.com