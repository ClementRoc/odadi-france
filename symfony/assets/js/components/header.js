class componentMenu {
    constructor() {
        this.menuToggler = $('.js-menu-toggler');
        this.menuTogglerInner = this.menuToggler.find('.menu-toggler-inner');
        this.menuAnimationWhite = $('.gsap--menu-animation-white');
        this.menuAnimationSvg = $('.gsap--menu-animation-svg');
        this.menuContent = $('.gsap--menu-content');
        this.menuList = $('.gsap--menu-list');
        this.menuListLink = $('.gsap--menu-list-link');
        this.menuListAfter = $('.gsap--menu-list-after');

        this.menu = $('.js-menu');
        this.menuInner = $('.js-menu-inner');
    }

    /**
     * toggleMenu
     */
    toggleMenu() {
        var self = this;
        if (self.menuTogglerInner.hasClass('menu-toggler-inner--open')) {
            self.menuTogglerInner.removeClass('menu-toggler-inner--open').addClass('menu-toggler-inner--close');
            self.playOpeningAnimation();
        } else if (self.menuTogglerInner.hasClass('menu-toggler-inner--close')) {
            self.menuTogglerInner.removeClass('menu-toggler-inner--close').addClass('menu-toggler-inner--open');
            self.menuList.addClass('gsap--menu-list--hidden-before');
            self.playClosingAnimation();
        }
    }
}
$(document).ready(function() {
    new componentMenu();
});