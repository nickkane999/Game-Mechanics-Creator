import { 
  GameMechanicType, 
  BattlePassConfig, 
  SchemaGenerationRequest, 
  SchemaGenerationResponse,
  SchemaAttribute,
  GameMechanicSchema
} from '../types/index';
import { pool } from '../config/database';

export class MechanicsService {
  
  getAvailableTypes(): GameMechanicType[] {
    return [
      'battle_pass',
      'leaderboard', 
      'achievement_system',
      'inventory',
      'currency_system',
      'user_profile'
    ];
  }

  getBattlePassTemplate(): BattlePassConfig {
    return {
      name: 'Season 1 Battle Pass',
      maxTiers: 100,
      seasonDuration: 90,
      currencyType: 'XP',
      rewards: [
        {
          tier: 1,
          xpRequired: 100,
          reward: { type: 'cosmetic', value: 'basic_skin', description: 'Basic Character Skin' },
          isPremium: false
        },
        {
          tier: 5,
          xpRequired: 500,
          reward: { type: 'currency', value: 250, description: '250 Coins' },
          isPremium: false
        },
        {
          tier: 10,
          xpRequired: 1000,
          reward: { type: 'cosmetic', value: 'premium_weapon', description: 'Premium Weapon Skin' },
          isPremium: true
        }
      ],
      userFields: [
        { name: 'user_id', type: 'BIGINT', required: true, constraints: { unique: true, index: true } },
        { name: 'username', type: 'VARCHAR', required: true, constraints: { maxLength: 50, index: true } },
        { name: 'current_tier', type: 'INT', required: true, defaultValue: 1 },
        { name: 'total_xp', type: 'BIGINT', required: true, defaultValue: 0 },
        { name: 'premium_purchased', type: 'BOOLEAN', required: true, defaultValue: false },
        { name: 'season_id', type: 'VARCHAR', required: true, constraints: { maxLength: 20 } }
      ]
    };
  }

  async executeBattlePassSql(battlePassConfig: any): Promise<any> {
    const results = {
      createResult: null as any,
      insertResult: null as any,
      errors: [] as string[],
      executedAt: new Date().toISOString()
    };

    try {
      const schema = battlePassConfig.schema;
      const tableName = schema.tableName;

      const createSql = `CREATE TABLE IF NOT EXISTS ${tableName} (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  ${schema.userIdField} VARCHAR(255) NOT NULL,
  ${schema.usernameField} VARCHAR(255) NOT NULL,
  ${schema.tierField} INT NOT NULL DEFAULT 0,
  ${schema.xpField} BIGINT NOT NULL DEFAULT 0,
  ${schema.premiumField} BOOLEAN NOT NULL DEFAULT FALSE,
  ${schema.seasonIdField} VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_user_season (${schema.userIdField}, ${schema.seasonIdField}),
  INDEX idx_season (${schema.seasonIdField}),
  INDEX idx_tier (${schema.tierField})
)`;

      console.log('Executing CREATE TABLE:', createSql);
      const [createResult] = await pool.execute(createSql);
      results.createResult = {
        message: 'Table created successfully',
        affectedRows: (createResult as any).affectedRows || 0,
        sql: createSql
      };

      const insertSql = `INSERT IGNORE INTO ${tableName} (
  ${schema.userIdField}, ${schema.usernameField}, ${schema.tierField},
  ${schema.xpField}, ${schema.premiumField}, ${schema.seasonIdField}
) VALUES
  (?, ?, ?, ?, ?, ?),
  (?, ?, ?, ?, ?, ?),
  (?, ?, ?, ?, ?, ?),
  (?, ?, ?, ?, ?, ?),
  (?, ?, ?, ?, ?, ?)`;

      const insertValues = [
        'user_001', 'PlayerOne', 15, 1500, true, 'season_2024_01',
        'user_002', 'GamerTwo', 8, 800, false, 'season_2024_01',
        'user_003', 'ProPlayer', 25, 2500, true, 'season_2024_01',
        'user_004', 'CasualGamer', 3, 300, false, 'season_2024_01',
        'user_005', 'CompetitivePro', 50, 5000, true, 'season_2024_01'
      ];

      console.log('Executing INSERT:', insertSql);
      const [insertResult] = await pool.execute(insertSql, insertValues);
      results.insertResult = {
        message: 'Sample data inserted successfully',
        affectedRows: (insertResult as any).affectedRows || 0,
        insertedRows: 5,
        sql: insertSql
      };

      const [selectResult] = await pool.execute(`SELECT * FROM ${tableName} LIMIT 10`);
      results.insertResult.sampleData = selectResult;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      results.errors.push(errorMessage);
      console.error('SQL Execution Error:', error);
      throw error;
    }

    return results;
  }

  async listBattlePassSchemas(): Promise<any[]> {
    try {
      const [rows] = await pool.execute(`
        SELECT 
          TABLE_NAME as table_name,
          TABLE_ROWS as table_rows,
          CREATE_TIME as create_time,
          ENGINE as engine,
          TABLE_COLLATION as table_collation
        FROM information_schema.TABLES 
        WHERE TABLE_SCHEMA = DATABASE() 
        AND (TABLE_NAME LIKE '%battle_pass%' OR TABLE_NAME LIKE '%battlepass%')
        ORDER BY CREATE_TIME DESC
      `);

      return rows as any[];
    } catch (error) {
      console.error('Error listing battle pass schemas:', error);
      throw error;
    }
  }

  async deleteBattlePassSchema(tableName: string): Promise<any> {
    try {
      if (!tableName || tableName.trim() === '') {
        throw new Error('Table name is required');
      }

      const sanitizedTableName = tableName.replace(/[^a-zA-Z0-9_]/g, '');
      
      if (sanitizedTableName !== tableName) {
        throw new Error('Invalid table name format');
      }

      const [result] = await pool.execute(`DROP TABLE IF EXISTS ${sanitizedTableName}`);
      
      return {
        message: `Table ${tableName} deleted successfully`,
        deletedTable: tableName,
        result: result
      };
    } catch (error) {
      console.error('Error deleting battle pass schema:', error);
      throw error;
    }
  }

  async getBattlePassSchemaDetails(tableName: string): Promise<any> {
    try {
      if (!tableName || tableName.trim() === '') {
        throw new Error('Table name is required');
      }

      const sanitizedTableName = tableName.replace(/[^a-zA-Z0-9_]/g, '');
      
      if (sanitizedTableName !== tableName) {
        throw new Error('Invalid table name format');
      }

      // Get table information
      const [tableInfo] = await pool.execute(`
        SELECT 
          TABLE_NAME as tableName,
          TABLE_ROWS as rowCount,
          CREATE_TIME as createTime,
          ENGINE as engine,
          TABLE_COLLATION as collation
        FROM information_schema.TABLES 
        WHERE TABLE_SCHEMA = DATABASE() 
        AND TABLE_NAME = ?
      `, [tableName]);

      if (!Array.isArray(tableInfo) || tableInfo.length === 0) {
        throw new Error('Table not found');
      }

      // Get column information
      const [columns] = await pool.execute(`
        DESCRIBE ${sanitizedTableName}
      `);

      // Get index information
      const [indexes] = await pool.execute(`
        SHOW INDEX FROM ${sanitizedTableName}
      `);

      // Get sample data (first 5 rows)
      const [sampleData] = await pool.execute(`
        SELECT * FROM ${sanitizedTableName} LIMIT 5
      `);

      return {
        ...tableInfo[0],
        columns: columns,
        indexes: indexes,
        sampleData: sampleData
      };
    } catch (error) {
      console.error('Error getting schema details:', error);
      throw error;
    }
  }

  async generateSchema(request: SchemaGenerationRequest): Promise<SchemaGenerationResponse> {
    const schema = this.createSchema(request);
    const migrationSql = this.generateMigrationSQL(schema, request);
    const functionsCode = this.generateFunctionsCode(schema, request);
    const previewData = this.generatePreviewData(request);

    return {
      schema,
      migrationSql,
      functionsCode,
      previewData
    };
  }

  private createSchema(request: SchemaGenerationRequest): GameMechanicSchema {
    const now = new Date();
    return {
      id: `${request.mechanicType}_${Date.now()}`,
      name: request.name,
      type: request.mechanicType,
      description: `Generated ${request.mechanicType.replace('_', ' ')} schema`,
      attributes: request.customAttributes,
      createdAt: now,
      updatedAt: now
    };
  }

  private generateMigrationSQL(schema: GameMechanicSchema, request: SchemaGenerationRequest): string {
    const tableName = `${schema.type}_${schema.name.toLowerCase().replace(/\s+/g, '_')}`;
    
    let sql = `-- Migration for ${schema.name}\n`;
    sql += `CREATE TABLE IF NOT EXISTS ${tableName} (\n`;
    sql += `  id BIGINT AUTO_INCREMENT PRIMARY KEY,\n`;
    
    schema.attributes.forEach((attr, index) => {
      sql += `  ${attr.name} ${this.getColumnDefinition(attr)}`;
      if (index < schema.attributes.length - 1) sql += ',';
      sql += '\n';
    });
    
    sql += `  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n`;
    sql += `  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP\n`;
    sql += `);\n\n`;
    
    schema.attributes.forEach(attr => {
      if (attr.constraints?.index) {
        sql += `CREATE INDEX idx_${tableName}_${attr.name} ON ${tableName}(${attr.name});\n`;
      }
    });

    return sql;
  }

  private getColumnDefinition(attr: SchemaAttribute): string {
    let definition = attr.type;
    
    if (attr.type === 'VARCHAR' && attr.constraints?.maxLength) {
      definition += `(${attr.constraints.maxLength})`;
    }
    
    if (attr.required) {
      definition += ' NOT NULL';
    }
    
    if (attr.defaultValue !== undefined) {
      const defaultVal = typeof attr.defaultValue === 'string' 
        ? `'${attr.defaultValue}'` 
        : attr.defaultValue;
      definition += ` DEFAULT ${defaultVal}`;
    }
    
    if (attr.constraints?.unique) {
      definition += ' UNIQUE';
    }
    
    return definition;
  }

  private generateFunctionsCode(schema: GameMechanicSchema, request: SchemaGenerationRequest): string {
    const tableName = `${schema.type}_${schema.name.toLowerCase().replace(/\s+/g, '_')}`;
    
    return `// Generated functions for ${schema.name}
export class ${this.toPascalCase(schema.name)}Service {
  
  async create${this.toPascalCase(schema.type)}(data: any): Promise<any> {
    const query = 'INSERT INTO ${tableName} SET ?';
    const [result] = await pool.execute(query, [data]);
    return result;
  }
  
  async get${this.toPascalCase(schema.type)}ById(id: number): Promise<any> {
    const query = 'SELECT * FROM ${tableName} WHERE id = ?';
    const [rows] = await pool.execute(query, [id]);
    return rows[0];
  }
  
  async update${this.toPascalCase(schema.type)}(id: number, data: any): Promise<any> {
    const query = 'UPDATE ${tableName} SET ? WHERE id = ?';
    const [result] = await pool.execute(query, [data, id]);
    return result;
  }
  
  async delete${this.toPascalCase(schema.type)}(id: number): Promise<any> {
    const query = 'DELETE FROM ${tableName} WHERE id = ?';
    const [result] = await pool.execute(query, [id]);
    return result;
  }
}`;
  }

  private generatePreviewData(request: SchemaGenerationRequest): any {
    if (request.mechanicType === 'battle_pass') {
      return {
        sampleUser: {
          user_id: 12345,
          username: 'GamerPro123',
          current_tier: 15,
          total_xp: 2500,
          premium_purchased: true,
          season_id: 'season_1_2024'
        },
        nextReward: {
          tier: 16,
          xpRequired: 2750,
          reward: { type: 'cosmetic', value: 'epic_emote', description: 'Epic Victory Emote' }
        }
      };
    }
    
    return { message: 'Preview data not available for this mechanic type' };
  }

  private toPascalCase(str: string): string {
    return str.replace(/(?:^|[\s_-])(\w)/g, (_, char) => char.toUpperCase()).replace(/[\s_-]/g, '');
  }
} 