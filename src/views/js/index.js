document.getElementById("toggleMenu").addEventListener("click", function () {
	const sidebar = document.getElementById("sidebar");
    const content = document.getElementById('content');
	sidebar.classList.toggle("open-state");

	const icon = this.querySelector("i");
	if (sidebar.classList.contains("open-state")) {
		icon.classList.remove("fa-bars");
		icon.classList.add("fa-bars-staggered");
        content.classList.toggle('move-right');
	} else {
		icon.classList.remove("fa-bars-staggered");
		icon.classList.add("fa-bars");
        content.classList.remove('move-right');
	}
});