import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("user_news")
class UserNews {

  @PrimaryColumn()
  readonly id: string; 
  
  @Column()
  user_id: string;

  @Column()
  news_id: string;

  @CreateDateColumn()
  readed_at: Date;

  constructor() {
    if(!this.id) {
      this.id = uuid();
    }
  }
}

export { UserNews }
