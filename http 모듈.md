## HTTP 모듈

### server 객체

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



### response 객체

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
  
  

쿠키 생성

쿠키란? 키와 값이 들어있는 작은 데이터 조각 -> 이름,  값, 파기 날짜, 경로 정보

```
// 쿠키 저장 및 출력
var http = require('http');

// 서버 생성 실행
http.createServer(function(request, response){
    // 변수 생성
    var date = new Date();
    date.setDate(date.getDate() + 7);

    // 쿠키 입력
    response.writeHead(200, {
        'Content-Type' : 'text/html',
        'Set-Cookie' : [
            'breakfast = toast; Expires = ' + date.toUTCString(),
            'dinner = chicken'
        ]
    })

    // 쿠키 출력
    response.end('<h1>' + request.headers.cookie + '</h1>');
}).listen(52273, function(){
    console.log('Server Running at http://127.0.0.1/52273');
```



페이지 강제 이동

```
// 모듈 추출
var http = require('http');

// 웹 서버 생성 및 실행
http.createServer(function(request, response){
    response.writeHead(302, {'Location' : 'http://hanb.co.kr'});
    response.end();
}).listen(3000, function(){
    console.log('Server Running at http://localhost:3000');
})
```

http://hanb.co.kr 이 링크로 강제 이동하게 된다

- writeHead() 메서드의 첫 번째 매개변수 = HTTP Status Code
  - 1xx : 처리중
  - 2xx : 성공
  - 3xx : 리다이렉트
  - 4xx : 클라이언트 오류
  - 5xx : 서버 오류
- 302는 페이지 강제 이동을 의미한다.
- 404로 하는 경우 '웹 페이지를 찾을 수 없습니다' 오류 발생



### request 객체

server 객체의 request 이벤트가 발생할 때 이벤트 리스너의 첫 번째 매개변수에 request 객체가 들어간다

객체 속성

- method : 클라이언트 요청 방식 나타냄
- url : 클라이언트가 요청한 url 나타냄
- headers : 요청 메시지 헤더를 나타냄
- trailers : 요청 메시지 트레일러를 나타냄
- http/Version : HTTP 프로토콜 버전을 나타냄



url 속성을 사용한 페이지 구분

index.html

```
<!DOCTYPE html>
<html>
<head>
    <title>Index</title>
</head>
<body>
    <h1>Hello, Node.js _ Index</h1>
    <h2>Author . RinIanTta</h2>
    <hr/>
    <p>Lorem ipsum dolor sit amet</p>
</body>
</html>
```

OtherPage.html

```
<!DOCTYPE html>
<html>
<head>
    <title>OtherPage</title>
</head>
<body>
    <h1>Hello, Node.js _ OtherPage</h1>
    <h2>Author. RinIanTta</h2>
    <hr/>
    <p>Lorem ipsum dolor sit amet</p>
</body>
</html>
```

app.js

```
// 모듈 추출
var http = require('http');
var fs = require('fs');
var url = require('url');
const { EFAULT } = require('constants');
const { waitForDebugger } = require('inspector');

// 서버 생성 및 실행
http.createServer(function(request, response){
    // 변수 선언
    var pathname = url.parse(request.url).pathname;

    // 페이지 구분
    if(pathname == '/'){
        // index.html 파일 읽기
        fs.readFile('index.html', function(error, data){
            // 응답
            response.writeHead(200, {
                'Content-Type' : 'text/html'
            });
            response.end(data);
        });
    } else if(pathname == '/OtherPage'){
        // OtherPage.html 파일 읽기
        fs.readFile('OtherPage.html', function(error, data){
            response.writeHead(200, {
                'Content-Type' : 'text/html'
            });
            response.end(data);
        });
    }
}).listen(3000, function(){
    console.log('Server Running at http:/localhost:3000');
})
```

- 페이지 구분에서 첫 번째 if는 메인 주소를 뜻한다

- else if의 경로는 또 다른 주소를 뜻한다.

- var pathname = url.parse(request.url).pathname;
  - 이 코드가 있어야만 페이지 구분이 가능



method 속성을 사용한 페이지 구분

```
var http = require('http');

http.createServer(function(request, response){
    if(request.method =='GET'){
        console.log('GET 요청입니다.');
    }else if(request.method == 'POST'){
        console.log('POST 요청입니다.');
    }
}).listen(3000, function(){
    console.log('Server Rubbubg at http://localhost:3000');
});
```

GET과 POST 요청 구분



GET 요청 매개변수 추출

```
var http = require('http');
var url = require('url');

http.createServer(function(request, response){
    // 요청 매개변수 추출
    var query = url.parse(request.url, true).query;

    // GET 요청 매개변수 출력
    response.writeHead(200, {'Constent-Type' : 'text/html'});
    response.end('<h1>' + JSON.stringify(query) + '</h1>');
}).listen(3000, function(){
    console.log('Server Running')
});
```

http://localhost:3000/?name=seongwon&region=jeju 주소 입력 시, 화면에 쿼리 값 출력



POST 요청 매개변수 추출

HTMLPage.html

```
<!DOCTYPE html>
<html>
<head>
    <title>Noder.js Example</title>
</head>
<body>
    <h1>Send Data With POST Method</h1>
    <form method='post'>
        <table>
            <tr>
                <td><label>Data A</label></td>
                <td><input type='text' name='data_a'/></td>
            </tr>
            <tr>
                <td><label>Data B</label></td>
                <td><input type='text' name='data_b'/></td>
            </tr>
        </table>
        <input type='submit'/>
    </form>
</body>
</html>
```

- data_a, data_b 입력하고 제출하는 html

request.post.js

```
var http = require('http');
var fs = require('fs');

http.createServer(function(request, response){
    if(request.method == 'GET'){
        //GET 요청
        fs.readFile('HTMLPage.html', function(error, data){
            response.writeHead(200, {'Content_type' : 'text/html'});
            response.end(data);
        });
    }else if(request.method == 'POST'){
        // POST 요청
        request.on('data', function(data){
            response.writeHead(200, {'Content_Type' : 'text/html'});
            response.end('<h1>' + data + '</h1>');
        });
    }
}).listen(3000, function(){
    console.log('Server Running');
});
```

- GET 요청이 발생하여 홈페이지 접속
- 데이터 입력 후 제출하면 POST 요청 발생하여 화면에 데이터 출력



쿠키 생성 및 추출

```
// 모듈 추출
var http = require('http');

// 모듈 사용
http.createServer(function(request, response){
    // get cookie
    var cookie = request.headers.cookie;

    // ser cookie
    response.writeHead(200, {
        'Content_Type' : 'text/html',
        'Set-Cookie' : ['name = Seongwon', 'region = Jeju']
    });

    // 응답
    response.end('<h1>' + JSON.stringify(cookie) + '</h1>');
}).listen(3000, function(){
    console.log('Server Running');
});
```



쿠키 분해

```
var http = require('http');

http.createServer(function(request, response){
    // 쿠키 추출 후 분해
    var cookie = request.headers.cookie;
    cookie = cookie.split(';').map(function(element){
        var element = element.split('=');
        return {
            key : element[0],
            value : element[1]
        };
    });

    // 쿠키 생성
    response.writeHead(200, {
        'Content-Type' : 'text./html',
        'Set-Cookie' : ['name = Seongwon', 'region = Jeju']
    });

    // 응답
    response.end('<h1>' + JSON.stringify(cookie) + '</h1>');
}).listen(3000, function(){
    console.log('Server Running');
});
```

