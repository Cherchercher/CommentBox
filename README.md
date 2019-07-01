
# Comment Box
> A modern twist to the vintage comment box web application. Comment, give and recieve feedbacks on topics.
> Built with Pheonix, React, and Aylien. Language support: Chinese, English.
        
## Features
   1. Real-time update:new messages get broadcasted to subscribors in. Used channels.
   
   2. Language Dectection: languages used in comments are detected. Used Regex.
   
   3. Sentiment Analysis: sentiment of comments is displayed. Used Aylien.
   
   4. Language Translation: Chinese can be translated into English Used Fuxi API.

## Todos
   User authentications 
   Create and update topics. Associate topics with comments.
   Set intervals for hitting submit button
   Sentiment Analysis in Chinese

## Future improvements
   Use Dialogflow to create domain expert to answer questions on topics.
   
## Requirements

* [Node.js](https://nodejs.org/en) (v8+)
* [Elixir](https://elixir-lang.org/install.html) (v1.6+)
* [Yarn](https://yarnpkg.com/en/docs/install), or `npm`

## Running Locally

* Install Elixir dependencies with `mix deps.get`.
* `cd` to the `assets/` directory and run `yarn` (or `npm install`) to install Node.js dependencies.
* Modify the database settings in each `config/` files if desired
* Create and migrate your database with `mix ecto.setup`
* Start Phoenix endpoint with `mix phx.server`

Visit [`localhost:4000`](http://localhost:4000) from your browser.

## Reference

  * Official website: http://www.phoenixframework.org/
  * Guides: http://phoenixframework.org/docs/overview
  * Docs: https://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix
  * Boiler Plate: https://github.com/resir014/phoenix_react_playground

