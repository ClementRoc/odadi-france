const $previousCard = $('.previous')
const $nextCard = $('.next')
let $formationsCardList = [
    document.getElementById('1'),
    document.getElementById('2'),
    document.getElementById('3')
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