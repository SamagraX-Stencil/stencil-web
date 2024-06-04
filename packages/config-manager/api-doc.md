### Get Configuration by ID

- **URL**: `/configs/:id`
- **Method**: `GET`
- **Description**: Retrieves a specific configuration by its ID.
- **Parameters**:
  - `id` (path parameter): The ID of the configuration to retrieve.
- **Response**: The configuration object with the specified ID, including its history.
- **cURL**
  - ```curl http://localhost:3000/configs/1```

### Create Configuration

- **URL**: `/configs`
- **Method**: `POST`
- **Description**: Creates a new configuration.
- **Request Body**:
  - `name`: The name of the configuration.
  - `data`: The JSON data of the configuration.
- **Response**: The newly created configuration object, including its history.
- **cURL**
  - ```curl -X POST -H "Content-Type: application/json" -d '{"name":"New Config","data":{"key":"value"}}' http://localhost:3000/configs```

### Update Configuration

- **URL**: `/configs/:id`
- **Method**: `PUT`
- **Description**: Updates an existing configuration by its ID.
- **Parameters**:
  - `id` (path parameter): The ID of the configuration to update.
- **Request Body**:
  - `data`: The updated JSON data of the configuration.
- **Response**: The updated configuration object, including its history.
- **cURL**
  - ```curl -X PUT -H "Content-Type: application/json" -d '{"data":{"updatedKey":"updatedValue"}}' http://localhost:3000/configs/1```

### Get Configuration History

- **URL**: `/configs/:id/history`
- **Method**: `GET`
- **Description**: Retrieves the history of changes for a specific configuration by its ID.
- **Parameters**:
  - `id` (path parameter): The ID of the configuration to retrieve history for.
- **Response**: An array of history entries for the specified configuration, sorted by timestamp in descending order.
- **cURL**
  - ```curl http://localhost:3000/configs/:id/history```