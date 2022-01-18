import { Component } from "@angular/core";
import { FormControl, NgForm, Validators } from "@angular/forms";
import { PostsService } from "src/app/services/post.service";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {
  postTitle: string = '';
  postContent: string = '';
  showAddPost: boolean = true;

  constructor(public postsService: PostsService) {}

  onSubmitPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.postsService.addPost(form.value.postTitle, form.value.postContent)
    form.resetForm();
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
