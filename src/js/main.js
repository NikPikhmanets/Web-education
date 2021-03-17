$(document).ready(function () {
    $('.toggle-nav').on('click', function () {
        $('#h-nav').toggleClass('responsive');
    });

    $('.slider').slider({
        countElement: 2,
        slideScroll: 2
    });
});

(function ($) {
        $.fn.slider = function (params) {
            let sliderWrapper = $(this).find('.slider-wrapper'),
                sliderItems = $(this).find('.slide'),
                sliderControls = $(this).find('.arrows'),
                sliderWrapperWidth,
                itemWidth,
                positionLeftItem = 0,
                transform = 0,
                step,
                items = [],
                interval = 0,
                config = {
                    isCycling: false,
                    direction: 'right',
                    interval: 5000,
                    pause: true
                };

            for (let key in config) {
                if (key in config) {
                    config[key] = config[key];
                }
            }

            for (let index = 0; index < sliderItems.length; index++) {
                items.push({
                    item: sliderItems[index],
                    position: index,
                    transform: 0
                });
            }

            let position = {
                getItemMin: function () {
                    let indexItem = 0;

                    for (let index = 0; index < items.length; index++) {
                        let item = items[index];

                        if (item.position < items[indexItem].position) {
                            indexItem = index;
                        }
                    }
                    return indexItem;
                },
                getItemMax: function () {
                    let indexItem = 0;

                    for (let index = 0; index < items.length; index++) {
                        let item = items[index];

                        if (item.position > items[indexItem].position) {
                            indexItem = index;
                        }
                    }
                    return indexItem;
                },
                getMin: function () {
                    return items[position.getItemMin()].position;
                },
                getMax: function () {
                    return items[position.getItemMax()].position;
                }
            };

            let transformItem = function (direction) {
                let nextItem;

                if (direction === 'right') {
                    for (let i = 0; i < params.slideScroll; i++) {
                        positionLeftItem++;
                        let number = positionLeftItem + sliderWrapperWidth / itemWidth - 1;
                        let max = position.getMax();

                        if (number > max - params.countElement) {
                            nextItem = position.getItemMin();
                            items[nextItem].position = position.getMax() + 1;
                            items[nextItem].transform += items.length * 100;
                            items[nextItem].item.style.transform = 'translateX(' + items[nextItem].transform + '%)';
                        }
                    }
                    transform -= step;
                }
                if (direction === 'left') {
                    for (let i = 0; i < params.slideScroll; i++) {
                        positionLeftItem--;
                        let min = position.getMin();

                        if (positionLeftItem < min) {
                            nextItem = position.getItemMax();
                            items[nextItem].position = position.getMin() - 1;
                            items[nextItem].transform -= items.length * 100;
                            items[nextItem].item.style.transform = 'translateX(' + items[nextItem].transform + '%)';
                        }
                    }
                    transform += step;
                }
                sliderWrapper.css('transform', 'translateX(' + (transform * params.slideScroll) + '%)');

            };

            // let cycle = function (direction) {
            //     if (!config.isCycling) {
            //         return;
            //     }
            //     interval = setInterval(function () {
            //         initValueOfSize();
            //         transformItem(direction);
            //     }, config.interval);
            // };

            function getMargin(name) {
                return parseInt($(sliderItems[0]).css(name));
            }

            function initValueOfSize() {
                sliderWrapperWidth = $(sliderWrapper).width();
                itemWidth = sliderItems[0].clientWidth +
                    getMargin('marginLeft') + getMargin('marginRight');
                step = itemWidth / sliderWrapperWidth * 100;
            }

            let controlClick = function (e) {
                initValueOfSize();

                if (e.target.classList.contains('arrows')) {
                    e.preventDefault();
                    let direction = e.target.classList.contains('slide-right') ? 'right' : 'left';
                    transformItem(direction);
                    // clearInterval(interval);
                    // cycle(config.direction);
                }
            };

            let setUpListeners = function () {
                for (const sliderControl of sliderControls) {
                    sliderControl.addEventListener('click', controlClick);
                }
            };

            setUpListeners();
            // cycle(config.direction);

            return {
                right: function () {
                    transformItem('right');
                },
                left: function () {
                    transformItem('left');
                },
                stop: function () {
                    config.isCycling = false;
                    clearInterval(interval);
                },
                // cycle: function () {
                //     config.isCycling = true;
                //     clearInterval(interval);
                //     cycle();
                // }
            }
        }
    }
)(jQuery);
