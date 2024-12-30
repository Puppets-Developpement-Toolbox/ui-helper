import animateEntries from "./entry-animation";

const app = document.getElementById("app");

const demos: Record<string, string> = {
  "entry-animation": `
    <img src="https://picsum.photos/400" class="transition delay-500" data-entry-animation="translate-0 opacity-100 | translate-50 opacity-0" />
  `,
};

function main(container: HTMLElement) {
  const title = document.createElement("h1");
  title.classList.add("text-3xl", "font-bold", "underline");
  title.innerText = "Welcome to the Puppets UI helper kit demo page";
  container.appendChild(title);

  let demoContainer, code, demoTitle;
  for (let demo in demos) {
    demoContainer = document.createElement("div");
    demoContainer.classList.add("grid", "grid-cols-2", "gap-4");
    code = document.createElement("pre");
    code.appendChild(document.createTextNode(demos[demo]));
    demoContainer.innerHTML = `
      <div>${demos[demo]}</div>
      `;
    demoContainer.prepend(code);
    demoTitle = document.createElement("h2");
    demoTitle.innerHTML = demo;
    container.appendChild(demoTitle);
    container.appendChild(demoContainer);
  }

  animateEntries(container);
}

if (app) main(app);
