let $actualities = $('.actuality-overlook')
let $actualitiesList = []

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