import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TestModel } from '../model/testModel';

@Injectable({
    providedIn: 'root'
})
export class TestService {

    constructor(private http: HttpClient) { }
    private testUrl = 'api/test';


    getTest(): Observable<TestModel> {
        const token = "Bearer " + localStorage.getItem("JWT");

        let headers = new HttpHeaders();
        headers = headers.append('Authorization', token);
        headers = headers.append('Content-Type', 'application/json');

        return this.http.get<TestModel>(this.testUrl,{headers});
    }
}
