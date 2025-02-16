const navLinks = document.querySelectorAll("nav a");

navLinks.forEach((link) => {
  link.classList.remove("active");

  // `slice` here to remove the first `/` in pathname
  let currentPath = window.location.pathname.slice("1");
  currentPath = currentPath.substring(0, currentPath.length - 1)

  // `link.href` returns a whole url, such as: "https://somedomain.com/posts/" and we only need the last part
  const href = link.href[link.href.length - 1] == '/' && occurrences(link.href, '/') > 3 ? link.href.substring(0, link.href.length - 1) : link.href;
  const hrefArray = href.split("/");
  const thisPath = hrefArray[hrefArray.length - 1];

  if (currentPath === thisPath) {
    link.classList.add("active");
  }
});

function occurrences(string, subString, allowOverlapping) {

  string += "";
  subString += "";
  if (subString.length <= 0) return (string.length + 1);

  var n = 0,
      pos = 0,
      step = allowOverlapping ? 1 : subString.length;

  while (true) {
      pos = string.indexOf(subString, pos);
      if (pos >= 0) {
          ++n;
          pos += step;
      } else break;
  }
  return n;
}