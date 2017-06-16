$(document).ready(function() {
    $('.nav__menu__contacts a[href="#info"]').click(function(e) {
        var top = $('#feedback').offset().top;

        $('html,body').animate({
            scrollTop: top
        });

        e.preventDefault();
    });

    function animation_init() {
        move_el_init($('*[data-elmove="true"], *[data-elmove="group"]'));

        setTimeout(function() {
            move_el_action($('*[data-elmove="true"]'));
            move_el_group($('*[data-el-group="group"]'));
        }, 1500)
    }

    animation_init();

    function move_el_init(el) {
        el.each(function() {
            var dur, posX, posY, transform_v, delay;

            if (!$(this).data('dur'))
                dur = 2;
            else
                dur = $(this).data('dur')

            posX = $(this).data('left') + 'px';
            posY = $(this).data('top') + 'px';

            if ($(this).data('transform')) {
                transform_v = $(this).data('transform');
            } else {
                transform_v = '';
            }

            if ($(this).data("delay")) {
                delay = $(this).data('delay');
            } else {
                delay = 0;
            }

            $(this).css({
                'transform': 'translate(' + posX + ', ' + posY + ') ' + transform_v,
                opacity: 0
            });
            var bll = $(this);
            setTimeout(function() {
                bll.css({
                    transition: 'all ' + dur + 's ease',
                    'transition-delay': delay + 's'
                });
            }, 100)
        });
    }

    function move_el_action(el) {
        el.each(function() {
            if (check_pos($(this)) !== true || $(this).hasClass('animation_done__'))
                return;

            $(this).css({
                'transform': 'translate(0,0) scale(1)',
                opacity: 1
            }).addClass('animation_done__');
        })
    }

    function move_el_group(el) {
        el.each(function(){
        	if (check_pos($(this)) !== true || $(this).hasClass('animation_done__'))
                return;

            $(this).addClass('animation_done__');

        	$(this).find('*[data-elmove="group"]').each(function(){
        		$(this).css({
                    'transform': 'translate(0,0) scale(1)',
                    opacity: 1
                })
        	})
        })
    }

    function check_pos(bl) {

        if (bl.data('force-start') == true)
            return true;

        var window_pers = 0;

        if(bl.data('activate-position')) {
            window_pers = bl.data('activate-position');
        }

        var top_pos = bl.offset().top,
            wh = $(window).height(),
            wpos = $(window).scrollTop(),
            wbot = wh + wpos - wh * window_pers;

        bl.attr('wp', window_pers)

        if (wbot > top_pos) {
            return true;
        } else {
            return false;
        }
    }

    $(window).scroll(function() {
    	// rating_stars();
        move_el_action($('*[data-elmove="true"]'));
        move_el_group($('*[data-el-group="group"]'));

        var wp = $(window).scrollTop();


        parallax_bl();

        if (wp > 0)
            $('nav.nav-top').addClass('nav-fixed')
        else
            $('nav.nav-top').removeClass('nav-fixed')
    });

    parallax_bl();
    rating_stars();

    function scrollToDiv(element, navheight) {
        var offset = element.offset();
        var offsetTop = offset.top;
        var totalScroll = offsetTop - 80;

        $('body,html').animate({
            scrollTop: totalScroll
        }, 1000);
    }

    function parallax_bl() {
    	if($('.parallax_block_bg').length > 0) {
    		var wp = $(window).scrollTop();
    		$('.parallax_block_bg').each(function(){
	    		if ($(this).offset().top < (wp + $(window).height())) {
		            var yPos = -($(this).offset().top - (wp - 100)) * 0.8;
		            if (yPos < 0)
		                yPos = 0;
		            $(this).css({
		                "background-position": "center " + yPos + "px"
		            });
		        }
		    });
    	}
    }

    $('.scroll').click(function() {
        var el = $(this).attr('href');
        var elWrapped = $(el);
        scrollToDiv(elWrapped, 0);
        return false;
    });

/*    function rating_stars() {
    	if(!$('.stars_progress_bar').hasClass('an_done')) {
    		var wp = $(window).scrollTop();
    		var wh = $(window).height();
    		var bar_pos = $('.stars_progress_bar').offset().top;
	    	if((wp+wh/2)>bar_pos) {
	    		$('.stars_progress_bar').addClass('an_done');
	    		$('.stars_progress_bar .the_bar').each(function(){
			    	var w = parseInt($(this).attr('data-width'));

			    	$(this).css('width', w+'%');
			    });
	    	}
	    }
    }*/
})