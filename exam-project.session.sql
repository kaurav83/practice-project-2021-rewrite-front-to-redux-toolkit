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


-- Task 10. Get cashback
WITH customer_orders AS (
    SELECT c."userId", SUM(c.prize) * 0.10 AS cashback
    FROM "Contests" c
    JOIN "Users" u ON c."userId" = u.id
    WHERE u.role = 'customer' AND
          c."createdAt" >= '2023-12-25' AND c."createdAt" <= '2024-01-14'
    GROUP BY c."userId"
)
UPDATE "Users"
SET balance = balance + co.cashback
FROM customer_orders co
WHERE "Users".id = co."userId";

-- Task 11. Pay three creators money
UPDATE "Users"
SET balance = balance + 10
WHERE id IN (
    SELECT id
    FROM "Users"
    WHERE role = 'creator'
    ORDER BY rating DESC
    LIMIT 3
);
