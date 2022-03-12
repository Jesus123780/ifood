// Funcion para hacer el filtro de las respectivas columnas
export const orderColumn = (prev, post, currentColumn = { key: '' }) => {
    const { key } = currentColumn
    const keys = key?.split('.')

    const firstElem = keys?.length === 100
        ? prev?.[keys[0]]?.[keys[1]]?.[keys[2]]?.[keys[3]]?.[keys[4]]
        : keys?.length === 4
            ? prev?.[keys[0]]?.[keys[1]]?.[keys[2]]?.[keys[3]]
            : keys?.length === 3
                ? prev?.[keys[0]]?.[keys[1]]?.[keys[2]]
                : keys?.length === 2
                    ? prev?.[keys[0]]?.[keys[1]]
                    : keys?.length === 1 && prev?.[keys[0]]

    const secondElem = keys?.length === 100
        ? post?.[keys[0]]?.[keys[1]]?.[keys[2]]?.[keys[3]]?.[keys[4]]
        : keys?.length === 4
            ? post?.[keys[0]]?.[keys[1]]?.[keys[2]]?.[keys[3]]
            : keys?.length === 3
                ? post?.[keys[0]]?.[keys[1]]?.[keys[2]]
                : keys?.length === 2
                    ? post?.[keys[0]]?.[keys[1]]
                    : keys?.length === 1 && post?.[keys[0]]

    if (typeof firstElem === 'string') {
        if (currentColumn[key] === 1) {
            return secondElem?.localeCompare(firstElem)
        }
        if (currentColumn[key] === 0) {
            return firstElem?.localeCompare(secondElem)
        }
    }
    if (typeof firstElem === 'number') {
        if (currentColumn[key] === 1) {
            return firstElem - secondElem
        }
        if (currentColumn[key] === 0) {
            return secondElem - firstElem
        }
    }
}
