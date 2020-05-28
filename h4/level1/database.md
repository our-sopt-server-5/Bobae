# User
| idx | name | id | password |
|------|------|------|------|
|0|   김보배  |   tree9295    |   fkdjalfjals |
|1|   최정균  |   wjdrbs96    |   dkssudwj    |
|2|   정형일  |   guddlfdk    |   gudddlfgud  |

# Article
|idx|author(User:idx)|title|content|
|------|------|------|------|
|0|0|안녕하세요|안녕하세요 여러분|
|1|0|왜 아무도 없지|왜 아무도 없는 것 같지....|
|2|1|나있어|저 있어요 여러분|
|3|2|나도있어|저도 있어요 여러분|

# Like
|idx|article(Article:idx)|User(User:idx)|
|--|--|--|
|0|0|1|
|0|0|2|
|0|1|1|
|0|1|2|
|0|3|0|

# Comment
|idx|article(Article:idx)|User(User:idx)|Comment|
|--|--|--|--|
|0|0|1|나있|
|0|0|2|나도있|
|0|1|1|여기여기|
|0|1|2|여기요|
|0|3|0|아있네|



