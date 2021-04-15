import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../models/User";
import { Invitation } from "../models/Invitation";

class InvitationController {
  async create(request: Request, response: Response) {
    const { user_id } = request.body;

    const usersRepository = getRepository(User);
    const invitationsRepository = getRepository(Invitation);

    const userResult = await usersRepository.findOne({
      id: user_id
    })

    if (!userResult) {
      return response.status(400).json({
        error: "User not found!"
      });
    }

    const invite = invitationsRepository.create({
      user_id,
      permission: userResult.permission
    })

    await invitationsRepository.save(invite);

    return response.json(invite);
  }
}

export { InvitationController }
