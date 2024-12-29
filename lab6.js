const userContainers = document.querySelectorAll('div.person-data-container')
const statusIndicator = document.getElementById('status')

function addProperty(propName, propValue, element) {
    const boldPart = document.createElement('b')
    const valuePart = document.createElement('span')
    boldPart.innerText = propName + ':'
    valuePart.innerText = ' ' + propValue
    element.appendChild(boldPart)
    element.appendChild(valuePart)
    element.classList.add('flex-row')
}

function displayUsers(json) {
    const users = json.results
    users.forEach((user, index) => {
        const container = userContainers[index]
        if (!container) return
        container.textContent = ''

        const image = document.createElement('img')
        const phone = document.createElement('div')
        const coordinates = document.createElement('div')
        const postcode = document.createElement('div')
        const country = document.createElement('div')

        image.src = user.picture.large
        image.classList.add('keep-ratio')

        addProperty('Телефон', user.phone, phone)
        addProperty('Координати', `Ш: ${user.location.coordinates.latitude}, Д: ${user.location.coordinates.longitude}`, coordinates)
        addProperty('Поштовий код', user.location.postcode, postcode)
        addProperty('Країна', user.location.country, country)

        container.appendChild(image)
        container.appendChild(phone)
        container.appendChild(coordinates)
        container.appendChild(postcode)
        container.appendChild(country)
        statusIndicator.innerText = 'Натисніть ще раз, щоб оновити дані'
    })
}

function fetchUsers(count) {
    statusIndicator.innerText = 'Декілька миттєвостей...'
    fetch(`https://randomuser.me/api/?results=${count}`)
    .catch(() => {
        statusIndicator.innerText = 'Помилка при завантаженні. Спробуйте ще раз пізніше'
    })
    .then(res => res.json())
    .then(displayUsers)
}
