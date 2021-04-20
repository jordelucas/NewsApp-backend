import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("news")
class News {

  @PrimaryColumn()
  readonly id: string; 

  @Column()
  titulo: string;

  @Column()
  descricao: string;

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

export { News }