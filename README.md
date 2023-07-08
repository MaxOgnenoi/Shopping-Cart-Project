<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
</head>
<body>
  <h1>Shopping Cart API</h1>

  <h2>Table of Contents</h2>
  <ul>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#endpoints">Endpoints</a></li>
      <ul>
        <li><a href="#user-endpoints">User Endpoints</a></li>
          <ul>
            <li><a href="#create-user">Create User</a></li>
            <li><a href="#get-user">Get User</a></li>
            <li><a href="#login-user">Login User</a></li>
            <li><a href="#update-user">Update User</a></li>
            <li><a href="#delete-user">Delete User</a></li>
          </ul>
        <li><a href="#item-endpoints">Item Endpoints</a></li>
          <ul>
            <li><a href="#create-item">Create Item</a></li>
            <li><a href="#get-item">Get Item</a></li>
          </ul>
        <li><a href="#cart-endpoints">Cart Endpoints</a></li>
          <ul>
            <li><a href="#add-item-to-cart">Add Item to Cart</a></li>
            <li><a href="#remove-item-from-cart">Remove Item from Cart</a></li>
            <li><a href="#get-cart">Get Cart</a></li>
          </ul>
      </ul>
    <li><a href="#error-handling">Error Handling</a></li>
    <li><a href="#authentication">Authentication</a></li>
      </ul>

  <h2 id="getting-started">Getting Started</h2>

  <p>To use the Shopping Cart API, you will need to have Node.js installed on your machine. Clone the repository and install the dependencies using <code>npm install</code>. Start the server with <code>npm start</code>.</p>

<h2 id="environment-variables">Environment Variables</h2>

  <p>The following environment variables are required for the Shopping Cart API:</p>
<ul>
  <li><code>MONGODB_URI</code>: The connection URL for your MongoDB database.</li>
  <pre><code>MONGO_URI=mongodb+srv://<your email>:<password>@cluster0.l9momc8.mongodb.net/
JWT_SECRET=<SECRET></code></pre>
</ul>

<p>Before running the API, make sure to create a <code>.env</code> file in the root directory of the project and set the required environment variables with their respective values.</p>

  <p>The API will be accessible at <code>http://localhost:3000</code>.</p>

  <h2 id="endpoints">Endpoints</h2>

  <h3 id="user-endpoints">User Endpoints</h3>

  <h4 id="create-user">Create User</h4>

  <p><strong>Endpoint:</strong> <code>/users</code></p>
  <p><strong>Method:</strong> POST</p>

  <p>Create a new user.</p>

  <p><strong>Request Body:</strong></p>
  <pre><code>{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password"
}</code></pre>

  <p><strong>Response:</strong></p>
  <pre><code>{
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "access_token"
}</code></pre>

  <h4 id="get-user">Get User</h4>

  <p><strong>Endpoint:</strong> <code>/users</code></p>
  <p><strong>Method:</strong> GET</p>

  <p>Retrieve all users.</p>

  <p><strong>Response:</strong></p>
  <pre><code>[
  {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  },
  {
    "_id": "user_id",
    "name": "Jane Smith",
    "email": "jane@example.com"
  }
]</code></pre>

  <h4 id="login-user">Login User</h4>

  <p><strong>Endpoint:</strong> <code>/users/login</code></p>
  <p><strong>Method:</strong> POST</p>

  <p>Authenticate a user and generate an access token.</p>

  <p><strong>Request Body:</strong></p>
  <pre><code>{
  "email": "john@example.com",
  "password": "password"
}</code></pre>

  <p><strong>Response:</strong></p>
  <pre><code>{
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "access_token"
}</code></pre>

  <h4 id="update-user">Update User</h4>

  <p><strong>Endpoint:</strong> <code>/users/:userId</code></p>
  <p><strong>Method:</strong> PUT</p>

  <p>Update user information.</p>

  <p><strong>Request Body:</strong></p>
  <pre><code>{
  "name": "John Smith"
}</code></pre>

  <p><strong>Response:</strong></p>
  <pre><code>{
  "_id": "user_id",
  "name": "John Smith",
  "email": "john@example.com"
}</code></pre>

  <h4 id="delete-user">Delete User</h4>

  <p><strong>Endpoint:</strong> <code>/users/:userId</code></p>
  <p><strong>Method:</strong> DELETE</p>

  <p>Delete a user.</p>

  <p><strong>Response:</strong></p>
  <pre><code>204 No Content</code></pre>

  <h3 id="item-endpoints">Item Endpoints</h3>

  <h4 id="create-item">Create Item</h4>

  <p><strong>Endpoint:</strong> <code>/items</code></p>
  <p><strong>Method:</strong> POST</p>

  <p>Create a new item.</p>

  <p><strong>Request Body:</strong></p>
  <pre><code>{
  "name": "Product A",
  "price": 9.99,
  "quantity": 10
}</code></pre>

  <p><strong>Response:</strong></p>
  <pre><code>{
  "_id": "item_id",
  "name": "Product A",
  "price": 9.99,
  "quantity": 10
}</code></pre>

  <h4 id="get-item">Get Item</h4>

  <p><strong>Endpoint:</strong> <code>/items/:itemId</code></p>
  <p><strong>Method:</strong> GET</p>

  <p>Retrieve an item by ID.</p>

  <p><strong>Response:</strong></p>
  <pre><code>{
  "_id": "item_id",
  "name": "Product A",
  "price": 9.99,
  "quantity": 10
}</code></pre>

  <h3 id="cart-endpoints">Cart Endpoints</h3>

  <h4 id="add-item-to-cart">Add Item to Cart</h4>

  <p><strong>Endpoint:</strong> <code>/carts/:cartId/items/:itemId</code></p>
  <p><strong>Method:</strong> POST</p>

  <p>Add an item to a cart.</p>

  <p><strong>Response:</strong></p>
  <pre><code>{
  "message": "Item added to your cart",
  "cart": {
    "_id": "cart_id",
    "user": "user_id",
    "items": ["item_id"]
  },
  "token": "access_token"
}</code></pre>

  <h4 id="remove-item-from-cart">Remove Item from Cart</h4>

  <p><strong>Endpoint:</strong> <code>/carts/:cartId/items/:itemId</code></p>
  <p><strong>Method:</strong> DELETE</p>

  <p>Remove an item from a cart.</p>

  <p><strong>Response:</strong></p>
  <pre><code>{
  "message": "Item removed from your cart",
  "cart": {
    "_id": "cart_id",
    "user": "user_id",
    "items": []
  },
  "token": "access_token"
}</code></pre>

  <h4 id="get-cart">Get Cart</h4>

  <p><strong>Endpoint:</strong> <code>/carts/:cartId</code></p>
  <p><strong>Method:</strong> GET</p>

  <p>Retrieve a cart by ID.</p>

  <p><strong>Response:</strong></p>
  <pre><code>{
  "cart": {
    "_id": "cart_id",
    "user": "user_id",
    "items": ["item_id"]
  },
  "token": "access_token"
}</code></pre>

  <h2 id="error-handling">Error Handling</h2>

  <p>In case of errors, the API will return an appropriate HTTP status code along with an error message in the response body.</p>

  <p>Here are some common error scenarios:</p>
  <ul>
    <li><code>400 Bad Request</code>: Invalid request data or missing required fields.</li>
    <li><code>401 Unauthorized</code>: Authentication required or invalid credentials.</li>
    <li><code>404 Not Found</code>: Resource not found.</li>
    <li><code>500 Internal Server Error</code>: Unexpected server error.</li>
  </ul>



  <h2 id="authentication">Authentication</h2>

  <p>The Shopping Cart API requires authentication for certain endpoints. Include an <code>Authorization</code> header with the value <code>Bearer &lt;access_token&gt;</code> to access protected resources.</p>

  <p>To authenticate, make a POST request to <code>/users/login</code> with valid login credentials. The response will include an access token that can be used for subsequent requests.</p>

  </body>
</html>
