import httpService from "./http.service";

const url = `/profession/`;

const professionsService = {
    update: async (id, content) => {
        const { data } = await httpService.put(url + id, content);
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
    }
};

export default professionsService;
