CREATE TABLE public."Menu_Items"
(
    menu_id serial NOT NULL,
    name character varying(100) NOT NULL,
    description character varying(500) NOT NULL,
    price money NOT NULL,
    category character varying(100) NOT NULL,
    calories integer NOT NULL,
    availability boolean NOT NULL DEFAULT true,
    image_url character varying(300) NOT NULL,
    PRIMARY KEY (menu_id)
);

ALTER TABLE IF EXISTS public."Menu_Items"
    OWNER to mge_admin;

