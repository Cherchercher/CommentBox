defmodule PhoenixReactPlayground.Repo.Migrations.AddFieldsToComments do
  use Ecto.Migration

  def change do
    alter table(:comments) do
      add :strength, :float
    end
  end
end
