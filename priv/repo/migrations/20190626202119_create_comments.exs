defmodule PhoenixReactPlayground.Repo.Migrations.CreateComments do
  use Ecto.Migration

  def change do
    create table(:comments) do
      add :name, :string
      add :content, :text
      add :sentiment, :string

      timestamps()
    end

  end
end
