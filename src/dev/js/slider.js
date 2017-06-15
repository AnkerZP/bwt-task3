$(document).ready(function() {
    $("#carousel-best-team").carousel({
        interval: !1
    }), 
	$("ul.indicators>li").click(function() {
        $(this).parent().hasClass("with-counter") && $("p.with-counter").text($(this).data("slide-to") + 1 + "/5"), $(this).prevAll().removeClass("selected"), $(this).nextAll().removeClass("selected"), $(this).addClass("selected")
    }), 
	$("span.arrow-right").click(function() {
        var e = $("#carousel-best-team div.carousel-inner").find("div.item.active").index() + 1;
        e >= 3 && (e = 0), $("#indicators-best-team>li").removeClass("selected"), $("#indicators-best-team>li:eq(" + e + ")").addClass("selected")
    }),
	$("span.arrow-left").click(function() {
        var e = $("#carousel-best-team div.carousel-inner").find("div.item.active").index() - 1;
        e < 0 && (e = 2), $("#indicators-best-team>li").removeClass("selected"), $("#indicators-best-team>li:eq(" + e + ")").addClass("selected")
    })
});