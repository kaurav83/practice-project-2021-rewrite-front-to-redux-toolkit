-- Description conversations table 

CREATE TABLE catalogs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    catalog_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE catalogs
ADD CONSTRAINT fk_user_id
FOREIGN KEY (user_id) REFERENCES "Users"(id);

INSERT INTO catalogs (user_id, catalog_name) VALUES (1, 'catalog for alex');

-- Description catalog_conversations table

CREATE TABLE catalog_conversations (
    catalog_id INTEGER REFERENCES catalogs(id),
    conversation_id INTEGER REFERENCES conversations(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE catalog_conversations
ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE catalog_conversations
ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE catalog_conversations
DROP CONSTRAINT catalog_conversations_catalog_id_fkey,
ADD CONSTRAINT catalog_conversations_catalog_id_fkey
FOREIGN KEY (catalog_id)
REFERENCES catalogs(id)
ON DELETE CASCADE;

INSERT INTO catalog_conversations (catalog_id, conversation_id) VALUES (3, 1);

-- Description conversations table 

CREATE TABLE conversations (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
);


INSERT INTO conversations (created_at, updated_at) VALUES ('2024-01-24 20:09:51.978', '2024-02-05 09:51:39.895');

-- Description conversation_participants table 

CREATE TABLE conversation_participants (
    conversation_id INTEGER REFERENCES conversations(id),
    participant_id INTEGER,
    blacklisted BOOLEAN NOT NULL DEFAULT FALSE,
    favorited BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (conversation_id, participant_id)
);
ALTER TABLE conversation_participants
ADD CONSTRAINT fk_participant_id
FOREIGN KEY (participant_id) REFERENCES "Users"(id);

INSERT INTO conversation_participants (conversation_id, participant_id, blacklisted, favorited) VALUES (1, 1, FALSE, FALSE);
INSERT INTO conversation_participants (conversation_id, participant_id, blacklisted, favorited) VALUES (2, 5, TRUE, FALSE);
INSERT INTO conversation_participants (conversation_id, participant_id, blacklisted, favorited) VALUES (1, 3, FALSE, TRUE);
INSERT INTO conversation_participants (conversation_id, participant_id, blacklisted, favorited) VALUES (2, 3, FALSE, TRUE);

-- Description messages table 

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    sender INTEGER NOT NULL,
    body TEXT NOT NULL,
    conversation_id INTEGER REFERENCES conversations(id),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

ALTER TABLE messages
ADD CONSTRAINT fk_sender
FOREIGN KEY (sender) REFERENCES "Users"(id);


INSERT INTO messages (sender, body, conversation_id, created_at, updated_at) VALUES (3, 'gasdfasdfasf', 1, '2023-11-24 20:09:52.001', '2023-11-24 20:09:52.001');
INSERT INTO messages (sender, body, conversation_id, created_at, updated_at) VALUES (1, 'reply Alex 1', 1, '2024-3-1 20:09:52.001', '2024-3-1 20:09:52.001');

-- Select catalogs with chats
SELECT c.id AS catalog_id, c.user_id, c.catalog_name, cc.conversation_id
FROM catalogs c
JOIN catalog_conversations cc ON c.id = cc.catalog_id;

-- OR with agregate function
SELECT 
    c.id AS "_id",
    c.user_id AS "userId",
    c.catalog_name AS "catalogName",
    json_agg(cc.conversation_id::text) AS chats
FROM 
    catalogs c
JOIN 
    catalog_conversations cc 
    ON c.id = cc.catalog_id
GROUP BY 
    c.id;


-- Select conversations
SELECT 
    c.id AS "_id",
    cp.participant_id,
    cp.blacklisted AS "blackList",
    c.created_at,
    cp.favorited AS "favoriteList",
    c.updated_at
FROM 
    conversations c
JOIN 
    conversation_participants cp 
    ON c.id = cp.conversation_id;

-- OR with agregate function
SELECT 
    c.id AS "_id",
    json_agg(cp.participant_id) AS "participants",
    json_agg(cp.blacklisted) AS "blackList",
    c.created_at,
    json_agg(cp.favorited) AS "favoriteList",
    c.updated_at
FROM 
    conversations c
JOIN 
    conversation_participants cp 
    ON c.id = cp.conversation_id
GROUP BY 
    c.id;