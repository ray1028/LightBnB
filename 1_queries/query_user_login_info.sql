-- Select their id, name, email, and password.
-- Select a single user using their email address. Use tristanjacobs@gmail.com for now.

select id, name, email, password 
from users
where email = 'tristanjacobs@gmail.com';