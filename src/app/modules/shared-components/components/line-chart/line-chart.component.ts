import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, registerables, ChartEvent, ActiveElement } from 'chart.js';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [],
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent implements OnInit {
  @ViewChild('lineChart', { static: true }) lineChart!: ElementRef;
  @Input() public statOne!: string;
  @Input() public statTwo!: string;

  label: string = 'Tous';
  shop: number | null = null;
  value: number | null = null;

  private chart!: Chart;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.renderChart();
    this.calculateInitialSums();
  }

  renderChart(): void {
    const canvas = this.lineChart.nativeElement as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    const gradientBlack = ctx!.createLinearGradient(0, 0, 0, canvas.height);
    gradientBlack.addColorStop(0, 'rgba(0, 0, 0, 0.3)');
    gradientBlack.addColorStop(1, 'rgba(0, 0, 0, 0)');

    const gradientYellow = ctx!.createLinearGradient(0, 0, 0, canvas.height);
    gradientYellow.addColorStop(0, 'rgb(253, 235, 215)');
    gradientYellow.addColorStop(1, 'rgba(0, 0, 0, 0)');

    const chartConfig: ChartConfiguration = {
      type: 'line',
      data: {
        labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',],
        datasets: [
          {
            data: [65, 59, 80, 81, 110, 54, 55, 87, 97, 102, 120, 155],
            fill: true,
            backgroundColor: gradientBlack,
            borderColor: 'rgb(0, 0, 0)',
            tension: 0.5,
            borderCapStyle: 'butt',
            borderJoinStyle: 'miter',
            pointRadius: 0,
            pointHoverRadius: 0,
            pointHitRadius: 20,
            pointBackgroundColor: 'rgb(0, 0, 0)',
          },
          {
            data: [5, 4, 7, 7, 10, 4, 4, 7, 10, 12, 12, 17],
            fill: true,
            backgroundColor: gradientYellow,
            borderColor: 'rgb(253, 235, 215)',
            tension: 0.5,
            borderCapStyle: 'butt',
            borderJoinStyle: 'miter',
            pointRadius: 0,
            pointHoverRadius: 0,
            pointHitRadius: 20,
            pointBackgroundColor: 'rgb(0, 0, 0)',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (context) => `Label: ${context.label}`,
              afterLabel: (context) => `Value: ${context.raw}`,
            },
          },
        },
        scales: {
          x: {
            display: false,
          },
          y: {
            display: false,
          },
        },
        onClick: (event: ChartEvent, elements: ActiveElement[], chart: Chart) => {
          if (elements.length > 0) {
            const firstPoint = elements[0];
            const index = firstPoint.index;
            const datasetIndex = firstPoint.datasetIndex;
            const dataset = chart.data.datasets[datasetIndex];
            const value = dataset.data[index] as number;
            const label = chart.data.labels![index] as string;
            if (datasetIndex === 0) {
              this.value = value;
            } else if (datasetIndex === 1) {
              this.shop = value;
            }
            this.label = label;

            const meta = chart.getDatasetMeta(datasetIndex).data[index];
            meta.options['radius'] = meta.options['radius'] === 5 ? 0 : 5;
            meta.options['hoverRadius'] =
              meta.options['hoverRadius'] === 5 ? 0 : 5;
            this.chart.update();
          }
        },
      },
    };

    this.chart = new Chart(this.lineChart.nativeElement, chartConfig);
  }

  calculateInitialSums(): void {
    const dataValue: number[] = this.chart.config.data.datasets[0].data as number[];
    const dataShop: number[] = this.chart.config.data.datasets[1].data as number[];

    this.value = dataValue.reduce((a, b) => a + b, 0);
    this.shop = dataShop.reduce((a, b) => a + b, 0);
  }
}
