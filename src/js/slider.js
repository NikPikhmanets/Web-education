$(document).ready(function () {
    $('.slider').slider({
        countElement: 4,
        slideScroll: 1
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
                container.css('height', slideItemHeight);
                sliderItemsContainer.css('width', slideItemWidth * slideItemCount);
                sliderItems.css('width', slideItemWidth);
                // sliderItemsContainer.children(':nth-child(-n+' + options.slideScroll + ')').appendTo(sliderItemsContainer);
                // sliderItemsContainer.children(':nth-last-child(-n+' + options.slideScroll + ')').prependTo(sliderItemsContainer);

                setupListeners();
            }

            function nextSlide() {
                // sliderItemsContainer.children(':nth-child(-n+' + options.slideScroll + ')').appendTo(sliderItemsContainer);

                sliderItemsContainer.animate(
                    // {'left': widthOfItem * options.slideScroll},
                    moveNextCallback()
                );
            }

            function moveNextCallback() {
                sliderItemsContainer.children(':nth-child(-n+' + options.slideScroll + ')').appendTo(sliderItemsContainer);
                // sliderItemsContainer.css('left',);
            }

            function prevSlide() {
                sliderItemsContainer.animate(
                    // {'left': widthOfItem * options.slideScroll},
                    movePrevCallback()
                );
            }

            function movePrevCallback() {
                sliderItemsContainer.children(':nth-last-child(-n+' + options.slideScroll + ')').prependTo(sliderItemsContainer);
                // sliderItemsContainer.css('right', 0);
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
