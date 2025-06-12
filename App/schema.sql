drop table autolist;
drop table vehicle;

create table autolist(
    id int not null auto_increment,
    name text not null,
    primary key (id)
);

create table vehicle(
    id int not null auto_increment,
    vehicle_id int not null,
    category text not null,
    primary key(id),
    foreign key (vehicle_id) references autolist(id)
);

INSERT INTO autolist (name) VALUES
('Dodge Challenger'),
('Ford Mustang'),
('Toyota Tundra'),
('Subaru Outback');