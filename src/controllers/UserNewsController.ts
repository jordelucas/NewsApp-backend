import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { NewsRepository } from "../repositories/NewsRepository";
import { UserNewsRepository } from "../repositories/UserNewsRepository";
import { UsersRepository } from "../repositories/UserRepository";

class UserNewsController {
  async create(request: Request, response: Response) {
    const newsRepository = getCustomRepository(NewsRepository);
    const usersRepository = getCustomRepository(UsersRepository);
    const userNewsRepository = getCustomRepository(UserNewsRepository);
    
    const { user_id, news_id } = request.body;

    if (!user_id || !news_id) {
      return response.status(400).json({
        error: "field not especified!"
      });
    }

    const userResult = await usersRepository.findOne({
      where: {
        id: user_id,
      }
    })

    if (!userResult) {
      return response.status(400).json({
        error: "User not found!"
      });
    }

    const newsResult = await newsRepository.findOne({
      where: {
        id: news_id,
      }
    })

    if (!newsResult) {
      return response.status(400).json({
        error: "News not found!"
      });
    }

    const alreadyBeenRead = await userNewsRepository.findOne({
      user_id,
      news_id,
    })

    if (alreadyBeenRead) {
      const currentDate = new Date();
      await userNewsRepository.update(alreadyBeenRead.id, { readed_at: currentDate });
      
      return response.status(201).json({...alreadyBeenRead, readed_at: currentDate});
    }

    const userNews = userNewsRepository.create({
      user_id,
      news_id,
    })

    await userNewsRepository.save(userNews);

    return response.status(201).json(userNews);
  } 
}

export { UserNewsController }
