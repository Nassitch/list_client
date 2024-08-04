import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  Chart,
  ChartConfiguration,
  registerables,
  ChartEvent,
  ActiveElement,
} from 'chart.js';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [],
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent implements OnInit {
  @ViewChild('lineChart', { static: true }) lineChart!: ElementRef;
  @Input() public months!: string[];
  @Input() public shops!: number[];
  @Input() public invoices!: number[];
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
  }

  renderChart(): void {
    const canvas = this.lineChart.nativeElement as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    const gradientYellow = ctx!.createLinearGradient(0, 0, 0, canvas.height);
    gradientYellow.addColorStop(0, 'rgb(253, 235, 215)');
    gradientYellow.addColorStop(1, 'rgba(0, 0, 0, 0)');

    const chartConfig: ChartConfiguration = {
      type: 'line',
      data: {
        labels: this.months,
        datasets: [
          {
            data: this.shops.map(
              (value, index) => value + this.invoices[index]
            ),
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
        onClick: (
          event: ChartEvent,
          elements: ActiveElement[],
          chart: Chart
        ) => {
          if (elements.length > 0) {
            const firstPoint = elements[0];
            const index = firstPoint.index;

            this.shop = this.shops[index];
            this.value = this.invoices[index];
            this.label = chart.data.labels![index] as string;

            this.chart.update();
          }
        },
      },
    };

    this.chart = new Chart(this.lineChart.nativeElement, chartConfig);
  }

  updateChart(): void {
    if (this.chart) {
      const combinedData = this.shops.map(
        (value, index) => value + this.invoices[index]
      );
      this.chart.data.datasets[0].data = combinedData;
      this.chart.update();
    }
  }
}
