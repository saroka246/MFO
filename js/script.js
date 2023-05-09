$(document).ready(function(){ 
    $('.header__form input[name="phone"], .calc__phone input, .loan__phone input, .finance__phone input, .money__phone input, .bid__container input').click(function(){
        $(this).setCursorPosition(3);
    }).mask("+7(999) 999-9999"); 
    $( "#calc__sum--range" ).slider({
        range: "min",
        step: 1,
        value: 2,
        min:1,
        max: 6,
        slide: function( event, ui ) {
            if(ui.value == 1){
                $( "#calc__sum--input" ).val(1000);
            } else if(ui.value == 2){
                $( "#calc__sum--input" ).val(50000);
            } else if(ui.value == 3){
                $( "#calc__sum--input" ).val(500000);
            } else if(ui.value == 4){
                $( "#calc__sum--input" ).val(1000000);
            } else if(ui.value == 5){
                $( "#calc__sum--input" ).val(3000000);
            } else {
                $( "#calc__sum--input" ).val(5000000);
            }
            $("#calc__sum--input").trigger("change");
        }
    });
    $( "#calc__month--range" ).slider({
        range: "min",
        step: 6,
        value: 12,
        min:0,
        max: 36,
        slide: function( event, ui ) {
            if(ui.value == 0){
               $( "#calc__month--input" ).val(1); 
            } else {
               $( "#calc__month--input" ).val(ui.value ); 
            }
            $("#calc__month--input").trigger("change");
        }
    });
    $("#calc__sum--input, #calc__month--input").change(function(e){
        e.preventDefault();
        var sum = $("#calc__sum--input").val();
        var month = $("#calc__month--input").val();
        var total = Math.round((Number(sum)*Number(month)*0.0586)/12);
        $(".calc__payment span").text(total + "₽");
    })
    $(document).on("click",".tabs__btn",function(){
        $(".tabs__btn.active").removeClass("active");
        $(this).addClass("active");
        var tab = $(this).data("tab");
        $(".tab.active").removeClass("active");
        $(".tab[data-tab="+tab+"]").addClass("active");
    });
    
    $(".accordion__container").click(function(){
        if(!($(this).hasClass("active"))){
            $(".accordion__container.active").find(".accordion__subtitle").slideToggle();
            $(".accordion__container.active").removeClass("active");
            $(this).find(".accordion__subtitle").slideToggle();
            $(this).addClass("active");
        }
    });
    $("a.app").click(function(e){
        e.preventDefault();
        bidCall($(this));
    });
    $("form:not(.bid__container, #calc__form)").submit(function(e){
        e.preventDefault(); 
        bidCall($(this));
    });
    $("#calc__form .calc__btn").click(function(e){
        e.preventDefault();
        var form = $(this).parents("form");
        bidCall(form);
    });
    $("#calc__form").submit(function(e){
        e.preventDefault(); 
    });
    
    //Change on server request!!!
    $(".bid__container").submit(function(e){
        e.preventDefault();
        $(".bid__wrapper").removeClass("active");
        $("body").addClass("scroll");
        $(".thanks").addClass("active");
        $(".thanks.active").click(function(event){
            console.log(event.target)
            if(event.target.closest(".thanks__container")){
                if(event.target.closest(".close__btn")){
                    $("body").removeClass("scroll");
                    $(".thanks").removeClass("active"); 
                    
                } 
            } else{
                $("body").removeClass("scroll");
                $(".thanks").removeClass("active"); 
            }              
        });
    });
    function bidCall(param){
        if(param.is("a")){
            $("body").addClass("scroll");
            $(".bid__wrapper").addClass("active");
            $(".bid__wrapper.active").click(function(event){
                if(event.target.closest(".bid__container")){
                    if(event.target.closest(".close__btn")){
                        $("body").removeClass("scroll");
                        $(".bid__wrapper").removeClass("active"); 
                    } 
                } else{
                    $("body").removeClass("scroll");
                    $(".bid__wrapper").removeClass("active"); 
                }              
            });
        }else{
            var phone = param.find('input[name="phone"]').val();
            if(phone != "+7(___) ___-____"){
                $('.bid__wrapper input[name="phone"]').val(phone);
                param.find('input[name="phone"]').val("+7(___) ___-____");
            }
            $("body").addClass("scroll");
            $(".bid__wrapper").addClass("active");
            $(".bid__wrapper.active").click(function(event){
                if(event.target.closest(".bid__container")){
                    if(event.target.closest(".close__btn")){
                        $("body").removeClass("scroll");
                        $(".bid__wrapper").removeClass("active"); 
                    } 
                } else{
                    $("body").removeClass("scroll");
                    $(".bid__wrapper").removeClass("active"); 
                }              
            });
        }
    }
    if($(window).width() < 1170){
        $('.header__phone').insertAfter('.burger__container .close__btn');
        $(".header__mid").insertAfter(".header__phone");
    }
    $("body").scroll(function(){
        if($(window).scrollTop() >= $(".step__wrapper").offset().top){
            $(".modal").addClass("active");
        } 
    });
     
    $(".burger__btn").click(function(e){
        e.preventDefault();
        $("body").addClass("scroll");
        $(".burger").addClass("active");
        $(".burger.active").click(function(event){
            if(event.target.closest(".burger__container")){
                if(event.target.closest(".close__btn, a")){
                    $("body").removeClass("scroll");
                    $(".burger").removeClass("active"); 
                } 
            } else{
                $("body").removeClass("scroll");
                $(".burger").removeClass("active"); 
            }              
        });
    });
    
    
});
$.fn.setCursorPosition = function(pos) {
        if ($(this).get(0).setSelectionRange) {
            $(this).get(0).setSelectionRange(pos, pos);
        } else if ($(this).get(0).createTextRange) {
        var range = $(this).get(0).createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
};