# Game Mechanics Creator

A full-stack TypeScript application for generating database schemas and code for video game mechanics. Create battle passes, leaderboards, achievements, and more with automatically generated MySQL schemas and TypeScript service functions.

## 🎮 Features

- **Battle Pass System**: Generate complete battle pass schemas with tiers, rewards, and user progress tracking
- **Schema Generation**: Dynamic MySQL schema creation based on user configurations  
- **Code Generation**: Automatic TypeScript service class generation for database operations
- **Migration Support**: SQL migration scripts for schema deployment
- **Modern Frontend**: Beautiful React-based UI with TypeScript and Tailwind CSS
- **RESTful API**: Clean REST endpoints for frontend-backend communication

## 🏗️ Architecture

This project follows a modern, type-safe architecture:

### Backend (`/db`)
- **TypeScript** with Express.js
- **MySQL** database with connection pooling
- **RESTful API** design
- **Service layer** architecture
- **Type-safe** interfaces throughout

### Frontend (`/web_app`)
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Component-based** architecture
- **Custom hooks** for state management

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **MySQL** (v8.0 or higher)
- **npm** or **yarn**

### 1. Clone & Setup

```bash
git clone <your-repo-url>
cd Game-Mechanics-Creator
```

### 2. Backend Setup

```bash
cd db
npm install
cp .env.example .env
```

Edit `.env` with your MySQL credentials:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=game_mechanics_creator
SERVER_PORT=3001
```

### 3. Frontend Setup

```bash
cd ../web_app
npm install
```

### 4. MySQL Setup

**Option A: Local MySQL**
```bash
# Install MySQL (varies by OS)
# Windows: Download from mysql.com
# macOS: brew install mysql
# Linux: sudo apt-get install mysql-server

# Start MySQL service
# Windows: net start mysql
# macOS: brew services start mysql
# Linux: sudo systemctl start mysql
```

**Option B: Cloud MySQL** (Alternative)
- Use PlanetScale, AWS RDS, or Google Cloud SQL
- Update connection string in `.env`

### 5. Run the Application

**Backend:**
```bash
cd db
npm run dev
```

**Frontend:**
```bash
cd web_app
npm run dev
```

Visit `http://localhost:3000` to see the application!

## 📖 Usage

1. **Select Game Mechanic**: Choose from available game mechanics (Battle Pass is ready)
2. **Preview Schema**: See the database schema and sample data
3. **Generate Code**: Get SQL migration scripts and TypeScript service functions
4. **Implement**: Use the generated code in your game backend

### Battle Pass Example

The battle pass system generates:
- MySQL table schema with user progression fields
- TypeScript service class with CRUD operations
- Sample rewards and tier configuration
- Migration scripts for database setup

## 🛠️ Development

### Project Structure

```
Game-Mechanics-Creator/
├── db/                          # Backend server
│   ├── src/
│   │   ├── config/             # Database configuration
│   │   ├── routes/             # API endpoints
│   │   ├── services/           # Business logic
│   │   ├── types/              # TypeScript interfaces
│   │   └── server.ts           # Main server file
│   ├── package.json
│   └── tsconfig.json
├── web_app/                     # Frontend application
│   ├── app/
│   │   ├── components/         # React components
│   │   ├── hooks/              # Custom hooks
│   │   └── page.tsx            # Main page
│   ├── lib/
│   │   └── config.ts           # Frontend configuration
│   ├── package.json
│   └── next.config.ts
└── README.md
```

### Code Architecture Rules

This project follows strict architectural patterns defined in `.cursorrules_general`:

- **Single Props Pattern**: All components use `{ props }: { props: ComponentProps }`
- **Configuration Centralization**: Types and interfaces in `config.ts` files
- **UI Utilities**: Styling functions in `ui/ui.tsx` files
- **Component Decomposition**: Max 100 lines per component
- **TypeScript First**: Full type safety throughout
- **Object Maps**: No switch statements, use object maps

### API Endpoints

```bash
# Health check
GET /api/health

# Get available game mechanic types
GET /api/mechanics/types

# Get battle pass template
GET /api/mechanics/battle-pass/template

# Generate schema and code
POST /api/mechanics/generate-schema
```

### Adding New Game Mechanics

1. **Add Type**: Update `GameMechanicType` in `types/index.ts`
2. **Add Template**: Create template method in `MechanicsService`
3. **Add Route**: Add endpoint in `routes/mechanics.ts`
4. **Add Frontend**: Add to `GAME_MECHANICS` array in `config.ts`
5. **Add Logic**: Implement schema generation logic

## 🧪 Testing

### Backend Testing
```bash
cd db
npm run type-check
curl http://localhost:3001/api/health
```

### Frontend Testing
```bash
cd web_app
npm run build
npm run type-check
```

## 🔧 Troubleshooting

### Common Issues

**MySQL Connection Failed**
- Check if MySQL service is running
- Verify credentials in `.env`
- Ensure database exists or will be auto-created

**TypeScript Errors**
- Run `npm run type-check` to identify issues
- Ensure all dependencies are installed
- Check import paths

**Port Already in Use**
- Change `SERVER_PORT` in `.env`
- Kill existing processes: `lsof -ti:3001 | xargs kill`

## 🌟 Features Roadmap

- [ ] **Leaderboard System**: Real-time ranking mechanics
- [ ] **Achievement System**: Badge and milestone tracking
- [ ] **Inventory Management**: Item and resource systems
- [ ] **Currency System**: Multi-currency economics
- [ ] **User Profile System**: Player statistics and social features
- [ ] **AI Integration**: AI-powered schema generation
- [ ] **Database Drivers**: Support for PostgreSQL, MongoDB
- [ ] **Export Options**: Docker, Kubernetes deployments

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the architectural patterns in `.cursorrules_general`
4. Add TypeScript types for all new interfaces
5. Test thoroughly with both frontend and backend
6. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

- **Documentation**: Check the `/db/README.md` for backend details
- **Issues**: Create GitHub issues for bugs and feature requests
- **Architecture**: Follow patterns in `.cursorrules_general`

---

**Built with ❤️ for game developers who want to focus on gameplay, not database schema design.**
