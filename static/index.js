/* 
hi :)
*/

function timeConverter(t) {     
    //var a = new Date(t * 1000);
    var a = new Date(parseInt(t));
    var today = new Date();
    var yesterday = new Date(Date.now() - 86400000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    if (hour<10) {hour='0'+hour};
    var min = a.getMinutes();
    if (min<10) {min='0'+min};
    if (a.setHours(0,0,0,0) == today.setHours(0,0,0,0))
        return 'Today, ' + hour + ':' + min;
    else if (a.setHours(0,0,0,0) == yesterday.setHours(0,0,0,0))
        return 'Yesterday, ' + hour + ':' + min;
    else if (year == today.getFullYear())
        return date + ' ' + month + ', ' + hour + ':' + min;
    else
        return date + ' ' + month + ' ' + year + ', ' + hour + ':' + min;
}
function addStyleString(str) {
    var node = document.createElement('style');
    node.innerHTML = str;
    document.body.appendChild(node);
}

$( ".date" ).each(function( index ) {
    var time =  timeConverter($( this ).text())
    $( this ).text(time)
});
var time = Date.now()-parseInt($('#lastLogin').text())
if(time<ONLINE_TIME){
    $('#online').show()
}
var time = new Date( parseInt($('#lastLogin').text()) )
var d = time.getDate();if (d<10) {d="0"+d};
var m = time.getMonth()+1;if (m<10) {m="0"+m};
var y = time.getFullYear();
$('#lastLogin').text(   d+'/'+m+'/'+y   );

$( document ).ready(function() {
    //
    jQuery.fn.center = function () {
        this.css("position","fixed");
        this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) +
                                                    $(window).scrollTop()) + "px");
        this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) +
                                                    $(window).scrollLeft()) + "px");
        return this;
    }
    //
    $(".avatar").each(function() {
        $(this).click(function(event) {
            event.preventDefault();
          $("#imgPreview").hide();
          $("#imgPreview img").attr("src", this.src);
          $("#imgPreview").show();
        });
      });
    $("#imgPreview").click(function() {
      $(this).hide()
      $("#imgPreview img").attr("src", '');
    });
    //
    function matchYoutubeUrl(url){
      var p = /www\.youtube\.com/;
       return (url.match(p)) ? true : false ;
    }
    $('a').each(function() {
        if(matchYoutubeUrl($(this).attr('href'))){
            parent = $(this).parent()[0].localName;
            //if (parent=='blockquote'){
                // add player
                player = '';
                url = $(this).attr('href');
                if (url.startsWith('https://www.youtube.com/watch?v=')) {
                   var id = url.slice(32).trim();
                   player='<iframe width="100%" height="300" src="https://www.youtube.com/embed/'+id+'" frameborder="0" allowfullscreen></iframe><br><a href="'+$(this).attr('href')+'" target="blank">'+$(this).attr('href')+'</a> ';
                }
                $( this ).replaceWith( player );
            //}
        }
    });
	    function matchYoutubeUrl(url){
      var p = /www\.youtube\.com/;
       return (url.match(p)) ? true : false ;
    }
    $('a').each(function() {
        if(matchYoutubeUrl($(this).attr('href'))){
            parent = $(this).parent()[0].localName;
            //if (parent=='blockquote'){
                // add player
                player = '';
                url = $(this).attr('href');
                if (url.startsWith('https://vidlii.com/watch?v=')) {
                   var id = url.slice(32).trim();
                   player='<iframe width="100%" height="300" src="https://vidlii.com/embed?v='+id+'" frameborder="0" allowfullscreen></iframe><br><a href="'+$(this).attr('href')+'" target="blank">'+$(this).attr('href')+'</a> ';
                }
                $( this ).replaceWith( player );
            //}
        }
    });
    //
    $('a').each(function() {
        var test = (/\.(gif|jpg|jpeg|tiff|png|webp)/i).test($(this).attr('href'));
        if( $(this).attr('href').toLowerCase().includes("php") ){test=false;}
        if( $(this).attr('href').toLowerCase().includes("epizy") ){test=false;}
        if (test) {
            var img = '<div><img loading="lazy" style="max-width:100%;" src="'+$(this).attr('href')+'"></div>';
            $( this ).replaceWith( img );
        };
    });
    //
    function matchSoundCloudUrl(url){
      var p = /soundcloud\.com/;
       return (url.match(p)) ? true : false ;
    }
    $('a').each(function() {
        if(matchSoundCloudUrl($(this).attr('href'))){
            parent = $(this).parent()[0].localName;
            if (parent=='blockquote'){
                var that = this;
                player = '';
                url = $(this).attr('href');
                var settings = {
                  "parent": 'bla',
                  "async": true,
                  "crossDomain": true,
                  "url": "http://soundcloud.com/oembed",
                  "method": "POST",
                  "headers": {},
                  "data": {
                    "format": "json",
                    "url": url
                  }
                }
                $.ajax(settings).done(function (response) {
                    player = response.html;
                    player = player.replace('width=\"100%\"', 'width=\"560px\"');
                    player = player.replace('height=\"400\"', 'height=\"130px\"');
                    player = player+'<br><a href="'+$(that).attr('href')+'" target="blank">'+$(that).attr('href')+'</a> '
                    $( that ).replaceWith( player );
                });
            }
        }
    });
    //
    jQuery(".topRight").css("animation-name","none");
    jQuery(".topLeft").css("animation-name","none");
    jQuery("#container").css("animation-name","none");
});
