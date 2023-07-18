// Function to render blog posts
function renderBlogPosts(blogPosts) {
  // Get the blog section element
  const blogSection = document.getElementById("blog-section");
  // Get the blog number element
  const blogNumber = document.getElementById("blogs-number");

  // Clear any existing content
  blogSection.innerHTML = "";
  // set the blog number
  blogNumber.innerHTML = blogPosts.length;

  // Loop through the sorted blog posts
  blogPosts.forEach((blogPost) => {
    // Create the HTML template for each blog post
    const link = "https://www.alstrada.com";
    const template = `
        <article class="blog-post container">
          <div class="row">
            <div class="span9 offset3">
              <h4><a href="/blog-detail.html?slug=${blogPost.slug}">${
      blogPost.title
    }</a></h4>
            </div>
          </div>
          <div class="row">
            <div class="span3 post-info">
              <div class="date">${blogPost.date}</div>
              <div class="tags comments">
                ${blogPost.tags
                  .map((tag) => `<a class="tag">${tag}</a>`)
                  .join("")}
              </div>
              <div class="up-title">Share this:
              <a class="linkedIn-share" href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.alstrada.com/blog-details&title=${encodeURIComponent(blogPost.title)}" title="LinkedIn" target="_blank"><i style="margin: 2px; font-size: 25px" class="fab fa-linkedin"></i></a>
                <a class="twitter-share" href="#" title="Twitter" onclick="shareOnTwitter('${link}/blog-detail.html?slug=${
      blogPost.slug
    }', '${blogPost.title}')"><i style="margin: 2px; font-size: 25px" class="fab fa-twitter"></i></a>
              </div>
            </div>
            <div class="span9">
              <div class="preview-img">
                <img src="${blogPost.image}" alt="" />
                <div class="img-caption">
                  <p>${blogPost.caption}</p>
                </div>
              </div>
              ${blogPost.content
                .slice(0, 3)
                .map((paragraph) => `<p>${paragraph}</p>`)
                .join("")}
            </div>
          </div>
          <div class="row">
            <hr class="span12 dotted">
          </div>
        </article>
      `;

    // Append the template to the blog section
    blogSection.innerHTML += template;
  });
}

// Fetch the blog data from the API
fetch("/js/blog-related/blog.json")
  .then((response) => response.json())
  .then((data) => {
    // Sort the blog posts in ascending order based on ID
    const sortedBlogPosts = data.blogPosts.sort((a, b) => a.id - b.id);

    // Render the sorted blog posts
    renderBlogPosts(sortedBlogPosts);
  })
  .catch((error) => console.error(error));
