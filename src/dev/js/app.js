$(document).ready(function() {
	var show = "15px", 			// height of unfocused line
        hide = "46px"; 			// height of focused line
    function hideLine(n) {
        $(n).css({
            height: show
        })
    }
    function showLine(n) {
        "" === $(n).val().trim() && $(n).css({
            height: hide
        })
    }! function() {
        var n = $("body").data("page");
        $("nav ul li a").each(function(hideLine, show) {
            if ($(this).text().replace(" ", "-") === n) return $(this).addClass("active").append("<hr>"), !1
        })
    }();
    
    $("#name").focus(function() {
        showLine(this)
    }), 
	$("#name").focusout(function() {
        hideLine(this)
    }), 
	$("#email").focus(function() {
        showLine(this)
    }), 
	$("#email").focusout(function() {
        hideLine(this)
    }), 
	$("#send").click(function() {
        $("#feedback").hide(1e3, function() {
            $("#msg-sent").slideDown()
        })
    }), 
	$("#new-msg").click(function() {
        $("#msg-sent").hide(1e3, function() {
            $("#feedback").slideDown()
        })
    })
});