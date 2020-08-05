var express = require('express');
var routes = require('./routes');
var todo = require('./routes/todo');
var http = require('http');
var path = require('path');

var app = express();
var port = 3000;

// 어플리케이션 설정
app.configure(function(){
  app.set('port', port);                  // 웹 서버 포트
  app.set('view', __dirname + '/views');  // 템플릿
  app.set('view engine', 'ejs');          // 템플릿 엔진
  app.use(express.favicon());             // 파비콘
  app.use(express.logger('dev'));         // 로그 기록
  app.use(express.bodyParser());          // 요청 본문 파싱
  app.use(express.methodOverride());      // 구식 브라우저 메소드 지원
  app.use(app.router);                    // 라우팅

  // 정적 리소스 처리
  app.use(require('stylus'.middleware(__dirname + '/public')));
  app.use(require.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){    // 개발 버전
  app.use(express.errorHandler());          // 에러 메세지
});

// 라우팅
app.get('/', routes.index);
app.get('/list', todo.list);
app.post('/add', todo.add);
app.post('/complete', todo.complete);
app.post('/del', todo.del);

// 서버 실행
http.createServer(app).listen(app.get('port'), function(){
  console.log('Server Running');
});

// module.exports = app;
