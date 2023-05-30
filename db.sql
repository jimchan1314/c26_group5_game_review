CREATE TABLE "game_message"(
    "id" VARCHAR(200) primary key
    "text" TEXT NOT NULL,
    "game_id" VARCHAR (40) references "game"(id) not null,
    "users_id" VARCHAR (40) references "users"(id) not null
    "create_at" TIMESTAMP default CURRENT_TIMESTAMP 
);

CREATE TABLE "game"(
    "id" VARCHAR(200) primary key
    "name" VARCHAR(100) NOT NULL,
    "type" VARCHAR(100) CHECK
        ("type" IN('')) NOT NULL,
        "like_count" INTEGER NOT NULL,
        "create_at" TIMESTAMP default CURRENT_TIMESTAMP,
        "update_at" TIMESTAMP default CURRENT_TIMESTAMP,
        "description" TEXT NOT NULL,
        "create_users_id" INTEGER references "users"(id) not null
        "cover" VARCHAR(255)
);
CREATE TABLE "like_ref_game_users"(
    "users_id" BIGINT references "users"(id) not null,
    "game_id" BIGINT references "game"(id) not null,
);

CREATE TABLE "users"(
    id text primary key,
    "email" VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    users_icon VARCHAR(255),
    users_name VARCHAR(255) NOT NULL,
    create_at TIMESTAMP default CURRENT_TIMESTAMP 
);
