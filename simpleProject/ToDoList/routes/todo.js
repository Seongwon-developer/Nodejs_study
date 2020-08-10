var fs = require('fs');

// todo 목록 가져오기
exports.list = function(req, res){
    fs.exists('./todo_list.json', function(exits){      // todo 목록 존재 확인
        if(exits){      // 존재한다면
            fs.readFile('./todo_list.json', {       // 파일을 읽어라
                'encoding' : 'utf8'     // utf8 인코딩 방식으로 읽어라
            }, function(err, list){
                res.json(list);     // 페이지에 보여줘라
            });
        }else{      // 존재 안하면
            var list = {        // list 객체는 비어있음
                'list' : []
            };

            // 바로 위에서 만든 빈 객체를 json 파일로 파일 생성
            fs.writeFile('./todo_list.json', JSON.stringify(list), function(err){
                res.json(list);     // 페이지에 빈걸 보여줘라
            });
        }
    });
};

// 새로운 todo 생성
exports.add = function(req, res){
    var todo = {        // todo 항목 형식
        'contents' : '',
        'complete' : false
    };

    todo.contents = req.body.contents;

    fs.writeFile('./todo_list.json', {
        'encoding' : 'utf8'
    }, function(err, data){
        data = JSON.parse(data);

        data.list.push(todo);       // 항목 추가

        fs.writeFile('./todo_list.json', JSON.stringify(data), function(err){       // 마무으리
            res.json(true);
        });
    });
};

exports.complete = function(req, res){      // 선택한 todo 항목 완료
    fs.readFile('./todo_list.json', {
        'encoding' : 'utf8'
    }, function(err, data){
        data = JSON.parse(data);

        data.list[req.body.index].complete = true;

        fs.writeFile('./todo_list.json', JSON.stringify(data), function(err){
            res.json(true);
        });
    });
};

exports.del = function(req, res){       // 선택한 todo 항목 삭제
    fs.readFile('./todo_list.json', {
        'encoding' : 'uf8'
    }, function(err, data){
        data = JSON.parse(data);

        data.list[req.body.index] = null;
        data.list = data.list.filter(Boolean);

        fs.writeFile('./todo_list.json', JSON.stringify(data), function(err){
            res.json(true);
        });
    });
};
