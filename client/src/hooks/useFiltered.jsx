export const useFiltered = (data, search, filterBy) => {

    const filteredData = data.filter((item) =>
        item[filterBy].toLowerCase().includes(search.toLowerCase())
    );

    return filteredData;
};
