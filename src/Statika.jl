module Statika

using Logging, LoggingExtras

function main()
  Base.eval(Main, :(const UserApp = Statika))

  include(joinpath("..", "genie.jl"))

  Base.eval(Main, :(const Genie = Statika.Genie))
  Base.eval(Main, :(using Genie))
end; main()

end
