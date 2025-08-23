import { apiPublic } from "../lib/api.ts";
import { User } from "../types/user.ts";

class AuthService {
  constructor(
    private readonly api = apiPublic,
  ){} 

  async signIn(data: User): Promise<any> {
    try {
      const response = await this.api.post("/auth/login", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;