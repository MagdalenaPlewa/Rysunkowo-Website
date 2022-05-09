export const createItem = (tag, className, src) => {
    const tagName = document.createElement(tag, className, src)
    tagName.className = className
    if(src) tagName.src = src

    return tagName
}

