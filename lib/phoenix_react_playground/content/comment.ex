defmodule PhoenixReactPlayground.Content.Comment do
  use Ecto.Schema
  import Ecto.Changeset


  schema "comments" do
    field :content, :string
    field :name, :string
    field :sentiment, :string

    timestamps()
  end

  @required_fields ~w(name content)
  @optional_fields ~w(sentiment)

  @doc false
  def changeset(comment, attrs) do
    comment

    |> cast(attrs, @required_fields, @optional_fields)
    |> validate_required([:name, :content, :sentiment])
  end
end
