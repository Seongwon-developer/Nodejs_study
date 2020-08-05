exports.index = function(req, res){
  res.render('index', {
    title : '간단한 ToDoList 예제 실습'
  });
};