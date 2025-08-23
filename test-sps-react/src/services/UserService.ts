import { AxiosResponse } from "axios";
import { apiPrivate, apiPublic } from "../lib/api.ts";
import { User } from "../types/user.ts";

class UserService {
  constructor(
    private readonly privateAPI = apiPrivate,
    private readonly publicAPI = apiPublic,
  ){}

  async list(): Promise<AxiosResponse<any>> {
    const users = await this.privateAPI.get(`/users`);
    return users;
  }

  async get(id: string): Promise<any> {
    throw new Error("Not implemented");
  }

  async create(data: User): Promise<any> {
    try {
      const response = await this.publicAPI.post(`/users`, data);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async delete(id: string): Promise<any> {
    throw new Error("Not implemented");
  }

  async update(id: string, data: any): Promise<any> {
    throw new Error("Not implemented");
  }
}

const userService = new UserService();
export default userService;
