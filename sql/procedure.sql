create procedure find_comment_by_song_id(_song_id LONG)
begin
    select s.name as "SongName", u.username as "Username", c.comment_time as "CommentTime", c.content as "Content"
    from comment c
             join music.song s on s.id = c.song_id
             join music.user u on u.id = c.user_id
    where c.song_id = _song_id
    order by comment_time desc;
end;

call find_comment_by_song_id(1);