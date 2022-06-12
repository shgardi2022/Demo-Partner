import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { blobToText, throwException } from '../../base/base';
import { AuthenticateResultDto, LoginDto, RefreshTokenInputDto, TokenResultDto } from '../../data-models/identity.data.models';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationDataService {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(@Inject(HttpClient) http: HttpClient) {
    this.http = http;
    this.baseUrl = environment.appConfig.identityServiceBaseUrl;
  }



  login(accept_Language: any | undefined, body: LoginDto | undefined): Observable<AuthenticateResultDto> {
    let url_ = this.baseUrl + "/api/2/StoreManagement/Partner/Login";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_ : any = {
        body: content_,
        observe: "response",
        responseType: "blob",
        headers: new HttpHeaders({
            "Accept-Language": accept_Language !== undefined && accept_Language !== null ? "" + accept_Language : "",
            "Content-Type": "application/json-patch+json",
            "Accept": "text/plain"
        })
    };

    return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
        return this.processLogin(response_);
    })).pipe(_observableCatch((response_: any) => {
        if (response_ instanceof HttpResponseBase) {
            try {
                return this.processLogin(response_ as any);
            } catch (e) {
                return _observableThrow(e) as any as Observable<AuthenticateResultDto>;
            }
        } else
            return _observableThrow(response_) as any as Observable<AuthenticateResultDto>;
    }));
}

protected processLogin(response: HttpResponseBase): Observable<AuthenticateResultDto> {
    const status = response.status;
    const responseBlob =
        response instanceof HttpResponse ? response.body :
        (response as any).error instanceof Blob ? (response as any).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
    if (status === 200) {
        return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
        let result200: any = null;
        result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as AuthenticateResultDto;
        return _observableOf(result200);
        }));
    } else if (status !== 200 && status !== 204) {
        return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }));
    }
    return _observableOf(null as any);
}


  refreshToken(accept_Language: any | null, body: RefreshTokenInputDto | null): Observable<TokenResultDto> {
    let url_ = this.baseUrl + "/api/2/Account/RefreshToken";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Accept-Language": accept_Language !== undefined && accept_Language !== null ? "" + accept_Language : "",
        "Content-Type": "application/json-patch+json",
        "Accept": "text/plain"
      })
    };

    return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processRefreshToken(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processRefreshToken(response_ as any);
        } catch (e) {
          return _observableThrow(e) as any as Observable<TokenResultDto>;
        }
      } else
        return _observableThrow(response_) as any as Observable<TokenResultDto>;
    }));
  }

  protected processRefreshToken(response: HttpResponseBase): Observable<TokenResultDto> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (response as any).error instanceof Blob ? (response as any).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
    if (status === 200) {
      return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
        let result200: any = null;
        result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as TokenResultDto;
        return _observableOf(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return _observableOf(null as any);
  }
}
