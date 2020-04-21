class UserInfo {
    constructor(elem, popupElem, api) {
        this.elem = elem;
        this.popupElem = popupElem;
        this.api = api;
    }

    setUserInfo() {
        return this.api.getUserInfo()
            .then(res => {
                const { name, about, avatar, _id } = res;
                this.id = _id;

                this.elem.username.textContent = res.name;
                this.elem.about.textContent = res.about;
                this.elem.avatarImg.style.backgroundImage = `url('${res.avatar}')`;
            })
    }

    // to update page info from server
    catchUserInfo() {
        this.popupElem.usernameEdit.value =  this.elem.username.textContent;
        this.popupElem.aboutEdit.value =  this.elem.about.textContent;
    }

    updateUserInfo() {
        const body = JSON.stringify({
            name: this.popupElem.usernameEdit.value,
            about: this.popupElem.aboutEdit.value,
        });

        return this.api.patchServerInfo(body)
            .then(res => {
                this.elem.username.textContent = res.name;
                this.elem.about.textContent = res.about;
            })
    }

    updateAvatar() {
        const body = JSON.stringify({
            avatar: this.popupElem.newAvatarLink.value,
        });

        this.api.patchAvatar(body)
            .then(res => {
                this.elem.avatarImg.style.backgroundImage = `url('${res.avatar}')`;
            })
    }

    getMyId() {
        return this.id;
    }
}
