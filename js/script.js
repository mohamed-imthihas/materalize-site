(function( func ) {
    $.fn.addClass = function() { // replace the existing function on $.fn
        func.apply( this, arguments ); // invoke the original function
        this.trigger('classChanged'); // trigger the custom event
        return this; // retain jQuery chainability
    }
})($.fn.addClass); // pass the original function as an argument


 var images = $(".big-image li");

$('document').ready(function() {
    //preloader function
    $(window).load(function() {
        $('.preloader-bg').fadeOut('slow');
        $('body').removeClass("overflow-hide");
        window.scrollBy(0, 10);
    });
       
    /*for animations*/
    var options = [{
            selector: '#about',
            offset: 100,
            callback: function(el) {
                $(el).removeClass("hide-card").addClass("animated fadeInUp");
            }
        },
        /*news part*/
        {
            selector: '.news',
            offset: 400,
            callback: function(el) {
                $($(el).children()[1]).removeClass("hide-card").addClass("animated slideInRight");
                $($(el).children()[2]).removeClass("hide-card").addClass("animated slideInLeft");
                $($(el).children()[3]).removeClass("hide-card").addClass("animated slideInRight");
                $($(el).children()[4]).removeClass("hide-card").addClass("animated slideInLeft");
            }
        },
        /*form part*/
        {
            selector: '.form',
            offset: 100,
            callback: function(el) {
                $($(el)).removeClass("hide-card").addClass("animated zoomInUp");
            }
        },
        /*rooms part*/
        {
            selector: '.sticky-action:nth-child(4)',
            offset: 200,
            callback: function(el) {
                $($(el)).removeClass("hide-card");
                $($(el).children()[0]).addClass("animated bounceInLeft");
                $($(el).children()[1]).addClass("animated bounceInRight");
            }
        }, {
            selector: '.sticky-action:nth-child(2)',
            offset: 200,
            callback: function(el) {
                $($(el)).removeClass("hide-card");
                $($(el).children()[0]).addClass("animated bounceInLeft");
                $($(el).children()[1]).addClass("animated bounceInRight");
            }
        }, {
            selector: '.sticky-action:nth-child(3)',
            offset: 200,
            callback: function(el) {
                $($(el)).removeClass("hide-card");
                $($(el).children()[0]).addClass("animated bounceInLeft");
                $($(el).children()[1]).addClass("animated bounceInRight");
            }
        },
        {
            selector:'#gallery',
            offset: 200,
            callback: function(el){
                intializeSlider();
                $('.slider .indicators .indicator-item').css("transition", "all 2s ease-out");
            }
        }
    ];
    var winHeight = $(window).height() - 100;
    //for materialize component intialization
    Materialize.scrollFire(options);
    $('#home .slider').slider({
        full_width: true,
        height: winHeight,
        indicators: false
    });
    $('.gallery-slide.slider').slider({height:530});
    $('.modal-trigger').leanModal();
    $('.materialboxed').materialbox();
    $('.scrollspy').scrollSpy({
        scrollOffset: 65
    });
    $('#amenities_carousel').carousel({
        dist: 0,
        shift: -25,
        padding: -25
    });
    $(".hb-menu-icon").sideNav({
        closeOnClick: true
    });
    $(".big-image li").on('classChanged', function(){ 
        var getPic=($($(this).children()[0] ).css("background-image"));
        $(".gallery-bg").css("background-image",getPic);
    });
    /*promo video*/
    $(".play_btn").on("click",function(){
        $(".play").hide();
        $("#video-hd").get(0).play();
        $(".waterfall").css("display","block");
        $(".wrapper").css("display","none");
    });
     $("#stop").on("click",function(){        
        $("#video-hd").get(0).pause();
        $(".waterfall").css("display","none");
        $(".wrapper").css("display","block");            
        $("#video-hd").src="";
     });
     
 $(".aloft").on("click",function(){
    videoclick();   
 });
 var videoclick=function(){
 var val=$("#video-hd");
    var video_val=val.get(0);
    
    
    if(video_val.paused)
    {
        video_val.play();
        $(".play").hide();
        
        
    }
    else
    {
        video_val.pause();
        $(".play").show();
        
        
    }
}
 $(".video_play").on("click",function(){
    videoclick();   
        
 });
});


function closeNav() {
    var menuIcon = $(".hb-menu-icon").children()[0];
    if ($(menuIcon).hasClass("hb-menu-icon--to-arrow")) {
        $(menuIcon).removeClass("hb-menu-icon--to-arrow");
        $(menuIcon).addClass("hb-menu-icon--from-arrow");
    }
    if ($(window).scrollTop() < 100) {
        $('nav').addClass("transparent");
        $('nav').removeClass("head-fix");
    }
}


/*for scroll effects*/
$(window).scroll(function() {
    //to slow down video scrolling speed
    var pos = $(this).scrollTop() / 4;
    $(".video-container").css('transform', 'translateY(' + pos + 'px)');
    //to show and hide back to top,nav bar
    if ($(this).scrollTop() > 100) {
        $('nav').addClass("head-fix");
        $('nav').removeClass("transparent");
        $('.down-button').fadeOut();
        $('.back-to-top').fadeIn(500);
        $(".social-style").show();
    } else {
        $('nav').addClass("transparent");
        $('nav').removeClass("head-fix");
        $('.down-button').fadeIn();
        $('.back-to-top').fadeOut(500);
        $(".social-style").hide();
    }
    if ($("#slide-out li:last-child a").hasClass("active")) {
        $(".social-style").addClass("show");
    } else {
        $(".social-style").removeClass("show");
    }
});
// amenities carousel controls
$("#left-btn").on("click", function() {
    $('#amenities_carousel').carousel('prev');
});
$("#right-btn").on("click", function() {
    $('#amenities_carousel').carousel('next');
});
//to open side nav
$('.hb-menu-icon').on('click', function() {
    var menuIcon = $(this).children()[0];
    if ($(menuIcon).hasClass("hb-menu-icon--to-arrow")) {
        closeNav();
    } else {
        $('nav').addClass("head-fix").removeClass("transparent");
        $(menuIcon).addClass("hb-menu-icon--to-arrow").removeClass("hb-menu-icon--from-arrow");
        Materialize.showStaggeredList('#slide-out');
    }
});
/*gallery part*/
function intializeSlider(){
    var items=$(".indicator-item");
    for(var i=0;i<items.length;i++){
        $(items[i]).addClass("item");
        $(items[i]).html($(images[i]).html());
    }
    for(var i=0;i<items.length;i++){
        if(i<4){
            $(items[i]).css("transform","translate(-50%,-50%) rotate("+(i*30+90)+"deg)");
            $($(items[i]).children()[0]).css("transform","rotate(-"+(i*30+90)+"deg)");
        }
        else{
            $(items[i]).css("transform","translate(-50%,-50%) rotate("+(i*30+150)+"deg)");   
            $($(items[i]).children()[0]).css("transform","rotate(-"+(i*30+150)+"deg)");
        }
    }
}
/*to set bg image*/




//to close the side nav when click on outside
$("body").click(function(e) {
    if (!$($(e.target)).is(".side-nav")) {
        closeNav();
    }
});
//to close login modal
$("#modal-close").click(function() {
    $('#login-modal').closeModal();
});
//to open contact form
$(".contact-btn").click(function() {
    $("#form").removeClass("animated zoomOutDown").addClass("animated zoomInUp");
    $(this).fadeOut();
    var scrollFun = setInterval(function() {
        window.scrollBy(0, 100);
    }, 10);
    setTimeout(function() {
        $("#form").show();
        $("#contact").css("min-height", "680px");
        setTimeout(function() {
            clearInterval(scrollFun);
        }, 1000);
    }, 600);
});
//to close contact form
$("#form-close").click(function() {
    $("#form").removeClass("animated zoomInUp").addClass("animated zoomOutDown");
    $("#contact").css("min-height", "500px");
    setTimeout(function() {
        $("#form").hide();
        $(".contact-btn").fadeIn();
    }, 400);

});
// login form validation
$('button[type=submit]').click(function(e) {
    e.preventDefault();
    var username = $('.login-form input[type=text]').val();
    var password = $('.login-form input[type=password]').val();
    var isEmpty = false;
    if (username == "undefined" || username.trim().length == 0) {
        $('.login-form input[type=text]').addClass("invalid");
        isEmpty = true;
    };
    if (password == "undefined" || password.length == 0) {
        $('.login-form input[type=password]').addClass("invalid");
        isEmpty = true;
    }
    if (isEmpty) {
        return;
    }
    if (username == "imthih" && password == "imthih") {
        $('.login-form input[type=text]').val("");
        $('.login-form input[type=password]').val("");
        $('#login-modal').closeModal();
    } else {
        $('.login').addClass("error");
        setTimeout(function() {
            $('.login').removeClass("error");
        }, 2000);
    }
});


