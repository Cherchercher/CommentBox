defmodule PhoenixReactPlayground.Repo.Migrations.AddFieldsToComment do
  use Ecto.Migration

  def change do
      alter table(:comments) do
        add :language, :string
      end
  end
end
