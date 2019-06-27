# Comment Box
>  a comment box web application (the type that were all over the early 2000?s
internet, and have since largely been replaced by Disqus). 

## Features


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
