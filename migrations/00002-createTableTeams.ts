import type { Sql } from 'postgres';

export type Team = {
  id: number;
  externalId: number;
  name: string;
  shortName: string;
  logoUrl: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  scoresStr: string;
  goalConDiff: number;
  pts: number;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE teams (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      external_id integer NOT NULL UNIQUE,
      name varchar(100) NOT NULL,
      short_name varchar(50),
      logo_url text,
      played integer,
      wins integer,
      draws integer,
      losses integer,
      scores_str varchar(20),
      goal_con_diff integer,
      pts integer,
      created_at timestamp NOT NULL DEFAULT now()
    );
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE teams`;
}
