document.getElementById('toggleMenu').addEventListener('click', function () {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open-state');

    const icon = this.querySelector('i');
    if (sidebar.classList.contains('open-state')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-bars-staggered');
    } else {
        icon.classList.remove('fa-bars-staggered');
        icon.classList.add('fa-bars');
    }
});
