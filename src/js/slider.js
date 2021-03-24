$(document).ready(function () {
    $('.slider').slider({
        countElement: 2,
        slideScroll: 1
    });

    // $('.brands-container').slider();
});

(function ($) {
        $.fn.slider = function (params) {
            let options = $.extend({
                countElement: 3,
                slideScroll: 1
            }, params);

            // function main(t) {
            //     let container = t,
            let container = $(this),
                sliderItemsContainer = container.children().first(),
                sliderItems = sliderItemsContainer.children(),
                sliderItemsCount = sliderItemsContainer.children().length,
                sliderControls = container.children('.arrows'),
                indicatorControls = container.children('.indicators'),
                widthOfItem,
                currentIndicator,
                currentNumbIndicator,
                indicatorsCount;

            function getCountElementBySizeWin() {
                let win = $(this);

                if (win.width() <= 600) {
                    return 2;
                }
                if (win.width() <= 800) {
                    return 3;
                }
                return 5;
            }

            function init() {
                let countElement = options.countElement;
                let widthOfContainer = container.width();
                let slideItemWidth = widthOfContainer / countElement;
                let slideItemHeight = sliderItems[0].clientHeight;

                if (indicatorControls.length === 0) {
                    container.css('height', slideItemHeight + 100);
                } else {
                    slideItemWidth = widthOfContainer / getCountElementBySizeWin();
                    indicatorsCount = sliderItemsCount / getCountElementBySizeWin();
                    $(indicatorControls).empty();

                    for (let i = 0; i < indicatorsCount; i++) {
                        const indicator = document.createElement("div");
                        indicator.classList.add('indicator');
                        $(indicatorControls).append(indicator);
                        indicator.addEventListener("click", indicatorClick.bind(null, i), false);
                    }
                    currentIndicator = $(indicatorControls).children().first();
                    setActiveIndicator(0);
                }
                sliderItemsContainer.css('width', slideItemWidth * sliderItemsCount);
                sliderItems.css('width', slideItemWidth);
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

            function setActiveIndicator(num) {
                currentNumbIndicator = num;
                currentIndicator.addClass('active-indicator');
            }

            function indicatorClick(num) {
                if (num === currentNumbIndicator) {
                    return;
                }
                console.log('indicator click: ' + num);

                if (num > currentNumbIndicator) {
                    nextSlide();
                } else {
                    prevSlide();
                }
                currentIndicator.removeClass('active-indicator');
                currentIndicator = $(indicatorControls).children().eq(num);
                setActiveIndicator(num);
            }

            function setupListeners() {
                for (const sliderControl of sliderControls) {
                    sliderControl.addEventListener('click', controlClick);
                }
            }

            init();
            setupListeners();


            let waitForFinalEvent = (function () {
                let timers = {};
                return function (callback, ms, uniqueId) {
                    if (!uniqueId) {
                        uniqueId = "Don't call this twice without a uniqueId";
                    }
                    if (timers[uniqueId]) {
                        clearTimeout(timers[uniqueId]);
                    }
                    timers[uniqueId] = setTimeout(callback, ms);
                };
            })();

            $(window).resize(function () {
                waitForFinalEvent(function () {
                    init();
                }, 500, "some unique string");
            });
            // }
            //
            // this.each(function () {
            //     main($(this));
            // });
            // return this;
        }
    }
)(jQuery);
