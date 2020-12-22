(function () {
    $('body').css('overflow','hidden');
    $('body').attr('scroll','no');
    var CSS = {
        arena: {
            width: 900,
            height: 600,
            background: '#62247B',
            position: 'fixed',
            top: '50%',
            left: '50%',
            zIndex: '999',
            transform: 'translate(-50%, -50%)'
        },
        ball: {
            width: 15,
            height: 15,
            position: 'absolute',
            top: 0,
            left: 350,
            borderRadius: 50,
            background: '#C6A62F'
        },
        line: {
            width: 0,
            height: 600,
            borderLeft: '2px dashed #C6A62F',
            position: 'absolute',
            top: 0,
            left: '50%'
        },
        stick: {
            width: 12,
            height: 100,
            position: 'absolute',
            background: '#C6A62F'
        },
        stick1: {
            left: 0,
            top: 320
        },
        stick2: {
            right: 0,
            top: 320
        },
        score1:{
            position: 'absolute',
                fontSize:30,
                color:'white',
                left:10,
                top:5
                
        },
        score2:{
            position: 'absolute',
            fontSize:30,
            color:'white',
            left:780,
            top:5
        }

    };

    var CONSTS = {
    	gameSpeed: 50,
        score1: 0,
        score2: 0,
        stick1Speed: 16,
        stick2Speed: 16,
        ballTopSpeed: 0,
        ballLeftSpeed: 0
    };

    function start() {
        draw();
        setEvents();
        roll();
        loop();
    }

    function draw() {
        $('<div/>', {id: 'pong-game'}).css(CSS.arena).appendTo('body');
        $('<div/>', {id: 'pong-line'}).css(CSS.line).appendTo('#pong-game');
        $('<div/>', {id: 'score1' }).css(CSS.score1).appendTo('#pong-game');
        $('<div/>', {id: 'score2'}).css(CSS.score2).appendTo('#pong-game');
        $('<div/>', {id: 'pong-ball'}).css(CSS.ball).appendTo('#pong-game');
        $('<div/>', {id: 'stick-1'}).css($.extend(CSS.stick1, CSS.stick))
        .appendTo('#pong-game');
        $('<div/>', {id: 'stick-2'}).css($.extend(CSS.stick2, CSS.stick))
        .appendTo('#pong-game');

    }

    function setEvents() {
        $(document).on('keydown', function (e) {
            if (e.keyCode == 87) {
                if(parseInt(CSS.stick1.top)<=0)
                {
                    console.log("stick1 "+CSS.stick1.top);
                    CSS.stick1.top += 0;
                    $('#stick-1').css('top', CSS.stick1.top);    
                }
                else{
                CSS.stick1.top -= 20;
                $('#stick-1').css('top', CSS.stick1.top);
                }
            }
        });
        $(document).on('keydown', function (e) {
            if (e.keyCode == 83) {
                if(CSS.stick1.top+CSS.stick.height>=CSS.arena.height)
                {
                    console.log("stick1 "+CSS.stick1.top);
                    CSS.stick1.top += 0;
                    $('#stick-1').css('top', CSS.stick1.top);    
                }
                else{
                CSS.stick1.top += 20;
                $('#stick-1').css('top', CSS.stick1.top);
                }
            }
        });
        $(document).on('keydown', function (e) {
            if (e.keyCode == 38) {
                if(parseInt(CSS.stick2.top)<=0)
                {
                    CSS.stick2.top += 0;
                    $('#stick-2').css('top', CSS.stick2.top);    
                }
                else{
                CSS.stick2.top -= 20;
                $('#stick-2').css('top', CSS.stick2.top);
                }
            }
        });
        $(document).on('keydown', function (e) {
            if (e.keyCode == 40) {
                if(CSS.stick2.top+CSS.stick.height>=CSS.arena.height)
                {
                    console.log("stick2 "+CSS.stick2.top);
                    CSS.stick2.top += 0;
                    $('#stick-2').css('top', CSS.stick2.top);    
                }
                else{
                CSS.stick2.top += 20;
                $('#stick-2').css('top', CSS.stick2.top);
                }
            }
        });

    }

    function loop() {
        if(localStorage.getItem("score2")!=null)
        {
            CONSTS.score2=localStorage.getItem("score2");
        }
        else{
            CONSTS.score2=0;
            localStorage.setItem("score2", CONSTS.score2);
        }
        if(localStorage.getItem("score1")!=null)
        {
            CONSTS.score1=localStorage.getItem("score1");
        }
        else{
            CONSTS.score1=0;
            localStorage.setItem("score1", CONSTS.score1);
        }
        document.getElementById("score1").innerHTML="player1 "+localStorage.getItem("score1");
        document.getElementById("score2").innerHTML="player2 "+localStorage.getItem("score2");

        
        window.pongLoop = setInterval(function () {
            CSS.ball.left -= CONSTS.ballLeftSpeed;
            CSS.ball.top += CONSTS.ballTopSpeed;
            console.log("loop");
            if (CSS.ball.top <= 0 ||
                CSS.ball.top >= CSS.arena.height - CSS.ball.height) {
                CONSTS.ballTopSpeed = CONSTS.ballTopSpeed * -1;
                if(CONSTS.ballLeftSpeed<0)
                {
                    CONSTS.ballLeftSpeed=-CONSTS.stick1Speed;
                }
                else{
                    CONSTS.ballLeftSpeed=+CONSTS.stick2Speed;
                }
            }
            $('#pong-ball').css({top: CSS.ball.top,left: CSS.ball.left});
            if(parseInt(CSS.ball.left) <= (0+CSS.stick.width) && parseInt(CSS.ball.top) >= parseInt(CSS.stick1.top) && parseInt(CSS.ball.top) <= parseInt(CSS.stick1.top+CSS.stick.height)){
                CONSTS.ballLeftSpeed=-CONSTS.stick1Speed;
            }
            
            else if(parseInt(CSS.ball.left+CSS.ball.width)>=parseInt(CSS.arena.width-CSS.stick.width) && parseInt(CSS.ball.top)>=parseInt(CSS.stick2.top) && parseInt(CSS.ball.top)<=parseInt(CSS.stick2.top+CSS.stick.height)){
                CONSTS.ballLeftSpeed=+CONSTS.stick2Speed;
            }
            else if (CSS.ball.left <= CSS.stick.width) {
                CONSTS.score2++;
                localStorage.setItem("score2", CONSTS.score2);
                document.getElementById("score2").innerHTML="player2 "+localStorage.getItem("score2");
            	CSS.ball.top > CSS.stick1.top && CSS.ball.top < CSS.stick1.top + CSS.stick.height && (CONSTS.ballLeftSpeed = CONSTS.ballLeftSpeed * -1) || roll(); 
                if(CONSTS.score2>=5)
                {
                    winner();
                    roll();
                    alert("player 2 kazandı");
                }
            }
            else if (CSS.ball.left >= CSS.arena.width - CSS.ball.width - CSS.stick.width) {
                CONSTS.score1++;
                localStorage.setItem("score1", CONSTS.score1);
                document.getElementById("score1").innerHTML="player1 "+localStorage.getItem("score1");
                roll();
                if(CONSTS.score1>=5)
                {
                    winner();
                    alert("player 1 kazandı");
                    roll();
                }
            }

        }, CONSTS.gameSpeed);
    }

    function roll() {
        CSS.ball.top = 250;
        CSS.ball.left = 450;
        var topSide=Math.random();
        var side = Math.random();

        if (side < 0.5) {
            side = 1;
        }
        else{
            side=-1;
        }
        if (topSide < 0.5) {
            topSide = 1;
        }
        else{
            topSide=-1;
        }

        CONSTS.ballTopSpeed = Math.random() * 2 +(5*topSide);
        CONSTS.ballLeftSpeed = side * (Math.random() * 2 + 3);
    }
    function winner(){
        CSS.stick2.top=320;
        $('#stick-2').css('top', CSS.stick2.top); 
        CSS.stick1.top=320;
        $('#stick-1').css('top', CSS.stick1.top);
        CONSTS.score2=0;
        CONSTS.score1=0;
        localStorage.removeItem("score1");
        localStorage.removeItem("score2");
        document.getElementById("score1").innerHTML="player1 "+CONSTS.score1;
        document.getElementById("score2").innerHTML="player2 "+CONSTS.score2; 
    }
    start();
})();
