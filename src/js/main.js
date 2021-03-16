$(document).ready(function () {
    $('.toggle-nav').on('click', function () {
        $('#h-nav').toggleClass('responsive');
    });
    $('.slider').slider({
        countElement: 4,
        slideScroll: 1
    });
});

(function ($) {
        let slideIndex = 1;

        function showSlides(slides, n) {
            console.log('n:' + n)

            if (n >= slides.length) {
                slideIndex = 0
            }
            if (n < 0) {
                slideIndex = slides.length - 1;
            }
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            console.log('slideIndex:' + slideIndex)
            slides[slideIndex].style.display = "block";
        }

        function getSlides(slider) {
            let slides = slider.find('.slide');
            console.log('slides length:' + slides.length)
            return slides;
        }

        $.fn.slider = function (params) {
            let slider = $(this);
            let slides = getSlides(slider);
            slider.find('.slide-prev').on('click', function () {
                showSlides(slides, ++slideIndex);
            });
            slider.find('.slide-next').on('click', function () {
                showSlides(slides, --slideIndex);
            });
        }
    }
)(jQuery);
