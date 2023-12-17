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