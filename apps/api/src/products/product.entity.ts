import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * Um "achado" da internet: apenas os dados que a loja realmente precisa
 * para montar o card no frontend (nome, imagem e link de afiliado).
 */
@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 2048, name: 'image_url' })
  imageUrl: string;

  @Column({ type: 'varchar', length: 2048, name: 'affiliate_link' })
  affiliateLink: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
