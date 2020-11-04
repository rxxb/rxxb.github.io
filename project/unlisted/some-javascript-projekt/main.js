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
    const ac=String(a.getAttribute('rank')) + '.' + a.getAttribute('order');
    const bc=String(b.getAttribute('rank')) + '.' + b.getAttribute('order');
    return ac > bc ? -1 : 1;
  });

  /* Resetting posts container */
  posts_container.innerHTML='';

  /* Applying newly sorted posts to container */
  let i=0;
  sortedPosts.forEach(post=>{
    setTimeout(() => {
        posts_container.appendChild(post);
    }, i * 100);
    i++;
  });
}

(() => {
  /* adding default order attribute */
  const posts=document.querySelectorAll("#post-container > .post");
  let i=posts.length;
  posts.forEach(post=>{
    post.setAttribute('order',i);
    post.setAttribute('rank',0);
    --i;
  });

  /* Checking triggers */
  const triggers=document.querySelectorAll('#triggers [tag-trigger]');
  triggers.forEach(trigger=>{
    trigger.checked == 1 ? tagSort(trigger) : 0;
  }); 
})();