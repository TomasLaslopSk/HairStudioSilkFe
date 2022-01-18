import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs'
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Post } from "../models/post.model";

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  private BASE_URL = environment.API_URL

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http.get<{message: string, posts: any}>(`${this.BASE_URL}/posts`)
      .pipe(map((postData) => {
        return postData.posts.map((post: { title: any; content: any; _id: any; }) => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          }
        })
      }))
      .subscribe((transformedPosts) => {
          this.posts = transformedPosts;
          this.postsUpdated.next([...this.posts])
    });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {id: '', title: title, content: content};
    this.http.post<{message: string, postId: string}>(`${this.BASE_URL}/posts`, post)
      .subscribe((responseData) => {
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post)
        this.postsUpdated.next([...this.posts]);
      });
  }

  deletePost(postId: string) {
    console.log('Try to delete post:', postId)
    this.http.delete(`${this.BASE_URL}/posts/` + postId)
    .subscribe(() => {
      console.log(`Post ${postId} Deleted`);
      const updatedPosts = this.posts.filter(post => post.id !== postId);
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    })
  }
}
