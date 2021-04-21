import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
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
      return response.status(404).json({
        error: "User not found!"
      });
    }

    const invite = invitationsRepository.create({
      user_id,
      permission: userResult.permission
    })

    await invitationsRepository.save(invite);

    return response.status(201).json(invite);
  }

  async validade(request: Request, response: Response) {
    const invitationsRepository = getCustomRepository(InvitationsRepository);

    const invite_id = request.params.id;
    
    const inviteResult = await invitationsRepository.findOne({
      id: invite_id
    })

    if (!inviteResult) {
      return response.status(404).json({
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

    return response.status(200).json({ isActive: result });
  }
}

export { InvitationController }
