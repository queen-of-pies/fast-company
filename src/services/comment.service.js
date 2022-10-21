import httpService from "./http.service";

const url = `comment/`;

const commentService = {
    createComment: async (comment) => {
        const { data } = await httpService.put(url + comment._id, comment);
        return data.content;
    },
    getComments: async (pageId) => {
        const { data } = await httpService.get(url, {
            params: { orderBy: '"pageId"', equalTo: `"${pageId}"` }
        });
        return data.content;
    }
};

export default commentService;
