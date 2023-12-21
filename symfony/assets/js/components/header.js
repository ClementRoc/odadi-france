$menu = $('.gsap--menu-content')[0];
$menuList = $('.menu-content-list')[0];
$menuSocial = $('.menu-content-social')[0];
$headerMenu = $('.header-menu')[0];
$togglerMenu = $('.js-menu-toggler');
$togglerInner = $('.menu-toggler-inner')[0];

$togglerMenu.on('click', function() {
    let $showDelay = 300, $hideDelay = 500;
    let $menuEnterTimer, $menuLeaveTimer;

    if ($menu.style.display === 'block') {
        $togglerInner.classList.remove('menu-toggler-inner--close')
        $togglerInner.classList.add('menu-toggler-inner--open')
        $menuList.classList.add('lazyload-out-left');
        $menuSocial.classList.add('lazyload-out-right');
        $menuEnterTimer = setTimeout(function() {
            $menu.style.display = 'none';
            $menuList.classList.remove('lazyload-out-left');
            $menuSocial.classList.remove('lazyload-out-right');
            $headerMenu.style.marginTop = '0';
            $headerMenu.style.justifyContent = 'center';
        }, $hideDelay)
    } else {
        $togglerInner.classList.remove('menu-toggler-inner--open')
        $togglerInner.classList.add('menu-toggler-inner--close')
        $menuLeaveTimer = setTimeout(function() {
            $menu.style.display = 'block';
            $menuList.classList.add('lazyload-left');
            $menuSocial.classList.add('lazyload-right');
            $headerMenu.style.marginTop = '-.5rem';
            $headerMenu.style.justifyContent = 'unset';
        }, $showDelay)
    }
})