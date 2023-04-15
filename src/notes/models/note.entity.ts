import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('notes')
export class Note {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  content: string;
}

