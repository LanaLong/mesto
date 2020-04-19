class CardList {
    constructor() {
    }

    // add card to card list
    addCard(card, form, container, popup, popupAddCard, api, userInfo) {

        const body = JSON.stringify({
            name: form.elements.name.value,
            link: form.elements.link.value,
        });

        return api.sendCardInfo(body)
            .then(res => {
                    const newCard = card.create(res.name, res.link, res.owner._id, userInfo, res._id, res.likes);
                    container.appendChild(newCard);
                }
            )
    }

    // render while loading
    render(container, initialCards, card, userInfo) {
        for (const elem of initialCards) {
           const newCard = card.create(elem.name, elem.link, elem.owner._id, userInfo, elem._id, elem.likes);
           container.appendChild(newCard);
        }
    }
}

