defmodule PhoenixReactPlaygroundWeb.AylienController do
  use PhoenixReactPlaygroundWeb, :controller

  def index(conn, _params) do
    json conn, %{data: "hi"}
  end

  def test(conn, _params) do
    json conn, %{data: "test"}
  end

  def sentiment_en(conn,params) do
    %{"text" => text} = params
    aylien_api_v1 = "https://api.aylien.com/api/v1/sentiment"
    query = "text=" <> text
    language = "language=" <> "en"
    mode = "mode" <> "tweet"
    url =  "#{aylien_api_v1}?#{query}&#{mode}&#{language}"
    headers = [{"X-AYLIEN-TextAPI-Application-Key", "7dc5702311fa3f50a9d695e2d53fe170"}, {"X-AYLIEN-TextAPI-Application-ID", "167de1b7"}, {"Accept", "application/json"}]
    case HTTPoison.post(url,[],headers) do
    {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
      json conn, %{"success": true, "body": body}
    {:ok, %HTTPoison.Response{status_code: 404}} ->
      json conn, %{"success": false, "body": "Not Found"}
    {:error, %HTTPoison.Error{reason: reason}} ->
      json conn, %{"success": false,  "reason": reason}
    end
  end
end

