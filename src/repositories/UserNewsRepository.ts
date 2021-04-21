import { EntityRepository, Repository } from "typeorm";
import { UserNews } from "../models/UserNews";

@EntityRepository(UserNews)
class UserNewsRepository extends Repository<UserNews>{

}

export { UserNewsRepository }