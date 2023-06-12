CREATE TABLE "game_message"(
    "message_id" SERIAL primary key,
    "text" TEXT NOT NULL,
    "post_id" INTEGER references "game"(post_id) not null,
    "users_id" TEXT references "users"(id) not null,
    "message_create_at" VARCHAR(255) not null
);
CREATE TABLE "game"(
    "post_id" SERIAL primary key,
    "name" VARCHAR(100) NOT NULL,
    "game_type" VARCHAR(20) NOT NULL,
    "like_count" INTEGER NOT NULL, 
    "create_post" VARCHAR(255) not null,
    "update_post" VARCHAR(255),
    "description" TEXT NOT NULL,
    "create_users_id" VARCHAR(255), 
    FOREIGN KEY (create_users_id) references "users"(id),
    "game_cover" VARCHAR(255)
);
CREATE TABLE "like_game"(
    "like_id" SERIAL primary key,
    "users_id" TEXT references "users"(id) not null,
    "game_id" INTEGER references "game"(post_id) not null
);

CREATE TABLE "users"(
    "id" text primary key,
    "email" VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    "users_icon" VARCHAR(255),
    "users_name" VARCHAR(255) NOT NULL,
    "create_at" VARCHAR(255) NOT NULL
);


-- inner JOIN (SELECT message_id, post_id, users_id FROM game_message WHERE game_message.post_id = table1.post_id) as table3 ORDER BY table1.create_post DESC 

-- -- mandy testing
-- SELECT * FROM (SELECT * FROM game WHERE game_type = 'Video Game') as table1 inner JOIN users ON users.id = table1.create_users_id;

-- SELECT * FROM ((SELECT * FROM game WHERE game_type = 'Video Game') as table1 inner JOIN users ON users.id = table1.create_users_id) as table3 inner join game_message  on  table3.post_id = game_message.post_id where game_message.post_id = 1;

-- SELECT count(*) from (SELECT * FROM ((SELECT * FROM game WHERE game_type = 'Video Game') as table1 inner JOIN users ON users.id = table1.create_users_id) as table3 inner join game_message  on  table3.post_id = game_message.post_id where game_message.post_id = 1 ) as table5;
-- rowcount
-- SELECT count(*)