import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs'
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  panelOpenState = false;
  posts: Post[] = [];
  private postsSub: Subscription | undefined;

  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) =>{
        this.posts = posts;
        console.log("Posts updated:", this.posts)
    });
  }

  onDeletePost(postId: string) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub?.unsubscribe();
  }
}
