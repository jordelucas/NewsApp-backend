import { Request, Response } from 'express';
import { getCustomRepository, In, Not } from 'typeorm';
import { NewsRepository } from '../repositories/NewsRepository';
import { UserNewsRepository } from '../repositories/UserNewsRepository';
import { UsersRepository } from '../repositories/UserRepository';

class NewsController {
  async create(request: Request, response: Response) {
    const newsRepository = getCustomRepository(NewsRepository);
    const usersRepository = getCustomRepository(UsersRepository);

    const { title, description, user_id } = request.body;

    if (!title || !description || !user_id) {
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
      return response.status(404).json({
        error: "User not found!"
      });
    }

    if(userResult.permission === "subscriber") {
      return response.status(403).json({
        error: "the user is not allowed to create a news story"
      })
    }

    const newPost = newsRepository.create({
      title,
      description,
      user_id,
    });

    await newsRepository.save(newPost);

    return response.status(201).json(newPost);
  }

  async show(request: Request, response: Response) {
    const usersRepository = getCustomRepository(UsersRepository);
    const userNewsRepository = getCustomRepository(UserNewsRepository);
    const newsRepository = getCustomRepository(NewsRepository);

    const { user_id } = request.body;

    if (!user_id) {
      return response.status(400).json({
        error: "field not especified!"
      });
    }

    const userResult = await usersRepository.findOne(user_id);

    if(!userResult) {
      return response.status(404).json({
        error: "User not found!",
      })
    }

    const alreadyBeenRead = await userNewsRepository.find({
      where: {
        user_id,
      },
    })

    const newsIds = alreadyBeenRead.map(item => item.news_id);

    const newsResult = await newsRepository.find({
      where: {
        id: Not(In(newsIds)),
      },
      select: ["id", "title", "created_at", "author"],
      relations: ["author"],
    })

    return response.status(201).json(newsResult);
  }
}

export { NewsController }