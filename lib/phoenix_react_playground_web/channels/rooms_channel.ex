defmodule PhoenixReactPlaygroundWeb.RoomsChannel do
  use Phoenix.Channel
  require Logger

  import Ecto.Query, warn: false
  alias PhoenixReactPlayground.Repo
  alias PhoenixReactPlayground.Content
  alias PhoenixReactPlayground.Content.Comment

  def join("rooms:lobby", message, socket) do
    Process.flag(:trap_exit, true)
    send(self, {:after_join, message})
    {:ok, socket}
  end

  def join("rooms:" <> _private_subtopic, _message, _socket) do
    {:error, %{reason: "unauthorized"}}
  end

  def handle_info({:after_join, msg}, socket) do
     Content.list_comments()
    |> Enum.each(fn msg -> push(socket, "load:msg", %{
      name: msg.name,
      content: msg.content,
      strength: msg.strength,
      sentiment: msg.sentiment,
      created_at: msg.inserted_at,
      id: msg.id
    }) end)
  {:noreply, socket} # :noreply
  end

  def terminate(reason, _socket) do
    Logger.debug"> leave #{inspect reason}"
    :ok
  end

  def handle_in("load:msg", payload, socket) do
    broadcast! socket, "load:msg", payload
    {:noreply, socket}
  end


  def handle_in("new:msg", payload, socket) do
    with {:ok, %Comment{} = comment} <- Content.create_comment(payload) do
      broadcast! socket, "new:msg", payload
      {:noreply, socket}
    end
  end
end




