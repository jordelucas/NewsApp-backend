import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../models/User";

class UserController {
  async create(request: Request, response: Response) {
    const { name, email, password, permission } = request.body;

    const usersRepository = getRepository(User);

    if (permission !== "author" && permission !== "subscriber") {
      return response.status(400).json({
        error: "permission value is not valid!"
      });
    }

    const userAlreadyExists = await usersRepository.findOne({
      email
    })

    if (userAlreadyExists) {
      return response.status(400).json({
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

    return response.json(user);
  }
}

export { UserController }
