import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { environment } from '../environments/environment.development';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('client');

  httpClient = inject(HttpClient);
  usuarios = signal<any[]>([])

  ngOnInit(): void {
    const peticion = this.httpClient.get(environment.apiUrl+'autentication');

    peticion.subscribe((val) => {
      this.usuarios.set(val as any[]);
    });
    console.log(this.usuarios);
  }
}
