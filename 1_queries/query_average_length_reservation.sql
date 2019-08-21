-- Average Length Of Reservation
-- Our product managers want a query to see the average duration of a reservation.

-- Get the average duration of all reservations.

-- Expected Result:

--   average_duration   
-- ---------------------
--  14.6636000000000000
-- (1 row)

select avg(end_date - start_date) as average_duration
from reservations;