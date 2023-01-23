import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { catchError } from "rxjs/internal/operators/catchError";
import { map , tap } from "rxjs/operators";
import { Post } from "./post.model";

@Injectable({ providedIn: 'root' })
export class PostService {
    error= new Subject<string>();

    constructor(private http: HttpClient) { }
    createAndStorePost(_title: string, _content: string) {
        const postData: Post = { title: _title, content: _content };

        this.http.post<{ name: string }>('https://angular-6aa88-default-rtdb.firebaseio.com/post.json', postData,
        {
            observe:'body'
        })
            .subscribe(responsedata => {
                console.log(responsedata);
            }, error=>{
                this.error.next(error.message);
            })
    }

    fetchPosts() {
        const searchParams = new HttpParams();
        searchParams.append('print','pretty');
        return this.http.get<{ [key: string]: Post }>('https://angular-6aa88-default-rtdb.firebaseio.com/post.json',{
            headers: new HttpHeaders({
                'Custom-header':'hello'
            }),
            params: searchParams
        }).pipe(
            map(
                responseData => {
                    const postArray: Post[] = [];
                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            postArray.push({ ...responseData[key], id: key });
                        }

                    }
                    return postArray;

                }
            ), catchError(
                errorres =>{
                    return throwError(errorres)
                }
            )
        );


    }

    deletePosts(){
       return this.http.delete('https://angular-6aa88-default-rtdb.firebaseio.com/post.json',
       {observe:'events',
        responseType:'blob'}
        ).pipe(
            tap(
                res => {
                    console.log(res)
                    if(res.type==HttpEventType.Response){

                    }
                }
            )
       )
    }
}