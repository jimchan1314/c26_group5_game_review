CREATE TABLE "game_message"(
"id" SERIAL primary key,
"text" TEXT NOT NULL,
"game_id" VARCHAR (40) references "game"(post_id) not null,
"users_id" VARCHAR (40) references "users"(id) not null,
"create_at" VARCHAR(255) not null
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
CREATE TABLE "like_ref_game_users"(
"users_id" BIGINT references "users"(id) not null,
"game_id" BIGINT references "game"(post_id) not null,
);
CREATE TABLE "users"(
id text primary key,
email VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL,
users_icon VARCHAR(255),
users_name VARCHAR(255) NOT NULL,
create_at VARCHAR(255) NOT NULL
);

-- mandy notes
select * from game join users on game.create_users_id = users.id;
