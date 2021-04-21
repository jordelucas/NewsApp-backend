import { EntityRepository, Repository } from "typeorm";
import { News } from "../models/News";

@EntityRepository(News)
class NewsRepository extends Repository<News>{

}

export { NewsRepository }