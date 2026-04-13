// ============================================
// DASHBOARD — PLAN MAESTRO NIVEL DIOS
// Progress tracking with localStorage
// ============================================

const STORAGE_KEY = 'planMaestroNivelDios_progress';

// Semester item counts (materias + proyectos)
const SEMESTER_ITEMS = {
    1: 14, 2: 13, 3: 13, 4: 14, 5: 14,
    6: 13, 7: 13, 8: 13, 9: 13, 10: 14,
    11: 14, 12: 13, 13: 14, 14: 13, extra: 5
};

// Phase to semester mapping
const PHASE_SEMESTERS = {
    1: [1, 2],
    2: [3, 4, 5],
    3: [6, 7, 8],
    4: [9, 10, 11],
    5: [12, 13, 14]
};

// Total project count (7 per semester * 14 semesters)
const TOTAL_PROJECTS = 98;
const TOTAL_SEMESTERS = 14;

class DashboardTracker {
    constructor() {
        this.progress = this.loadProgress();
        this.init();
    }

    loadProgress() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : {};
        } catch {
            return {};
        }
    }

    saveProgress() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.progress));
    }

    init() {
        this.bindCheckboxes();
        this.bindSemesterToggles();
        this.bindResetButton();
        this.bindNavToggle();
        this.restoreCheckboxes();
        this.updateAllStats();
        this.addSVGGradient();
    }

    addSVGGradient() {
        // Add SVG gradient definition for the ring
        const svg = document.querySelector('.progress-ring svg');
        if (svg) {
            const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
            gradient.setAttribute('id', 'goldGradient');
            gradient.setAttribute('x1', '0%');
            gradient.setAttribute('y1', '0%');
            gradient.setAttribute('x2', '100%');
            gradient.setAttribute('y2', '0%');
            
            const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop1.setAttribute('offset', '0%');
            stop1.setAttribute('stop-color', '#f0c040');
            
            const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop2.setAttribute('offset', '100%');
            stop2.setAttribute('stop-color', '#ff8833');
            
            gradient.appendChild(stop1);
            gradient.appendChild(stop2);
            defs.appendChild(gradient);
            svg.insertBefore(defs, svg.firstChild);
        }
    }

    bindCheckboxes() {
        document.querySelectorAll('.malla-item input[type="checkbox"]').forEach(cb => {
            cb.addEventListener('change', (e) => {
                const sem = e.target.dataset.sem;
                const item = e.target.dataset.item;
                const key = `s${sem}_${item}`;
                
                if (e.target.checked) {
                    this.progress[key] = true;
                } else {
                    delete this.progress[key];
                }
                
                this.saveProgress();
                this.updateSemesterProgress(sem);
                this.updateAllStats();
                this.showToast(e.target.checked ? '✅ Progreso guardado' : '↩️ Item desmarcado');
            });
        });
    }

    bindSemesterToggles() {
        document.querySelectorAll('.malla-sem-header').forEach(header => {
            header.addEventListener('click', (e) => {
                // Don't toggle if clicking a checkbox
                if (e.target.type === 'checkbox') return;
                const semester = header.closest('.malla-semester');
                semester.classList.toggle('collapsed');
            });
        });
    }

    bindResetButton() {
        const resetBtn = document.getElementById('resetBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (confirm('⚠️ ¿Estás seguro de que quieres resetear todo tu progreso? Esta acción no se puede deshacer.')) {
                    this.progress = {};
                    this.saveProgress();
                    document.querySelectorAll('.malla-item input[type="checkbox"]').forEach(cb => {
                        cb.checked = false;
                    });
                    this.updateAllStats();
                    this.showToast('🗑️ Progreso reseteado');
                }
            });
        }
    }

    bindNavToggle() {
        const navToggle = document.getElementById('navToggle');
        const navLinks = document.querySelector('.nav-links');
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
        }
    }

    restoreCheckboxes() {
        Object.keys(this.progress).forEach(key => {
            const parts = key.match(/^s(.+)_(.+)$/);
            if (parts) {
                const sem = parts[1];
                const item = parts[2];
                const cb = document.querySelector(`input[data-sem="${sem}"][data-item="${item}"]`);
                if (cb) {
                    cb.checked = true;
                }
            }
        });
    }

    getCheckedCount(sem) {
        const checkboxes = document.querySelectorAll(`input[data-sem="${sem}"]`);
        let count = 0;
        checkboxes.forEach(cb => {
            if (cb.checked) count++;
        });
        return count;
    }

    getTotalCount(sem) {
        return document.querySelectorAll(`input[data-sem="${sem}"]`).length;
    }

    getProjectsCompleted() {
        let count = 0;
        for (let s = 1; s <= 14; s++) {
            for (let p = 1; p <= 7; p++) {
                const key = `s${s}_p${p}`;
                if (this.progress[key]) count++;
            }
        }
        return count;
    }

    getCompletedSemesters() {
        let count = 0;
        for (let s = 1; s <= 14; s++) {
            const checked = this.getCheckedCount(String(s));
            const total = this.getTotalCount(String(s));
            if (total > 0 && checked === total) count++;
        }
        return count;
    }

    updateSemesterProgress(sem) {
        const checked = this.getCheckedCount(sem);
        const total = this.getTotalCount(sem);
        const progressEl = document.getElementById(`s${sem}Progress`);
        if (progressEl) {
            progressEl.textContent = checked;
        }

        // Update semester visual state
        const semesterEl = document.querySelector(`.malla-semester[data-semester="${sem}"]`);
        if (semesterEl) {
            if (total > 0 && checked === total) {
                semesterEl.classList.add('completed');
            } else {
                semesterEl.classList.remove('completed');
            }
        }
    }

    updatePhaseProgress(phase) {
        const semesters = PHASE_SEMESTERS[phase];
        if (!semesters) return 0;

        let totalChecked = 0;
        let totalItems = 0;

        semesters.forEach(sem => {
            totalChecked += this.getCheckedCount(String(sem));
            totalItems += this.getTotalCount(String(sem));
        });

        const percent = totalItems > 0 ? Math.round((totalChecked / totalItems) * 100) : 0;
        
        const barEl = document.getElementById(`phase${phase}Bar`);
        const percentEl = document.getElementById(`phase${phase}Percent`);
        
        if (barEl) barEl.style.width = `${percent}%`;
        if (percentEl) percentEl.textContent = `${percent}%`;

        return percent;
    }

    updateAllStats() {
        // Update each semester progress
        for (let s = 1; s <= 14; s++) {
            this.updateSemesterProgress(String(s));
        }
        this.updateSemesterProgress('extra');

        // Update phase progress
        for (let p = 1; p <= 5; p++) {
            this.updatePhaseProgress(p);
        }

        // Total progress (excluding extra)
        let totalChecked = 0;
        let totalItems = 0;
        for (let s = 1; s <= 14; s++) {
            totalChecked += this.getCheckedCount(String(s));
            totalItems += this.getTotalCount(String(s));
        }

        const totalPercent = totalItems > 0 ? Math.round((totalChecked / totalItems) * 100) : 0;

        // Update ring
        const ringFill = document.getElementById('ringFill');
        const totalPercentEl = document.getElementById('totalPercent');
        if (ringFill) {
            const circumference = 2 * Math.PI * 52; // r=52
            const offset = circumference - (totalPercent / 100) * circumference;
            ringFill.style.strokeDashoffset = offset;
        }
        if (totalPercentEl) totalPercentEl.textContent = `${totalPercent}%`;

        // Update stat cards
        const completedSemesters = this.getCompletedSemesters();
        const completedProjects = this.getProjectsCompleted();
        const estimatedHours = totalChecked * 15; // ~15 hours per item average

        const csEl = document.getElementById('completedSemesters');
        const cpEl = document.getElementById('completedProjects');
        const thEl = document.getElementById('totalHours');
        const phEl = document.getElementById('currentPhase');

        if (csEl) csEl.textContent = completedSemesters;
        if (cpEl) cpEl.textContent = completedProjects;
        if (thEl) thEl.textContent = estimatedHours;
        
        // Determine current phase
        if (phEl) {
            let currentPhase = 'F1';
            if (completedSemesters >= 12) currentPhase = 'F5';
            else if (completedSemesters >= 9) currentPhase = 'F4';
            else if (completedSemesters >= 6) currentPhase = 'F3';
            else if (completedSemesters >= 3) currentPhase = 'F2';
            phEl.textContent = currentPhase;
        }
    }

    showToast(message) {
        // Remove existing toast
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 2000);
    }
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    new DashboardTracker();
});
