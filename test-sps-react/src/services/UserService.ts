import { apiPrivate, apiPublic } from "../lib/api.ts";
import { User } from "../types/user.ts";

class UserService {
  constructor(
    private readonly privateAPI = apiPrivate,
    private readonly publicAPI = apiPublic,
  ){}

  async list(): Promise<User[]> {
    try {
      const response = await this.privateAPI.get<User[]>(`/users`);
      return response.data;
    } catch (error) {
      console.error("Error listing users:", error);
      throw error;
    }
  }

  async get(id: string): Promise<User> {
    try {
      const response = await this.privateAPI.get<User>(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error getting user:", error);
      throw error;
    }
  }

  async create(data: User): Promise<any> {
    try {
      const response = await this.publicAPI.post<User>(`/users`, data);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    try {
      const response = await this.privateAPI.put<User>(`/users/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.privateAPI.delete(`/users/${id}`);
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }
}

const userService = new UserService();
export default userService;
