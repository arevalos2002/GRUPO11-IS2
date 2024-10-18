import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
    taskStatuses = [
        { label: 'Pendiente', count: 125 },
        { label: 'Trabajando', count: 80 },
        { label: 'Pausado', count: 20 },
        { label: 'Terminado', count: 200 }
    ];

    userTasks = [
        { name: 'Juan Pérez', pending: 5, working: 2, paused: 1, completed: 15 },
        { name: 'María García', pending: 10, working: 4, paused: 0, completed: 25 },
        { name: 'Carlos Ruiz', pending: 8, working: 5, paused: 2, completed: 18 }
    ];

    chart: any;
    subscription!: Subscription;

    constructor(public layoutService: LayoutService) {
        this.subscription = this.layoutService.configUpdate$
            .pipe(debounceTime(25))
            .subscribe(() => {
                this.initChart();
            });
    }

    ngOnInit() {
        this.initChart();
    }

    initChart() {
        const ctx = document.getElementById('taskChart') as HTMLCanvasElement;
        if (ctx) {
            this.chart = new Chart(ctx, {
                type: 'bar', // Puedes cambiarlo a 'doughnut' o 'pie' según tus preferencias
                data: {
                    labels: this.userTasks.map(user => user.name),
                    datasets: [
                        {
                            label: 'Pendiente',
                            data: this.userTasks.map(user => user.pending),
                            backgroundColor: '#ff6384',
                        },
                        {
                            label: 'Trabajando',
                            data: this.userTasks.map(user => user.working),
                            backgroundColor: '#36a2eb',
                        },
                        {
                            label: 'Pausado',
                            data: this.userTasks.map(user => user.paused),
                            backgroundColor: '#ffce56',
                        },
                        {
                            label: 'Terminado',
                            data: this.userTasks.map(user => user.completed),
                            backgroundColor: '#4caf50',
                        }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true,
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Usuarios'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Cantidad de Tareas'
                            }
                        }
                    }
                }
            });
        }
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.chart) {
            this.chart.destroy();
        }
    }
}


