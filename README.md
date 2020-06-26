# julia and react web app for statistics

you can download this appliction and set up to run localy in your machine

these steps assume that you are in the project folder `(statis)`

start :

install julia doenload from https://julialang.org/downloads/

**$**`npm install`

this will install react modules we need

**$**`npm run build`

this will make the frontend files for genie by compiling the react jsx code and create build,
I prefer this to running two servers, (react and genie) in local machine

however, if you are contributing then running both will save you alot of time, you dont have to worry...
I took care of the cors origins for all servers in genie already as log as you dont mess up where you should not

## start server

### on unix system

**$** `bin/serve`
this will start genie server if on unix, this will also take care of modules needed

### on windows

**/bin>**`cd bin`

to first move to the directory bin in the projecvt folder

**click** the `server` file to start server if you hate cmd and terminals

or run  

**/bin>** `server`

if you love them

## need ready setup

visit the web https://statis.herokuapp.com/  to access the interface and  
select https://statis.herokuapp.com/simplex **linear programming**

## help add new features and programs as contributer

the current available solution

   1. simplex problem solution(maximization and minimization)
   2. .....
   3. ....

For this application, both the genie and react `src` files are in the same folder, I deleted the genie `public` folder because I am serving the frontend in react `build`

To add new module, you need to make a separete file for each of the program you make fron instance `simplex` I already made is in `lib` folder, just incase you need to update the simplex update the file but dont add a new program in the file, make a new file in the `lib` for your program and add the route in julia `routes.jl` will soon be adding a home page for this application and routes for the react frontend

if you are willing to add other statistical programs you build to this app and you can do the above, do it then push for me to make a marge

**you definately will take full credit for your work** and your name included in footer section
