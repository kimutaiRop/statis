module Hypothesis
using Statistics


# first(data,8)

function find_runs(d,medn)
    r = 0
    greater = false
    less = false
    for c in d
        if c < medn
            greater = false
            if less == true
                me = "cont"
            else
                less = true
                r = r+1
            end
        elseif c > medn
            less = false
            if greater == true
                me = "cont"
            else
                greater = true
                r = r+1
            end
        else
            if greater == false && less == false
                me = "cont"
            else
                less = false
                greater = false
                r = r+1
            end
        end
    end
    return r
end

#test for randomness
function randomness(ser)
    med = median!(ser[1:end])
    runs = find_runs(ser,med)
    n = length(ser)
    ε = 1/2 * (n+2)
    δ² = (n/4)*((n-2)/(n-1))
    Ζ = (runs - ε) /sqrt(δ²)

    print("""
    n       : $n
    runs    : $runs

    Zcal    : $Ζ
    """)
    return Ζ
end

#= the argument passed should be an array if from dataframe, splice the column you want to an array eg:

    randomness([data.u...])
=#

#wilcoxon signed test accepts (x,2) array where x=number of rows
find_pos(x) = x>0 ? x : 0
find_neg(x) = x<0 ? abs(x) : 0
function wilcoxon(arry)
    diff = .-(arry[:,1], arry[:,2])
    T₊ = sum(find_pos.(diff))
    T₋ = sum(find_neg.(diff))
    T = min(T₊,T₋)
    return T₊,T₋,T
end

#= the argument passed should be an array (x,2). If from dataframe, splice each of the columns to an array eg:

    d = hcat([data[!,1]...] , [data[!,2]...])
    wilcoxon(d)
=#

function finIndex(arr,joint...)
    col_ind = []
    if length(joint)>0
        arr_sorted = joint[1]
    else
        arr_sorted = sort(arr)
    end
    for el in arr
        elements = findall(x->x==el,arr_sorted)
        if length(elements)>1
            indx = [sum(elements)/length(elements),]
            elements = indx
        end
        col_ind = vcat(col_ind,elements)
    end
    return col_ind
end

#mann-witney U test

function mannWitney(arry)
    #ranks the columns jointly
    col1 = arry[:,1]
    col2 = arry[:,2]
    sorted = sort([col1...,col2...])
    R₂ = finIndex(col1, sorted)
    R₁ = finIndex(col2, sorted)
    sum_R₁ = sum(R₁)
    sum_R₂ = sum(R₂)
    n₁ = length(col2)
    n₂ = length(col2)

    U₁ = sum_R₁ - 1/2 * n₁ * (n₁ + 1)
    U₂ = sum_R₂ - 1/2 * n₂ * (n₂ + 1)
    U = min(U₁,U₂)
    return U₁,U₂, U
end

#= the argument passed should be an array (x,2). If from dataframe, splice each of the columns to an array eg:

    d = hcat([data[!,1]...] , [data[!,2]...])
    mannWitney(d)
=#

#chi-square test for independence
function chiSqIndep(arry)
    row_sum = sum(arry,dims=2)
    col_sum = sum(arry,dims=1)
    exp = row_sum*col_sum /sum(col_sum)
    arr_s =hcat([arr...])
    exp_s =hcat([exp...])
    Χ² = sum((arr_s .- exp_s).^2 ./exp_s)
    df = (size(arry)[1]-1) * (size(arry)[2]-1)
    return Χ²,df
end

#= this accepts any dimension array (x,y) you just pass in the array eg:

    arr = [170 150;120 110;160 90]
    chiSqIndep(arr)
=#

function chiSqGoodness(args)
    body = 2
end


#spernameRank measure of correlation
function spermanRank(arry)
    indices = []
    for ind in 1:size(arry)[2]
        arr_index = finIndex(arry[:,ind])
        if ind == 1
            indices = [arr_index...]
        else
            indices = hcat(indices,[arr_index...])
        end
    end
    Rₛ = [x/1 for x = 1:size(indices)[2]-1]
    for ind in 2:size(indices)[2]
        diff_sqrd = (indices[1] .- indices[ind]) .^ 2
        SM_D =  sum(diff_sqrd)
        n = size(arry)[1]
        rᵣ = 1 - (6 * SM_D)/(n*((n^2) -1))
        Rₛ[ind-1] = rᵣ
    end
    return Rₛ
end

#for sperman, if you have several columns all the other columns will be tested agains the first and returned in order
#= the argument passed should be an array (x,y). If from dataframe, splice each of the columns to an array eg:

    d = hcat([data[!,1]...] , [data[!,2]...])
    spernameRank(d)
=#

function KruskalWallis(arry)
    sorted = sort([vcat(d)...])
    indices = []
    for ind in 1:size(arry)[2]
        arr_index = finIndex(arry[:,ind],sorted)
        if ind == 1
            indices = [arr_index...]
        else
            indices = hcat(indices,[arr_index...])
        end
    end
    Rᵢ = sum(indices,dims=2)
    n = sum(length.(arry),dims=1)
    N = length(sorted)
    H = 12/(N*(N-1)) * sum(Rᵢ.^2 ./ n) - 3*(N+1)
    return H
end

#= if you have severa; columns, you will have to pass them in twos
as of now, this accepts only columns with equal lengths eg

d = hcat([data[1:50,1]...] , [data[1:50,2]...])
KruskalWallis(d)

=#
end