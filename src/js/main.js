$(document).ready(function () {
    $('.toggle-nav').on('click', function () {
        $('#h-nav').toggleClass('responsive');
    });

    // $('.slider').slider({
    //     countElement: 4,
    //     slideScroll: 1
    // });

    let slider = multiItemSlider('.slider', {
        isCycling: true
    });
});

(function ($) {
        $.fn.slider = function (params) {
            let sliderWrapper = $(this).find('.slider-wrapper'),
                sliderItems = $(this).find('.slide'),
                sliderControls = $(this).find('.arrows'),
                // sliderWrapperWidth = parseFloat(getComputedStyle(sliderWrapper).width),
                sliderWrapperWidth = 1200,
                itemWidth = 236,
                // itemStyle = sliderItems[0].currentStyle || window.getComputedStyle(sliderItems[0]),
                // itemWidth = parseFloat(getComputedStyle(sliderItems[0]).width)
                //     + (parseFloat(itemStyle.marginRight) || 0)
                //     + (parseFloat(itemStyle.marginLeft) || 0),
                positionLeftItem = 0,
                transform = 0,
                step = itemWidth / sliderWrapperWidth * 100,
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

            for (const sliderItem of sliderItems) {
                items.push({
                    item: sliderItem.item,
                    position: sliderItem.index,
                    transform: 0
                });
            }

            let position = {
                getItemMin: function () {
                    let indexItem = 0;
                    items.forEach(function (item, index) {
                        if (item.position < items[indexItem].position) {
                            indexItem = index;
                        }
                    });
                    return indexItem;
                },
                getItemMax: function () {
                    let indexItem = 0;
                    items.forEach(function (item, index) {
                        if (item.position > items[indexItem].position) {
                            indexItem = index;
                        }
                    });
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
                    positionLeftItem++;

                    let number = positionLeftItem + sliderWrapperWidth / itemWidth - 1;

                    if (number > position.getMax()) {
                        nextItem = position.getItemMin();
                        items[nextItem].position = position.getMax() + 1;
                        items[nextItem].transform += items.length * 100;
                        items[nextItem].item.style.transform = 'translateX(' + items[nextItem].transform + '%)';
                    }
                    transform -= step;
                }
                if (direction === 'left') {
                    positionLeftItem--;
                    if (positionLeftItem < position.getMin()) {
                        nextItem = position.getItemMax();
                        items[nextItem].position = position.getMin() - 1;
                        items[nextItem].transform -= items.length * 100;
                        items[nextItem].item.style.transform = 'translateX(' + items[nextItem].transform + '%)';
                    }
                    transform += step;
                }
                sliderWrapper.style.transform = 'translateX(' + transform + '%)';
            };

            let cycle = function (direction) {
                if (!config.isCycling) {
                    return;
                }
                interval = setInterval(function () {
                    transformItem(direction);
                }, config.interval);
            };

            let controlClick = function (e) {
                if (e.target.classList.contains('arrows')) {
                    e.preventDefault();
                    let direction = e.target.classList.contains('slide-next') ? 'right' : 'left';
                    transformItem(direction);
                    clearInterval(interval);
                    cycle(config.direction);
                }
            };

            let setUpListeners = function () {
                for (const sliderControl of sliderControls) {
                    sliderControl.addEventListener('click', controlClick);
                }
                // if (config.pause && config.isCycling) {
                //     slider.addEventListener('mouseenter', function () {
                //         clearInterval(interval);
                //     });
                //     slider.addEventListener('mouseleave', function () {
                //         clearInterval(_interval);
                //         cycle(config.direction);
                //     });
                // }
            };

            setUpListeners();
            cycle(config.direction);

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
                cycle: function () {
                    config.isCycling = true;
                    clearInterval(interval);
                    cycle();
                }
            }
        }
    }
)(jQuery);

let multiItemSlider = (function () {
    return function (selector, config) {
        let _mainElement = document.querySelector(selector), // основный элемент блока
            _sliderWrapper = _mainElement.querySelector('.slider-wrapper'), // обертка для .slider-item
            _sliderItems = _mainElement.querySelectorAll('.slide'), // элементы (.slide)
            _sliderControls = _mainElement.querySelectorAll('.arrows'), // элементы управления
            // _sliderControlLeft = _mainElement.querySelector('.slider-prev'), // кнопка "LEFT"
            // _sliderControlRight = _mainElement.querySelector('.slider-next'), // кнопка "RIGHT"
            w = getComputedStyle(_sliderWrapper).width,
            // _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width), // ширина обёртки
            _wrapperWidth = 1200, // ширина обёртки

            // _itemStyle = _sliderItems[0].currentStyle || window.getComputedStyle(_sliderItems[0]),
            // _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width)
            //     + (parseFloat(_itemStyle.marginRight) || 0)
            //     + (parseFloat(_itemStyle.marginLeft) || 0), // ширина одного элемента
            _itemWidth = 250, // ширина одного элемента
            _positionLeftItem = 0, // позиция левого активного элемента
            _transform = 0, // значение транфсофрмации .slider_wrapper
            _step = _itemWidth / _wrapperWidth * 100, // величина шага (для трансформации)
            _items = [], // массив элементов
            _interval = 0,
            _config = {
                isCycling: false, // автоматическая смена слайдов
                direction: 'right', // направление смены слайдов
                interval: 5000, // интервал между автоматической сменой слайдов
                pause: true // устанавливать ли паузу при поднесении курсора к слайдеру
            };

        for (let key in config) {
            if (key in _config) {
                _config[key] = config[key];
            }
        }

        // наполнение массива _items
        _sliderItems.forEach(function (item, index) {
            _items.push({item: item, position: index, transform: 0});
        });

        let position = {
            getItemMin: function () {
                let indexItem = 0;
                _items.forEach(function (item, index) {
                    if (item.position < _items[indexItem].position) {
                        indexItem = index;
                    }
                });
                return indexItem;
            },
            getItemMax: function () {
                let indexItem = 0;
                _items.forEach(function (item, index) {
                    if (item.position > _items[indexItem].position) {
                        indexItem = index;
                    }
                });
                return indexItem;
            },
            getMin: function () {
                return _items[position.getItemMin()].position;
            },
            getMax: function () {
                return _items[position.getItemMax()].position;
            }
        };

        let _transformItem = function (direction) {
            let nextItem;

            if (direction === 'right') {
                _positionLeftItem++;

                if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) > position.getMax()) {
                    nextItem = position.getItemMin();
                    _items[nextItem].position = position.getMax() + 1;
                    _items[nextItem].transform += _items.length * 100;
                    _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
                }
                _transform -= _step;
            }
            if (direction === 'left') {
                _positionLeftItem--;
                if (_positionLeftItem < position.getMin()) {
                    nextItem = position.getItemMax();
                    _items[nextItem].position = position.getMin() - 1;
                    _items[nextItem].transform -= _items.length * 100;
                    _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
                }
                _transform += _step;
            }
            _sliderWrapper.style.transform = 'translateX(' + _transform + '%)';
        };

        let _cycle = function (direction) {
            if (!_config.isCycling) {
                return;
            }
            _interval = setInterval(function () {
                _transformItem(direction);
            }, _config.interval);
        };

        // обработчик события click для кнопок "назад" и "вперед"
        let _controlClick = function (e) {
            if (e.target.classList.contains('arrows')) {
                e.preventDefault();
                let direction = e.target.classList.contains('slide-next') ? 'right' : 'left';
                _transformItem(direction);
                clearInterval(_interval);
                // _cycle(_config.direction);
            }
        };

        let _setUpListeners = function () {
            // добавление к кнопкам "назад" и "вперед" обрботчика _controlClick для событя click
            _sliderControls.forEach(function (item) {
                item.addEventListener('click', _controlClick);
            });
            // if (_config.pause && _config.isCycling) {
            //     _mainElement.addEventListener('mouseenter', function () {
            //         clearInterval(_interval);
            //     });
            //     _mainElement.addEventListener('mouseleave', function () {
            //         clearInterval(_interval);
            //         _cycle(_config.direction);
            //     });
            // }
        };

        // инициализация
        _setUpListeners();
        // _cycle(_config.direction);

        return {
            right: function () { // метод right
                _transformItem('right');
            },
            left: function () { // метод left
                _transformItem('left');
            },
            stop: function () { // метод stop
                _config.isCycling = false;
                clearInterval(_interval);
            },
            // cycle: function () { // метод cycle
            //     _config.isCycling = true;
            //     clearInterval(_interval);
            //     _cycle();
            // }
        }
    }
}());

// (function ($) {
//         let slideIndex = 1;
//
//         function showSlides(slides, n) {
//             console.log('n:' + n);
//
//             if (n >= slides.length) {
//                 slideIndex = 0;
//             }
//             if (n < 0) {
//                 slideIndex = slides.length - 1;
//             }
//             for (let i = 0; i < slides.length; i++) {
//                 slides[i].style.display = "none";
//             }
//             console.log('slideIndex:' + slideIndex);
//             let slide = slides[slideIndex];
//
//             $(slide).fadeOut(500);
//             $(slide).filter(`:nth-child(${slideIndex + 1})`).fadeIn(500);
//
//             // slide.style.display = "block";
//
//             // $(slide).css({
//             //     "opacity": "0",
//             //     "display": "block",
//             // }).show().animate({opacity: 1})
//         }
//
//         // function getSlides(slider) {
//         //     let slides = slider.find('.slide');
//         //     console.log('slides length:' + slides.length)
//         //     return slides;
//         // }
//
//         $.fn.slider = function (params) {
//             let slider = $(this);
//
//             slider.find('.slide-prev').on('click', function () {
//                 // showSlides(slides, ++slideIndex);
//                 _move('next');
//             });
//             slider.find('.slide-next').on('click', function () {
//                 // showSlides(slides, --slideIndex);
//             });
//         }
//     }
// )(jQuery);
