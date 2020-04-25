class Api {
    constructor(id, token) {
        this.id = id;
        this.token = token;
        this.baseUrl = (NODE_ENV === 'development') ? 'http://praktikum.tk' : 'https://praktikum.tk';
    }

    makeRequest(address, method = 'GET', body = null) {
        const init = {
            method: method,
            headers: {
                authorization: this.token,
            }
        };

        if (method == 'PATCH' || method == 'POST') {
            init.headers['Content-Type'] = 'application/json';
            init.body = body;
        }

        const url = `${this.baseUrl}/${this.id}/${address}`;
        return fetch(url, init)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Request error occurred: ${res.status}`)
            })
            .then(res => {
                return res})
            .catch((err) => {
                    throw(err);
                    console.log(err);
            });
    }

    getInitialCards() {
        return this.makeRequest(`cards`)
    }

    getUserInfo() {
        return this.makeRequest(`users/me`)
    }

    patchServerInfo(body) {
        return this.makeRequest(`users/me`, 'PATCH', body);
    }

    patchAvatar(body) {
        return this.makeRequest(`users/me/avatar`,'PATCH', body)
    }

    sendCardInfo(body) {
        return this.makeRequest(`cards`, 'POST', body)
    }

    removeCardRequest(cardId) {
        return this.makeRequest(`cards/${cardId}`, 'DELETE')
    }

   addLike(cardId) {
        return this.makeRequest(`cards/like/${cardId}`, 'PUT')
    }

    removeLike(cardId) {
        return this.makeRequest(`cards/like/${cardId}`, 'DELETE')
    }
}

export {Api};