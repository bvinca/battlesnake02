# Battlesnake02

### An official Battlesnake template written in JavaScript. Get started at [play.battlesnake.com](https://play.battlesnake.com).

![Battlesnake Logo](https://media.battlesnake.com/social/StarterSnakeGitHubRepos_JavaScript.png)

This project is a great starting point for anyone wanting to program their first Battlesnake in JavaScript. It can be run locally or easily deployed to a cloud provider of your choosing. See the [Battlesnake API Docs](https://docs.battlesnake.com/api) for more detail.

[![Run on Replit](https://repl.it/badge/github/BattlesnakeOfficial/starter-snake-javascript)](https://replit.com/@Battlesnake/starter-snake-javascript)

## Description
An official Battlesnake template written in JavaScript that implements a competitive AI snake for the Battlesnake game platform. The snake includes advanced collision avoidance, food targeting, and hunting strategies for smaller opponents.

## Technologies Used
- Node.js
- Express.js
- JSDoc (for documentation)
- Jest (for testing)
- ESLint + Prettier (for code quality)
- SonarJS (for code analysis)

### Prerequisites 
- Node.js v18 or higher
- npm or yarn
- Battlesnake account (for testing on play.battlesnake.com)

### Folder Structure 
```
.
├── .github/                          # GitHub templates
│   ├── ISSUE_TEMPLATE/
│   │   ├── task.md
│   │   └── user_story.md
│   ├── pull_request_template.md
│   └── dependabot.yml
├── docs/                             # Generated documentation
├── src/                              # Source code files
│   ├── a-star.js
│   ├── flood-fill.js
│   ├── food-targeting.js
│   ├── head-to-head.js
│   ├── hunt-smaller-snakes.js
│   ├── other-snakes-collision.js
│   ├── self-collision.js
│   ├── tail-collision.js
│   └── wall-collision.js
├── tests/                            # Test files
│   ├── a-star.test
│   ├── flood-fill.test
│   ├── food-targeting.test
│   ├── head-to-head.test
│   ├── hunt-smaller-snakes.test
│   ├── other-snakes-collision.test
│   ├── self-collision.test
│   ├── tail-collision.test
│   └── wall-collision.test
├── index.js                          # Main application entry point
├── server.js                         # Express server configuration
├── package.json                      # Project configuration and dependencies
├── package-lock.json
├── jsdoc.json                        # JSDoc configuration
├── jest.config.js                    # Jest test configuration
├── .eslintrc.js                      # ESLint configuration
├── eslint.config.js                  # ESLint rules
├── .prettierrc.json                  # Prettier formatting rules
└── .gitignore                        # Git ignore rules
```

## How to Run Tests
Jest is used for unit testing. Run all tests with:     
    npm test
## How to Run Battlesnake
1. Install dependencies:
   ```bash
   npm install
2. Start the server:
   ```bash
   npm run start 

Alternatively you can run the app on replit: 

1. Click the green 'Run' button to start your Battlesnake.
2. Use your repl.co URL to register your Battlesnake and play games on [play.battlesnake.com](https://play.battlesnake.com).

## How to Developer mode   
  npm run dev

## How to Production mode   
  npm run start
  
## Configuration Files
  - .prettierrc.json — Prettier formatting rules
  - eslint.config.js — Linting rules
  - jest.config.js — Testing configuration
  - jsdoc.config.json — Documentation generation
## Variables & Launch Parameters

### HTTP Endpoints
The Battlesnake engine will send requests to the following endpoints:

| Endpoint    | Method | Description |
|-------------|--------|-------------|
| `/`         | GET    | Responds with metadata about your Battlesnake |
| `/start`    | POST   | Initializes your Battlesnake at the start of a game |
| `/move`     | POST   | Called on every turn to decide your move |
| `/end`      | POST   | Called at the end of each game for cleanup |

### Environment Variables
```env
PORT=8000  # Defines the port for the Express server
```
### Licence 
This project is licensed under the MIT License.
