export const remove = (arr, id) => (
    id ? arr.filter(
        (ele) => ele._id !== id
    ) : arr
)