const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
	document.documentElement.setAttribute("data-theme", savedTheme);
}

const themeToggle = document.querySelector(".theme-toggle");

if (themeToggle) {
	themeToggle.addEventListener("click", () => {
		const currentTheme = document.documentElement.getAttribute("data-theme");
		const nextTheme = currentTheme === "light" ? "dark" : "light";

		document.documentElement.setAttribute("data-theme", nextTheme);
		localStorage.setItem("theme", nextTheme);
	});
}