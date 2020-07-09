import Search from "./modules/search";
import ReadMore from "./modules/read-more";
import Chat from "./modules/chat";

if (document.querySelector(".header-search-icon")) {
  new Search();
}

// Read More, Read Less Functionality
new ReadMore();

// Chat Feature
if (document.querySelector(".chat-wrapper")) {
  new Chat();
}
