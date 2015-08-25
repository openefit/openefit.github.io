## Can't access localhost:3000 via vagrant ##

solution is running with code below when start server.

> rails s -b 0.0.0.0

I found this soulution from other post about same problem The answerer said 'You'll want to make sure that the server is binded to 0.0.0.0 so that all interfaces can access it."
