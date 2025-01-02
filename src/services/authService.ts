import bcrypt from 'bcryptjs';
import * as jose from 'jose';
import { createConnection } from '../config/database';
import { User, CREATE_USER_TABLE_QUERY } from '../models/user';

export class AuthService {
  private static isInitialized = false;
  private readonly JWT_SECRET: Uint8Array;

  constructor() {
    const secret = import.meta.env.VITE_BETTER_AUTH_SECRET || 'fallback-secret-key';
    this.JWT_SECRET = new TextEncoder().encode(secret);
  }

  async initialize() {
    if (AuthService.isInitialized) return;
    
    const connection = await createConnection();
    try {
      await connection.execute(CREATE_USER_TABLE_QUERY);
      
      // Hash passwords for initial users
      const hashedAdmin = await bcrypt.hash('admin', 10);
      const hashedSeller = await bcrypt.hash('seller', 10);
      const hashedUser = await bcrypt.hash('user1', 10);
      
      await connection.execute(`
        INSERT IGNORE INTO users (username, password, role) VALUES
        ('admin', ?, 'admin'),
        ('seller', ?, 'seller'),
        ('user1', ?, 'user')
      `, [hashedAdmin, hashedSeller, hashedUser]);
      
      AuthService.isInitialized = true;
    } finally {
      await connection.end();
    }
  }

  private async createToken(payload: any): Promise<string> {
    return await new jose.SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(this.JWT_SECRET);
  }

  async login(username: string, password: string): Promise<{ user: User; token: string } | null> {
    if (!username || !password) return null;
    
    const connection = await createConnection();
    try {
      const [rows]: any = await connection.execute(
        'SELECT * FROM users WHERE username = ?',
        [username.toLowerCase().trim()]
      );
      
      const user = rows?.[0] as User | undefined;
      if (!user) return null;

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) return null;

      const { password: _, ...safeUser } = user;
      const token = await this.createToken({ 
        id: user.id, 
        username: user.username, 
        role: user.role 
      });

      return { user: safeUser as User, token };
    } catch (error) {
      console.error('Login error:', error);
      return null;
    } finally {
      await connection.end();
    }
  }

  async validateToken(token: string): Promise<User | null> {
    try {
      const { payload } = await jose.jwtVerify(token, this.JWT_SECRET);
      const connection = await createConnection();
      try {
        const [rows] = await connection.execute(
          'SELECT * FROM users WHERE id = ?',
          [payload.id]
        );
        const user = rows[0] as User;
        if (!user) return null;
        const { password: _, ...safeUser } = user;
        return safeUser as User;
      } finally {
        await connection.end();
      }
    } catch (error) {
      return null;
    }
  }
}