$(document).ready(function () {
    $('.latest-works').sorting();
});

(function ($) {
        const firstButton = 0;

        $.fn.sorting = function (params) {
            function main(t) {
                let buttons = t.children('.lw-controls').children(),
                    currentNumbOfButton,
                    currentButton;

                function initButtons() {
                    for (let i = 0; i < buttons.length; i++) {
                        let btn = buttons[i];
                        btn.addEventListener("click", buttonsClick.bind(null, i))
                    }
                    currentButton = buttons.first();
                    setActiveButton(firstButton);
                }

                function setActiveButton(num) {
                    currentNumbOfButton = num;
                    currentButton.addClass('active-button');
                }

                function buttonsClick(num) {
                    if (num === currentNumbOfButton) {
                        return;
                    }
                    currentButton.removeClass('active-button');
                    currentButton = $(buttons).eq(num);
                    setActiveButton(num);
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