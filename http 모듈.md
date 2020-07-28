## HTTP 모듈

server 객체

웹 서버 생성, 실행, 종료

```
var http = require('http');

// 웹 서버 생성
var server = http.createServer();

// 웹 서버 실행
server.listen(52273, function(){
    console.log('Server Running at http://127.0.0.1:52273');
});

// 서버 종료
setInterval(function(){
    server.close();
},10000);
```



server 이벤트

- request : 클라이언트가 요청할 때 발생
- connection : 클라이언트가 접속할 때  발생
- close : 서버 종료 시 발생
- checkContinue : 클라이언트가 지속적인 연결을 하고 있을 때 발생
- upgrade : 클라이언트가 HTTP 업그레이드 요청 시 발생
- clientError : 클라이언트에서 오류 발생 시 발생



response 객체

```
require('http').createServer(function(request, response){
    // 응답
    // writeHead : 응답 헤더 작성
    response.writeHead(200, {'Content_Type' : 'text/html'});
    // end : 응답 본문 작성
    response.end('<h1>Hello Web server with Node.js</h1>');
}).listen(52273, function(){
    console.log('Server Running at http://127.0.0.1:52273');
});
```



FileSystem 모듈을 사용한 HTML 페이지 제공

http.file.js

```
// 모듈 추출
var fs = require('fs');
var http = require('http');

// 웹 서버 생성 실행
http.createServer(function(request, response){
    // HTML 파일 읽기
    fs.readeFile('HTMLPage.html', function(error, data){
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.end(data);
    });
}).listen(52273, function(){
    console.log('Server Running at http://127.0.0.1:52273');
});
```

HTMLPage.html

```
<!DOCTYPE html>
<html>
<head>
    <title>Index</title>
</head>
<body>
    <h1>Hello Node.js</h1>
    <h2>Author. RintUanTta</h2>
    <hr/>
    <p>Lorem ipsum dolor sit amet.</p>
</body>
</html>
```

- http.file.js에서 readFile은 html 파일 뿐만 아니라 동영상, 이미지까지 모두 가능하다.
- MIME 형식
  - 다른 파일을 읽을 경우"Content-Type" : "text/파일 확장명" 또는 "image/파일 확장명" 또는 "video/파일 확장명" 또는 "audio/파일 확장명"으로 작성하면 된다.