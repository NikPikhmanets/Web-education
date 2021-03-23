$(document).ready(function () {
    $('.latest-works').sorting({
        controls: '.lw-controls',
        content: '.lw-item',
        active: 'active-button',
        category: ['all', 'category-b', 'category-des', 'category-dev', 'category-s']
    });
});

(function ($) {
        const FIRST_BUTTON = 0;
        const CLICK = 'click';
        const ALL = 'all';

        $.fn.sorting = function (params) {
            let options = $.extend({
                controls: params.controls,
                content: params.content,
                active: params.active,
                category: params.category
            });

            function main(t) {
                let buttons = t.children(options.controls).children(),
                    currentNumbOfButton,
                    currentButton,
                    items = t.find(options.content);

                function initButtons() {
                    for (let i = 0; i < buttons.length; i++) {
                        let btn = buttons[i];
                        btn.addEventListener(CLICK, buttonsClick.bind(null, i, options.category[i]))
                    }
                    currentButton = buttons.first();
                    setActiveButton(FIRST_BUTTON);
                }

                function setActiveButton(num) {
                    currentNumbOfButton = num;
                    currentButton.addClass(options.active);
                }

                function showAll() {
                    for (let item of items) {
                        $(item).fadeIn('slow');
                    }
                }

                function showByCategory(c) {
                    for (let i = items.length; i >= 0; i--) {
                        if ($(items[i]).hasClass(c)) {
                            $(items[i]).fadeIn('slow');
                        } else {
                            $(items[i]).fadeOut();
                        }
                    }
                }

                function sort(c) {
                    if (c === ALL) {
                        showAll();
                    } else {
                        showByCategory(c);
                    }
                }

                function buttonsClick(num, category) {
                    console.log(category);

                    if (num === currentNumbOfButton) {
                        return;
                    }
                    currentButton.removeClass(options.active);
                    currentButton = $(buttons).eq(num);
                    setActiveButton(num);
                    sort(category);
                }

                sort(ALL);
                initButtons();
            }

            this.each(function () {
                main($(this));
            });
            return this;
        }
    }
)(jQuery);