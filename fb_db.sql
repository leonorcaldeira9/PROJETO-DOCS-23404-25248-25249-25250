create schema fb_db;

use fb_db;

create table users (
	id int PRIMARY KEY AUTO_INCREMENT,
    fullName nvarchar(100) NOT NULL,
    gender nchar(1) NOT NULL CHECK (gender IN ('M', 'F', 'O')),
    birthDate date NOT NULL,
    maritalStatus nchar(1) CHECK (maritalStatus IN ('S', 'W', 'M', 'D')),
    city nvarchar(50) NOT NULL,
    country nvarchar(50),
    email nvarchar(100) NOT NULL,
    phoneNumber nchar(9) NOT NULL CHECK(phoneNumber REGEXP '^9[0-9]{8}$')
);

create table posts (
	id int PRIMARY KEY AUTO_INCREMENT,
    idUser int NOT NULL,
    postDate datetime DEFAULT CURRENT_TIMESTAMP,
    postText text,
    FOREIGN KEY (idUser) REFERENCES users(id)
);

create table comments (
	id int PRIMARY KEY AUTO_INCREMENT,
    idPost int NOT NULL,
    idUser int NOT NULL,
    commentDate datetime DEFAULT CURRENT_TIMESTAMP,
    parentCommentId int,
    commentText text NOT NULL,
	FOREIGN KEY (idPost) REFERENCES posts(id),
    FOREIGN KEY (idUser) REFERENCES users(id),
    FOREIGN KEY (parentCommentId) REFERENCES comments(id)
);

create table posts_likes (
	idUser int NOT NULL,
    idPost int NOT NULL,
    likeDate datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (idUser, idPost),
    FOREIGN KEY (idUser) REFERENCES users(id),
    FOREIGN KEY (idPost) REFERENCES posts(id)
);

create table comments_likes (
	idUser int NOT NULL,
    idComment int NOT NULL,
    likeDate datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (idUser, idComment),
    FOREIGN KEY (idUser) REFERENCES users(id),
    FOREIGN KEY (idComment) REFERENCES comments(id)
);


/* INSERTS -----------------------------------------------------*/


INSERT INTO users (fullName, gender, birthDate, maritalStatus, city, country, email, phoneNumber) VALUES
('Ana Sofia Silva', 'F', '1992-05-14', 'S', 'Lisboa', 'Portugal', 'ana.silva92@gmail.com', '911223344'),
('João Pedro Santos', 'M', '1985-11-23', 'M', 'Porto', 'Portugal', 'jpsantos@hotmail.com', '933456789'),
('Maria João Costa', 'F', '1998-02-10', 'S', 'Coimbra', 'Portugal', 'mjoaocosta@yahoo.com', '966778899'),
('Tiago Ferreira', 'M', '1990-08-30', 'M', 'Braga', 'Portugal', 'tiago.ferreira.90@gmail.com', '922334455'),
('Inês Martins', 'F', '2001-12-05', 'S', 'Faro', 'Portugal', 'ines.martins01@outlook.com', '910101010'),
('Rui Oliveira', 'M', '1975-04-18', 'D', 'Aveiro', 'Portugal', 'rui.oliveira75@gmail.com', '931231231'),
('Carla Ribeiro', 'F', '1988-09-22', 'M', 'Leiria', 'Portugal', 'carlaribeiro88@gmail.com', '965432198'),
('Alex Silva', 'O', '1995-07-11', 'S', 'Lisboa', 'Portugal', 'alex.silva.lx@gmail.com', '918273645'),
('Miguel Rodrigues', 'M', '1982-01-15', 'D', 'Setúbal', 'Portugal', 'miguel.rodrigues82@hotmail.com', '937654321'),
('Sofia Almeida', 'F', '1993-06-25', 'M', 'Porto', 'Portugal', 'sofiaalmeida93@yahoo.com', '961122334'),
('Pedro Gonçalves', 'M', '1970-10-08', 'W', 'Viseu', 'Portugal', 'pgoncalves70@gmail.com', '915566778'),
('Beatriz Lopes', 'F', '2003-03-12', 'S', 'Évora', 'Portugal', 'bealopes2003@gmail.com', '939876543'),
('Nuno Mendes', 'M', '1989-11-02', 'M', 'Guimarães', 'Portugal', 'nuno.mendes.gui@outlook.com', '960001122'),
('Mariana Fernandes', 'F', '1997-08-19', 'S', 'Portalegre', 'Portugal', 'mari.fernandes@gmail.com', '912233445'),
('Sam Costa', 'O', '1999-04-30', 'S', 'Lisboa', 'Portugal', 'sam.costa99@gmail.com', '934455667'),
('Carlos Pinto', 'M', '1968-12-14', 'M', 'Faro', 'Portugal', 'carlos.pinto68@hotmail.com', '968899001'),
('Joana Teixeira', 'F', '1991-02-28', 'D', 'Sintra', 'Portugal', 'joanateixeira91@gmail.com', '917788990'),
('Diogo Carvalho', 'M', '2000-09-17', 'S', 'Cascais', 'Portugal', 'diogo.carvalho00@yahoo.com', '935566778'),
('Catarina Rocha', 'F', '1986-05-09', 'M', 'Coimbra', 'Portugal', 'catrocha86@gmail.com', '962233445'),
('Bruno Neves', 'M', '1994-10-21', 'S', 'Vila Real', 'Portugal', 'brunoneves94@outlook.com', '914455667'),
('Patrícia Gomes', 'F', '1980-07-03', 'D', 'Viana do Castelo', 'Portugal', 'patricomes@gmail.com', '936677889'),
('Filipe Monteiro', 'M', '1983-01-29', 'M', 'Braga', 'Portugal', 'filipemonteiro83@gmail.com', '964455667'),
('Leonor Sousa', 'F', '2005-06-16', 'S', 'Castelo Branco', 'Portugal', 'leonorsousa05@hotmail.com', '919900112'),
('Ricardo Machado', 'M', '1978-08-04', 'W', 'Santarém', 'Portugal', 'rmachado78@gmail.com', '932233445'),
('Daniela Azevedo', 'F', '1996-12-11', 'M', 'Setúbal', 'Portugal', 'dani.azevedo@yahoo.com', '967788990'),
('André Pires', 'M', '1992-03-08', 'S', 'Faro', 'Portugal', 'apires92@gmail.com', '913344556'),
('Cris Martins', 'O', '1998-11-27', 'S', 'Porto', 'Portugal', 'crismartins98@outlook.com', '938899001'),
('Rita Faria', 'F', '1987-04-14', 'M', 'Lisboa', 'Portugal', 'ritafaria87@gmail.com', '965566778'),
('Tomás Correia', 'M', '2002-01-22', 'S', 'Évora', 'Portugal', 'tomas.correia02@gmail.com', '916677889'),
('Helena Batista', 'F', '1973-09-05', 'W', 'Beja', 'Portugal', 'hbatista73@hotmail.com', '931122334');

