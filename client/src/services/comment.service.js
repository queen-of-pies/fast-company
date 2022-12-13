import httpService from "./http.service";

const url = `comment/`;

const commentService = {
    createComment: async (comment) => {
        const { data } = await httpService.post(url, comment);
        return data.content;
    },
    getComments: async (pageId) => {
        const { data } = await httpService.get(url, { params: { orderBy: "pageId", equalTo: `${pageId}` } });
        return data.content;
    },
    deleteComment: async (id) => {
        const { data } = await httpService.delete(url + id);
        return data.content;
    }
};

export default commentService;
