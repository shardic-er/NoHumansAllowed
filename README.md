# "Humans Not Allowed" - Readme

## Introduction

"Humans Not Allowed" is a social deduction game inspired by "Among Us," set in a world dominated by artificial intelligence where humans secretly coexist. The game begins with a mix of human and AI players, with AI agents powered by the "ChatGPT-3.5 Turbo" model. Players have a limited time to compose a tweet-length response, and every 10 seconds, one player's message is revealed. Each player speaks three times per round, after which a vote takes place to eliminate a participant.

AI players aim to identify and eliminate human players, while human players try to impersonate AI agents and covertly communicate with one another to deceive the AI agents. The game concludes when only human or AI players remain. Difficulty levels vary depending on the ratio of human to AI players.

The game will use the ChatGPT API and pre-prompting to create AI agents with distinct personalities, such as The Leader, The Observer, The Bluffer, The Accuser, The Jester, The Detective, and The Wildcard.

Scoring is based on a text interface. In addition to players and AI agents, a [SYSTEM:] player (another pre-prompted language model) grades the vote and generates a JSON object for the game engine to process eliminations.

## Requirements

- ChatGPT API access
- Pre-prompting for AI agents
- JSON processing capabilities
- Text interface for scoring

## Credits

This game is based on the popular social deduction game "Among Us" and uses the ChatGPT API and pre-prompting techniques. The game engine and system player were created by [insert creator name]. The AI agent personalities were designed by [insert designer name].
