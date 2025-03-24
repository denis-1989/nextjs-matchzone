import type { Sql } from 'postgres';

export type League = {
  id: number;
  externalId: number;
  name: string;
  shortName: string;
  countryCode?: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE leagues (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      external_id integer NOT NULL UNIQUE,
      name varchar(100) NOT NULL,
      short_name varchar(100),
      country_code varchar(10),
      created_at timestamp DEFAULT now()
    );
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE leagues`;
}
