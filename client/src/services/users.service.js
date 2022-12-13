import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const url = `user/`;

const usersService = {
    update: async (payload) => {
        const { data } = await httpService.put(url + payload._id, payload);
        return data.content;
    },
    get: async (id) => {
        const { data } = await httpService.get(url + id);
        return data.content;
    },
    add: async (content) => {
        const { data } = await httpService.post(url, content);
        return data.content;
    },
    delete: async (id) => {
        const { data } = await httpService.delete(url + id);
        return data.content;
    },
    fetchAll: async () => {
        const { data } = await httpService.get(url);
        return data.content;
    },
    create: async (payload) => {
        const { data } = await httpService.put(url + payload._id, payload);
        return data.content;
    },
    getCurrentUser: async () => {
        const { data } = await httpService.get(
            url + localStorageService.getUserId()
        );
        return data;
    }
};

export default usersService;
