# game-frontend

Mobile friednly Matterjs game with administration page and leaderboards. The App has Github CI/CD to AWS ECS Fargate.

### Env Setup
Change `task-definition.json` with your task definition.

Change `aws.yml` env params according to your ECS.

Add and set env variables

  mv .env.dist .env


### Build/init

  yarn install / docker build -t [tag] .

### Run

  yarn run start / docker run tag
