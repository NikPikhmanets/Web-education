$(document).ready(function () {
    $('.latest-works').sorting({
        controls: '.lw-controls',
        content: '.lw-item',
        active: 'active-button',
        category: ['all', 'category-b', 'category-des', 'category-dev', 'category-s']
    });
});

(function ($) {
        const firstButton = 0;
        const click = 'click';

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
                        btn.addEventListener(click, buttonsClick.bind(null, i, options.category[i]))
                    }
                    currentButton = buttons.first();
                    setActiveButton(firstButton);
                }

                function setActiveButton(num) {
                    currentNumbOfButton = num;
                    currentButton.addClass(options.active);
                }

                // function sort(c) {
                //     if (c === "all") {
                //         c = "";
                //     }
                //     for (let i = 0; i < items.length; i++) {
                //         $(items[i]).removeClass('show');
                //
                //         if ( $(items[i]).hasClass(c) > -1) {
                //             $(items[i]).addClass('show');
                //         }
                //     }
                // }

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

                initButtons();
            }

            this.each(function () {
                main($(this));
            });
            return this;
        }
    }
)(jQuery);