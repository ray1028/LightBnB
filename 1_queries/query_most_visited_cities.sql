-- Most Visited Cities
-- Our product managers want a query to see a list of the most visited cities.

-- Get a list of the most visited cities.

-- Select the name of the city and the number of reservations for that city.
-- Order the results from highest number of reservations to lowest number of reservations.
-- Expected Result:

--        city        | total_reservations 
-- -------------------+--------------------
--  Carcross          |                405
--  Town of Hay River |                379
--  Whitehorse        |                376
--  Town of Inuvik    |                298
--  Yellowknife       |                257
--  (251 rows)

select city, count(*) as total_reservations
from properties join reservations
on properties.id = reservations.property_id
group by city
order by total_reservations desc; 