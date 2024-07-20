const $previousCard = $('.previous')
const $nextCard = $('.next')
let $formationsCardList = [
    document.getElementById('1'),
    document.getElementById('2')
]
let $formationsCard = $('.card')

// Get previous formation card
$previousCard.on('click', function() {
    let $currentFormationCard = document.getElementsByClassName('active')[0]
    let $currentIndex = $formationsCardList.indexOf($currentFormationCard)

    let $previousFormationCard
    if ($currentIndex === 0) {
        $previousFormationCard = $formationsCardList.at($formationsCardList.length - 1)
    } else {
        $previousFormationCard = $formationsCardList.at($currentIndex - 1)
    }

    $previousFormationCard.classList.add('active')
    $previousFormationCard.classList.add('lazyload')
    $previousFormationCard.classList.remove('hide')

    $currentFormationCard.classList.add('hide')
    $currentFormationCard.classList.remove('active')
})

// Get next formation card
$nextCard.on('click', function() {
    let $currentFormationCard = document.getElementsByClassName('active')[0]
    let $currentIndex = $formationsCardList.indexOf($currentFormationCard)

    let $nextFormationCard
    if ($currentIndex === $formationsCardList.length - 1) {
        $nextFormationCard = $formationsCardList.at(0)
    } else {
        $nextFormationCard = $formationsCardList.at($currentIndex + 1)
    }

    $nextFormationCard.classList.add('active')
    $nextFormationCard.classList.add('lazyload')
    $nextFormationCard.classList.remove('hide')

    $currentFormationCard.classList.add('hide')
    $currentFormationCard.classList.remove('active')
})
const $searchInput = $('.input-search');
const $filterCheckboxes = $('input[type="checkbox"]');
let $actualities = $('.actuality-overlook');
let $actualitiesList = [];

// Actuality class
function Actuality(title, date, category) {
    this.title = title
    this.date = date
    this.category = category
}

// Fetch all actualities based on the HTML
for (let i = 0; i < $actualities.length; i++) {
    $actualitiesList.push(new Actuality(
        $actualities[i].getAttribute('data-title'),
        $actualities[i].getAttribute('data-date'),
        $actualities[i].getAttribute('data-category'),
    ))
}

// Searchbar function
$searchInput.on('input', e => {
    const value = e.target.value
    $actualitiesList.forEach(actuality => {
        const isVisible = actuality.title.toLowerCase().includes(value.toLowerCase())
        document.getElementById(actuality.title).classList.toggle('hide', !isVisible)
    })
})

// Filter function to show actualities based on the checkboxes
// [AG, InfoLetter and Actualities]
$filterCheckboxes.on('change', function() {
    let selectedFilters = {};

    $filterCheckboxes.filter(':checked').each(function() {
        if (!selectedFilters.hasOwnProperty(this.name)) {
            selectedFilters[this.name] = [];
        }
        selectedFilters[this.name].push(this.value);
    });

    let $filteredResults = $('.actuality-overlook');

    $.each(selectedFilters, function(name, filterValues) {
        $filteredResults = $filteredResults.filter(function() {
            let matched = false,
                currentFilterValues = $(this).data('filters').split(' ');
            $.each(currentFilterValues, function(_, currentFilterValue) {
                if ($.inArray(currentFilterValue, filterValues) != -1) {
                    matched = true;
                    return false;
                }
            });
        return matched;
        });
    });
    $actualities.hide().filter($filteredResults).show();
});
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