function tagSort(tag) {
  const posts_container=document.querySelector("#post-container");
  const posts=posts_container.querySelectorAll(".post");
  
  /* Change rank */
  posts.forEach(post=>{
    post.classList.add('fuckyouanimation');
    let tags=post.getAttribute('tag');
    if(tags.includes(tag.getAttribute('tag-trigger'))){
      if(tag.checked==1){
        let rank=post.getAttribute('rank');
        post.setAttribute('rank',Number(rank)+1);
      } else {
        let rank=post.getAttribute('rank');
        post.setAttribute('rank',Number(rank) - 1);
      }
    }
  })

  /* Sorting posts: this is the hardest part */
  const sortedPosts=Array.from(posts).sort(function(a,b) {
    const ac=Number(a.getAttribute('rank')) + a.getAttribute('order');
    const bc=Number(b.getAttribute('rank')) + b.getAttribute('order');
    return bc - ac;
  });
  
  /* Create 'fragment' for post */
  const frag = document.createDocumentFragment();

  /* Applying newly sorted posts to fragment */
  sortedPosts.forEach(post=>{
    frag.appendChild(post);
  });

  /* Applying newly sorted posts from fragment to container */
  posts_container.appendChild(frag);
}

(() => {
  /* adding default order attribute */
  const posts=document.querySelectorAll("#post-container > .post");
  let i=String("0.")+posts.length;
  posts.forEach(post=>{
    post.setAttribute('order',i);
    post.setAttribute('rank',0);
    i-=0.0000000000000001;
  });

  /* Checking triggers */
  const triggers=document.querySelectorAll('#triggers [tag-trigger]');
  triggers.forEach(trigger=>{
    trigger.checked == 1 ? tagSort(trigger) : 0;
  }); 
})();