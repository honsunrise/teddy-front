import {Component, OnInit} from '@angular/core';
import {InfoWithTime} from '../../../service/domain/InfoWithTime';
import {ContentService} from '../../../service/content/content.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {UploadService} from '../../../service/upload/upload.service';
import {UserService} from '../../../service/user/user.service';
import {UserProfile} from '../../../service/domain/userprofile';
import {Observable} from 'rxjs/Rx';
import {FileUploader} from '../../../service/upload/file-uploader.class';
import {UploadToken} from '../../../service/domain/uploadToken';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  favorites = 0;
  thumbUp = 0;
  thumbDown = 0;

  favoriteList: Array<InfoWithTime> = [];
  thumbUpList: Array<InfoWithTime> = [];
  thumbDownList: Array<InfoWithTime> = [];
  userProfile: UserProfile;

  form: FormGroup;

  uploader: FileUploader;

  constructor(private contentService: ContentService,
              private uploadService: UploadService,
              private userService: UserService,
              private router: Router, private fb: FormBuilder) {
    contentService.getUserFavoriteList().subscribe(value => {
      this.favoriteList = value;
    });
    contentService.getUserThumbUpList().subscribe(value => {
      this.thumbUpList = value;
    });
    contentService.getUserThumbDownList().subscribe(value => {
      this.thumbDownList = value;
    });

    this.form = this.fb.group({
      avatar: [[], Validators.compose([
        Validators.required
      ])],
      firstname: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ])],
      lastname: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(100)
      ])],
      birthday: [null, Validators.compose([
        Validators.required,
        CustomValidators.date,
        CustomValidators.minDate('1900-1-1'),
        CustomValidators.maxDate(new Date())
      ])],
      bio: ['', Validators.compose([
        Validators.maxLength(500)
      ])],
      gender: ['UNKNOWN', Validators.compose([Validators.required])],
      findMeByEmail: [true, Validators.compose([Validators.required])],
    });

    userService.getUserProfile().subscribe(value => {
      this.userProfile = value;
      this.form.controls['firstname'].setValue(this.userProfile.firstname);
      this.form.controls['lastname'].setValue(this.userProfile.lastname);
      this.form.controls['birthday'].setValue(new Date(this.userProfile.birthday));
      this.form.controls['bio'].setValue(this.userProfile.bio);
      this.form.controls['gender'].setValue(this.userProfile.gender);
      this.form.controls['findMeByEmail'].setValue(false);
    });

    this.uploader = this.uploadService.getFileUploader();
  }

  ngOnInit() {
  }

  goToWatchInfo(id: String) {
    this.router.navigate(['/watch', id]);
  }

  onSubmit() {
    const firstname = this.form.value['firstname'];
    const lastname = this.form.value['lastname'];
    const birthday = this.form.value['birthday'];
    const bio = this.form.value['bio'];
    const gender = this.form.value['gender'];
    const avatar = this.form.value['avatar'];
    const findMeByEmail = this.form.value['findMeByEmail'];
    this.uploader.addToQueue(avatar);
    Observable.create((sub) => {
      this.uploader.uploadAll().subscribe((tokens: UploadToken[]) => {
        const data = {
          firstname: firstname,
          lastname: lastname,
          birthday: birthday,
          gender: gender,
          bio: bio,
          avatarToken: tokens[0].token,
        };
        this.userService.updateUserProfile(data).subscribe(() => {
          sub.complete();
        });
      });
    }).subscribe();
  }
}
