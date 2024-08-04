import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  Chart,
  ChartConfiguration,
  registerables,
  ChartEvent,
  ActiveElement,
} from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css',
})
export class BarChartComponent implements OnInit, OnChanges {
  @ViewChild('lineChart', { static: true }) lineChart!: ElementRef;
  @Input() public months!: string[];
  @Input() public shops!: number[];
  @Input() public invoices!: number[];
  @Input() public statOne!: string;
  @Input() public statTwo!: string;

  label: string = 'Tous';
  shop: number | null = null;
  invoice: number | null = null;

  private chart!: Chart;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.renderChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateChart();
  }

  renderChart(): void {
    const chartConfig: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: this.months,
        datasets: [
          {
            label: 'Shop + Facture',
            data: this.shops.map(
              (value, index) => value + this.invoices[index]
            ),
            fill: true,
            backgroundColor: 'rgb(253, 235, 215)',
            borderRadius: 5,
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
              label: (context) => `Mois: ${context.label}`,
              afterLabel: (context) => `Total: ${context.raw} €`,
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
            this.invoice = this.invoices[index];
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
