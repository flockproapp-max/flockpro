// js/ui.js - UI Components
export function showLoading(message = 'Loading...') {
    const loader = document.createElement('div');
    loader.id = 'loading-spinner';
    loader.className = 'loading-overlay';
    loader.innerHTML = `
        <div class="spinner"></div>
        <p>${message}</p>
    `;
    document.body.appendChild(loader);
}

export function hideLoading() {
    const loader = document.getElementById('loading-spinner');
    if (loader) loader.remove();
}

export function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 3000);
}

export function showConfirmModal(message, onConfirm) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <p>${message}</p>
            <div class="modal-buttons">
                <button class="btn-cancel">Cancel</button>
                <button class="btn-confirm">Confirm</button>
            </div>
        </div>
    `;
    
    modal.querySelector('.btn-cancel').onclick = () => modal.remove();
    modal.querySelector('.btn-confirm').onclick = () => {
        onConfirm();
        modal.remove();
    };
    
    document.body.appendChild(modal);
}

export function renderLoginScreen() {
    return `
        <div class="auth-container">
            <h1>FlockPro</h1>
            <form id="login-form">
                <input type="email" id="email" placeholder="Email" required>
                <input type="password" id="password" placeholder="Password" required>
                <button type="submit">Sign In</button>
            </form>
            <p>Don't have an account? <a href="#" id="show-register">Register</a></p>
        </div>
    `;
}

export function renderDashboard() {
    return `
        <header>
            <h1>FlockPro Dashboard</h1>
            <button id="logout-btn">Logout</button>
        </header>
        <main>
            <div id="flocks-container"></div>
            <button id="add-flock-btn">+ Add Flock</button>
        </main>
    `;
}
