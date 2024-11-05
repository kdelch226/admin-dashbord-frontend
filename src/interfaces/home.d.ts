export interface PieChartProps {
    title: string,
    value: number,
    series: Array<number>,
    colors: Array<string>,
    bgcolor: string,
    textcolor:string,
    labels?:string[]
}
