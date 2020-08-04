## express 모듈

express 모듈이란?

- http 모듈에 여러 기능을 추가해 쉽게 사용할 수 있게 만든 모듈

### 기본 서버

```
// 모듈 추출
var http = require('http');
var express = require('express');

// 서버 생성
var app = express();

// request 이벤트 리스너 설정
app.use(function(request, response){
    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.end('<h1>Hello Express</h1>');
});

// 서버 실행
http.createServer(app).listen(3000, function(){
    console.log('Server Running');
});
```



### 기본 응답 메서드

메서드 종류

- send() : 매개변수의 자료형에 따라 적절한 형태로 응답
- json() : JSON 형태로 응답
- jsonp() : JSONP 형태로 응답
- redirect() : 웹 페이지 경로 강제 이동



send() 메서드

send() 메서드의 매개변수

| 자료형 | 설명 |
| ------ | ---- |
| 문자열 | HTML |
| 배열   | JSON |
| 객체   | JSON |



send()를 이용하여 응답하기

```
var http = require('http');
var express = require('express');

var app = express();

// 서버 생성
app.use(function(request, response){
    // 데이터 생성
    var output = [];
    for(var i=0; i<3; i++){
        output.push({
            count: i,
            name: 'name - ' + i
        });
    }

    // JSON 형식으로 응답
    response.send(output);
});

// 서버 실행
http.createServer(app).listen(3000, function(){
    console.log('Server Running');
});
```

- send(404, '<h1>에러다아아아아</h1>>') 코드는 두 번째 인자 값인 문자열을 출력하는 에러 페이지 출력



### 기본 요청 메서드

request 객체의 메서드

| 메서드 이름 | 설명                               |
| ----------- | ---------------------------------- |
| header()    | 요청 헤더의 속성을 지정 또는 추출  |
| accepts()   | 요청 헤더의 Accept 속성 확인       |
| param()     | 요청 매개변수 추출                 |
| is()        | 요청 헤더의 Content-Type 속성 확인 |



header()를 이용하여 속성 추출

```
var http = require('http');
var express = require('express');

// 서버 생성
var app = express();

// 미들웨어 설정
app.use(function(request, response){
    // User-Agent 속성 추출
    var agent = request.header('User-Agent');
    
    // 콘솔창에 속성 추출
    console.log(request.headers);
    console.log(agent);

    response.send(200);
});

// 서버 실행
http.createServer(app).listen(3000, function(){
    console.log('Server Running');
});
```

- 콘솔창에 User-Agent 속성값들을 출력

```
var http = require('http');
var express = require('express');

var app = express();

app.use(function(request, response){
    var agent = request.header('User-Agent');

    // 브라우저가 크롬인지 아닌지 확인
    if(agent.toLowerCase().match(/chrome/)){
        // 크롬이라면 Hello Chrome 출력
        response.send('<h1>Hello Chrome</h1>');
    }else{
        // 크롬이 아니라면 Hello Express 출력
        response.send('<h1>Hello Express</h1>');
    }
});

http.createServer(app).listen(3000, function(){
    console.log('Server Running');
});
```



param() 메서드를 사용한 요청 매개변수 추출

```
// 모듈 추출
var http = require('http');
var express = require('express');

// 서버 생성
var app = express();

// 미들웨어 구축
app.use(function(request, response){
    // 변수 선언
    var name = request.param('name');
    var region = request.param('region');

    // 응답
    response.send('<h1>' + name + ' - ' + region + '</h1>');
});

// 서버 실행
http.createServer(app).listen(3000, function(){
    console.log('Server Running');
});
```

- http://localhost:3000/?name=seongwon&region=jeju 주소 입력시 이름과 지역이 출력
- http://localhost:3000 이것만 입력하면은 요청 매개변수가 존재하지 않으므로 undifined 두개 출력



### 미들웨어 개요

미들웨어란?

클라이언트와 서버를 연결하여 서로 데이터를 주고 받을 수 있도록 중간에서 매개 역할을 하는 소프트웨어이다

http 모듈을 이용하여 미들웨어를 만들 때,  request를 사용하지 않은 것을 알 수 있다

그러나, express 모듈을 이용하면은 use를 이용하여 request를 사용했음을 알 수 있다

그리고 use는 여러번 사용이 가능하며 http 모듈을 사용하여 미들웨어를 설정할 때는 한 번밖에 안된다.

따라서 미들웨어를 여러 개를 구축하기 위해 express를 사용하는 것이다

use 메서드는 request, response, next 이렇게 3가지 매개변수가 있다

```
// 모듈 추출
var http = require('http');
var express = require('express');

// 서버 생성
var app = express();

// 미들웨어 설정
app.use(function(request, response, next){
    console.log('1 미들웨어');
    next();         // 다음 미들웨어가 실행될 수 있도록
});

// 두 번째 미들웨어 설정
app.use(function(request, response, next){
    console.log('2 미들웨어');
});

// 서버 실행
http.createServer(app).listen(3000, function(){
    console.log('Server Running');
});
```

- next()를 사용해야만 다음 미들웨어를 실행할 수 있다

- 실행 결과 콘솔창을 보면 1 미들웨어 2 미들웨어가 출력이 된 것을 볼 수 있다



미들웨어를 사용한 속성 추가

```
// 모듈 추출
var http = require('http');
var express = require('express');

// 서버 생성
var app = express();

// 미들웨어 설정
app.use(function(request, response, next){
    // 데이터 추가
    request.number = 52;
    response.number = 273;
    next();         // 다음 미들웨어로
});

// 두 번째 미들웨어 설정
app.use(function(request, response, next){
    // 응답하기
    response.send('<h1>' + request.number + ' : ' + response.number + '</h1>');
});

// 서버 실행
http.createServer(app).listen(3000, function(){
    console.log('Server Running');
});
```



여러개의 미들웨어를 사용하는 이유

- 미들웨어의 종류가 이미 다양하다
- 미들웨어의 종류

| 미들웨어       | 설명                                       |
| -------------- | ------------------------------------------ |
| logger         | 로그 정보 출력                             |
| csrf           | CSEF 보안 수행                             |
| basicAuth      | 기본적은 인증 수행                         |
| bodyParser     | POST 요청 매개변수 추출                    |
| cookieParser   | 쿠키 분해                                  |
| session        | 세션 처리 수행                             |
| methodOverride | 다양한 요청 방식을 수행할 수 있게          |
| responseTime   | 응답 시간 계산                             |
| router         | 페이지 라우트 수행                         |
| staticCache    | 정적인 미들웨어를 위한 메모리 캐시 층 생성 |
| static         | 특정 폴더를 서버의 루트 폴더에 올림        |
| directory      | 서버의 디렉터리 구조 보여줌                |
| vhost          | 가상 호스트 설정                           |
| favicon        | 파비콘 생성                                |
| limit          | POST 요청의 데이터 제한                    |
| errorHandler   | 예외 처리 수행                             |

미들웨어는 재사용이 가능

즉 여러 개발자들이 직접 만들 수 있고 배포까지 가능

사용 예시

```
var express = require('express');

app = express();

app.use(express.logger());			// 이미 만들어진 미들웨어를 사용한 것
app.use(express.function(){			// 자신이 미들웨어를 직접 만든 것
	~~ code ~~
});
```

### logger 미들웨어

```
// 모듈 추출
var http = require('http');
var express = require('express');

// 서버 생성
var app = express();

// logger 미들웨어 생성, 호출 방식과 호출 시간 출력
app.use(express.logger(':method + :date'));
// 미들웨어 생성
app.use(function(request, response){
    response.send('<h1>express Basic</h1>');
});

// 서버 실행
http.createServer(app).listen(3000, function(){
    console.log('Server Running');
});
```

- 콘솔 창에 보면 로거가 출력되어 있다.
- 여기서 logger란?
  - 데이터 정보들을 의미한다.
- 로거 미들웨어의 토큰

| 토큰           | 설명                     |
| -------------- | ------------------------ |
| :req[header]   | 요청 헤더를 나타냄       |
| :res[header]   | 응답 헤더를 나타냄       |
| :http-version  | http 버전을 나타냄       |
| :response-time | 응답 시간을 나타냄       |
| :remote-addr   | 원격 주소를 나타냄       |
| :date          | 요청 시간을 나타냄       |
| :method        | 요청 방식을 나타냄       |
| :url           | 요청 URL을 나타냄        |
| :referrer      | 이전 URL을 나타냄        |
| :User-Agent    | 사용자 에이전트를 나타냄 |
| :status        | 상태 코드를 나타냄       |

- 여러 토큰을 하나로 묶는 기본 형식

| 형식    | 설명                                                         |
| ------- | ------------------------------------------------------------ |
| default | remote-addr, date, method, url. http-version, status, res, referrer, user-agent |
| short   | remote-addr, method, url, http-version, status, res, response-time |
| tiny    | method, url, status, res, response-time                      |



### static 미들웨어

웹 서버에서 파일을 제공하는 방법 제공

```
// 모듈 추출
var http = require('http');
var express = require('express');

// 서버 생성
var app = express();

// logger 미들웨어 생성
app.use(express.logger());
// static 미들웨어 생성
app.use(express.static(__dirname + '/public'));
app.use(function(request, response){
    // 응답
    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.end("<img src='me.jpg' width='100%' />");
});

// 서버 실행
http.createServer(app).listen(3000, function(){
    console.log('Server Running');
});
```

- 웹 페이지에 사진이 뜬 것을 볼 수 있음



### router 미들웨어

페이지 라우팅을 구현하는 미들웨어

페이지 라우팅은 클라이언트 요청에 적절한 페이지를 제공하는 기술

```
// 모듈 추출
var http = require('http');
var express = require('express');

// 서버 생성
var app = express();

// 미들웨어 생성
app.use(express.logger());
app.use(app.router);

// 라우터 설정
app.get('/page/:id', function(request, response){
    // 변수 생성
    var name = request.param('id');

    // 응답
    response.send('<h1>' + name + ' Page</h1>');
});

// 서버 실행
http.createServer(app).listen(3000, function(){
    console.log('Server Running');
});
```

- localhost:3000/page/273 -> 페이지에 273 Page 출력

