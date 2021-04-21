import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { NewsRepository } from '../repositories/NewsRepository';
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

    const user = await usersRepository.findOne({
      where: {
        id: user_id,
      }
    })

    if (!user) {
      return response.status(404).json({
        error: "User not found!"
      });
    }

    const newPost = newsRepository.create({
      title,
      description,
      user_id,
    });

    await newsRepository.save(newPost);

    return response.status(201).json(newPost);
  }
}

export { NewsController }