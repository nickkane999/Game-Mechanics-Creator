# Game Mechanics Creator - MySQL Backend

A TypeScript-based MySQL backend server for generating game mechanics database schemas and code.

## Features

- **Battle Pass System**: Generate complete battle pass schemas with tiers, rewards, and user progress tracking
- **Schema Generation**: Dynamic MySQL schema creation based on user configurations
- **Code Generation**: Automatic TypeScript service class generation for database operations
- **Migration Support**: SQL migration scripts for schema deployment
- **RESTful API**: Clean REST endpoints for frontend integration

## Prerequisites

- **Node.js** (v18 or higher)
- **MySQL** (v8.0 or higher) - Install locally or use cloud service
- **npm** or **yarn**

## MySQL Setup

### Option 1: Local MySQL Installation

1. **Install MySQL**:
   - **Windows**: Download from [MySQL Downloads](https://dev.mysql.com/downloads/mysql/)
   - **macOS**: `brew install mysql`
   - **Linux**: `sudo apt-get install mysql-server`

2. **Start MySQL Service**:
   ```bash
   # Windows (as Administrator)
   net start mysql
   
   # macOS
   brew services start mysql
   
   # Linux
   sudo systemctl start mysql
   ```

3. **Create Database User** (optional):
   ```sql
   CREATE USER 'gamedev'@'localhost' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON *.* TO 'gamedev'@'localhost';
   FLUSH PRIVILEGES;
   ```

### Option 2: Cloud MySQL (Alternative)

If you prefer cloud hosting, consider:
- **PlanetScale** (Free tier available)
- **AWS RDS** 
- **Google Cloud SQL**
- **Azure Database for MySQL**

## Installation

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Setup**:
   ```bash
   cp .env.example .env
   ```

3. **Configure Environment Variables** (`.env`):
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=game_mechanics_creator
   SERVER_PORT=3001
   ```

## Running the Server

1. **Development Mode**:
   ```bash
   npm run dev
   ```

2. **Production Build**:
   ```bash
   npm run build
   npm start
   ```

3. **Type Checking**:
   ```bash
   npm run type-check
   ```

## API Endpoints

### Health Check
- `GET /api/health` - Server health status

### Game Mechanics
- `GET /api/mechanics/types` - Available game mechanic types
- `GET /api/mechanics/battle-pass/template` - Battle pass template
- `POST /api/mechanics/generate-schema` - Generate schema and code

### Schema Management
- `GET /api/schema/validate` - Schema validation

## Usage Example

### Generate Battle Pass Schema

```bash
curl -X POST http://localhost:3001/api/mechanics/generate-schema \
  -H "Content-Type: application/json" \
  -d '{
    "mechanicType": "battle_pass",
    "name": "Season 1 Battle Pass",
    "customAttributes": [
      {
        "name": "player_id",
        "type": "BIGINT",
        "required": true,
        "constraints": { "unique": true, "index": true }
      }
    ],
    "config": {
      "maxTiers": 100,
      "seasonDuration": 90
    }
  }'
```

### Response Structure

```json
{
  "success": true,
  "data": {
    "schema": {
      "id": "battle_pass_1703123456789",
      "name": "Season 1 Battle Pass",
      "type": "battle_pass",
      "attributes": [...],
      "createdAt": "2023-12-20T10:30:00.000Z"
    },
    "migrationSql": "CREATE TABLE IF NOT EXISTS battle_pass_season_1_battle_pass (...);",
    "functionsCode": "export class Season1BattlePassService { ... }",
    "previewData": {
      "sampleUser": {
        "user_id": 12345,
        "current_tier": 15,
        "total_xp": 2500
      }
    }
  }
}
```

## Development

### Project Structure

```
src/
├── config/
│   └── database.ts       # Database configuration
├── routes/
│   ├── mechanics.ts      # Game mechanics endpoints
│   └── schema.ts         # Schema management endpoints
├── services/
│   └── MechanicsService.ts # Business logic
├── types/
│   └── index.ts          # TypeScript interfaces
└── server.ts             # Main server file
```

### Adding New Game Mechanics

1. **Add Type**: Update `GameMechanicType` in `types/index.ts`
2. **Add Template**: Create template method in `MechanicsService`
3. **Add Route**: Add endpoint in `routes/mechanics.ts`
4. **Add Generation Logic**: Implement schema generation logic

## Troubleshooting

### Common Issues

1. **MySQL Connection Failed**:
   - Check if MySQL service is running
   - Verify connection credentials in `.env`
   - Ensure database exists or will be auto-created

2. **Port Already in Use**:
   - Change `SERVER_PORT` in `.env`
   - Kill existing processes: `lsof -ti:3001 | xargs kill`

3. **TypeScript Errors**:
   - Run `npm run type-check` to identify issues
   - Ensure all dependencies are installed

### MySQL Commands

```sql
-- Check if database exists
SHOW DATABASES;

-- Create database manually if needed
CREATE DATABASE game_mechanics_creator;

-- Check tables
USE game_mechanics_creator;
SHOW TABLES;
```

## Testing

Test the server with curl or a tool like Postman:

```bash
# Health check
curl http://localhost:3001/api/health

# Get available types
curl http://localhost:3001/api/mechanics/types

# Get battle pass template
curl http://localhost:3001/api/mechanics/battle-pass/template
```

## Next Steps

1. **Frontend Integration**: Connect with the Next.js frontend
2. **Authentication**: Add user authentication and authorization
3. **Database Migrations**: Implement proper migration system
4. **Testing**: Add unit and integration tests
5. **Documentation**: Generate API documentation 