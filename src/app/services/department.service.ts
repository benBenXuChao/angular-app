import { Injectable } from '@angular/core';
import { GKBaseService, GKRequestService } from '@goku/http';
import { API } from '../api/api.conf';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService extends GKBaseService {
  constructor(public requestService: GKRequestService) {
    super(API.DEPARTMENT);
  }
}
