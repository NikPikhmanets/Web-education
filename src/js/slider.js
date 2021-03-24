$(document).ready(function () {
    $('.slider').slider({
        countElement: 2,
        slideScroll: 1
    });

    $('.brands-container').slider();
});

(function ($) {
        $.fn.slider = function (params) {
            let options = $.extend({
                countElement: 5,
                slideScroll: 1
            }, params);

            function main(t) {
                let container = t,
                    containerSliderItems = container.children().first(),
                    sliderItems = containerSliderItems.children(),
                    countSliderItems = containerSliderItems.children().length,
                    sliderControls = container.children('.arrows'),
                    indicatorControls = container.children('.indicators'),
                    widthSlideItem,
                    currentIndicator,
                    currentNumbIndicator,
                    countIndicators;

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
                    let widthContainer = container.width();
                    let heightSlideItem = sliderItems[0].clientHeight;
                    widthSlideItem = widthContainer / countElement;

                    if (indicatorControls.length === 0) {
                        container.css('height', heightSlideItem + 100);
                    } else {
                        widthSlideItem = widthContainer / getCountElementBySizeWin();
                        countIndicators = countSliderItems / getCountElementBySizeWin();
                        $(indicatorControls).empty();

                        for (let i = 0; i < countIndicators; i++) {
                            const indicator = document.createElement("div");
                            indicator.classList.add('indicator');
                            $(indicatorControls).append(indicator);
                            indicator.addEventListener("click", indicatorClick.bind(null, i), false);
                        }
                        currentIndicator = $(indicatorControls).children().first();
                        setActiveIndicator(0);
                    }
                    containerSliderItems.css('width', widthSlideItem * countSliderItems);
                    sliderItems.css('width', widthSlideItem);
                }

                function nextSlide() {
                    containerSliderItems.animate(
                        {'left': 0},
                        500,
                        moveNextCallback()
                    );
                }

                function moveNextCallback() {
                    containerSliderItems.children(':nth-last-child(-n+' + options.slideScroll + ')').prependTo(containerSliderItems);
                    containerSliderItems.css('left', -widthSlideItem * options.slideScroll);
                }

                function prevSlide() {
                    containerSliderItems.animate(
                        {'left': -widthSlideItem * options.slideScroll},
                        // {'left': 0},// if countElement: 4
                        500,
                        movePrevCallback()
                    );
                }

                function movePrevCallback() {
                    containerSliderItems.children(':nth-child(-n+' + options.slideScroll + ')').appendTo(containerSliderItems);
                    // sliderItemsContainer.css('left', widthOfItem * options.slideScroll); // if countElement: 4
                    containerSliderItems.css('left', 0);
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
            }

            this.each(function () {
                main($(this));
            });
            return this;
        }
    }
)(jQuery);
