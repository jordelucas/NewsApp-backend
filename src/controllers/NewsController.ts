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

    // const { user_id } = request.body;

    const user_id = request.params.id;

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

    const allAuthors = await usersRepository.find({
      where: {
        permission: "author"
      }
    });

    const newsIds = alreadyBeenRead.map(item => item.news_id);

    const newsResult = await newsRepository.find({
      where: {
        id: Not(In(newsIds)),
      },
      select: ["id", "title", "created_at", "user_id"],
    })

    const serializedNews = newsResult.map(item => {
      const filteredUser = allAuthors.find(user => user.id === item.user_id);

      delete item.user_id;

      return {...item, author_name: filteredUser?.name ?? 'Desconhecido'}
    })

    return response.status(200).json(serializedNews);
  }

  async showByID(request: Request, response: Response) {
    const newsRepository = getCustomRepository(NewsRepository);
    const usersRepository = getCustomRepository(UsersRepository);
    const userNewsRepository = getCustomRepository(UserNewsRepository);

    const IDRequest = request.params.id;

    const newsResult = await newsRepository.findOne(IDRequest);

    if (!newsResult) {
      return response.status(404).json({
        error: "News not found!",
      })
    }

    const filteredUser = await usersRepository.findOne(newsResult.user_id);

    delete newsResult.user_id;

    const alreadyBeenRead = await userNewsRepository.find({
      news_id: IDRequest,
    })

    return response.status(200).json({
      ...newsResult,
      author_name: filteredUser.name,
      views: alreadyBeenRead.length,
    });
  }
}

export { NewsController }