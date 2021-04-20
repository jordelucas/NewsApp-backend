import { Request, Response } from "express";
import { getCustomRepository, getRepository } from "typeorm";
import { UsersRepository } from "../repositories/UserRepository";

class AuthenticationController {
  async authenticate(request: Request, response: Response) {
    const usersRepository = getCustomRepository(UsersRepository);

    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({
        error: "column not especified!"
      });
    }

    const result = await usersRepository.findOne({
      where: {
        email,
        password,
      }
    })

    if (!result) {
      return response.status(400).json({
        error: "User not found!"
      });
    }

    delete result.password;

    return response.status(200).json(result);
  }
}

export { AuthenticationController }
