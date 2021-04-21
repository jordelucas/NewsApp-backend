import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("invitations")
class Invitation {

  @PrimaryColumn()
  readonly id: string; 

  @Column()
  permission: string;
  
  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if(!this.id) {
      this.id = uuid();
    }
  }
}

export { Invitation }
