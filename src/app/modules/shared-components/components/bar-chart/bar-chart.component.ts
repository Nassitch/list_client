import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, registerables, ChartEvent, ActiveElement } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})
export class BarChartComponent implements OnInit {
  @ViewChild('lineChart', { static: true }) lineChart!: ElementRef;
  @Input() public months!: string[];
  @Input() public shops!: number[];
  @Input() public invoices!: number[];
  @Input() public statOne!: string;
  @Input() public statTwo!: string;

  label: string = 'Tous';
  shop: number | null = null;
  invoice: number | null = null;
  value: number | null = null;

  shopData: number[] = [];
  invoiceData: number[] = [];

  private chart!: Chart;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.shopData = this.shops;
    this.invoiceData = this.invoices;
    this.renderChart();
    this.calculateInitialSums();
  }

  renderChart(): void {
    const combinedData = this.shopData.map((value, index) => value + this.invoiceData[index]);

    const chartConfig: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: this.months,
        datasets: [
          {
            label: 'Shop + Facture',
            data: combinedData,
            fill: true,
            backgroundColor: 'rgb(253, 235, 215)',
            borderRadius: 5,
            pointBackgroundColor: 'rgb(0, 0, 0)',
          }
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
        onClick: (event: ChartEvent, elements: ActiveElement[], chart: Chart) => {
          if (elements.length > 0) {
            const firstPoint = elements[0];
            const index = firstPoint.index;

            this.shop = this.shopData[index];
            this.invoice = this.invoiceData[index];
            this.value = combinedData[index];
            this.label = chart.data.labels![index] as string;

            console.log(1, this.shopData);
            console.log(2, this.invoiceData);

            this.chart.update();
          }
        },
      },
    };

    this.chart = new Chart(this.lineChart.nativeElement, chartConfig);
  }

  calculateInitialSums(): void {
    this.shop = this.shopData.reduce((a, b) => a + b, 0);
    this.invoice = this.invoiceData.reduce((a, b) => a + b, 0);
  }
}