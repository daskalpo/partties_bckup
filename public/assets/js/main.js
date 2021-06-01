$(document)
    .ready(function () {
        !(function ($) {
            "use strict";

            // if(document.getElementById("tidio-chat-iframe") !== null){
            //     document.getElementById("tidio-chat-iframe").style.bottom = "70px";
            // }
           
            $(".rw-input").prop('readonly', true);
             $(".productDelivery .rw-widget-container .rw-input").addClass('datepickerinput');
             $(".signupMaintainer .dateickerWidth").removeClass('dateickerWidth').addClass('signupcalender');
             $(".rw-widget-picker").addClass('min-width-date');
             $(".rw-widget").addClass('min-width-date');

            var hamburgermenu = $('.hamburger');
            hamburgermenu.on('click', function () {
                $('body').addClass('sidebar-open');
            });

            $('.closeMenuPanel').click(function () {
                $('body').removeClass('sidebar-open');
            });

            $('.continueButton').click(function () {});
            $('.backtoLogin').click(function () {
                $('.loginFormWrap').show();
            });

            $(window).scroll(function () {
                if ($(this).scrollTop() > 100) {
                    $('.back-to-top').fadeIn('slow');
                } else {
                    $('.back-to-top').fadeOut('slow');
                }
            });
            $('.back-to-top').click(function () {
                $('html, body').animate({
                    scrollTop: 0
                }, 1500, 'easeInOutExpo');
                return false;
            });

            $(window).scroll(function () {
                if ($(this).scrollTop() > 40) {
                    $('#header').addClass('header-scrolled');
                } else {
                    $('#header').removeClass('header-scrolled');
                }
            });

            if ($(window).scrollTop() > 40) {
                $('#header').addClass('header-scrolled');
            }

            if (window.matchMedia("(max-width: 767px)").matches) {
                $('#intro').css({
                    height: $(window).height()
                });
            }

            $('.nav-menu').superfish({
                animation: {
                    opacity: 'show'
                },
                speed: 400
            });

            $(".gallery-carousel").owlCarousel({
                autoplay: true,
                dots: true,
                loop: true,
                center: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    768: {
                        items: 3
                    },
                    992: {
                        items: 4
                    },
                    1200: {
                        items: 5
                    }
                }
            });

            $(".mobileMainBanner").owlCarousel({
                nav: false,
                autoplay: true,
                stagePadding: 50,
                dots: true,
                center: true,
                items: 2,
                loop: true,
                margin: 15,
                responsive: {
                    0: {
                        items: 1
                    },
                    767: {
                        items: 1
                    }
                }
            });

            $(".appFeatureSlider").owlCarousel({
                autoplay: false,
                dots: false,
                nav: false,
                loop: false,
                center: false,
                margin: 15,
                responsive: {
                    0: {
                        items: 2
                    },
                    767: {
                        items: 2
                    }
                }
            });

            $(".newProductCarousel").owlCarousel({
                autoplay: false,
                dots: false,
                nav: true,
                loop: false,
                center: false,
                margin: 15,
                responsive: {
                    0: {
                        items: 1
                    },
                    768: {
                        items: 3
                    },
                    992: {
                        items: 4
                    },
                    1200: {
                        items: 4
                    }
                }
            });
            $('.web_user_arrow_down')
                .unbind('click')
                .click(function () {
                    $('#user_Web_menu').toggle('');
                });
            $(".topGiftItemsCarousel").owlCarousel({
                autoplay: false,
                dots: false,
                nav: true,
                loop: true,
                center: false,
                margin: 15,
                responsive: {
                    0: {
                        items: 1
                    },
                    768: {
                        items: 3
                    },
                    992: {
                        items: 4
                    },
                    1200: {
                        items: 4
                    }
                }
            });

            $('.rangeFilter').click(function () {
                $('.rangeSliderWrap').addClass('openFilterBox');
            });

            $('.filterApplyBtn').click(function () {
                $('.rangeSliderWrap').removeClass('openFilterBox');
            });

            var $range = $(".js-range-slider"),
                $inputFrom = $(".js-input-from"),
                $inputTo = $(".js-input-to"),
                instance,
                min = 1,
                max = 10000,
                from = 1,
                to = 10000;

            $range.ionRangeSlider({
                skin: "round",
                type: "double",
                min: min,
                max: max,
                from: 1,
                to: 10000,
                onStart: updateInputs,
                onChange: updateInputs
            });
            instance = $range.data("ionRangeSlider");

            function updateInputs(data) {
                from = data.from;
                to = data.to;

            }

            $inputFrom
                .on("input", function () {
                    var val = $(this).prop("value");

                    if (val < min) {
                        val = min;
                    } else if (val > to) {
                        val = to;
                    }

                    instance.update({from: val});
                });

            $inputTo.on("input", function () {
                var val = $(this).prop("value");

                if (val < from) {
                    val = from;
                } else if (val > max) {
                    val = max;
                }

                instance.update({to: val});
            });

            var lastScrollTop = 0;
            $(window).scroll(function (event) {
                var s = $("#stickyFilterWrap");
                if (s.length > 0) {
                    var pos = s.position();
                    var windowpos = $(window).scrollTop();

                    var st = $(this).scrollTop();
                    if (st > lastScrollTop) {

                        if (windowpos >= pos.top + -180) {
                            s.addClass("stickFilter");
                            s.width($('#stickyFilterWrap').parent('.row').width() + -30);
                            $('#productListWrapper').addClass('filterSpace');
                        }
                    } else {

                        if (windowpos <= 220) {
                            s.removeClass("stickFilter");
                            $('#productListWrapper').removeClass('filterSpace');
                        }
                    }
                    lastScrollTop = st;
                }
            });

            $('.sortbyModalButton').click(function () {
                $('body').addClass('filterModalOpen');
                $('.filterOverlay').show();
                $('.filterMobileWrapper').show();
                $('#filterBoxWrapper').hide();
                $('#sortbyBoxWrapper').show();
                $('.sortTab').addClass('activeFilterTab');
                $('.filterTab').removeClass('activeFilterTab');
            });

            $('.filterModalButton').click(function () {
                $('body').addClass('filterModalOpen');
                $('.filterOverlay').show();
                $('.filterMobileWrapper').show();
                $('#filterBoxWrapper').show();
                $('#sortbyBoxWrapper').hide();
                $('.sortTab').removeClass('activeFilterTab');
                $('.filterTab').addClass('activeFilterTab');
            });

            $('.filterTab').click(function () {
                $('.filterBoxTab').removeClass('activeFilterTab');
                $(this).addClass('activeFilterTab');
                $('#filterBoxWrapper').show();
                $('#sortbyBoxWrapper').hide();
            });

            $('.sortTab').click(function () {
                $('.filterBoxTab').removeClass('activeFilterTab');
                $(this).addClass('activeFilterTab');
                $('#filterBoxWrapper').hide();
                $('#sortbyBoxWrapper').show();
            });

            $('.filterBoxApply').click(function () {
                $('.filterOverlay').hide();
                $('.filterMobileWrapper').hide();
                $('body').removeClass('filterModalOpen');
            });

            $('.typeFilter').click(function (e) {
                event.preventDefault();
                event.stopPropagation();
                $('.typeDropdownWrap').addClass('openTypeBox');
            });

            $(document).click(function (e) {

                var container = $(".typeBoxWrap");
                if (!container.is(e.target) && container.has(e.target).length === 0) {
                    $('.typeDropdownWrap').removeClass('openTypeBox');
                }
            });

            $('.irs-from').on('DOMSubtreeModified', function () {
                $('.irs-min').hide();
                $('.irs-max').hide();

                $("#rangeBoxWrap").mouseup(function () {
                    var now = new Date().getTime();
                    var prevTime = $(this).data("prevActionTime");
                    $(this).data("prevActionTime", now);

                    if (!prevTime || now - prevTime > 100) {
                        document
                            .querySelector('#price')
                            .click();
                    }
                });
            })

            $(document).click(function (e) {
                $(document)
                    .mouseup(function (e) {

                        var container = $("#rangeBoxWrap");
                        if (!container.is(e.target) && container.has(e.target).length === 0) {
                            $('.rangeSliderWrap').removeClass('openFilterBox');
                        }
                    });
            });

            var hamburgermenuIcon = $('.humburgIcon');
            hamburgermenuIcon.on('click', function (e) {
                event.preventDefault();
                event.stopPropagation();
                $('body').addClass('sidebar-open');
            });

            $(document).click(function (e) {
                var container = $(".main-sidebar");
                if (!container.is(e.target) && container.has(e.target).length === 0) {

                    $('body').removeClass('sidebar-open');
                }
            });

            $(window).resize(function () {
                $('body').removeClass('sidebar-open');
            });

            $('.sb-icon-search').click(function () {
                $('#sb-search').addClass('sb-search-open');
            });
            $(document).click(function (e) {
                var container = $("#sb-search");
                if (!container.is(e.target) && container.has(e.target).length === 0) {
                    $('#sb-search').removeClass('sb-search-open');
                }
            });

            $('.addrsbk_btn').click(function () {

                $('.mobile_content_about_us').hide();
                $('.addrssbk_nwpg').show();
            });
            $('.backtoLogin').click(function () {
                $('.mobile_content_about_us').show();
                $('.addrssbk_nwpg').hide();

            });
            $("#partyenquirydatepicker").date
            var el = $('.react-datepicker-wrapper');
            el.addClass('');
            el.removeClass('react-datepicker-wrapper');

            $('button.rw-btn-select').click(function () {

                if ($(this).attr('title') == "Select date") {
                    document
                        .querySelector('#selectDate')
                        .click();
                }
                if ($(this).attr('title') == "Select time") {
                    document
                        .querySelector('#selectTime')
                        .click();
                }
            });
        })(jQuery);
    });