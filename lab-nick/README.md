Lab 08: Vanilla REST API
get
post
put
del

# httpie commands
http -v get localhost:3001/api/computers
http -v post localhost:3001/api/computers \ cpu=generic \ ram:toolittle \ hdd:clickofdeath