defmodule PhoenixReactPlayground.Content.Topic do
  use Ecto.Schema
  import Ecto.Changeset


  schema "topics" do
    field :description, :string
    field :name, :string
    has_many :comments, PhoenixReactPlayground.Content.Comment
    timestamps()
  end

  @doc false
  def changeset(topic, attrs) do
    topic
    |> cast(attrs, [:name, :description])
    |> validate_required([:name, :description])
  end
end
