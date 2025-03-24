import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE standings (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      team_id integer NOT NULL,
      name varchar(100) NOT NULL,
      short_name varchar(50),
      page_url varchar(255),
      played integer NOT NULL,
      wins integer NOT NULL,
      draws integer NOT NULL,
      losses integer NOT NULL,
      scores_str varchar(50),
      goal_con_diff integer,
      pts integer NOT NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE standings`;
}
