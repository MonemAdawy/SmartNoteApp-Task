

export const find = async ({ model, filter = {}, select = "", populate = [], skip = 0, limit = 1000} = {}) => {
    const document = await model.find(filter).select(select).populate(populate).skip(skip).limit(limit)
    return document;
}