export default class PaginationService  {
    items : object[]
    size: number
    pages: number
    constructor (allItems : object[], size : number) {
        this.size = size;
        this.pages = Math.ceil(allItems.length / size)
        this.items = allItems
    }
    public setItems (newItems : object[]) {
        this.items = newItems
        this.pages = Math.ceil(newItems.length / this.size)
    }
    public getCurrentPage = (page:number = 1) => {
        return {
            page: page,
            pages: this.pages,
            next: page + 1 > this.pages ? false : page + 1,
            prev: page - 1 > 0 ? page - 1 : false,
            items: this.items.slice((page - 1) * this.size, page * this.size)
        }
    }
}

