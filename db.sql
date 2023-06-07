CREATE TABLE "game_message"(
"message_id" SERIAL primary key,
"message_text" TEXT NOT NULL,
"message_post_id" INTEGER references "game"(post_id) not null,
"message_users_id" TEXT references "users"(id) not null,
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

-- mandy testing
-- SELECT name, game_type, description, game_cover, create_post, update_post, users_name  FROM game JOIN users ON users.id = game.create_users_id where post_id = 5;
-- SELECT message_id,text,post_id,users_id,message_create_at,users_icon,users_name FROM game_message JOIN users ON users_id = users.id where post_id=$1; 