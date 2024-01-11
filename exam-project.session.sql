-- Task 9. Display cuount users by roles
SELECT jsonb_object_agg(role, count) 
FROM (
    SELECT role, count(*) as count
    FROM "Users"
    GROUP BY role
) sub;

-- OR
SELECT role, count(*) 
FROM "Users" 
GROUP BY role;
