$(window).load(function() {

    $(".top-demo div").each(function() {
        $(this).circulate({
            speed: Math.floor(Math.random()*300) + 100,
            height: Math.floor(Math.random()*1000) - 470,
            width: Math.floor(Math.random()*1000) - 470
        });
    }).click(function() {
        $(this).circulate({
            speed: Math.floor(Math.random()*300) + 100,
            height: Math.floor(Math.random()*1000) - 470,
            width: Math.floor(Math.random()*1000) - 470
        });
    });
        
    $("#recurssive-button").click(function() {
        if ($(this).text() == "Start") {
            $("#text-demo span").circulate({
                loop: true,
                width: 150,
                height: 10
            });
            $(this).text("Stop");
        } else {
            $("#text-demo span").circulate("Stop");
            $(this).text("Start");
        }       
    });   
    
    $("#unicorn").css("left", $("#unicorn").position().left).circulate({
            sizeAdjustment: 160,
            speed: 2000,
            width: -820,
            height: 50,
            loop: true,
            zIndexValues: [1, 50, 50, 1]
    });

    function startBallOne() {
        $("#orange-ball").circulate({
            speed: 4000,
            height: 100,
            width: -700,
            sizeAdjustment: 40,
            loop: true,
            zIndexValues: [1, 1, 3, 3]
        });
    }
    
    function startBallTwo() {
        $("#blue-ball").circulate({
            speed: 4000,
            height: 120,
            width: -700,
            sizeAdjustment: 35,
            loop: true,
            zIndexValues: [2, 2, 2, 2]
        })
    }
    
    function startBallThree() {
        $("#green-ball").circulate({
            speed: 4000,
            height: 140,
            width: -700,
            sizeAdjustment: 30,
            loop: true,
            zIndexValues: [3, 3, 1, 1]
        }).fadeIn();
    }
            
    startBallOne();
    setTimeout(startBallTwo, 2000);
    setTimeout(startBallThree, 4000);
    
});