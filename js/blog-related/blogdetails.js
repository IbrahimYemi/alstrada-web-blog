document.addEventListener("DOMContentLoaded", () => {
  fetchBlogData();
});

function fetchBlogData() {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get("slug");
  const url = "/js/blog-related/blog.json";
  const link = "https://www.alstrada.com";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const blogPost = data.blogPosts.find((post) => post.slug === slug);
      if (blogPost) {
        const blogSection = document.getElementById("blog-post");
        blogSection.innerHTML = `
            <!-- Start Title -->
            <section id="title" class="container">
              <div class="row">
                <div class="span12">
                  <h1>${blogPost.title}</h1>
                  <div class="date">${blogPost.date}</div>
                </div>
              </div>
            </section>
            <!-- End Title -->
            
            <!-- Start Blog Full Post -->
            <article class="container full-post">
              <div class="row">
                <div class="blog-text span10 offset1">
                  <p class="lead">${blogPost.content[0]}</p>
                  <p>${blogPost.content[1]}</p>
                  
                  <!-- Start Flex Slider -->
                  <section class="slider">
                    <img src="${blogPost.image}" alt="" />
                    <div class="img-caption">
                      <p>${blogPost.caption}</p>
                    </div>
                  </section>
                  <!-- End Flex Slider -->
                  
                  <p>${blogPost.content[2]}</p>  
                  
                  <!-- Start Big Blockquote -->
                  <blockquote class="big">
                    <p>${blogPost.qoutes.text}</p>
                    <small>${blogPost.qoutes.author}</small>
                  </blockquote>
                  <!-- End Big Blockquote -->
                  
                  <p>${blogPost.content[3]}</p>
                  <p>${blogPost.content[4]}</p>
                  <div class="row video-blog">
                    <div class="span7">
                      <div class="embed-container">
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/RttT5lIyoUI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                      </div>
                    </div>
                    <div class="span3">
                      <hr>
                      <h5>Alstrada Identity</h5>
                      <p>ALSTRADA, where we are on a mission to bring you award-winning data leadership, globally recognized data professionals, data thought leaders, best-selling authors, with unparalleled experience.</p>
                      <a class="btn rounded hidden-tablet" href="https://youtu.be/RttT5lIyoUI" target="_blank"><i class="icon-play"></i> Watch on Youtube</a>
                      <hr class="visible-phone">
                    </div>
                  </div>
                  <p>${blogPost.content[5]}</p>
                </div>
              </div>
              <div class="row"><hr class="dotted span12"></div>
              <div class="row">
                <div class="span4">
                  <div class="up-title hidden-phone">Share this:
                  <a class="linkedIn-share" href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.alstrada.com/blog-details&title=${encodeURIComponent(blogPost.title)}" title="LinkedIn" target="_blank"><i style="margin: 2px; font-size: 25px" class="fab fa-linkedin"></i></a>
                    <a class="twitter-share" href="#" title="Twitter" onclick="shareOnTwitter('${link}/blog-detail.html?slug=${
          blogPost.slug
        }', '${blogPost.title}')"><i style="margin: 2px; font-size: 25px" class="fab fa-twitter"></i></a>
                  </div>
                </div>
                <div class="span6 f-tags">
                  <hr class="dotted visible-phone">
                  <p class="up-title visible-big-desktop">Tags:</p>
                  ${blogPost.tags
                    .map((tag) => `<a class="tag">${tag}</a>`)
                    .join("")}
                </div>
              </div>
              <div class="row"><hr class="dotted span12"></div>  
            </article>
            <!-- End Blog Full Post -->
          `;
      } else {
        console.error(`Blog post with slug "${slug}" not found.`);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
