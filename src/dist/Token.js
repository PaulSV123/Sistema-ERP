const token_auth  ="token";
export function setToken(token) {
    localStorage.setItem(token_auth, token)
}

export function getToken() {
    return localStorage.getItem(token_auth)
}

export function removeToken() {
    localStorage.removeItem(token_auth)
    localStorage.removeItem("User")
    // localStorage.clear();
}
