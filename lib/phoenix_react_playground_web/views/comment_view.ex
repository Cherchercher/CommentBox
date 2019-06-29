
defmodule PhoenixReactPlaygroundWeb.CommentView do
  use PhoenixReactPlaygroundWeb, :view
  alias PhoenixReactPlaygroundWeb.CommentView

  def render("index.json", %{comments: comments}) do
    %{data: render_many(comments, CommentView, "comments.json")}
  end

  def render("show.json", %{comment: comment}) do
    %{data: render_one(comment, CommentView, "comment.json")}
  end

  def render("comment.json", %{comment: comment}) do
    %{id: comment.id,
      name: comment.name,
      content: comment.content,
      sentiment: comment.sentiment,
      strength: comment.strength}
  end
end
