// js/app.js - Main Application Logic
import { initAuth, signIn, signOut, onAuthStateChanged } from './auth.js';
import { initDatabase, getAllFlocks } from './database.js';
import { showLoading, hideLoading, showNotification, renderLoginScreen, renderDashboard } from './ui.js';

class FlockProApp {
    constructor() {
        this.currentUser = null;
        this.flocks = [];
    }

    async init() {
        showLoading('Initializing...');
        
        try {
            await initAuth();
            initDatabase();
            
            onAuthStateChanged(user => {
                this.currentUser = user;
                this.render();
            });
        } catch (error) {
            console.error('Initialization error:', error);
            showNotification('Failed to initialize app', 'error');
        } finally {
            hideLoading();
        }
    }

    async render() {
        const app = document.getElementById('app');
        
        if (!this.currentUser) {
            app.innerHTML = renderLoginScreen();
            this.attachLoginHandlers();
        } else {
            app.innerHTML = renderDashboard();
            await this.loadFlocks();
            this.attachDashboardHandlers();
        }
    }

    attachLoginHandlers() {
        const form = document.getElementById('login-form');
        form.onsubmit = async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            try {
                await signIn(email, password);
                showNotification('Login successful!', 'success');
            } catch (error) {
                showNotification('Login failed: ' + error.message, 'error');
            }
        };
    }

    attachDashboardHandlers() {
        document.getElementById('logout-btn').onclick = async () => {
            await signOut();
            showNotification('Logged out successfully', 'success');
        };
    }

    async loadFlocks() {
        showLoading('Loading flocks...');
        try {
            this.flocks = await getAllFlocks(this.currentUser.uid);
            this.renderFlocks();
        } catch (error) {
            showNotification('Failed to load flocks', 'error');
        } finally {
            hideLoading();
        }
    }

    renderFlocks() {
        const container = document.getElementById('flocks-container');
        container.innerHTML = this.flocks.map(flock => `
            <div class="flock-card">
                <h3>${flock.name}</h3>
                <p>Birds: ${flock.birdCount}</p>
            </div>
        `).join('');
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new FlockProApp();
    app.init();
});
