document.documentElement.classList.add("js");

const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  observer.observe(element);
});

const form = document.querySelector("#command-form");
const command = document.querySelector("#command");
const result = document.querySelector("#command-result");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const task = command.value.trim();
  if (!task) {
    result.textContent = "Tell the club what you need first.";
    result.classList.add("show");
    command.focus();
    return;
  }

  const words = task.toLowerCase();
  let agent = "The Planner";
  if (/research|find|source|learn|compare/.test(words)) agent = "The Researcher";
  else if (/write|draft|copy|post|story|email/.test(words)) agent = "The Writer";
  else if (/build|code|site|app|fix/.test(words)) agent = "The Builder";
  else if (/read|document|book|summar/.test(words)) agent = "The Reader";
  else if (/monitor|track|watch|alert/.test(words)) agent = "The Gardener";
  else if (/design|make|create|visual/.test(words)) agent = "The Maker";

  result.textContent = `${agent} would lead this task, with the rest of the club ready to help.`;
  result.classList.add("show");
});
