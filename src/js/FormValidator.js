class FormValidator {
    constructor() {
    }

    checkInputValility(element) {
        const errorElement = element.nextElementSibling;

        if (element.validity.valueMissing) {
            element.setCustomValidity('Это обязательное поле');
        }
        else if (element.validity.tooShort) {
            element.setCustomValidity('Длина должна быть от 2 до 30 символов');
        }
        else if (element.validity.typeMismatch) {
            element.setCustomValidity('Здесь должна быть ссылка');
        }
        else {
            element.setCustomValidity('');
        }
        errorElement.textContent = element.validationMessage;
    }

    setSubmitButtonState(formElem, buttonElem) {
        if (!formElem.checkValidity()) {
            buttonElem.setAttribute('disabled', true);
            buttonElem.classList.remove('popup__button_type_enabled');
        } else {
            buttonElem.removeAttribute('disabled');
            buttonElem.classList.add('popup__button_type_enabled');
        }
    }

    setEventListeners(popup, form) {
            const button = popup.querySelector(`.popup__button`);
            const formElem = popup.querySelector('form');
            const formArr = Array.from(form);

            formArr.forEach(el => {
                if (el.classList.contains("popup__input")) {
                    el.addEventListener("input", () => { this.checkInputValility(el) });
                }
            });

            formElem.addEventListener("input", () => {
                this.checkInputValility(event.target);
                this.setSubmitButtonState(formElem, button);
            });
        }
}


export {FormValidator};