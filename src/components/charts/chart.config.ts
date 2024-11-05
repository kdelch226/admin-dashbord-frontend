import { ApexOptions } from 'apexcharts';


export const TotalRevenueOptions: ApexOptions = {
  chart: {
    type: 'bar',
    toolbar: {
      show: true,
    },
  },

  colors: ['#6798c0', '#0a2463'],
  plotOptions: {
    bar: {
      borderRadius: 3,
      horizontal: false,
      columnWidth: '80%',
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
    categories: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
    labels: {
      style: {
        colors: undefined,
      }
    }
  },
  yaxis: {
    labels: {
      style: {
        colors: 'undefined',
      }
    },

  },


  fill: {
    opacity: 1,
  },
  legend: {
    position: 'top',
    horizontalAlign: 'center',
    labels: {
      colors: 'undefined',
    },
  },
  tooltip: {
    y: {
      formatter(val: number) {
        return `$ ${val}`;
      },
    },
  },
};

export const ExpenseOptions = (value: number) => {

  const color = (value < 0) ? '#FFD700' : '#ADD8E6'; // Rouge si négatif, Bleu si positif
  const gradiantColor = value < 0 ? '#e63946' : '#0000FF'
  const result: ApexOptions = {

    chart: {
      type: 'radialBar',
      offsetY: -20,
      sparkline: {
        enabled: true
      }
    },
    colors: [color],
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 15,
          size: "60%"
        },
        startAngle: -90,
        endAngle: 90,

        track: {
          background: '#333',
          startAngle: -90,
          endAngle: 90,
        },

        dataLabels: {
          name: {
            show: false
          },
          value: {
            formatter: () => {
              return `${value.toString()}%`
            },
            offsetY: -2,
            fontSize: '18px'
          }
        }
      }
    },
    grid: {
      padding: {
        top: -10
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        type: 'horizontal',
        stops: [0, 100],
        gradientToColors: [gradiantColor]
      },
    },
    stroke: {
      lineCap: "round",
      curve: 'smooth'
    },
    labels: ['Average Results'],

  }

  return result;
};

export const ProfifByMonthOptions: ApexOptions = {
  chart: {
    height: 350,
    type: 'line',
    zoom: {
      type: 'x',
      enabled: true,
      autoScaleYaxis: true
    },
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight'
  },

  grid: {
    row: {
      colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.5
    },
  },

};


export const ObjectiveChartOptions: ApexOptions = {
  chart: {
    height: 280,
    type: "radialBar"
  },
  grid: {
    padding: {
     left: 0,
     right: 0
    }
  },
  plotOptions: {
    radialBar: {
      startAngle: 0,
      hollow: {
        margin: 0,
        size: '70%',
        background: '#fff',
        image: undefined,
        imageOffsetX: 0,
        imageOffsetY: 0,
        position: 'front',
        dropShadow: {
          enabled: true,
          top: 3,
          left: 0,
          blur: 4,
          opacity: 0.24
        }
      },
      track: {
        background: '#fff',
        strokeWidth: '67%',
        margin: 0, // margin is in pixels
        dropShadow: {
          enabled: true,
          top: -3,
          left: 0,
          blur: 4,
          opacity: 0.35
        }
      },

      dataLabels: {
        show: true,
        name: {
          offsetY: -10,
          show: true,
          color: '#888',
          fontSize: '17px'
        },
      }
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'horizontal',
      shadeIntensity: 0.5,
      gradientToColors: ['#ABE5A1'],
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100]
    }
  },

  stroke: {
    lineCap: "round",
  },
  labels: ["Progress"]
}