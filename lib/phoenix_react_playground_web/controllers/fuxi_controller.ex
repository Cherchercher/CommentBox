defmodule PhoenixReactPlaygroundWeb.FuxiController do
  use PhoenixReactPlaygroundWeb, :controller

  def index(conn, _params) do
    json conn, %{data: "hi"}
  end

  def test(conn, _params) do
    json conn, %{data: "test fuxi"}
  end

  def sentiment_cn(conn,params) do
    %{"text" => text} = params
    fuxi_api_v1 = "https://dmitrykey-fuxiapi-v1.p.rapidapi.com/sentiment"
    url =  URI.encode("#{fuxi_api_v1}")
    body = %{text: "您好"}

    header = [{"X-RapidAPI-Host", "dmitrykey-fuxiapi-v1.p.rapidapi.com"}, {"X-RapidAPI-Key", "4a3eaf3cccmshad1fbf8cf65630cp181332jsn3979674f38e7"}]
    case HTTPoison.post(url, body, header) do
    {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
      json conn, %{"success": true, "body": body}
    {:ok, %HTTPoison.Response{status_code: 404}} ->
      json conn, %{"success": false, "body": "Not Found"}
    {:error, %HTTPoison.Error{reason: reason}} ->
      json conn, %{"success": false,  "reason": reason}
    end
  end

  def translate_cn_en(conn,params) do
    %{"text" => text} = params
    yandex_api_v1 = "https://translate.yandex.net/api/v1.5/tr.json/translate"
    query = "text=" <> text
    language = "lang=" <> "zh-en"
    key = "key=" <> "trnsl.1.1.20190701T180755Z.d382e2ea03dbc41a.81bb06631f04f9879df809f260de2d4c78cbbb34"
    url =  URI.encode("#{yandex_api_v1}?#{key}&#{query}&#{language}")
    headers = [{"Accept",  "*/*"}, {"Content-Type", "application/x-www-form-urlencoded"}]
    case HTTPoison.post(url, [], headers) do
    {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
      json conn, %{"success": true, "body": body}
    {:ok, %HTTPoison.Response{status_code: 404}} ->
      json conn, %{"success": false, "body": "Not Found"}
    {:error, %HTTPoison.Error{reason: reason}} ->
      json conn, %{"success": false,  "reason": reason}
    end
  end
end

