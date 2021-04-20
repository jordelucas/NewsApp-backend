import { EntityRepository, Repository } from "typeorm";
import { Invitation } from "../models/Invitation";

@EntityRepository(Invitation)
class InvitationsRepository extends Repository<Invitation>{

}

export { InvitationsRepository }