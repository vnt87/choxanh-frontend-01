
import { Store } from '../models/Store';

export const storeService = {
  async createStore(storeData: any, ownerId: string) {
    const store = new Store({
      ...storeData,
      owner: ownerId
    });
    return await store.save();
  },

  async getStoresByOwner(ownerId: string) {
    return await Store.find({ owner: ownerId });
  },

  async updateStore(storeId: string, updateData: any) {
    return await Store.findByIdAndUpdate(storeId, updateData, { new: true });
  }
};