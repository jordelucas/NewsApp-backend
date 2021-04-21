import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn
} from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./User";

@Entity("news")
class News {

  @PrimaryColumn()
  readonly id: string; 

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  user_id: string;
  
  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  author: User;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if(!this.id) {
      this.id = uuid();
    }
  }
}

export { News }
