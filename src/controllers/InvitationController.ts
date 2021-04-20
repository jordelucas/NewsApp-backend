import { Request, Response } from "express";
import { getCustomRepository, getRepository } from "typeorm";
import { User } from "../models/User";
import { Invitation } from "../models/Invitation";
import { UsersRepository } from "../repositories/UserRepository";
import { InvitationsRepository } from "../repositories/InvitationRepository";

class InvitationController {
  async create(request: Request, response: Response) {
    const usersRepository = getCustomRepository(UsersRepository);
    const invitationsRepository = getCustomRepository(InvitationsRepository);

    const { user_id } = request.body;

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

  async validade(request: Request, response: Response) {
    const invitationsRepository = getCustomRepository(InvitationsRepository);

    const invite_id = request.params.id;
    
    const inviteResult = await invitationsRepository.findOne({
      id: invite_id
    })

    if (!inviteResult) {
      return response.status(400).json({
        error: "Invitation not found!"
      });
    }

    const current_time = new Date();
    const maximum_time = new Date(
      inviteResult.created_at.setHours(
        inviteResult.created_at.getHours()+1
      )
    );

    const result = maximum_time > current_time;

    return response.json({ isActive: result });
  }
}

export { InvitationController }
