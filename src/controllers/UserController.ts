import { Request, Response } from "express";
import { getCustomRepository, getRepository } from "typeorm";
import { User } from "../models/User";
import { UsersRepository } from "../repositories/UserRepository";

class UserController {
  async create(request: Request, response: Response) {
    const usersRepository = getCustomRepository(UsersRepository);

    const { name, email, password, permission } = request.body;

    if (!name || !email || !password || !permission) {
      return response.status(400).json({
        error: "field not especified!"
      });
    }

    if (permission !== "author" && permission !== "subscriber") {
      return response.status(400).json({
        error: "permission value is not valid!"
      });
    }

    const userAlreadyExists = await usersRepository.findOne({
      email
    })

    if (userAlreadyExists) {
      return response.status(409).json({
        error: "User already exists!"
      });
    }

    const user = usersRepository.create({
      name,
      email,
      password,
      permission
    })

    await usersRepository.save(user);

    return response.status(201).json(user);
  }
}

export { UserController }
