defmodule PhoenixReactPlaygroundWeb.CommentController do
  use PhoenixReactPlaygroundWeb, :controller

  alias PhoenixReactPlayground.Content
  alias PhoenixReactPlayground.Content.Comment
  plug :scrub_params, "comment" when action in [:create]
  def index(conn, _params) do
    comments = Content.list_comments()
    render(conn, "index.json", comments: comments)
  end

  def new(conn, _params) do
    changeset = Content.change_comment(%Comment{})
    render(conn, "new.json", changeset: changeset)
  end

  def create(conn, %{"comment" => comment_params}) do
    case Content.create_comment(comment_params) do
      {:ok, comment} ->
        conn
        |> put_flash(:info, "Comment created successfully.")
        |> redirect(to: Routes.comment_path(conn, :show, comment))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    comment = Content.get_comment!(id)
    render(conn, "show.json", comment: comment)
  end

end
