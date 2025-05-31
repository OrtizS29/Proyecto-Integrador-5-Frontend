import { Component, OnInit } from '@angular/core';
import { NovedadesService } from '../../services/novedadesService';
import { Novedad } from '../../models/novedades';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-novedades',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, HttpClientModule],
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.css']
})
export class NovedadesComponent implements OnInit {
  novedades: Novedad[] = [];

  constructor(private novedadesService: NovedadesService) {}

  ngOnInit(): void {
    this.novedadesService.obtenerNovedades().subscribe((data) => {
      this.novedades = data;
    });
  }
}
