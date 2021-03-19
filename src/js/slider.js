$(document).ready(function () {
    $('.slider').slider({
        countElement: 3,
        slideScroll: 2
    });

    // $('.brands').slider({
    //     countElement: 4,
    //     slideScroll: 1
    // });
});

(function ($) {
        $.fn.slider = function (params) {
            let options = $.extend({
                countElement: params.countElement,
                slideScroll: params.slideScroll
            });

            let container = $(this),
                sliderItemsContainer = this.children().first(),
                widthOfContainer = $(this).width(),
                sliderItems = sliderItemsContainer.children(),
                slideItemWidth = widthOfContainer / options.countElement,
                slideItemHeight = sliderItems[0].clientHeight,
                slideItemCount = sliderItemsContainer.children().length,
                sliderControls = $(this).children('.arrows'),
                widthOfItem;

            function init() {
                widthOfItem = slideItemWidth;
                container.css('height', slideItemHeight + 100);
                sliderItemsContainer.css('width', slideItemWidth * slideItemCount);
                sliderItems.css('width', slideItemWidth);

                setupListeners();
            }

            function nextSlide() {
                sliderItemsContainer.animate(
                    {'left': 0},
                    500,
                    moveNextCallback()
                );

            }

            function moveNextCallback() {
                sliderItemsContainer.children(':nth-last-child(-n+' + options.slideScroll + ')').prependTo(sliderItemsContainer);
                sliderItemsContainer.css('left', -widthOfItem * options.slideScroll);
            }

            function prevSlide() {
                sliderItemsContainer.animate(
                    {'left': -widthOfItem * options.slideScroll},
                    // {'left': 0},// if 4
                    500,
                    movePrevCallback()
                );
            }

            function movePrevCallback() {
                sliderItemsContainer.children(':nth-child(-n+' + options.slideScroll + ')').appendTo(sliderItemsContainer);
                // sliderItemsContainer.css('left', widthOfItem * options.slideScroll);
                sliderItemsContainer.css('left', 0);
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

            function setupListeners() {
                for (const sliderControl of sliderControls) {
                    sliderControl.addEventListener('click', controlClick);
                }
            }

            init();
        }
    }
)(jQuery);
