$(document).ready(function () {
    $('.slider').slider({
        countElement: 2,
        slideScroll: 1
    });
});

(function ($) {
        $.fn.slider = function (params) {
            let widthOfContainer = $(this).width() - 40,
                sliderItem = $(this).children().children('.slide'),
                sliderWrapper = $(this).children('.slider-wrapper'),
                sliderControls = $(this).children('.arrows'),
                widthOfItem,
                sliderWrapperWidth;

            function init() {
                widthOfItem = widthOfContainer / params.countElement;
                sliderItem.outerWidth(widthOfItem);
                sliderWrapperWidth = sliderWrapper.width(widthOfItem * params.countElement);

                console.log('widthOfItem:' + widthOfItem)
            }

            function nextSlide() {
                sliderWrapper.animate(
                    {'left': widthOfItem * params.slideScroll},
                    moveNextCallback()
                );
            }

            function moveNextCallback() {
                sliderWrapper.children(':nth-child(-n+' + params.slideScroll + ')').appendTo(sliderWrapper);
                sliderWrapper.css('left', 0);
            }

            function prevSlide() {
                sliderWrapper.animate(
                    {'left': widthOfItem * params.slideScroll},
                    10,
                    0,
                    movePrevCallback()
                );
            }

            function movePrevCallback() {
                sliderWrapper.children(':nth-last-child(-n+' + params.slideScroll + ')').prependTo(sliderWrapper);
                sliderWrapper.css('left', 0);
            }

            let controlClick = function (e) {
                if (e.target.classList.contains('arrow-left')) {
                    e.preventDefault();
                    prevSlide();
                }
                if (e.target.classList.contains('arrow-right')) {
                    e.preventDefault();
                    nextSlide();
                }
            };

            let setupListeners = function () {
                for (const sliderControl of sliderControls) {
                    sliderControl.addEventListener('click', controlClick);
                }
            };

            init();
            setupListeners();
        }
    }
)(jQuery);
