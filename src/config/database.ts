const mockDb = {
  users: [
    { id: 1, username: 'admin', password: 'admin', role: 'admin' },
    { id: 2, username: 'seller', password: 'seller', role: 'seller' },
    { id: 3, username: 'user1', password: 'user1', role: 'user' },
  ]
};

export const createConnection = async () => {
  return {
    execute: async (query: string, params: any[] = []) => {
      // Mock user lookup
      if (query.includes('SELECT') && query.includes('WHERE username =')) {
        const username = params[0];
        const user = mockDb.users.find(u => u.username === username);
        return [[user]];
      }
      // Mock user by id lookup
      if (query.includes('SELECT') && query.includes('WHERE id =')) {
        const id = params[0];
        const user = mockDb.users.find(u => u.id === id);
        return [[user]];
      }
      return [[]];
    },
    end: async () => {}
  };
};