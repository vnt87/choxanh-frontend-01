export interface User {
  id: number;
  username: string;
  role: 'admin' | 'seller' | 'user';
}