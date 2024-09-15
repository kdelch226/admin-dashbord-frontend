import { ApexOptions } from 'apexcharts';

export const TotalRevenueSeries = [
  {
    name: 'Last Year',
    data: [183, 124, 115, 85, 143, 143, 96],
  },
  {
    name: 'Current Year',
    data: [95, 84, 72, 44, 108, 108, 47],
  },
];

export const TotalRevenueOptions: ApexOptions = {
  chart: {
    type: 'bar',
    toolbar: {
      show: false,
    },
  },
  colors: ['#6798c0', '#0a2463'],
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: false,
      columnWidth: '55%',
    },
  },
  dataLabels: {
    enabled: false,
  },
  grid: {
    show: true,
  },
  stroke: {
    colors: ['transparent'],
    width: 4,
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    labels:{
      style:{
        colors:undefined,
      }
    }
  },
  yaxis: {
    labels:{
      style:{
        colors:undefined,
      }
    },
    title: {
      text: '$ (thousands)',
      style: {
        color: undefined,
      }
    },
  },


  fill: {
    opacity: 1,
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
    labels: {
      colors: undefined,
    },
  },
  tooltip: {
    y: {
      formatter(val: number) {
        return `$ ${val} thousands`;
      },
    },
  },
};