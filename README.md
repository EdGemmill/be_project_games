# Northcoders House of Games API

Once you have cloned down the project, run

`npm install`

to install all the relevant packages.
Most of what is needed is there already, but you will additionally need to run
`npm install express`

and
`npm install supertest`

You will need to create two files in BE-NC-GAMES named
`.env.test`

and
`.env.development`

In .env.test write
`PGDATABASE=PGDATABASE=nc_games_test`

and in .env.development write
`PGDATABASE=nc_games`

Check that .gitignore contains
`.env.*`
