import type { Sql } from 'postgres';

export type Player = {
  id: number;
  name: string;
  role: string | null;
  nationality: string | null;
  height: string | null;
  shirtNumber: string | null;
  age: string | null;
  preferredFoot: string | null;
  marketValue: string | null;
  imageUrl: string | null;
  teamId: number;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE players (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name varchar(100) NOT NULL,
      role varchar(50),
      nationality varchar(50),
      height varchar(10),
      shirt_number varchar(10),
      age varchar(10),
      preferred_foot varchar(20),
      market_value varchar(50),
      image_url text,
      team_id integer REFERENCES teams (id) ON DELETE cascade
    );
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE players;`;
}
