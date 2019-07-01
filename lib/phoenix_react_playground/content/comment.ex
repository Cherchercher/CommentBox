defmodule PhoenixReactPlayground.Content.Comment do
  use Ecto.Schema
  import Ecto.Changeset

  schema "comments" do
    field :name, :string
    field :content, :string
    field :sentiment, :string
    field :strength, :float
    field :language, :string
    timestamps()
  end

  @required_fields ~w(name content sentiment strength language)
  @optional_fields ~w()

  @doc false
  def changeset(comment, attrs) do
    comment
    |> cast(attrs, @required_fields, @optional_fields)
  end
end
