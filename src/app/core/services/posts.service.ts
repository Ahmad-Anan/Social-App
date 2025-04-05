import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../shared/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private HTtpClient:HttpClient) { }


    createPost(data :FormData):Observable<any>{
      return this.HTtpClient.post(`${environment.baseUrl}posts` , data)
    };

  getAllPosts():Observable<any>{
      return this.HTtpClient.get(`${environment.baseUrl}posts` )
    };

  getMyPosts():Observable<any>{
      return this.HTtpClient.get(`${environment.baseUrl}users/664bcf3e33da217c4af21f00/posts` )
    };

  getSinglePosts(postId :string):Observable<any>{
      return this.HTtpClient.get(`${environment.baseUrl}posts/${postId}` )
    };

  updatePosts(postId :string , data :FormData):Observable<any>{
      return this.HTtpClient.put(`${environment.baseUrl}posts/${postId}`,data )
    };

  deletePosts(postId :string ):Observable<any>{
      return this.HTtpClient.delete(`${environment.baseUrl}posts/${postId}` )
  };




}
