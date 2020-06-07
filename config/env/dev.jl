using Genie.Configuration, Logging

const config = Settings(
    server_port = 8000,
    server_host = "0.0.0.0",
    log_level = Logging.Debug,
    log_to_file = false,
    server_handle_static_files = true,
    websocket_server = false,
    cors_allowed_origins = [
        "http://localhost:3000",
        "http://localhost:8000",
        "localhost",
        "http://localhost",
        "http://127.0.0.1",
    ],
    cors_headers = Dict{String,String}(
        "Access-Control-Allow-Headers" => "access-control-allow-origin,content-type",
        "Access-Control-Allow-Methods" => "POST,GET,OPTION,PUT,DELETE,HEAD,Allow",
        "Access-Control-Allow-Credentials" => "",
        "Access-Control-Allow-Origin" => "*",
        "Access-Control-Expose-Headers" => "Access-Control-allow-origin",
        "Access-Control-Max-Age" => "86400",
    ),
    server_document_root = "build",
)

ENV["JULIA_REVISE"] = "auto"
