module Simplex

using LinearAlgebra

function main(i_type, z_row, arr, solution)
    if i_type == 1
        solution = vcat(solution, [0])
        final, col_names, row_names = format_max(arr, z_row) # call data formatter
        final[:, end] = solution # add the solution columns
        all_tableus,
        all_pivot_el,
        all_pivot_rows,
        all_pivot_cols,
        all_cols_names,
        all_raws_names = maximization(final, col_names, row_names)
    elseif i_type == 2
        solution = vcat(solution, [0, 0 - sum(solution)]) # add the siolution row
        final, col_names, row_names, del_cols = format_min(arr, z_row) # call data formatter
        final = hcat(final, vcat(solution...))
        all_tableus,
        all_pivot_el,
        all_pivot_rows,
        all_pivot_cols,
        all_cols_names,
        all_raws_names = minimization(final, col_names, row_names, del_cols)

    end
    return all_tableus,
    all_pivot_el,
    all_pivot_rows,
    all_pivot_cols,
    all_cols_names,
    all_raws_names
end

function format_max(arr, last_row)
    # create column names
    col_names = [string("x", i) for i in 1:size(arr)[2]]

    # format the data array
    n_rows, n_cols = size(arr)
    eye_mat = Matrix{Float64}(I, n_rows, n_rows + 1)
    extra_last = [0 for n in 1:n_rows+1]
    last_row = 0 .- last_row
    last_row = vcat(last_row, extra_last)
    arr = hcat(arr, eye_mat)
    final = vcat(arr, transpose(last_row))

    # extend column names
    size_cols = size(col_names)[1]
    extra_cols = [string("x", size_cols + n) for n in 1:n_rows+1]
    col_names = vcat(col_names, extra_cols)
    col_names[end] = "sol"

    # create row names
    extra_cols[end] = "Z"
    row_names = extra_cols

    # return the table,col names and row names
    return (final, col_names, row_names)

end

function format_min(arr, last_row)
    col_names = [string("x", i) for i in 1:size(arr)[2]]
    n_rows, n_cols = size(arr)
    sub_last_r = 0 .- sum(arr, dims = 1)
    last_row = last_row
    eye_mat = Matrix{Float64}(I, n_rows, n_rows)
    eye_mat_neg = Matrix{Float64}(-I, n_rows, n_rows)
    extra_last_1s = [1 for n in 1:n_rows]
    extra_last = [0 for n in 1:n_rows]
    last_row = vcat(last_row, extra_last)
    last_row = vcat(last_row, extra_last) # has double the num cols
    sub_last_r = hcat(sub_last_r, hcat(extra_last_1s...)) # add ones cols
    sub_last_r = hcat(sub_last_r, hcat(extra_last...))
    last_row = vcat(hcat(last_row...), sub_last_r)
    arr = hcat(arr, eye_mat_neg)
    arr = hcat(arr, eye_mat)
    final = vcat(arr, last_row)
    size_cols = size(col_names)[1]
    extra_cols = [string("x", size_cols + n) for n in 1:n_rows]
    col_names = vcat(col_names, extra_cols)

    size_cols = size(col_names)[1]
    del_cols = [string("x", size_cols + n) for n in 1:n_rows]
    col_names = vcat(col_names, del_cols)
    row_names = vcat(del_cols, ["z", "z1"])

    col_names = vcat(col_names, ["sol"])
    return (final, col_names, row_names, del_cols)
end

check_neg(x) = x <= 0 ? 0 : x
check_zero(x) = x == 0 ? Inf : x

function maximization(arr, col_names, row_names)
    all_tableus,
    all_pivot_el,
    all_pivot_rows,
    all_pivot_cols,
    all_cols_names,
    all_raws_names = solve(arr, 1, col_names, row_names)
    return all_tableus,
    all_pivot_el,
    all_pivot_rows,
    all_pivot_cols,
    all_cols_names,
    all_raws_names
end

function minimization(arr, col_names, row_names, del_cols)
    all_tableus,
    all_pivot_el,
    all_pivot_rows,
    all_pivot_cols,
    all_cols_names,
    all_raws_names = solve(arr, 2, col_names, row_names, del_cols)
    return all_tableus,
    all_pivot_el,
    all_pivot_rows,
    all_pivot_cols,
    all_cols_names,
    all_raws_names
end
function slicematrix(A::AbstractMatrix{T}) where {T}
    m, n = size(A)
    b = Vector{T}[Vector{T}(undef, n) for _ in 1:m]
    for i in 1:m
        b[i] = A[i, :]
    end
    return b
end
function solve(arr, place, col_names, row_names, arg...)
    all_tableus = [slicematrix(arr)]
    all_pivot_el = []
    all_pivot_rows = []
    all_pivot_cols = []
    all_cols_names = [copy(col_names)]
    all_raws_names = [copy(row_names)]


    last_row = arr[end, :][1:end-1]
    min_element_last_row, pivot_col_index = findmin(last_row)
    count = 1
    min_inf=false
    while min_element_last_row < 0 && count < 10 && !min_inf
        count += 1
        pivot_column = arr[:, pivot_col_index]
        last_column = arr[:, end]
        # no reason to try/catch since julia has infinity for 0 divison error
        div_row_index = check_neg.(pivot_column[1:end-place]) .\ check_zero.(last_column[1:end-place])
        # element wise division
        min_inf = findmin(div_row_index)[1]==Inf
        pivot_row_index =  findmin(div_row_index)[2]
        pivot_row = arr[pivot_row_index, :]
        pivot_element = pivot_column[pivot_row_index]

        forms_arr = [1 for n in 1:size(pivot_column[1:end])[1]]
        new_arr = [[0.0] for n in 1:size(pivot_column[1:end])[1]]
        for r in 1:size(forms_arr)[1]
            row = arr[r, :]
            elm = row[pivot_col_index]
            if r === pivot_row_index
                form = 1 / pivot_element
                final_val = row .* form
            elseif r === size(forms_arr)[1]
                form = abs(elm) / pivot_element
                final_val = form .* pivot_row
                final_val = final_val .+ row
            else
                form = (elm / pivot_element) .* pivot_row
                final_val = row .- form
            end
            new_arr[r] = final_val
        end
        new_arr = transpose(hcat(new_arr...))
        arr = new_arr

        if place === 2
            arr, d_columns, d_rows = solve_array_min(
                arr,
                col_names,
                row_names,
                pivot_row_index,
                pivot_col_index,
                arg[1],
            )
        elseif place === 1
            arr, d_columns, d_rows =
                solve_array_max(arr, col_names, row_names, pivot_row_index, pivot_col_index)
        end
        row_names = copy(d_rows)
        col_names = d_columns
        last_row = arr[end, :][1:end-1]
        min_element_last_row, pivot_col_index = findmin(last_row)

        all_tableus = vcat(all_tableus, [slicematrix(arr)])
        all_pivot_el = vcat(all_pivot_el, [pivot_element])
        all_pivot_rows = vcat(all_pivot_rows, [pivot_row])
        all_pivot_cols = vcat(all_pivot_cols, [pivot_column])
        all_cols_names = vcat(all_cols_names, [d_columns])
        all_raws_names = vcat(all_raws_names, [copy(d_rows)])
    end

    return all_tableus,
    all_pivot_el,
    all_pivot_rows,
    all_pivot_cols,
    all_cols_names,
    all_raws_names
end

function solve_array_max(arr, d_columns, d_rows, pivot_row_index, pivot_col_index)
    # alter the array column and row names following the tablus method for maximization
    d_rows[pivot_row_index] = d_columns[pivot_col_index]
    return (arr, d_columns, d_rows)
end

function solve_array_min(arr, d_columns, d_rows, pivot_row_index, pivot_col_index, del_col)
    pivot_col_name = d_columns[pivot_col_index]
    pivot_row_name = d_rows[pivot_row_index]

    in_del = pivot_row_name in del_col
    if in_del
        drop_el_index = findall(x -> x == pivot_row_name, d_columns)[1]

        d_columns = d_columns[1:end.!=drop_el_index]
        arr = arr[1:end, 1:end.!=drop_el_index]
    end
    d_rows[pivot_row_index] = pivot_col_name
    # alter the array column and row names following the tablus method for minimization
    return (arr, d_columns, d_rows)
end
end
