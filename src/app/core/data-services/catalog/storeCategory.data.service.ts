import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { blobToText, throwException } from '../../base/base';
import { AuthenticateResultDto, LoginDto, RefreshTokenInputDto, TokenResultDto } from '../../data-models/identity.data.models';



