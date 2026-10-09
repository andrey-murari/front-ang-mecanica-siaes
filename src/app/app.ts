import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { API_ENDPOINT } from './api.config';

@Component({
  selector: 'app-root',
  imports: [FormsModule, JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly http = inject(HttpClient);
  private requestId = 0;

  protected readonly endpoint = signal(API_ENDPOINT);
  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly result = signal<unknown>(undefined);

  protected fetchJson(): void {
    const url = this.endpoint().trim();
    if (!url) {
      this.error.set('Enter an endpoint URL.');
      this.result.set(undefined);
      return;
    }

    const requestId = ++this.requestId;
    this.loading.set(true);
    this.error.set(null);
    this.result.set(undefined);

    this.http.get<unknown>(url).subscribe({
      next: (data) => {
        if (requestId !== this.requestId) {
          return;
        }
        this.result.set(data);
        this.loading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        if (requestId !== this.requestId) {
          return;
        }
        const detail =
          typeof err.error === 'string' && err.error.trim() ? err.error : err.message;
        this.error.set(err.status ? `HTTP ${err.status}: ${detail}` : detail);
        this.loading.set(false);
      },
    });
  }
}
