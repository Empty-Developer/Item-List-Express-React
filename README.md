# Item List Express React

Item List Express React is a small React app for managing a large list of
items. You can search through the available items, move items into a selected
list, remove them, add your own item IDs, and reorder selected items by
dragging and dropping.

Live demo: [item-list-express-react.vercel.app](https://item-list-express-react.vercel.app/)

## Built with

- React and TypeScript
- Vite
- Redux Toolkit and RTK Query
- Express
- `@dnd-kit` for drag-and-drop

## Run the project locally

You will need Node.js 20.19 or newer.

1. Clone the repository and enter its folder:

   ```bash
   git clone https://github.com/Empty-Developer/Item-List-Express-React.git
   cd Item-List-Express-React
   ```

2. Start the API server:

   ```bash
   cd server
   npm install
   npm run dev
   ```

   The server runs on `http://localhost:8080` by default.

3. Open a second terminal and start the frontend:

   ```bash
   cd client
   npm install
   ```

4. To use the local API, set this value in `client/.env`:

   ```env
   VITE_API_URL=http://localhost:8080
   ```

5. Start the frontend:

   ```bash
   npm run dev
   ```

   Vite will print the local URL in the terminal, usually
   `http://localhost:5173`.

The frontend can also use the deployed API URL already configured in
`client/.env`, so the API server is not required when you only want to view
the frontend.

## Available commands

Run these commands from the matching folder:

### Client

```bash
npm run dev       # Start the development server
npm run build     # Create a production build
npm run lint      # Check the code with Oxlint
npm run preview   # Preview the production build
```

### Server

```bash
npm run dev       # Start the server with automatic reloads
npm start         # Start the server normally
```

## How it works

- The server creates one million numbered items when it starts.
- Searching loads matching items in batches.
- Clicking an item moves it to the selected list.
- Clicking a selected item removes it.
- New IDs can be added from the frontend.
- Selected items can be reordered with drag-and-drop.

The server stores data in memory rather than in a database. Any selected,
added, or reordered items are lost when the server restarts.

## Project structure

```text
client/   React frontend
server/   Express API
```