import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostService } from './posts.service';
import { Subscription , throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error =null;
  private errorSub :Subscription; 
  constructor(private http: HttpClient, private service: PostService) { }
  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
    }

  ngOnInit() {

    this.errorSub= this.service.error.subscribe(
      errorMessage =>{
        this.error=errorMessage;
      }
    )
    this.isFetching=true;
    this.service.fetchPosts().subscribe(
      posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      err =>{
        this.isFetching = false;
        this.error=err.message
      }
    );
  }

  onCreatePost(postData: Post) {
    this.service.createAndStorePost(postData.title,postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching=true;
    this.service.fetchPosts().subscribe(
      posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      err =>{
        this.isFetching = false;
        this.error=err.message
      }
    )
    this.isFetching=false;
  }

  onClearPosts() {
    this.service.deletePosts().subscribe(
      ()=>{
        this.loadedPosts=[];
      }
    )
  }
  onErrorHandle(){
    this.error=null;
  }
  
}
