node.js 파일 실행 명령어

```
node (파일 이름)
```

# Node.js의 전역 객체

전역 변수

```
console.log("filename : ", __filename);     // 현재 파일 결로
console.log("dirname : ", __dirname);       // 현재 파일이 들어있는 디렉터리 경로
```



전역 객체

console : 콘솔 화면과 관련된 기능을 다루는 객체

exports : 모듈과 관련된 기능을 다루는 객체

process : 프로그램과 관현된 기능을 다루는 객체



console

```
console.log();				//콘솔창에 출력
console.time('str')			//시간 측정 시작		// 문자열은 타이머를 구분하기 위함
console.timeEnd('str');		//시간 측정 종료
```



process

```
// process.argv;           // 실행 매개변수 반환
// process.exit([exitCode=0]);     // 프로그램 종료

process.argv.forEach(function(item, index){
    console.log(index + ' : ' + typeof(item) + ' : ', item);

    // 실행 매개변수에 --exit가 있을 때
    if(item == '--exit'){
        // 다음 실행 매개변수 얻기
        var exitTime = Number(process.argv[index + 1]);

        // 일정 시간 후 프로그램 종료
        setTimeout(function(){
            process.exit();
        }, exitTime);
    }
})
```

실행 명령어

```
$ node (파일 이름) --exit 10000
```

출력

0 : string :  /usr/bin/node
1 : string :  /home/seongwon/workspace/Study/Nodejs/node.basic.js
2 : string :  --exit
3 : string :  10000

```
console.log(process.env);            // 컴퓨터 환경과 관련 정보 반환
console.log(process.version);        // node.js 버전 반환
console.log(process.versions);       // node.js와 종속된 프로그램 버전 반환
console.log(process.arch);           // 프로세서의 아키텍처 반환
console.log(process.platform);       // 플랫폼 반환
console.log(process.memoryUsage());  // 메모리 사용 정보 객체 리턴
console.log(process.uptime());       // 현재 프로그램 실행 시간 리턴
```



exports

모듈을 생성할 때 사용

module.js

```
exports.abs = function(number){         // 절대값 반환
    if(0<number){
        return number;
    }else{
        return -number;
    }
};

exports.circleArea = function(radius){  // 원의 넓이 반환
    return radius*radius*Math.PI;
};
```

main.js

```
// 모듈을 갖고올때 require 사용
var module = require('./module.js');

console.log('abs(-273) = %d', module.abs(-273));
console.log('circleArea(3) = %d', module.circleArea(3))
```

