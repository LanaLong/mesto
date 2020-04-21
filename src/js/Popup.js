class Popup {
    constructor(popup) {
        this.popup = popup;
    }

    open(popup, userInfo)  {
        if (popup == popupEdit) {

            userInfo.setUserInfo();
            popup.classList.add('popup_is-opened');
        }
        else {
            popup.classList.add('popup_is-opened');
        }
    }

    close(popup, form) {
        popup.classList.remove('popup_is-opened');
        form.reset();
    }
}

export {Popup};
