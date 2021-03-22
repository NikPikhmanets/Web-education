$(document).ready(function () {
    // $(window).resize(function () {

    let count = 4;

    // if ($(this).outerWidth() <= 800 && $(this).outerWidth() > 600) {
    //     count = 2;
    // } else if ($(this).outerWidth() <= 600) {
    //     count = 1;
    // }
    console.log('count:' + count);

    $('.slider').slider({
        countElement: count,
        slideScroll: 1
    });
    // });
    // $('.brands-container').slider();
});

(function ($) {
        $.fn.slider = function (params) {
            let options = $.extend({
                countElement: 5,
                slideScroll: 1
            }, params);

            // function main(t) {
            let t = $(this);
            let container = t,
                sliderItemsContainer = t.children().first(),
                sliderItems = sliderItemsContainer.children(),
                slideItemCount = sliderItemsContainer.children().length,
                sliderControls = t.children('.arrows'),
                indicatorControls = t.children('.indicators'),
                widthOfItem,
                dots = [];

            function init() {
                let widthOfContainer = t.width();
                let slideItemWidth = widthOfContainer / options.countElement;
                let slideItemHeight = sliderItems[0].clientHeight;

                if (indicatorControls.length === 0) {
                    container.css('height', slideItemHeight + 50);
                }
                sliderItemsContainer.css('width', slideItemWidth * slideItemCount);
                sliderItems.css('width', slideItemWidth);


                console.log('slideItemWidth:' + slideItemWidth)
                console.log('options.countElement' + options.countElement)
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
                    // {'left': 0},// if countElement: 4
                    500,
                    movePrevCallback()
                );
            }

            function movePrevCallback() {
                sliderItemsContainer.children(':nth-child(-n+' + options.slideScroll + ')').appendTo(sliderItemsContainer);
                // sliderItemsContainer.css('left', widthOfItem * options.slideScroll); // if countElement: 4
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
            setupListeners();
            // }

            // this.each(function () {
            //     main($(this));
            // });
            // return this;
        }
    }
)(jQuery);
