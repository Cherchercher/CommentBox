defmodule PhoenixReactPlayground.DatabaseSeeder do
  @moduledoc """
  Script for populating the database. You can run it as:

      mix run priv/repo/seeds.exs

  Inside the script, you can read and write to any of your
  repositories directly:

      PhoenixReactPlayground.Repo.insert!(%PhoenixReactPlayground.SomeSchema{})

  We recommend using the bang functions (`insert!`, `update!`
  and so on) as they will fail if something goes wrong.
  """
  alias PhoenixReactPlayground.Repo
  alias PhoenixReactPlayground.Example.Language
  alias PhoenixReactPlayground.Content.Comment
  alias PhoenixReactPlayground.Content.Topic

  # Clear the database first before seeding
  Repo.delete_all Language
  Repo.delete_all Comment
  Repo.delete_all Topic

  Repo.insert! %Topic{
    name: "Learn Phoenix",
    description: "Develop Phoenix apps, comment, give or receive feedbacks",
  }
  Repo.insert! %Language{
    name: "English",
    proverb: "A penny saved is a penny earned.",
  }

  Repo.insert! %Language{
    name: "Indonesian",
    proverb: "Dimana ada kemauan, di situ ada jalan.",
  }

  Repo.insert! %Language{
    name: "Dutch",
    proverb: "Die goed doet, goed ontmoet.",
  }

    Repo.insert! %Comment{
    name: "Cher",
    content: "大家好，你们觉得我的第一个phoenix app如何?",
    sentiment: "neutral",
    language: "cn"
  }

end
