import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Represents a book in the library system.
 */
@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titulo: string;

  @Column()
  autor: string;

  /**
   * Date as string or Date object.
   * Storing as string for simplicity in this demo, but Date is better typically.
   * Requirements say: "Date/String (Ex: '17/08/1945')"
   */
  @Column()
  data_publicacao: string;

  @Column('text')
  descricao: string;

  @Column()
  imagem_url: string;
}
