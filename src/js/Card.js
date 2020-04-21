class Card {
    constructor() {
    }

    like(event, api) {
        const cardToLikeId = event.target.closest('.place-card').id
        if (!event.target.classList.contains('place-card__like-icon_liked')) {
            api.addLike(cardToLikeId)
                .then(res => {
                    const likeCount = res.likes.length;
                    event.target.nextElementSibling.textContent = likeCount;
                })
        } else {
            api.removeLike(cardToLikeId)
                .then(res => {
                    const likeCount = res.likes.length;
                    event.target.nextElementSibling.textContent = likeCount;
                })
        }
        event.target.classList.toggle('place-card__like-icon_liked');
    }

    remove(event, cardId, api) {
        if (window.confirm('Вы действительно хотите удалить эту карточку?')) {
            const card = event.target.closest('.place-card');
            card.parentNode.removeChild(card);
            api.removeCardRequest(cardId);
        }
    }

    create(name, link, ownerId, userInfo, cardId, likes) {
        const cardEl        = document.createElement('div');
        const imgEl         = document.createElement('div');
        const descriptionEl = document.createElement('div');
        const nameEl        = document.createElement('h3');
        const likeIconEl    = document.createElement('button');
        const deleteIconEl  = document.createElement('button');
        const likeCounter   = document.createElement('span');
        const likeWrapper  = document.createElement('div');


        cardEl.classList.add('place-card');
        imgEl.classList.add('place-card__image');
        descriptionEl.classList.add('place-card__description');
        nameEl.classList.add('place-card__name');

        if (likes.some(like => like._id == userInfo.getMyId())) {
            likeIconEl.classList.add('place-card__like-icon_liked');
        }

        likeIconEl.classList.add('place-card__like-icon');

        deleteIconEl.classList.add('place-card__delete-icon');
        likeCounter.classList.add('place-card__like-counter');
        likeWrapper.classList.add('place-card__like-wrapper');
        cardEl.id = `${cardId}`;

        imgEl.setAttribute('style', `background: url(${link})`);
        nameEl.textContent = `${name}`;
        likeCounter.textContent = `${likes.length}`;

        cardEl.appendChild(imgEl);
        cardEl.appendChild(descriptionEl);
        descriptionEl.appendChild(nameEl);
        descriptionEl.appendChild(likeWrapper);
        likeWrapper.appendChild(likeIconEl);
        likeWrapper.appendChild(likeCounter);

        if (ownerId === userInfo.getMyId()) {
            imgEl.appendChild(deleteIconEl);
        }

        this.elem = cardEl;

        return cardEl;
    }
}

export {Card};