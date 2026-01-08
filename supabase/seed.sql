-- Clear existing data
TRUNCATE TABLE line_templates, words, word_categories RESTART IDENTITY CASCADE;

-- Insert word categories
INSERT INTO word_categories (id, name) VALUES
(1, '食べ物'),
(2, '場所'),
(3, '動作'),
(4, '挨拶'),
(5, '必殺技');

-- Insert words
INSERT INTO words (content, word_category_id) VALUES
('りんご', 1),
('バナナ', 1),
('みかん', 1),
('公園', 2),
('図書館', 2),
('駅', 2),
('歩く', 3),
('走る', 3),
('食べる', 3),
('おはよう', 4),
('こんにちは', 4),
('さようなら', 4),
('ファイアボール', 5),
('サンダー', 5),
('アイスストーム', 5);

-- Additional cute, story-like lines

INSERT INTO line_templates (content, word_category_id, motion_name) VALUES
-- 食べ物（+5）
('{{word}}を見つけたよ。{{word}}を見るだけで、{{word}}の味を思い出しちゃうの。', 1, 'rolling'),
('ねえねえ、{{word}}って好き？わたしは{{word}}が大好きで、今日も{{word}}の話しちゃう。', 1, 'damaged'),
('{{word}}をひとくち食べたら、止まらなくなっちゃった。{{word}}ってずるいよね。', 1, 'attack'),
('今日はちょっとがんばったから、ごほうびに{{word}}だよ。{{word}}で元気でたの。', 1, 'confused'),
('{{word}}があれば大丈夫。{{word}}があるだけで、なんだか安心するんだ。', 1, 'shifty'),

-- 場所（+5）
('{{word}}って落ち着くよね。{{word}}にいると、時間がゆっくり流れる気がするの。', 2, 'attack'),
('{{word}}でね、ちょっと楽しいことがあったの。また{{word}}で話したいな。', 2, 'confused'),
('今日は{{word}}までおでかけしたよ。{{word}}に行く道も好きなんだ。', 2, 'shifty'),
('{{word}}に着いたとき、ちょっとわくわくしたの。{{word}}って不思議な場所だね。', 2, 'rolling'),
('もし迷ったら{{word}}に来てね。{{word}}ならきっと会えるよ。', 2, 'damaged'),

-- 動作（+5）
('{{word}}てみたら、思ったより楽しかったよ。{{word}}るの、いいかも。', 3, 'confused'),
('今日は気分転換に{{word}}たの。{{word}}たら、少し元気になったよ。', 3, 'attack'),
('{{word}}てるとね、いろんなこと忘れられるんだ。{{word}}って大事だね。', 3, 'damaged'),
('一緒に{{word}}たいな。{{word}}たら、もっと仲良くなれそう。', 3, 'shifty'),
('ちょっとだけ{{word}}てみよっか。{{word}}くらいがちょうどいいよ。', 3, 'rolling'),

-- 挨拶（+5）
('{{word}}って言うの、ちょっとドキドキするけど、{{word}}は大事だよね。', 4, 'damaged'),
('{{word}}！って声に出したら、気持ちが明るくなったよ。', 4, 'rolling'),
('{{word}}って言われると、なんだか安心するの。だから{{word}}って返したよ。', 4, 'shifty'),
('今日はちゃんと{{word}}って言えたよ。{{word}}できてえらいでしょ。', 4, 'attack'),
('{{word}}の一言で、今日が始まる気がするんだ。', 4, 'confused'),

-- 必殺技（+5）
('{{word}}の準備はばっちりだよ。{{word}}で決めるって決めてたの。', 5, 'shifty'),
('{{word}}いくよー！{{word}}って叫んだら、勇気が出てきたの。', 5, 'attack'),
('ちょっとこわかったけど、{{word}}を信じたよ。{{word}}は裏切らないもん。', 5, 'confused'),
('{{word}}を使うのは今しかないと思ったの。だから{{word}}したよ！', 5, 'damaged'),
('最後はやっぱり{{word}}だよね。{{word}}でえいっ！ってしたの。', 5, 'rolling');
