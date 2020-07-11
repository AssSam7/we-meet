import Search from "./modules/search";
import ReadMore from "./modules/readMore";
import Chat from "./modules/chat";
import RegistrationForm from "./modules/registrationForm";

if (document.querySelector(".header-search-icon")) {
  new Search();
}

// Read More, Read Less Functionality
new ReadMore();

// Chat Feature
if (document.querySelector(".chat-wrapper")) {
  new Chat();
}

// Registration Live Validation
if (document.querySelector("#registration-form")) {
  new RegistrationForm();
}
