using Genie, Genie.Router, Genie.Requests, Genie.Renderer.Json
using Simplex, HTTP, JSON
using Hypothesis
using CSV

route("/simplex", method = POST) do
    data = jsonpayload()
    z_equation = parse.(Int, data["z_row"])
    solution = parse.(Int, data["solution"])
    arry = data["arry"]
    arr1 = [[a] for a in 1:length(arry)]
    for x in 1:length(arry)
        arr1[x] = parse.(Int, arry[x])
    end
    arry = transpose(hcat(arr1...))
    all_tableus,
    all_pivot_el,
    all_pivot_rows,
    all_pivot_cols,
    all_cols_names,
    all_raws_names = Simplex.main(data["prob"], z_equation, arry, solution)
    data = Dict(
        "tables" => all_tableus,
        "pivot_el" => all_pivot_el,
        "pivot_rows" => all_pivot_rows,
        "pivot_cols" => all_pivot_cols,
        "col_names" => all_cols_names,
        "row_names" => all_raws_names,
    )
    HTTP.Response(200, ["access-Control-Allow-Origin" => "*"], body = JSON.json(data))
end

route("/spearman")do
    data = jsonpayload()
    csv_data = data["url"]
    has_index = data["has_index"]
    drop_cols = data["drop_col"]

    read_data =CSV.read(csv_data,header=1,drop=drop_cols)
    columns = data.columns
    d = [[0] for x=1:length(columns)]
    for col_ind in 1:length(columns)
        d[col_ind] = [read_data[!,col_ind]...]
    end
    results = Hypothesis.spermanRank(d)
end

route("*") do
    serve_static_file("index.html")
end

