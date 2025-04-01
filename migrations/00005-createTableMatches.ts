import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE matches (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      match_id varchar(50) NOT NULL UNIQUE,
      match_name varchar(150) NOT NULL,
      match_time_utc timestamp NOT NULL,
      home_team_name varchar(100) NOT NULL,
      home_team_id integer NOT NULL,
      away_team_name varchar(100) NOT NULL,
      away_team_id integer NOT NULL,
      league_name varchar(100) NOT NULL,
      status_started boolean DEFAULT FALSE,
      status_finished boolean DEFAULT FALSE
    );
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE matches`;
}
