import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import { HttpserviceService } from '../httpservice.service';
//import { error } from '@angular/compiler/src/util';
@Component({
  selector: 'app-http-demo',
  templateUrl: './http-demo.component.html',
  styleUrls: ['./http-demo.component.css']
})
export class HttpDemoComponent implements OnInit {
 // url:string="https://jsonplaceholder.typicode.com/comments";
 posts=[];
 ishidden:boolean=true;
 myname1:string="";
 myemail1:string="";
 mybody1:string="";
 myid1:string="";
 
  constructor(private service:HttpserviceService ) { }

  ngOnInit() {
    this.service.getposts()
    .subscribe(response=>{
      console.log(response.json());
      this.posts=response.json();
    },error=>{alert("Unexpected error!!!");
  })
    
  }
  addData(name1,body1){
    let createdata={name:name1,body:body1};
    this.service.addpost(createdata)
    .subscribe(response=>{console.log(response.json());

      let id1=response.json().id;
      console.log(id1);//parsing
      this.posts.splice(0,0,{id:id1,name:name1,body:body1});
    })
  }
  OnUpdate(item){
    this.ishidden=false;
    this.myid1=item.id;
    this.myname1=item.name;
    this.myemail1=item.email;
    this.mybody1=item.body;
  }
update(){
  let updateobj={
    id:this.myid1,
    name:this.myname1,
    email:this.myemail1,
    body:this.mybody1
  };
  this.service.UpdatePosts(updateobj)
  .subscribe(response=>{console.log(response.json());
  });
}
onDelete(item){
  this.service.DeletePosts(item.id)
  .subscribe(response=>{
    console.log(response.json());
    this.posts.splice(item.id-1,1);
  });
}
}
