# "Humans Not Allowed" - Readme

## Introduction

"Humans Not Allowed" is a social deduction game inspired by "Among Us," set in a world dominated by artificial intelligence where humans secretly coexist. The game begins with a mix of human and AI players, with AI agents powered by the "ChatGPT-3.5 Turbo" model. Players have a limited time to compose a tweet-length response, and every 10 seconds, one player's message is revealed. Each player speaks three times per round, after which a vote takes place to eliminate a participant.

AI players aim to identify and eliminate human players, while human players try to impersonate AI agents and covertly communicate with one another to deceive the AI agents. The game concludes when only human or AI players remain. Difficulty levels vary depending on the ratio of human to AI players.

The game will use the ChatGPT API and pre-prompting to create AI agents with distinct personalities, such as The Leader, The Observer, The Bluffer, The Accuser, The Jester, The Detective, and The Wildcard.

Scoring is based on a text interface. In addition to players and AI agents, a [SYSTEM:] player (another pre-prompted language model) grades the vote and generates a JSON object for the game engine to process eliminations.

## Requirements

- Frontend: React
- Backend: Node.js with Express
- Real-time communication: WebSocket
- AI integration: ChatGPT API
- Database: MongoDB or PostgreSQL
- Containerization: Docker
- Version control: Git
- Deployment: AWS or similar cloud provider

## Development Stages
- MVP-0

Single player game vs. 3 AI players.
Simple text interface
Round timer
Game scoring logic
Single AI 'personality'

- MPV-1

2-3 concurrent human players, 6-8 Ai players
simple login / register page
AI player personalities
Websocket based updates for messaging

- MVP-2

Run multiple concurrent game lobbies (kubrinetties?)
Basic graphics? (preselection of profile pictures)
Deployment - AWS server?

## Credits

This game is based on the popular social deduction game "Among Us" and uses the ChatGPT API and pre-prompting techniques for the AI players. The game, its character prompts, and the vote scoring system were created by Eli Ronai and Caleb Bethea. All graphical assets are AI generated art by Dalle-2 and other [specified] generative art tools.