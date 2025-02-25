CREATE TABLE "movies" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"release_year" integer NOT NULL,
	"poster_url" varchar(1000),
	"cookie_count" integer DEFAULT 0 NOT NULL,
	"has_cookie" boolean DEFAULT false NOT NULL,
	"description" varchar(2000),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
