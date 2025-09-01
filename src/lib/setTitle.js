import { getContext } from "svelte";

const pageData = getContext("pageData");

export const setTitle = (title) => {
    pageData.title = title;
};
