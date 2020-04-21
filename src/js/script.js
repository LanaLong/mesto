import "../pages/index.css";

import {Api} from "./Api";
import {Card} from "./Card.js";
import {CardList} from "./Cardlist.js";
import {FormValidator} from "./FormValidator.js";
import {Popup} from "./Popup.js";
import {UserInfo} from "./UserInfo.js";

(function () {

const popupLBox = document.querySelector('#popupLBox');
const popupChangeAvatar = document.querySelector('#popupChangeAvatar');
const popupChangeAvatarForm = popupChangeAvatar.querySelector('.popup__form');

const newAvatarLink = document.querySelector('#newAvatarLink');
const btnAvatar = document.querySelector('#btnAvatar');
const container = document.querySelector('.places-list');
const btnAddCard = document.querySelector('.user-info__button');
const btnEdit = document.querySelector('.user-info__button-edit');
const popupAddCard = document.querySelector('#popupAddCard');
const popupEdit = document.querySelector('#popupEdit');
const popupEditForm = popupEdit.querySelector('.popup__form');
const btnClosePopup = document.querySelectorAll('.popup__close');
const btnSavePopupT  = document.querySelector('#popup-buttonT');
const btnSavePopup  = document.querySelector('.popup__button_type_text');
const btnSaveAddCard = popupAddCard.querySelector('.popup__button');

const popupAddCardForm = popupAddCard.querySelector('.popup__form');
const username = document.querySelector('.user-info__name');
const about = document.querySelector('.user-info__about');
const avatarImg = document.querySelector('.user-info__photo');
const usernameEdit = popupEditForm.elements.username;
const aboutEdit = popupEditForm.elements.about;


const api = new Api(`cohort9`, `e21476c2-4e6d-484a-a9e0-1ce85406436a`);
const userInfo = new UserInfo({username, about, avatarImg}, {usernameEdit, aboutEdit, newAvatarLink}, api);
userInfo.setUserInfo();
const popup = new Popup;
const card = new Card;
const cardList = new CardList;
const formValidator = new FormValidator;

// editing info about user
btnEdit.addEventListener('click', function () {
        userInfo.catchUserInfo();
        popup.open(popupEdit, userInfo);
        document.querySelectorAll('.popup__error').forEach(function(el) {el.textContent = ''});
        btnSavePopup.removeAttribute('disabled');
    }
);

// function editInfo(event) {
//     event.preventDefault();
//     if (event.key === 'Enter' || event.type === 'submit') {
//
//         const btnEditContent = btnEdit.innerHTML;
//
//         btnEdit.innerHTML = 'Загрузка...';
//         userInfo.updateUserInfo()
//
//         btnEdit.innerHTML = btnEditContent;
//
//         popup.close(popupEdit, popupAddCardForm);
//         popupAddCardForm.reset();
//     }
// }

// так работает не там
    function editInfo(event) {
        event.preventDefault();
        if (event.key === 'Enter' || event.type === 'submit') {

            const btnEditContent = btnEdit.innerHTML;

            btnSavePopupT.innerHTML = 'Загрузка...';
            userInfo.updateUserInfo()
                .then(res => {
                    btnSavePopupT.innerHTML = btnEditContent;
                    popup.close(popupEdit, popupAddCardForm);
                    popupAddCardForm.reset();
                });

        }
    }

popupEditForm.addEventListener('submit', editInfo);



// adding card into card list
btnAddCard.addEventListener('click', function () {
    popup.open(popupAddCard, userInfo);
});

btnClosePopup.forEach(elem => elem.addEventListener('click', function () {
        popup.close(elem.closest('.popup'), popupAddCardForm);
        document.querySelector('.popup__error').textContent = '';
    }
));

popupAddCardForm.addEventListener('submit', function(event) {
    event.preventDefault();

    if (event.key === 'Enter' || event.type === 'submit') {
        const btnSaveAddCardContent = btnSaveAddCard.innerHTML;

        btnSaveAddCard.innerHTML = 'Загрузка...';
        cardList.addCard(card, popupAddCardForm, container, popup, popupAddCard, api, userInfo)
            .then(res => {
                btnSaveAddCard.innerHTML = btnSaveAddCardContent;
                popup.close(popupAddCard, popupAddCardForm);
            })
    }
});

popupChangeAvatarForm.addEventListener('submit', function(event) {
    event.preventDefault();

    if (event.key === 'Enter' || event.type === 'submit') {
        userInfo.updateAvatar();
        popup.close(popupChangeAvatar, popupChangeAvatarForm);
    }
});

container.addEventListener('click', (event) => {
    if (event.target.classList.contains('place-card__like-icon')) {
        card.like(event, api);
    } else if (event.target.classList.contains('place-card__delete-icon')) {
        card.remove(event, event.target.closest('.place-card').id, api);
    }
    else if (event.target.classList.contains('place-card__image'))
    {
        const popupImg = document.querySelector('.popup__image');
        let srcValue = event.target.style.backgroundImage.slice(5, -2);

        popupLBox.classList.add('popup_is-opened');
        popupImg.setAttribute('src', srcValue);

    }
})

function avatarHandler() {
    popup.open(popupChangeAvatar);
}

avatarImg.addEventListener('click', avatarHandler);

api.getInitialCards()
    .then(res => {
        cardList.render(container, res, card, userInfo)
    });

formValidator.setEventListeners(popupAddCard, popupAddCardForm);
formValidator.setEventListeners(popupEdit, popupAddCardForm);
formValidator.setEventListeners(popupChangeAvatar, popupAddCardForm);
})();


