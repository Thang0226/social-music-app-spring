
# Comment
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

create procedure find_comment_by_playlist_id(_playlist_id LONG)
begin
    select pl.name as "PlaylistName", u.username as "Username", c.comment_time as "CommentTime", c.content as "Content"
    from comment c
             join playlist pl on pl.id = c.playlist_id
             join music.user u on u.id = c.user_id
    where c.playlist_id = _playlist_id
    order by comment_time desc;
end;

call find_comment_by_playlist_id(1);

create procedure find_comment_by_singer_id(_singer_id LONG)
begin
    select s.singer_name as "SingerName", u.username as "Username", c.comment_time as "CommentTime", c.content as "Content"
    from comment c
             join singer s on s.id = c.singer_id
             join music.user u on u.id = c.user_id
    where c.singer_id = _singer_id
    order by comment_time desc;
end;

call find_comment_by_singer_id(1);