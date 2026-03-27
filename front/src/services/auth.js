import api from "./api";

export const authService = {
    login(data) {
        return api.post("/auth/login", data);
    },

    register(data) {
        return api.post("/auth/register", data);
    },

    recoverPassword(data) {
        return api.post("/auth/recover-password", data);
    },

    resetPassword(data) {
        return api.post("/auth/reset-password", data);
    },

    getMe() {
        return api.get("/users/me");
    },

    updateMe(data) {
        return api.put("/users/me", data);
    }
};