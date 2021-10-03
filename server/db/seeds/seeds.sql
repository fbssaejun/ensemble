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
('NoBandUser5', 'LastName', 'noband5@email.com', 'noband5', '12345'),
('Mega', 'User', 'a@a.com', 'multiowner', '12345'); -- Test user with own multiple bands, in multiple bands



INSERT INTO bands (leader_id, name, description, featured, band_image)
VALUES
(10, 'Oasis', 'WE LOVE FAMILY DRAMA',TRUE, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTJ9Xo4hTHKhsEEQDJ_X2nskW2KJwfn31WRQ&usqp=CAU'),
(3, 'Guns N'' Roses', 'We shoot flowers',TRUE, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDLMgh5j-8vATs1psaaL_MbRaHM4QH96bOTQ&usqp=CAU'),
(1, 'Coldplay', 'We have rainbow colored pianos',FALSE, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSWJo-KK_lGeeSL-Mq2sZ66MQaFVf-EyarESJ1Oz4tgdXuw8qsNu_U0Plw93zHFSt3rnk&usqp=CAU'),
(16, 'AC/DC', 'Highway to HEAVEN',TRUE, 'https://media.newyorker.com/photos/59095f7eebe912338a374b3a/master/w_2560%2Cc_limit/Michaud-ACDC.jpg'),
(1, 'Red Hot Chili Peppers', 'WE DO NOT LIKE SPICY FOOD',TRUE, 'https://junkee.com/wp-content/uploads/2019/02/330e12cfdf1ece78f3a80437944efea81.jpg'),
(12, 'Polyphia', 'Polyester clothes are nice',TRUE, 'https://www.metalsucks.net/wp-content/uploads/2019/02/polyphia-2019-1000x512.jpg'),
(26, 'Racer X', 'Racing to the top of the chart!',TRUE, 'https://img.discogs.com/S9dV1tB5jGemM8qXn5wO6CzYhE4=/600x406/smart/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/A-292457-1511350648-3269.jpeg.jpg'),
(30, 'Chon', 'Idk this band',TRUE, 'https://c8d8q6i8.stackpathcdn.com/wp-content/uploads/2020/12/CHON-Contact-Information.jpg'),
(34, 'Periphery', 'This one either',FALSE, 'https://i2.wp.com/metalinjection.net/wp-content/uploads/2019/06/periphery-2019.jpg?fit=955%2C500&ssl=1'),
(6, 'Megadeth', 'People with short hair not accepted',FALSE, 'https://www.gannett-cdn.com/-mm-/10f78fdfcafb6017b37c1e8f512a0aba2d9b5b25/c=90-814-5276-3744/local/-/media/2016/01/18/USATODAY/USATODAY/635887292620421830-Megadeth-s01-0057-final.jpg?width=3200&height=1808&fit=crop&format=pjpg&auto=webp'),
(48, 'test1', 'bleh',FALSE, null),
(48, 'test2', 'bleh',FALSE, null),
(48, 'all empty spots', 'empty',FALSE, null);


INSERT INTO instruments (name, instrument_image)
VALUES
('Guitar', 'https://cdn4.iconfinder.com/data/icons/musical-instruments-astute-vol-1/512/Electric_Guitar_1-1024.png'),
('Vocal', 'https://cdn0.iconfinder.com/data/icons/rock-and-roll-7/64/09-karaoke-singer-sing-speaker-microphone-technology-music-1024.png'),
('Bass', 'https://cdn2.iconfinder.com/data/icons/music-indigo-vol-1/256/Bass-1024.png'),
('Drums', 'https://cdn3.iconfinder.com/data/icons/music-ultra/60/Music_Ultra_012_-_Drums-1024.png'),
('Keyboard', 'https://cdn0.iconfinder.com/data/icons/electronics-and-devices-13/50/20-1024.png'),
('Violin', 'https://cdn2.iconfinder.com/data/icons/activity-5/50/1F3BB-violin--1024.png'),
('Cello', 'https://cdn2.iconfinder.com/data/icons/unigrid-phantom-devices-vol-3/60/017_141_cello_violincello_violin_music_instrument_audio_sound-1024.png');

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

--ALL empty spots
(13, 48, 1, 'guitar', 'asdf'),
(13, null, 2, 'guitar2', 'asdf'),
(13, null, 3, 'guitar3', 'asdf'),
(13, null, 4, 'guitar4', 'asdf'),
(13, null, 5, 'guitar5', 'asdf'),

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
(8, 48, 1, 'test guitar', 'blahblah'),

--Periphery
(9, 34, 1, 'Lead Guitarist', 'I play guitar fast good tones'),
(9, 35, 1, 'Lead Guitarist', 'I play guitar fast good tones'),
(9, 36, 4, 'Drummer', 'Drummer of Periphery'),
(9, 37, 2, 'Vocalist', 'Vocalist of Periphery'),
(9, 38, 1, 'Lead Guitarist', 'I play guitar fast good tones'),
(9, 48, 1, 'test guitar', 'blahblah'),

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
(5, 42, 1, 'Lead Guitarist', 'Album generator, released 12 solo albums and seven EPs.'),

--Test Spots
(11, 48, 1, 'test guitar', 'blahblah'),
(11, 12, 1, 'test guitar2', 'haha guitar tim henson'),
(11, null, 1, 'test guitar3', 'we want a third guitarist hehe'),
(12, 48, 1, 'test guitar', 'blahblah'),
(12, 13, 1, 'test guitar2', 'haha guitar scott'),
(12, null, 1, 'test guitar3', 'we want a third guitarist haha');


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
(47, 3),
(1, 4),
(1, 1),
(1, 6);

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
(10, 6),
(1, 11),
(1, 3),
(1, 8);

INSERT INTO band_genre(band_id, genre_id)
VALUES
(1, 4),
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


INSERT INTO spot_applications(spot_id, user_id, message)
VALUES
(3, 13, 'please accept'),
(3, 14, 'please accept'),
(2, 15, 'please accept'),
(2, 16, 'please accept'),
(2, 17, 'please accept');


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