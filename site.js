---

---
$(function() {




    $(".navigation_item").hover(function(){
        if($(this).index()==0)
            $("#info_tooltip").html("Describes the nationally distributed sites reforested by LRI starting Fall 2011, the source and type of species planted in each site as well as their survival rates.");

        else if($(this).index()==1)
            $("#info_tooltip").html("Indicates the distribution of potential reforestation sites based on selected biophysical citeria and approach.");

        else if($(this).index()==2)
            $("#info_tooltip").html("Surveys the current presence and distribution of the native vegetation series throughout Lebanon");

        else if($(this).index()==3)
            $("#info_tooltip").html("Displays several aspects of fire risk, history of burned areas, and their geographical locations across the country");
        $("#info_tooltip").show();
    },
    function(){
        $("#info_tooltip").hide();
    });
    var visited = get_cookie("visited");
    var map;

    $('.map-share').css('display','none');

    $('a.close').click(function(e){
        e.preventDefault();
        $('.map-share').addClass('active');
        $('#video-content iframe').replaceWith('<iframe id="player"></iframe>');
        set_cookie ("visited", "yes");
    });

    var namesUpperCase = [];
    var locations;

    $.getJSON('{{site.baseurl}}/Locations.json', function(z){
        locations = z;
        $.each(z,function(index,loc){
            if(loc.lon!=null){
             namesUpperCase.push(loc.Location1+", "+loc.Kada);

         }
     });
    });

    $('#search input[type="text"]').autocomplete({
        source:namesUpperCase,
        select:function(even,ui)
        {
            name = ui.item.value;
            name = name.substring(0, name.indexOf(',')).trim();
            $.each(locations, function(index,loc){
                console.log(loc.Location1+"  "+name);
                if(name==loc.Location1)
                {
                    map.ease.location({lat:loc.lat,lon:loc.lon}).zoom(16).optimal();
                }
            });
        }
    });




    $('#search input[type="submit"]').on('click',function() {
     var val = $('#geolocate').val();
     $.each(locations,function(index,y){

     });
     return false;
 });

    function runVideo() {
        var vidID = 'tMQnwYgZsKI';
        var vidTime = 10;
        var embed = '<iframe id="player" type="text/html" width="450" height="340" src="http://www.youtube.com/embed/' + vidID + '?autoplay=1&start=' + vidTime + '&enablejsapi=1&origin=http://data.striaaccountability.org" frameborder="0">';
        $('#video-content iframe').replaceWith(embed);
    }

    function set_cookie (name, value) {
        var cookie_string = name + "=" + escape ( value );
        document.cookie = cookie_string;
    }

    function get_cookie ( cookie_name ) {
        var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
        window.results = results;
        if ( results )
            return ( unescape ( results[2] ) );
        else
            return null;
    }

    window.loadMap = function(options) {
        mapbox.load('lri.map-ukm2vdy0,lri.LebanonBorders,', function(o){
            // create a map and controls
            map = mapbox.map('map');
            //add a single layer
            map.addLayer(o.layer).zoom(10).center({lat:options.lat, lon:options.lon});
            map.addLayer(mapbox.layer().id(options.layer).composite(false));
            map.setZoomRange(9, 16);
            map.ui.zoomer.add();
            map.ui.legend.add();
            mapbox.layer().id(options.layer, function() {
                map.interaction.auto().off('on').off('off').on(wax.movetip().parent(map.parent).events());
                map.ui.legend.add();
            });
            mapbox.share().map('map').add();
            
            function swiping() {
                var element = $('#handle');

                if(element.length>0){
                    map.getLayerAt(2);
                    var starting = $('body').width() - $('body').width() / 2.4;
                    var l_parent = map.getLayerAt(2).parent;
                    var handle = document.getElementById('handle'),
                    // handle.style.left = 400+"px";
                    dragging = false,
                    start,
                    startTop;

                    document.onmousemove = function(e) {
                        if (!dragging) return;
                        setDivide(MM.getMousePoint(e, map).x);
                        setDivideY(MM.getMousePoint(e, map).y);

                    // Adjust control
                    handle.style.top = Math.max(-5, Math.min(200, startTop + parseInt(e.clientY, 10) - start)) + 'px';

                    // Adjust opacity
                    map.getLayerAt(2).parent.style.opacity = 1.4 - (handle.offsetTop / 450);
                    map.parent.style.cursor = 'ns-resize';
                }

                handle.onmousedown = function() {
                    $('.info').addClass('hide');
                    dragging = true;
                    return false;
                }
                document.onmouseup = function(e) {
                    dragging = false;
                    start = null;
                    map.parent.style.cursor = 'default';
                }



                function setDivide(x) {
                    x = Math.max(0, Math.min(x, map.dimensions.x));
                    handle.style.left = (x - 20) + 'px';
                    l_parent.style.clip = 'rect(0px ' + x + 'px 9999999px 0px)';
                }
                setDivide(620);

                function setDivideY(y) {
                    y = Math.max(0, Math.min(y, map.dimensions.y));
                    handle.style.top = (y - 20) + 'px';
                }
                setDivideY(72);
                setDivide(460);
            }
        };

        if (options.swipe  !== '') {
            map.addLayer(mapbox.layer().id(options.swipe).composite(false));
            mapbox.layer().id(options.swipe, function() {
                map.ui.legend.add();
                map.interaction.auto().off('on').off('off').on(wax.movetip().parent(map.parent).events());
            });
            swiping();
            map.ui.refresh();

                //changing maps for baselayer

                $('.bottomlayer li a').click(function(e) {
                    e.preventDefault();
                    // alert('hhh')
                    if (!$(this).hasClass('active')) {
                        map.removeLayerAt(0);
                        map.insertLayerAt(0, mapbox.layer().id(this.id).composite(false));
                        $('.bottomlayer li a').removeClass('active');
                        $(this).addClass('active');
                        
                    }
                });

                $('ul.basemaps li a').click(function(e) {
                    e.preventDefault();
                    if($(this).attr('id') == 'blank' || $(this).attr('id') == 'lri.nurseriess')
                        $("#veg_legend").hide();
                    else 
                        $("#veg_legend").show();
                    if (!$(this).hasClass('active')) {
                        map.removeLayerAt(1);
                        map.insertLayerAt(1, mapbox.layer().id(this.id).composite(false));
                        $('ul.basemaps li a').removeClass('active');
                        $(this).addClass('active');
                        mapbox.layer().id(this.id, function() {
                            map.ui.legend.add(); map.ui.refresh();
                            map.interaction.auto().off('on').off('off').on(wax.movetip().parent(map.parent).events());
                        });
                    }
                });

                //changing maps for swipe
                $('ul.swipemaps li a').click(function(e) {
                    e.preventDefault();
                    if (!$(this).hasClass('active')) {
                        map.removeLayerAt(2);
                        map.addLayer(mapbox.layer().id(this.id).composite(false));
                        mapbox.layer().id(this.id, function() {
                            map.ui.refresh();
                            map.interaction.auto().off('on').off('off').on(wax.movetip().parent(map.parent).events());
                            map.ui.legend.add(); 
                            map.ui.refresh();
                            map.interaction.refresh();
                        });
                        swiping();
                        $('ul.swipemaps li a').removeClass('active');
                        $(this).addClass('active');
                    }
                });
            }
            
            // small map easing
            document.getElementById('bcharre').onclick = function() {
                map.ease.location({ lat: 34.233, lon: 36.007 }).zoom(13).optimal();
                return false
            }
            document.getElementById('klayaa').onclick = function() {
                map.ease.location({ lat: 33.341, lon: 35.556 }).zoom(13).optimal();
                return false
            }
            document.getElementById('rachaya').onclick = function() {
                map.ease.location({ lat: 33.482, lon: 35.852 }).zoom(13).optimal();
                return false
            }
            document.getElementById('aanjar').onclick = function() {
                map.ease.location({ lat: 33.730, lon: 35.948 }).zoom(16).optimal();
                return false
            }
            document.getElementById('kfarzabad').onclick = function() {
                map.ease.location({ lat:33.762, lon: 35.993 }).zoom(13).optimal();
                return false
            }
            document.getElementById('maqneh').onclick = function() {
                map.ease.location({ lat:34.0061, lon: 36.2086 }).zoom(13).optimal();
                return false
            }
            document.getElementById('tannourine').onclick = function() {
                map.ease.location({ lat:34.186246, lon: 35.941086 }).zoom(13).optimal();
                return false
            }
            document.getElementById('ainata').onclick = function() {
                map.ease.location({ lat:34.160114, lon: 36.147079 }).zoom(13).optimal();
                return false
            }
            document.getElementById('rmadiyeh').onclick = function() {
                map.ease.location({ lat:33.200991, lon: 35.276842 }).zoom(13).optimal();
                return false
            }
            document.getElementById('kfardebian').onclick = function() {
                map.ease.location({ lat:33.999166, lon: 35.882378 }).zoom(13).optimal();
                return false
            }
        });
};    

});





