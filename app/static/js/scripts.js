document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Sidebar Toggle ---------- */
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('sidebar-toggle');
    const STORAGE_KEY = 'sidebar-collapsed';

    // Restore persisted state
    if (localStorage.getItem(STORAGE_KEY) === 'true') {
        sidebar.classList.add('collapsed');
        document.body.classList.add('sidebar-collapsed');
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            document.body.classList.toggle('sidebar-collapsed');
            localStorage.setItem(
                STORAGE_KEY,
                sidebar.classList.contains('collapsed')
            );
        });
    }

});
