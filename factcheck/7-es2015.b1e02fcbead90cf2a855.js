(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"3U9b":function(t,n,e){"use strict";e.r(n),e.d(n,"ViewPostModuleModule",(function(){return M}));var o=e("ofXK"),i=e("3Pt+"),c=e("tyNb"),s=e("fXoL");let r=(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=s.Db({type:t,selectors:[["app-view-post-module"]],decls:1,vars:0,template:function(t,n){1&t&&s.Kb(0,"router-outlet")},directives:[c.i],styles:[""]}),t})();var a=e("AytR"),d=e("P5sw"),m=e("R7Hv");function p(t,n){if(1&t){const t=s.Pb();s.Ob(0,"li",12),s.Wb("click",(function(){s.lc(t);const n=s.Yb(),e=n.$implicit,o=n.index;return s.Yb().delete_post(e._id,o)})),s.rc(1,"Delete"),s.Nb()}}function g(t,n){1&t&&s.Kb(0,"i",33)}function l(t,n){1&t&&s.Kb(0,"img",34)}function b(t,n){if(1&t&&s.Kb(0,"img",47),2&t){const t=s.Yb(3);s.ec("src",t.defaultProfilePic,s.nc)}}function _(t,n){if(1&t&&s.Kb(0,"img",47),2&t){const t=s.Yb().$implicit;s.ec("src","http://localhost:4000/"+t.user_id.profile_pic,s.nc)}}function f(t,n){if(1&t){const t=s.Pb();s.Ob(0,"i",48),s.Wb("click",(function(){s.lc(t);const n=s.Yb(),e=n.$implicit,o=n.index,i=s.Yb().index;return s.Yb().deleteComment(e._id,o,i)})),s.Nb()}}function u(t,n){if(1&t){const t=s.Pb();s.Ob(0,"div",35),s.Ob(1,"div",36),s.Wb("click",(function(){s.lc(t);const e=n.$implicit;return s.Yb(2).view_user(e.user_id._id)})),s.Ob(2,"div",37),s.qc(3,b,1,1,"img",38),s.qc(4,_,1,1,"img",38),s.Nb(),s.Ob(5,"div",39),s.rc(6),s.Nb(),s.Nb(),s.Ob(7,"div",40),s.Ob(8,"p",41),s.rc(9),s.Nb(),s.Nb(),s.Ob(10,"div",42),s.rc(11),s.Zb(12,"date"),s.Nb(),s.Ob(13,"div",43),s.Ob(14,"i",44),s.Wb("click",(function(){s.lc(t);const e=n.$implicit,o=n.index,i=s.Yb().index;return s.Yb().upvote_comment_with_id(e._id,e.voted,i,o)})),s.Nb(),s.Ob(15,"span"),s.rc(16),s.Nb(),s.Ob(17,"i",45),s.Wb("click",(function(){s.lc(t);const e=n.$implicit,o=n.index,i=s.Yb().index;return s.Yb().downvote_comment_with_id(e._id,e.voted,i,o)})),s.Nb(),s.Ob(18,"span"),s.rc(19),s.Nb(),s.qc(20,f,1,0,"i",46),s.Nb(),s.Nb()}if(2&t){const t=n.$implicit,e=s.Yb(2);s.zb(3),s.ec("ngIf",!t.user_id.profile_pic),s.zb(1),s.ec("ngIf",t.user_id.profile_pic),s.zb(2),s.tc(" ",t.user_id.firstname+" "+t.user_id.lastname," "),s.zb(3),s.tc(" ",t.content," "),s.zb(2),s.tc(" ",s.bc(12,12,t.time,"medium")," "),s.zb(3),s.Bb("upvote","upvote"==t.voted),s.zb(2),s.sc(t.upvotes>=0?t.upvotes:0),s.zb(1),s.Bb("downvote","downvote"==t.voted),s.zb(2),s.sc(t.downvotes>=0?t.downvotes:0),s.zb(1),s.ec("ngIf",t.user_id._id==e.myUserId)}}function h(t,n){1&t&&(s.Ob(0,"span"),s.rc(1,"see more comments "),s.Nb())}function O(t,n){1&t&&s.Kb(0,"img",34)}function C(t,n){if(1&t){const t=s.Pb();s.Ob(0,"article",5),s.Ob(1,"div",6),s.Ob(2,"div",7),s.Wb("click",(function(){s.lc(t);const e=n.$implicit;return s.Yb().view_user(e.userDetails._id)})),s.Ob(3,"div",8),s.Kb(4,"img",9),s.Nb(),s.Ob(5,"div",10),s.rc(6),s.Nb(),s.Nb(),s.Ob(7,"div",11),s.Kb(8,"span"),s.Kb(9,"span"),s.Kb(10,"span"),s.Ob(11,"ul"),s.Ob(12,"li",12),s.Wb("click",(function(){s.lc(t);const e=n.$implicit;return s.Yb().report(e._id)})),s.rc(13,"report"),s.Nb(),s.qc(14,p,2,0,"li",13),s.Nb(),s.Nb(),s.Nb(),s.Kb(15,"div",14),s.Ob(16,"div",15),s.rc(17),s.Zb(18,"date"),s.Nb(),s.Ob(19,"div",16),s.Ob(20,"div",17),s.Wb("click",(function(){s.lc(t);const e=n.index,o=n.$implicit;return s.Yb().react_true(e,o._id)})),s.rc(21," Legit "),s.Ob(22,"span"),s.rc(23),s.Nb(),s.Kb(24,"div",18),s.Nb(),s.Ob(25,"div",19),s.Wb("click",(function(){s.lc(t);const e=n.index,o=n.$implicit;return s.Yb().react_false(e,o._id)})),s.rc(26," Fake "),s.Ob(27,"span"),s.rc(28),s.Nb(),s.Kb(29,"div",20),s.Nb(),s.Nb(),s.Ob(30,"div",21),s.Ob(31,"form",22,23),s.Ob(33,"div",24),s.Ob(34,"input",25,26),s.Wb("ngModelChange",(function(n){return s.lc(t),s.Yb().comment=n})),s.Nb(),s.Nb(),s.Ob(36,"button",27),s.Wb("click",(function(){s.lc(t);const e=n.$implicit,o=s.Yb();return o.comment_submit(e._id,e.userDetails._id,o.myUserId,0)})),s.qc(37,g,1,0,"i",28),s.qc(38,l,1,0,"img",29),s.Nb(),s.Nb(),s.Nb(),s.qc(39,u,21,15,"div",30),s.Ob(40,"div",31),s.Wb("click",(function(){return s.lc(t),s.Yb().fetch_comments()})),s.qc(41,h,2,0,"span",32),s.qc(42,O,1,0,"img",29),s.Nb(),s.Nb()}if(2&t){const t=n.$implicit,e=s.jc(35),o=s.Yb();s.zb(4),s.ec("src",o.serverLink+t.userDetails.profile_pic,s.nc),s.zb(2),s.tc(" ",t.userDetails.firstname+" "+t.userDetails.lastname," "),s.zb(8),s.ec("ngIf",o.myUserId==t.userDetails._id),s.zb(1),s.ec("innerHTML",t.content,s.mc),s.zb(2),s.tc(" ",s.bc(18,22,t.time,"medium")," "),s.zb(3),s.Bb("voted","true"===t.voted),s.zb(3),s.sc(null!=t.trueCount?t.trueCount:""),s.zb(1),s.pc(t.reactTrueStyle||""),s.zb(1),s.Bb("voted","false"===t.voted),s.zb(3),s.tc("",null!=t.falseCount?t.falseCount:""," "),s.zb(1),s.pc(t.reactFalseStyle||""),s.zb(5),s.ec("ngModel",o.comment),s.zb(2),s.ec("disabled",e.invalid),s.zb(1),s.ec("ngIf",!o.comment_submit_loading),s.zb(1),s.ec("ngIf",o.comment_submit_loading),s.zb(1),s.ec("ngForOf",t.comments),s.zb(2),s.ec("ngIf",!o.MorecommentFetchLoader),s.zb(1),s.ec("ngIf",o.MorecommentFetchLoader)}}const x=[{path:"",component:r,children:[{path:"",component:(()=>{class t{constructor(t,n,e,o,i,c){this.ss=t,this.ds=n,this.ren=e,this._el=o,this.route=i,this.ar=c,this.comment_submit_loading=!1,this.comment_added_alert=!1,this.comment_deleted_alert=!1,this.request_failure_alert=!1,this.commentFetch=!1,this.MorecommentFetchLoader=!1,this.serverLink=a.a.SERVER_URL,this.skip=0,this.get_post_content=[],this.reactTrueStyle={},this.reactFalseStyle={},this.defaultProfilePic="assets/ui/yelling-formal-man-watching-news-on-laptop-3760778.jpg"}ngOnInit(){this.ar.queryParams.subscribe(t=>{t.postId?(this.postId=t.postId,this.get_post_by_id(t.postId)):alert("no postId specified")}),this.ss.user_data_observable().subscribe(t=>{this.myUserId=t.user_id,this.myProfilePic=t.profile_pic,this.myFirstName=t.firstname,this.myLastName=t.lastname})}ngAfterViewInit(){this.ss.topnav_color()}ngOnDestroy(){this.ss.topnav_hide(),this.ss.topnav_color_default()}delete_post(t,n){this.ds.delete_post(t).subscribe(t=>{t.status?(this.get_post_content.splice(n,1),this.notif("success","deleted")):this.notif("failed","couldn't delete the post")},t=>{this.notif("failed","couldn't delete the post")})}report(t){this.ds.report_post(t).subscribe(t=>{1==t.status?this.notif("info","reported"):this.notif("failed","couldn't report")},t=>{this.notif("failed","couldn't report due to network issues")})}comment_submit(t,n,e,o){this.comment_submit_loading=!0,this.ds.submit_comment(e,n,t,this.comment).subscribe(t=>{if(1==t.status)try{this.get_post_content[o].comments instanceof Array&&(t.data.user_id={_id:t.data.user_id},t.data.user_id.firstname=this.myFirstName,t.data.user_id.lastname=this.myLastName,t.data.user_id.profile_pic=this.myProfilePic?this.myProfilePic.split("/")[3]:null,this.get_post_content[o].comments.unshift(t.data),this.comment="",this.notif("success","Success! comment was posted."))}catch(n){this.comment_submit_loading=!1,console.log(n),this.notif("failed","sorry! comment can't be viewed right now.")}},t=>{this.comment_submit_loading=!1,this.notif("failed","sorry! couldn't post the comment")},()=>{this.comment_submit_loading=!1})}fetch_comments(){this.MorecommentFetchLoader=!0,this.skip=this.skip+7,this.ds.get_comments_for_post(this.postId,this.skip).subscribe(t=>{1==t.status?this.get_post_content[0].comments.push(...t.data):this.notif("failed","unable to fetch more"),this.MorecommentFetchLoader=!1},t=>{this.notif("failed","unable to fetch comments"),this.MorecommentFetchLoader=!1})}get_post_by_id(t){this.ds.get_post_by_id(t).subscribe(t=>{1==t.status&&new Promise((n,e)=>{setTimeout(e=>{for(let n of t.data)if(n.content=n.content.join(),n.voted){const t=n.trueCount+n.falseCount;n.reactTrueStyle={width:(n.trueCount/t*100).toPrecision(2).toString()+"%"},n.reactFalseStyle={width:(n.falseCount/t*100).toPrecision(2).toString()+"%"}}n()},0)}).then(()=>{this.get_post_content=t.data}).catch(t=>{console.log(t)})},t=>{console.error(t)},()=>{console.log("fetch posts complete")})}react_true(t,n){this.ds.react_true(n).subscribe(n=>{1==n.status&&"reaction updated"==n.message?this.cal_votes(t,n.data):this.notif("info",n.message)},t=>{this.notif("failed","sorry couldn't update your reaction")},()=>{console.log("put react complete")})}react_false(t,n){this.ds.react_false(n).subscribe(n=>{1==n.status&&"reaction updated"==n.message?this.cal_votes(t,n.data):this.notif("info",n.message)},t=>{this.notif("failed","sorry couldn't update your reaction")},()=>{console.log("put react complete")})}cal_votes(t,n){this.get_post_content[t].trueCount=n.trueCount,this.get_post_content[t].falseCount=n.falseCount,this.get_post_content[t].voted=n.voted;const e=n.trueCount+n.falseCount;this.get_post_content[t].reactTrueStyle={width:(n.trueCount/e*100).toPrecision(2).toString()+"%"},this.get_post_content[t].reactFalseStyle={width:(n.falseCount/e*100).toPrecision(2).toString()+"%"}}upvote_comment_with_id(t,n,e,o){this.ds.upvote_comment(t,n).subscribe(t=>{1==t.status&&("upvoted"==t.message?(this.get_post_content[e].comments[o].voted="upvote",this.get_post_content[e].comments[o].upvotes+=1,this.get_post_content[e].comments[o].downvotes-=1,this.get_post_content[e].comments[o].downvotes<0&&(this.get_post_content[e].comments[o].downvotes=0)):(this.get_post_content[e].comments[o].voted=void 0,this.get_post_content[e].comments[o].upvotes-=1))},t=>{this.notif("failed","sorry! unable to react")},()=>{console.log("upvoted")})}downvote_comment_with_id(t,n,e,o){this.ds.downvote_comment(t,n).subscribe(t=>{"downvoted"==t.message?(this.get_post_content[e].comments[o].voted="downvote",this.get_post_content[e].comments[o].downvotes+=1,this.get_post_content[e].comments[o].upvotes-=1,this.get_post_content[e].comments[o].upvotes<0&&(this.get_post_content[e].comments[o].upvotes=0)):(this.get_post_content[e].comments[o].voted=void 0,this.get_post_content[e].comments[o].downvotes-=1)},t=>{this.notif("failed","sorry! unable to react")},()=>{console.log("donwvoted")})}deleteComment(t,n,e){this.ds.delete_comment(t).subscribe(o=>{1==o.status&&(this.get_post_content[e].comments[n]._id==o.comment_id||(n=this.indexFindAlgo(t,e)),this.get_post_content[e].comments.splice(n,1))},t=>{this.notif("failed","sorry! unable to delete the comment")},()=>{this.notif("info","comment deleted")})}indexFindAlgo(t,n){const e=this.get_post_content[n].comments;setTimeout(()=>{let n=0;for(let o of e){if(o._id==t)return n;n++}},0)}notif(t,n){const e=this.ren.createElement("div");this.ren.addClass(e,"alert"),this.ren.setAttribute(e,"role","alert");const o=this.ren.createElement("strong");this.ren.appendChild(o,this.ren.createText(n)),this.ren.appendChild(e,o);let i=document.getElementsByClassName("container-fluid");i=i[0],this.ren.addClass(e,"info"==t?"alert-info":"success"==t?"alert-success":"failed"==t?"alert-danger":"alert-warning"),this.ren.appendChild(i,e)}view_user(t){this.route.navigate(["/view-user"],{queryParams:{userId:t}})}}return t.\u0275fac=function(n){return new(n||t)(s.Jb(d.a),s.Jb(m.a),s.Jb(s.D),s.Jb(s.l),s.Jb(c.e),s.Jb(c.a))},t.\u0275cmp=s.Db({type:t,selectors:[["app-view-post"]],decls:5,vars:1,consts:[[1,"container-fluid"],[1,"row"],[1,"col-12","posts-container"],[1,"posts"],["class","post mt-4",4,"ngFor","ngForOf"],[1,"post","mt-4"],[1,"post-meta-container"],[1,"meta-details","clickable",3,"click"],[1,"meta-pic"],["alt","",3,"src"],[1,"meta-name"],[1,"misc-menu"],[3,"click"],[3,"click",4,"ngIf"],[1,"post-details-container",3,"innerHTML"],[1,"meta-date"],[1,"post-reactions-container"],[1,"react-1",3,"click"],[1,"stats-true"],[1,"react-2",3,"click"],[1,"stats-false"],[1,"comment-box"],["action","",1,"form-inline"],["commentForm","ngForm"],[1,"form-group"],["type","text","name","comment","id","","placeholder","comment...","required","","ngModel","",1,"form-control",3,"ngModel","ngModelChange"],["commentInput","ngModel"],[1,"btn","comment-btn",3,"disabled","click"],["class","fa fa-arrow-right","aria-hidden","true",4,"ngIf"],["src","assets/ui/Spinner-1s-200px.gif","class","comment-submit-loading",4,"ngIf"],["class","new-comments",4,"ngFor","ngForOf"],[1,"more-comments",3,"click"],[4,"ngIf"],["aria-hidden","true",1,"fa","fa-arrow-right"],["src","assets/ui/Spinner-1s-200px.gif",1,"comment-submit-loading"],[1,"new-comments"],[1,"comment-meta","clickable",3,"click"],[1,"img"],["alt","commenter's profile pic",3,"src",4,"ngIf"],[1,"name"],[1,"comment-content"],[1,"comment-body"],[1,"time"],[1,"comment-reacts"],[1,"fas","fa-arrow-circle-up",3,"click"],[1,"fas","fa-arrow-circle-down",3,"click"],["class","fa fa-trash","style","color:red",3,"click",4,"ngIf"],["alt","commenter's profile pic",3,"src"],[1,"fa","fa-trash",2,"color","red",3,"click"]],template:function(t,n){1&t&&(s.Ob(0,"div",0),s.Ob(1,"div",1),s.Ob(2,"div",2),s.Ob(3,"section",3),s.qc(4,C,43,25,"article",4),s.Nb(),s.Nb(),s.Nb(),s.Nb()),2&t&&(s.zb(4),s.ec("ngForOf",n.get_post_content))},directives:[o.k,o.l,i.o,i.g,i.h,i.a,i.l,i.f,i.i],pipes:[o.e],styles:['*[_ngcontent-%COMP%]{box-sizing:border-box;scroll-behavior:smooth}html[_ngcontent-%COMP%]{font-size:16px}h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%], p[_ngcontent-%COMP%], span[_ngcontent-%COMP%]{font-family:sans-serif}.container-fluid[_ngcontent-%COMP%]{margin:0;scroll-behavior:smooth}.row[_ngcontent-%COMP%]{margin:0;padding:0}.gradient-1[_ngcontent-%COMP%]{background:#dc3645;background:linear-gradient(to top left,#dc3645,#704a8e)}.gradient-2[_ngcontent-%COMP%]{background:#221f3b;background:radial-gradient(to bottom right,#221f3b,#704a8e)}.gradient-main[_ngcontent-%COMP%]{background-image:linear-gradient(to right bottom,#6f4a8e,#594079,#443564,#322a50,#221f3b)}.alert[_ngcontent-%COMP%]{display:inline-block;z-index:9999;position:fixed;bottom:50px;left:50%;transform:translateX(-50%);-webkit-animation:fade-away 7s!important;animation:fade-away 7s!important;-webkit-animation-fill-mode:forwards!important;animation-fill-mode:forwards!important}.flex[_ngcontent-%COMP%]{display:flex}.fd-row[_ngcontent-%COMP%]{flex-direction:row}.fd-column[_ngcontent-%COMP%]{flex-direction:column}.fj-sb[_ngcontent-%COMP%]{justify-content:space-between}.fj-sa[_ngcontent-%COMP%]{justify-content:space-around}.fa-center[_ngcontent-%COMP%]{align-items:center}.clickable[_ngcontent-%COMP%]{cursor:pointer}@-webkit-keyframes fade-away{0%{opacity:1%}to{opacity:0;display:none}}@keyframes fade-away{0%{opacity:1%}to{opacity:0;display:none}}.comment-submit-loading[_ngcontent-%COMP%]{width:40px;height:40px;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.container-fluid[_ngcontent-%COMP%]{background:#ebebeb;padding:0}.posts[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:flex-start;align-items:center;width:60%;min-height:98vh;padding-top:5vh;padding-left:2vw;padding-right:2vw;font-size:18px;margin:0 auto}.section-header[_ngcontent-%COMP%]{text-align:center;width:100%;padding:3px 0;position:relative}.section-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{height:100%;position:relative;font-weight:bolder;z-index:2;color:#fff;letter-spacing:1px}.section-header[_ngcontent-%COMP%]:before{content:"";position:absolute;top:0;left:0;height:100%;width:85%;background:#6f4a8e;z-index:1;border-bottom-right-radius:30px}.post[_ngcontent-%COMP%]{width:100%;min-height:100px;padding:5px 10px 20px;margin-bottom:10px;background:hsla(0,0%,100%,.8);box-shadow:2px 3px 5px rgba(0,0,0,.2)}.post-meta-container[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-around;align-items:center;justify-content:space-between;letter-spacing:1px;font-weight:700;border-radius:10px;margin-bottom:10px}.post-meta-container[_ngcontent-%COMP%]   .meta-details[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-around;align-items:center;flex-wrap:wrap}.post-meta-container[_ngcontent-%COMP%]   .meta-pic[_ngcontent-%COMP%]{width:40px;height:40px;border-radius:50%;overflow:hidden}.post-meta-container[_ngcontent-%COMP%]   .meta-pic[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:100%}.post-meta-container[_ngcontent-%COMP%]   .meta-name[_ngcontent-%COMP%]{font-size:1.2rem;padding-left:1rem;font-weight:500}.post-meta-container[_ngcontent-%COMP%]   .misc-menu[_ngcontent-%COMP%]{margin-right:10px;display:flex;flex-direction:row;cursor:pointer;position:relative}.post-meta-container[_ngcontent-%COMP%]   .misc-menu[_ngcontent-%COMP%]:hover   span[_ngcontent-%COMP%]{background:#000}.post-meta-container[_ngcontent-%COMP%]   .misc-menu[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{content:"";height:7px;width:7px;border-radius:50%;background:rgba(0,0,0,.6);margin:0 2px}.post-meta-container[_ngcontent-%COMP%]   .misc-menu[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{display:none;position:absolute;top:101%;list-style-type:none;transform:translateX(-60%);padding:0;box-shadow:2px 2px 5px rgba(0,0,0,.4)}.post-meta-container[_ngcontent-%COMP%]   .misc-menu[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{background:#fff;font-weight:400;color:red;padding:4px 9px}.post-meta-container[_ngcontent-%COMP%]   .misc-menu[_ngcontent-%COMP%]:hover   ul[_ngcontent-%COMP%]{display:block}.meta-date[_ngcontent-%COMP%]{font-size:14px;font-weight:300;font-style:italic;padding-top:5px;padding-left:9px}.post-details-container[_ngcontent-%COMP%]{padding:9px 9px 0;text-align:justify;letter-spacing:1px;font-size:16px}.post-details-container[_ngcontent-%COMP%]   .expand-post[_ngcontent-%COMP%]{color:#00f;cursor:pointer}.post-reactions-container[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-around;align-items:center;margin-bottom:10px}.post-reactions-container[_ngcontent-%COMP%]   .react-1[_ngcontent-%COMP%], .post-reactions-container[_ngcontent-%COMP%]   .react-2[_ngcontent-%COMP%]{flex-grow:1;text-align:center;font-size:1rem;letter-spacing:1px;font-weight:bolder;padding:5px;cursor:pointer;color:#fff;border:1px solid #f5f5f5;margin:10px auto;position:relative}.post-reactions-container[_ngcontent-%COMP%]   .voted[_ngcontent-%COMP%]{transform:scaleY(1.15)}.post-reactions-container[_ngcontent-%COMP%]   .stats-false[_ngcontent-%COMP%], .post-reactions-container[_ngcontent-%COMP%]   .stats-true[_ngcontent-%COMP%]{content:"";position:absolute;top:106%;width:0;height:5px;left:0;transition:.3s ease-in-out}.post-reactions-container[_ngcontent-%COMP%]   .stats-true[_ngcontent-%COMP%]{background:#6f4a8e}.post-reactions-container[_ngcontent-%COMP%]   .stats-false[_ngcontent-%COMP%]{background:#dc3545}.post-reactions-container[_ngcontent-%COMP%]   .react-1[_ngcontent-%COMP%]:hover   .stats-true[_ngcontent-%COMP%], .post-reactions-container[_ngcontent-%COMP%]   .react-2[_ngcontent-%COMP%]:hover   .stats-false[_ngcontent-%COMP%]{width:100%}.post-reactions-container[_ngcontent-%COMP%]   .react-1[_ngcontent-%COMP%]{background:#6f4a8e}.post-reactions-container[_ngcontent-%COMP%]   .react-2[_ngcontent-%COMP%]{background:#dc3545}.comment-box[_ngcontent-%COMP%]{height:50px}.comment-box[_ngcontent-%COMP%], .comment-box[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-around;align-items:center}.comment-box[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{overflow:hidden;flex-grow:1}.comment-box[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]{flex-grow:2}.comment-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:100%;border-radius:20px;padding:2px 15px;letter-spacing:1px}.comment-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus{box-shadow:none}.comment-box[_ngcontent-%COMP%]   .comment-btn[_ngcontent-%COMP%]{padding:0;text-align:center;width:40px;height:40px;margin-left:3px;font-size:1em;letter-spacing:-1px;border-radius:50%;font-weight:700;background:#b4558f;color:#fff;transform-origin:center;transition:width height .2s ease-in-out;position:relative}.comment-box[_ngcontent-%COMP%]   .comment-btn[_ngcontent-%COMP%]:hover{width:43px;height:43px;cursor:pointer;overflow:hidden;position:relative}@-webkit-keyframes loading{0%{border-top:5px}25%{border-right:5px}50%{border-bottom:5px}75%{border-left:5px}}@keyframes loading{0%{border-top:5px}25%{border-right:5px}50%{border-bottom:5px}75%{border-left:5px}}.new-comments[_ngcontent-%COMP%]{margin-top:10px;padding:5px;background:#ebebeb;border-left:5px solid #343a40;position:relative}.new-comments[_ngcontent-%COMP%]   .comment-meta[_ngcontent-%COMP%]{display:flex;justify-content:flex-start;padding:7px 5px}.new-comments[_ngcontent-%COMP%]   .comment-meta[_ngcontent-%COMP%]   .img[_ngcontent-%COMP%]{width:30px;height:30px;border-radius:50%;overflow:hidden}.new-comments[_ngcontent-%COMP%]   .comment-meta[_ngcontent-%COMP%]   .img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:100%}.new-comments[_ngcontent-%COMP%]   .comment-meta[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]{font-size:1em;font-weight:500;letter-spacing:1px;margin-left:10px}.new-comments[_ngcontent-%COMP%]   .comment-content[_ngcontent-%COMP%]{text-align:justify;padding:7px 9px 0}.new-comments[_ngcontent-%COMP%]   .comment-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:.9em;letter-spacing:1px;margin-bottom:5px}.new-comments[_ngcontent-%COMP%]   .comment-reacts[_ngcontent-%COMP%]{display:flex;font-size:20px;padding:7px 0}.new-comments[_ngcontent-%COMP%]   .comment-reacts[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{cursor:pointer;margin-left:8px}.new-comments[_ngcontent-%COMP%]   .upvote[_ngcontent-%COMP%]{color:green}.new-comments[_ngcontent-%COMP%]   .downvote[_ngcontent-%COMP%]{color:#dc3545}.new-comments[_ngcontent-%COMP%]   .comment-reacts[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:16px;margin-left:5px}.new-comments[_ngcontent-%COMP%]   .time[_ngcontent-%COMP%]{font-size:.7em;padding:5px 9px}.more-comments[_ngcontent-%COMP%]{margin-top:8px;padding:2px;font-size:.9em;text-align:center;cursor:pointer;color:#6f4a8e;position:relative}.pagination[_ngcontent-%COMP%]{position:fixed;bottom:20px;right:10px}.pagination[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-around;align-items:center;font-size:.8em;width:43px;height:43px;border-radius:50%;text-align:center;background:#dc3545;color:#fff;letter-spacing:1px;margin:4px;box-shadow:2px 3px 3px rgba(0,0,0,.4);cursor:pointer}@media screen and (max-width:1300px){.posts[_ngcontent-%COMP%]{width:60%}}@media screen and (max-width:1100px){.posts[_ngcontent-%COMP%]{width:70%}}@media screen and (max-width:700px){.post-meta-container[_ngcontent-%COMP%]   .misc-menu[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{content:"";height:6px;width:6px;border-radius:50%;background:rgba(0,0,0,.6);margin:0 2px}.write-container[_ngcontent-%COMP%]{padding-left:2px;padding-right:2px}.write[_ngcontent-%COMP%]{width:100%;margin-top:15px}.posts[_ngcontent-%COMP%]{width:100%;padding:50px 0}.post[_ngcontent-%COMP%]{border-radius:0}.comment-box[_ngcontent-%COMP%]{height:unset;min-height:10px;padding:0}.comment-box[_ngcontent-%COMP%]   .comment-btn[_ngcontent-%COMP%]{transform:scale(.8)}.comment-box[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{justify-content:center;align-items:center;padding:0}.comment-box[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]{margin:0}.post-reactions-container[_ngcontent-%COMP%]{padding:7px 0}.post-reactions-container[_ngcontent-%COMP%]   .react-1[_ngcontent-%COMP%], .post-reactions-container[_ngcontent-%COMP%]   .react-2[_ngcontent-%COMP%]{font-size:14px;font-weight:500}.post-reactions-container[_ngcontent-%COMP%]   .stats-false[_ngcontent-%COMP%], .post-reactions-container[_ngcontent-%COMP%]   .stats-true[_ngcontent-%COMP%]{height:3px;transform:scaleY(1.1)}.pagination[_ngcontent-%COMP%]{position:unset;margin-bottom:10px;width:100%}.pagination[_ngcontent-%COMP%], .pagination[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-around;align-items:center}.pagination[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{font-size:.8em;width:43px;height:43px;border-radius:50%;text-align:center;background:#dc3545;color:#fff;letter-spacing:1px;margin:5px;box-shadow:2px 3px 3px rgba(0,0,0,.4)}}@media screen and (max-width:450px){.posts-container[_ngcontent-%COMP%]{padding:0!important}.post-details-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:.9em}}']}),t})()}]}];let P=(()=>{class t{}return t.\u0275mod=s.Hb({type:t}),t.\u0275inj=s.Gb({factory:function(n){return new(n||t)},imports:[[c.h.forChild(x)],c.h]}),t})(),M=(()=>{class t{}return t.\u0275mod=s.Hb({type:t}),t.\u0275inj=s.Gb({factory:function(n){return new(n||t)},imports:[[o.c,i.c,P]]}),t})()}}]);