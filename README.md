# PS4 Store API

This is a simple Express-based API that fetches data from the PlayStation Store using the store's official API. The application allows you to search for PS4 games by query (e.g., game title) and size, returning information about the game in JSON format.

## Prerequisites

Before running the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/ps-api-nodejs.git
   cd ps-api-nodejs
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:

   ```dotenv
   PS4_API_URL=https://store.playstation.com/store/api/chihiro/00_09_000/tumbler/SA/en/999
   PORT=3000
   ```

   The `PS4_API_URL` is the endpoint used to fetch the data from the PlayStation Store API.

## Running the Application

Start the application by running:

```bash
npm start
```

The server will start on port `3000` (or another port if specified in the `.env` file).

## API Endpoint

### `GET /ps4-store`

This endpoint allows you to search for PS4 games by title (`query`) and the number of results to return (`size`).

#### URL Parameters

- `query`: The game title or keyword you want to search for.
- `size`: The number of results to return (e.g., `50` for 50 games).

#### Example Request:

```bash
GET http://localhost:3000/ps4-store?query=grand&size=50
```

### Example Request Using cURL:

```bash
curl "http://localhost:3000/ps4-store?query=grand&size=50"
```

#### Example Response:

```json
{
  "data": {
    "products": [
      {
        "id": "1234567",
        "name": "Grand Theft Auto V",
        "price": "$29.99",
        "description": "Action-adventure game developed by Rockstar Games.",
        "image_url": "https://example.com/images/gta5.jpg",
        "release_date": "2013-09-17"
      },
      {
        "id": "1234568",
        "name": "Grand Theft Auto IV",
        "price": "$19.99",
        "description": "The fourth main entry in the Grand Theft Auto series.",
        "image_url": "https://example.com/images/gta4.jpg",
        "release_date": "2008-04-29"
      }
      // More products here...
    ]
  }
}
```

#### Error Response (if missing parameters):

```json
{
  "error": "Missing required query parameters 'query' or 'size'"
}
```

### Error Handling

- If the query parameters are missing, the server will return a `400 Bad Request` with an error message.
- If there's an issue fetching data from the PlayStation Store API, the server will return a `500 Internal Server Error`.

## Example Flow

1. **Request**: `GET http://localhost:3000/ps4-store?query=grand&size=50`
2. **Response**: The server fetches data from the PlayStation Store API and returns a list of products (e.g., Grand Theft Auto V, Grand Theft Auto IV) with their names, prices, descriptions, release dates, and image URLs.
