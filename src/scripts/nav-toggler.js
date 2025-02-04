const navLinks = document.querySelectorAll("nav a");

navLinks.forEach((link) => {
  link.classList.remove("active");

  // `slice` here to remove the first `/` in pathname
  const currentPath = window.location.pathname.slice("1");

  // `link.href` returns a whole url, such as: "https://somedomain.com/posts" and we only need the last part
  const hrefArray = link.href.split("/");
  const thisPath = hrefArray[hrefArray.length - 1];

  if (currentPath === thisPath) {
    link.classList.add("active");
  }
});