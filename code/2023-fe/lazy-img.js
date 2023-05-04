const images = document.getElementsByTagName("img");
const useGetBoundingClientRect = () => {
  for (let i of images) {
    const top = i.getBoundingClientRect().top;
    const isShow = top > 0 && top < window.innerHeight;
    if (isShow) {
      let imgSrc = i.getAttribute("data-src");
      i.setAttribute("src", imgSrc);
    }
  }
};

const useIntersectionObserver = () => {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        let imgSrc = entry.target.getAttribute("data-src");
        entry.target.setAttribute("src", imgSrc);
      }
    });
  });
  io.observe(document.querySelector(".img"));
};

const useOffsetTop = () => {
  for (let i of images) {
    const top = i.offsetTop;
    const isShow = top > 0 && top < window.innerHeight + window.scrollY;
    if (isShow) {
      let imgSrc = i.getAttribute("data-src");
      i.setAttribute("src", imgSrc);
    }
  }
};
// IntersectionObserver  判断是否可见
// MutationObserver  判断子元素是否有变化
