import { TestBed } from '@angular/core/testing';
import { HeaderInterceptor } from './header.interceptor';
import { RouterTestingModule } from '@angular/router/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

describe('HeaderInterceptor', () => {
  let client: HttpClient;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HeaderInterceptor,
          multi: true,
        },
      ],
    });
    client = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should add poperty in header', () => {
    const url = `${environment.baseURL}/posts`;

    client.get(url).subscribe(res => {
      expect(res).toBeTruthy();
    });
    const httpReq = httpController.expectOne(url);

    expect(httpReq.request.headers.has('Content-type')).toEqual(true);
    expect(httpReq.request.headers.get('Content-type')).toBe(
      'application/json; charset=UTF-8'
    );
  });
});
