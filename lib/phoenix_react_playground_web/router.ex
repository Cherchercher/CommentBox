defmodule PhoenixReactPlaygroundWeb.Router do
  use PhoenixReactPlaygroundWeb, :router
  require Ueberauth

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/auth", PhoenixReactPlaygroundWeb do
    pipe_through :browser
    get "/:provider", AuthController, :request
    get "/:provider/callback", AuthController, :callback
    post "/:provider/callback", AuthController, :callback
  end


  scope "/api", PhoenixReactPlaygroundWeb do
    pipe_through :api
    resources "/comments", CommentController
    resources "/topics", TopicController, except: [:new, :edit]
    get "/aylien", AylienController, :index
    get "/aylien/sentiment_en/:text", AylienController, :sentiment_en
    get "/fuxi", AylienController, :index
    get "/fuxi/sentiment_cn/:text", FuxiController, :sentiment_cn
    get "/fuxi/translate_cn_en/:text", FuxiController, :translate_cn_en

  end

  scope "/", PhoenixReactPlaygroundWeb do
    pipe_through :browser
    get "/logout", AuthController, :logout
    get "/*path", PageController, :index

  end

  # Other scopes may use custom stacks.
  # scope "/api", PhoenixReactPlaygroundWeb do
  #   pipe_through :api
  # end

end
