import Database from 'better-sqlite3';
import { join } from 'path';

let db: Database.Database;

// Initialize database
function getDatabase() {
  if (!db) {
    const dbPath = join(process.cwd(), 'app.db');
    db = new Database(dbPath);
    
    // Enable WAL mode for better performance
    db.pragma('journal_mode = WAL');
    
    // Create tables
    createTables();
  }
  return db;
}

function createTables() {
  // Sessions table for Shopify authentication
  db.exec(`
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      shop TEXT NOT NULL,
      state TEXT NOT NULL,
      isOnline INTEGER DEFAULT 0,
      scope TEXT,
      expires INTEGER,
      accessToken TEXT NOT NULL,
      userId INTEGER,
      firstName TEXT,
      lastName TEXT,
      email TEXT,
      accountOwner INTEGER DEFAULT 0,
      locale TEXT,
      collaborator INTEGER DEFAULT 0,
      emailVerified INTEGER DEFAULT 0
    )
  `);

  // TryOnResult table
  db.exec(`
    CREATE TABLE IF NOT EXISTS tryOnResults (
      id TEXT PRIMARY KEY,
      customerId TEXT,
      productId TEXT NOT NULL,
      variantId TEXT NOT NULL,
      userPhoto TEXT NOT NULL,
      resultImage TEXT NOT NULL,
      fitScore INTEGER NOT NULL,
      pose TEXT NOT NULL,
      createdAt INTEGER DEFAULT (strftime('%s', 'now')),
      updatedAt INTEGER DEFAULT (strftime('%s', 'now'))
    )
  `);

  // ProductAIConfig table
  db.exec(`
    CREATE TABLE IF NOT EXISTS productAIConfigs (
      id TEXT PRIMARY KEY,
      productId TEXT UNIQUE NOT NULL,
      aiOptimized INTEGER DEFAULT 0,
      category TEXT,
      tags TEXT,
      createdAt INTEGER DEFAULT (strftime('%s', 'now')),
      updatedAt INTEGER DEFAULT (strftime('%s', 'now'))
    )
  `);
}

// Session storage implementation for Shopify
export class SQLiteSessionStorage {
  private db: Database.Database;

  constructor() {
    this.db = getDatabase();
  }

  async storeSession(session: any) {
    const stmt = this.db.prepare(`
      INSERT OR REPLACE INTO sessions 
      (id, shop, state, isOnline, scope, expires, accessToken, userId, firstName, lastName, email, accountOwner, locale, collaborator, emailVerified)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    stmt.run(
      session.id,
      session.shop,
      session.state,
      session.isOnline ? 1 : 0,
      session.scope,
      session.expires ? Math.floor(session.expires.getTime() / 1000) : null,
      session.accessToken,
      session.userId,
      session.firstName,
      session.lastName,
      session.email,
      session.accountOwner ? 1 : 0,
      session.locale,
      session.collaborator ? 1 : 0,
      session.emailVerified ? 1 : 0
    );
    
    return true;
  }

  async loadSession(id: string) {
    const stmt = this.db.prepare('SELECT * FROM sessions WHERE id = ?');
    const row = stmt.get(id) as any;
    
    if (!row) return undefined;
    
    return {
      id: row.id,
      shop: row.shop,
      state: row.state,
      isOnline: Boolean(row.isOnline),
      scope: row.scope,
      expires: row.expires ? new Date(row.expires * 1000) : undefined,
      accessToken: row.accessToken,
      userId: row.userId,
      firstName: row.firstName,
      lastName: row.lastName,
      email: row.email,
      accountOwner: Boolean(row.accountOwner),
      locale: row.locale,
      collaborator: Boolean(row.collaborator),
      emailVerified: Boolean(row.emailVerified)
    };
  }

  async deleteSession(id: string) {
    const stmt = this.db.prepare('DELETE FROM sessions WHERE id = ?');
    stmt.run(id);
    return true;
  }

  async deleteSessions(ids: string[]) {
    const stmt = this.db.prepare('DELETE FROM sessions WHERE id = ?');
    const deleteMany = this.db.transaction((ids: string[]) => {
      for (const id of ids) stmt.run(id);
    });
    deleteMany(ids);
    return true;
  }

  async findSessionsByShop(shop: string) {
    const stmt = this.db.prepare('SELECT * FROM sessions WHERE shop = ?');
    const rows = stmt.all(shop) as any[];
    
    return rows.map(row => ({
      id: row.id,
      shop: row.shop,
      state: row.state,
      isOnline: Boolean(row.isOnline),
      scope: row.scope,
      expires: row.expires ? new Date(row.expires * 1000) : undefined,
      accessToken: row.accessToken,
      userId: row.userId,
      firstName: row.firstName,
      lastName: row.lastName,
      email: row.email,
      accountOwner: Boolean(row.accountOwner),
      locale: row.locale,
      collaborator: Boolean(row.collaborator),
      emailVerified: Boolean(row.emailVerified)
    }));
  }
}

// Database helper functions
export const database = {
  // Try-on results
  createTryOnResult: (data: {
    customerId?: string;
    productId: string;
    variantId: string;
    userPhoto: string;
    resultImage: string;
    fitScore: number;
    pose: string;
  }) => {
    const db = getDatabase();
    const id = `tryon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const stmt = db.prepare(`
      INSERT INTO tryOnResults (id, customerId, productId, variantId, userPhoto, resultImage, fitScore, pose)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(id, data.customerId, data.productId, data.variantId, data.userPhoto, data.resultImage, data.fitScore, data.pose);
    return id;
  },

  getTryOnResults: (customerId?: string) => {
    const db = getDatabase();
    const stmt = customerId 
      ? db.prepare('SELECT * FROM tryOnResults WHERE customerId = ? ORDER BY createdAt DESC')
      : db.prepare('SELECT * FROM tryOnResults ORDER BY createdAt DESC');
    return customerId ? stmt.all(customerId) : stmt.all();
  },

  // Product AI configs
  createOrUpdateProductAIConfig: (data: {
    productId: string;
    aiOptimized: boolean;
    category?: string;
    tags?: string;
  }) => {
    const db = getDatabase();
    const id = `config_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO productAIConfigs (id, productId, aiOptimized, category, tags, updatedAt)
      VALUES (?, ?, ?, ?, ?, strftime('%s', 'now'))
    `);
    stmt.run(id, data.productId, data.aiOptimized ? 1 : 0, data.category, data.tags);
    return id;
  },

  getProductAIConfig: (productId: string) => {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM productAIConfigs WHERE productId = ?');
    const row = stmt.get(productId) as any;
    if (!row) return null;
    return {
      ...row,
      aiOptimized: Boolean(row.aiOptimized)
    };
  }
};

export default getDatabase();