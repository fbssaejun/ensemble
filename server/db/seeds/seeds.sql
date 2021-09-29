INSERT INTO users (first_name, last_name, email, username, password)
VALUES ('Empty', 'User', 'none@none.com', 'somedude', '12345'),
('Slash', '', 'c00lhatz@gmail.com', 'axlrose', '12345'), -- Guns N Roses
('Axl', 'Rose', 'paradise_city@hotmail.com', 'slash', '12345'),
('Duff', 'McKagan', 'cool_beanz@gmail.com', 'b0ssb4ss', '12345'),
('Rob', 'Gardner', 'bdumtas@gmail.com', 'b0ssdrumz', '12345'),
('Dave', 'Mustaine', 'holywars@hotmail.com', 'pun1shmentDue', '12345'), -- Megadeth
('Marty', 'Friedman', 'tornad0fS0uls@hotmail.com', 'blown4w4y', '12345'),
('David', 'Ellefson', 'poison_cure@hotmail.com', 'rustInPeace', '12345'),
('Nick', 'Menza', 'hangar69@hotmail.com', '5magicx', '12345'),
('Noel', 'Gallagher', 'liam_sucks@gmail.com', 'wonderwall', '12345'), -- Oasis
('Liam', 'Gallagher', 'noel_sucks@gmail.com', 'wonderwall2', '12345'),
('Tim', 'Henson', 'shred_god@gmail.com', 'Goose', '12345'), -- Polyphia 
('Scott', 'LePage', 'shred_god2@gmail.com', 'Duck', '12345'),
('Clay', 'Gober', 'bass_man@gmail.com', 'FastSlaps', '12345'),
('Clay', 'Aeschliman', 'drum_god@gmail.com', 'Goose2', '12345'),
('Angus', 'Young', 'ang00sy@hotmail.com', 'duckwalkboi', '12345'), -- AC/DC 
('Phil', 'Rudd', 'morecowbell@gmail.com', 'lolforgotusername', '12345'),
('Cliff', 'Williams', 'backinblak@gmail.com', 'backinblak', '12345'),
('Brian', 'Johnson', 'reee@hotmail.com', 'REEEEE', '12345'),
('Stevie', 'Young', 'thunderstruck@gmail.com', 'thunderstruck', '12345'),
('Chris', 'Martin', 'fixyou@coldplay.com', 'pianorulz', '12345'), -- Coldplay 
('Jonny', 'Buckland', 'vivalavida@coldplay.com', 'guitarrulz', '12345'),
('Guy', 'Berryman', 'paradise@coldplay.com', 'ilovebass', '12345'),
('Will', 'Champion', 'yellow@coldplay.com', 'drumbeatrulz', '12345'),
('Phil', 'Harvey', 'thescientist@coldplay.com', 'idirectstuff', '12345'),
('Paul', 'Gilbert', 'triplets_god@techniques.com', 'TechnicalDifficulties', '12345'), -- Racer X
('Jeff', 'Martin', 'racerxvocals@techniques.com', 'SingsFast', '12345'),
('Juan', 'Alderete', 'racerxbass@techniques.com', 'Wheee', '12345'),
('Scott', 'Travis', 'racerxdrummer@techniques.com', 'BoomBoom', '12345'),
('Mario', 'Camarena', 'chonguitars@techniques.com', 'Shreeeeeddzz', '12345'), -- Chon
('Nathan', 'Camarena', 'chondrumss@techniques.com', 'DRUMZZZ', '12345'),
('Erick', 'Hansel', 'chonguitars2@techniques.com', 'Shreeeeeeeddddzz', '12345'),
('Esiah', 'Camarena', 'chonbass@techniques.com', 'BassShreeeeeddzz', '12345'),
('Misha', 'Mansoor', 'buymyjacksons@techniques.com', 'Jacksonnn', '12345'), -- Periphery
('Jake', 'Bowen', 'peripheryguitar2@techniques.com', 'ALSOJACKSON', '12345'),
('Matt', 'Halpern', 'peripherydrums@techniques.com', 'peripherydrums', '12345'),
('Spencer', 'Sotelo', 'peripheryvocals@techniques.com', 'peripheryvocals', '12345'),
('Mark', 'Holcomb', 'PRSmetal@techniques.com', 'buyPRSMetalGuitars', '12345'),
('Anthony', 'Kiedis', 'red@rhcp.com', 'sriracha', '12345'), -- Red Hot Chili Peppers
('Flea', '', 'hot@rhcp.com', 'pepperoncino', '12345'),
('Chad', 'Smith', 'chili@rhcp.com', 'chiliflakes', '12345'),
('John', 'Fruscinate', 'peppers@rhcp.com', 'blackpeppers', '12345'),
('NoBandUser1', 'LastName', 'noband1@email.com', 'noband1', '12345'), -- Users not in band
('NoBandUser2', 'LastName', 'noband2@email.com', 'noband2', '12345'),
('NoBandUser3', 'LastName', 'noband3@email.com', 'noband3', '12345'),
('NoBandUser4', 'LastName', 'noband4@email.com', 'noband4', '12345'),
('NoBandUser5', 'LastName', 'noband5@email.com', 'noband5', '12345');




INSERT INTO bands (leader_id, name, featured)
VALUES
(10, 'Oasis', TRUE),
(3, 'Guns N'' Roses', TRUE),
(1, 'Coldplay', FALSE),
(16, 'AC/DC', TRUE),
(1, 'Red Hot Chili Peppers', TRUE),
(12, 'Polyphia', TRUE),
(26, 'Racer X', TRUE),
(30, 'Chon', TRUE),
(34, 'Periphery', FALSE),
(6, 'Megadeth', FALSE);


INSERT INTO instruments (name)
VALUES
('Guitar'),
('Vocal'),
('Bass'),
('Drums'),
('Piano'),
('Violin'),
('Cello');

INSERT INTO genres (name)
VALUES
('Classic'),
('Jazz'),
('Hiphop'),
('Rock'),
('Progressive rock'),
('Heavy Metal'),
('Progressive metal'),
('Djent'),
('Blues'),
('Country'),
('Math rock'),
('Electronic rock'),
('Speed metal'),
('Instrumental rock'),
('Progressive metalcore');


INSERT INTO spots (band_id, user_id, instrument_id, title, description)
VALUES
-- Oasis
(1, 10, 1, 'Lead Guitar', 'A guy who babysits his brother'),
(1, 11, 2, 'Lead Vocal', 'A guy who likes to drink and smoke on stage'),
(1, null, 3, 'Bassist', 'Looking for a player that can handle family drama.'),
(1, null, 4, 'Drummer', 'Looking for a player that can handle family drama.'),

-- Guns N Roses
(2, 2, 1, 'Lead Guitarist', 'Cool dude with a hat'),
(2, 3, 2, 'Vocalist', 'Sometimes kind of an asshole'),
(2, 4, 3, 'Bassist', 'Sometimes credited as Duff Rose McKagan.'),
(2, 5, 4, 'Drummer', 'Was also the backup drummer for Hollywood Rose.'),
(2, null, 7, 'Fiddle guy', 'Looking for someone who can entertain us on the road.'),

--Coldplay
(3, 21, 2, 'Lead Vocal', 'Sweats a lot when singing'),
(3, 22, 1, 'Lead Guitarist', 'co-founded alongside Chris Martin'),
(3, 23, 3, 'Lead Drummer', 'Despite being left-handed, Berryman plays the bass right-handed.'),
(3, 24, 5, 'Sub Vocal/Piano', 'He also sings, but Chris Martin is better'),

--Megadeth
(10, 6, 2, 'Lead Vocals', 'Best known as the co-founder, vocalist, guitarist, and primary songwriter of thrash metal band Megadeth.'),
(10, 7, 1, 'Guitarist', 'Known for his tenure as the lead guitarist for heavy metal band Megadeth from 1990 to 2000.'),
(10, 8, 3, 'Bassist', 'Initially became an accomplished bassist and honed his songwriting skills while leading several of his own bands through the club scene of North America''s Midwest region.'),
(10, 9, 4, 'Drummer', 'Former drummer for thrash metal band Megadeth from 1989 to 1998.'),

--Polyphia
(6, 12, 1, 'Lead Guitarist', 'A guy with black nails who is a shred god.'),
(6, 13, 1, 'Lead Guitarist', 'Huge nose, fat shreds.'),
(6, 14, 3, 'Bassist', 'Got trolled by James Franco.'),
(6, 15, 4, 'Drummer', 'Has the same name as the bassist.'),
(6, null, 6, 'Violinist', 'We want an even more classical vibe.'),

--Racer X
(7, 26, 1, 'Lead Guitarist', 'I can switch between triplets, quadruplets, quintuplets, and sextuplets smoothly'),
(7, 27, 2, 'Vocalist', 'Vocalist of Racer X'),
(7, 28, 3, 'Bassist', 'Bassist of Racer X'),
(7, 29, 4, 'Drummer', 'Drummer of Racer X'),
(7, null, 1, 'Rhythm Guitarist', 'Want a rhythm guitar'),

--Chon
(8, 30, 1, 'Lead Guitarist', 'I play guitar fast good tones'),
(8, 31, 4, 'Drummer', 'Drummer of Racer X'),
(8, 32, 1, 'Lead Guitarist', 'Guitarist of Racer X'),
(8, 33, 3, 'Bassist', 'Bassist of Racer X'),
(8, null, 2, 'Vocalist', 'Need a vocalist'),
(8, null, 1, 'Rhythm Guitarist', 'Need a rhythm guitar'),

--Periphery
(9, 34, 1, 'Lead Guitarist', 'I play guitar fast good tones'),
(9, 35, 1, 'Lead Guitarist', 'I play guitar fast good tones'),
(9, 36, 4, 'Drummer', 'Drummer of Periphery'),
(9, 37, 2, 'Vocalist', 'Vocalist of Periphery'),
(9, 38, 1, 'Lead Guitarist', 'I play guitar fast good tones'),

--AC/DC
(4, 16, 1, 'Lead Guitarist', 'Co-founder, lead guitarist, songwriter and only constant original member of ACDC.'),
(4, 17, 4, 'Drums & Percussion', 'Best known as the drummer of AC/DC across three stints.'),
(4, 18, 3, 'Bass & Backing Vocals', 'He started his professional music career in 1967 and had previously been in the English groups Home and Bandit.'),
(4, 19, 2, 'Lead Vocals', 'one of the founder members of the rock band Geordie formed in Newcastle upon Tyne in 1971.'),
(4, 20, 1, 'Rhythm Guitar', 'Scottish musician, and the rhythm guitarist and backing vocalist for the Australian rock & roll band AC/DC.'),

--Red Hot Chili Peppers
(5, 39, 2, 'Lead Vocalist', 'Takes his shirt off in every music videos'),
(5, 40, 3, 'Lead Bassist', 'Best bass slapper in the world'),
(5, 41, 4, 'Lead Drummer', 'Drummer who looks like a mafia boss'),
(5, 42, 1, 'Lead Guitarist', 'Album generator, released 12 solo albums and seven EPs.');



INSERT INTO user_instrument(user_id, instrument_id)
VALUES
(2, 1),
(3, 2),
(4, 3),
(5, 4),
(6, 1),
(7, 4),
(8, 3),
(9, 5),
(10, 2),
(6, 1),
(6, 2),
(7, 1),
(8, 3),
(9, 4),
(11, 2),
(12, 1),
(13, 1),
(14, 3),
(15, 4),
(16, 1),
(17, 4),
(18, 3),
(19, 2),
(20, 1),
(20, 2),
(21, 2),
(22, 1),
(23, 3),
(24, 5),
(26, 1),
(27, 2),
(28, 3),
(29, 4),
(30, 1),
(31, 4),
(32, 1),
(33, 3),
(34, 1),
(35, 1),
(36, 4),
(37, 2),
(38, 1),
(39, 2),
(40, 3),
(41, 4),
(42, 1),
(43, 1),
(45, 2),
(47, 3);

INSERT INTO user_genre(user_id, genre_id)
VALUES
(2, 4),
(3, 6),
(4, 1),
(5, 2),
(6, 7),
(7, 1),
(8, 3),
(9, 8),
(10, 6);

INSERT INTO band_genre(band_id, genre_id)
VALUES
(2, 4),
(3, 6),
(4, 1),
(5, 4),
(6, 3),
(6, 5),
(6, 11),
(6, 12),
(7, 6),
(7, 13),
(8, 5),
(8, 14),
(8, 11),
(9, 7),
(9, 8),
(9, 15),
(10, 4);

-- 1('Classic'),
-- 2('Jazz'),
-- 3('Hiphop'),
-- 4('Rock'),
-- 5('Progressive rock'),
-- 6('Heavy Metal'),
-- 7('Progressive metal'),
-- 8('Djent');
-- 9('Blues'),
-- 10('Country'),
-- 11('Math rock'),
-- 12('Electronic rock'),
-- 13('Speed metal'),
-- 14('Instrumental rock'),
-- 15('Progressive metalcore'),