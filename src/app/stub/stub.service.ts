import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { pluck, take, tap } from 'rxjs/operators';

export interface Stub {
  environment: string;
  type: string;
  snippet: string;
}

export interface State {
  data: Stub[];
  page: number;
  total: number;
}

export interface Update {
  nextPage?: boolean;
  specificPage?: number;
}

@Injectable({
  providedIn: 'root'
})
export class StubService {
  private readonly ALL: Stub[] = [];
  private readonly BUFFER = 20;

  private stateSubject = new BehaviorSubject<State>(null);
  readonly state$ = this.stateSubject.asObservable();

  constructor(http: HttpClient) {
    http
      .get<Stub[]>('assets/json/stub.json')
      .pipe(
        tap(data => this.ALL.push(...data)),
        take(1)
      )
      .subscribe(() =>
        this.stateSubject.next({
          data: this.ALL.slice(0, this.BUFFER),
          page: 1,
          total: this.ALL.length,
        })
      );
  }

  get data$(): Observable<Stub[]> { return this.state$.pipe(pluck('data')); }
  get page$(): Observable<number> { return this.state$.pipe(pluck('page')); }
  get total$(): Observable<number> { return this.state$.pipe(pluck('total')); }

  update(update: Update): void {
    const newPage = update.nextPage ?
      this.stateSubject.value.page += 1 : (
        !update.specificPage ?
          this.stateSubject.value.page -= 1 :
          update.specificPage
      );

    const startPosition = (newPage - 1) * this.BUFFER;

    this.stateSubject.next({
      ...this.stateSubject.value,
      page: newPage,
      data: this.ALL.slice(startPosition, startPosition + this.BUFFER),
    });
  }
}
