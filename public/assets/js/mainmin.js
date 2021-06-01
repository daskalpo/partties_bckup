$(document)
    .ready(function () {

        !(function ($) {
            "use strict";
            // if(document.getElementsByClassName("frame-content") !== null){
            //     document.getElementById("frame-content").style.bottom = "70px";
            // }
            // if(document.getElementsById("ic-minimize") !== null){
            //     var tildio = $('#ic-minimize');
            //     tildio.on('click', function () {
            //         alert();
            //         document.getElementById("frame-content").style.bottom = "70px";
            //     });
               
            // }
         
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
                $('.secondStep').hide();
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

            new WOW().init();

            $('.nav-menu').superfish({
                animation: {
                    opacity: 'show'
                },
                speed: 400
            });

            $(".gallery-carousel").owlCarousel({
                autoplay: true,
                dots: true,
                loop: false,
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

            $(".topGiftItemsCarousel").owlCarousel({
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

            $('.birthDate').datepicker({autoHide: true, zIndex: 2048, dateFormat: "yy-mm-dd"});

            // const Toast = Swal.mixin({     toast: true,     position: 'right',
            // showConfirmButton: false,     timer: 6000,     timerProgressBar: true,
            // onOpen: (toast) => {       toast.addEventListener('mouseenter',
            // Swal.stopTimer)       toast.addEventListener('mouseleave', Swal.resumeTimer)
            //    }   }) $('#test').click(function () {     Toast.fire({type: 'error',
            // title: "Company deleted successfully"}); });

        })(jQuery);
    });