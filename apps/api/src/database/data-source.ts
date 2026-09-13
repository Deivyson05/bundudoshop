import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { Product } from '../products/product.entity';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Product],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  // NeonDB exige SSL; rejectUnauthorized:false porque o Neon usa
  // certificado gerenciado que o driver pg nao valida por padrao.
  ssl: { rejectUnauthorized: false },
  // Nunca usar synchronize em producao: as tabelas sao geridas por migrations.
  synchronize: true,
  extra: {
    max: 1,
    connectionTimeoutMillis: 10_000,
    idleTimeoutMillis: 30_000,
  },
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
