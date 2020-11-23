export default class SortService {
    public sortByKey(elements: any, sortKey: string, direction: number)  {
        console.log({elements, sortKey, direction})
        return elements
            .sort((a: any, b: any) => +(a[sortKey] > b[sortKey]) * direction  
                || -(a[sortKey] < b[sortKey]) * direction);
    }
}

