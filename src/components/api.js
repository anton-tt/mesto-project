const apiId = {
    urlBase: 'https://nomoreparties.co/v1/plus-cohort-23/',
    headers: {
        authorization: 'e1af8fdb-dc43-4ad1-80c1-f523f688a620',
        'Content-Type': 'application/json'
    }
}

const chekResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export function getUserInfo() {
    return fetch(`${apiId.urlBase}users/me`, {
        method: 'GET',
        headers: apiId.headers
    }).then(chekResponse);
}

export function getCards() {
    return fetch(`${apiId.urlBase}cards`, {
        method: 'GET',
        headers: apiId.headers
    }).then(chekResponse);
}

export function editProfileServer(userName, userAbout) {
    return fetch(`${apiId.urlBase}users/me`, {
        method: 'PATCH',
        headers: apiId.headers,
        body: JSON.stringify({
            name: userName,
            about: userAbout
        })    
    }).then(chekResponse);
}

export function addNewCard(cardName, cardLink) {
    return fetch(`${apiId.urlBase}cards`, {
        method: 'POST',
        headers: apiId.headers,
        body: JSON.stringify({
            name: cardName,
            link: cardLink
        })    
    }).then(chekResponse);
}

export function deleteCardServer(cardId) {
    return fetch(`${apiId.urlBase}cards/${cardId}`, {
        method: 'DELETE',
        headers: apiId.headers    
    }).then(chekResponse);
}

export function addCardLike(cardId) {
    return fetch(`${apiId.urlBase}cards/likes/${cardId}`, {
        method: 'PUT',
        headers: apiId.headers
    }).then(chekResponse);
}

export function deleteCardLike(cardId) {
    return fetch(`${apiId.urlBase}cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: apiId.headers    
    }).then(chekResponse);
}

export function editAvatarProfile(userAvatar) {
    return fetch(`${apiId.urlBase}users/me/avatar`, {
        method: 'PATCH',
        headers: apiId.headers,
        body: JSON.stringify({
            avatar: userAvatar
        })    
    }).then(chekResponse);
}