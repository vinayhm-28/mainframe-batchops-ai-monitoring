// ===== BatchOps AI Monitoring - Interactive Dashboard =====

document.addEventListener('DOMContentLoaded', () => {
    initCounters();
    initDashboard();
    initNavbar();
    initScrollAnimations();
});

// ===== ANIMATED COUNTERS =====
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => observer.observe(c));
}

function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const duration = 2000;
    const start = performance.now();
    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = eased * target;
        el.textContent = target % 1 === 0 ? Math.floor(current) : current.toFixed(1);
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

// ===== NAVBAR =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const toggle = document.getElementById('navToggle');
    const links = document.querySelector('.nav-links');

    window.addEventListener('scroll', () => {
        navbar.style.background = window.scrollY > 50
            ? 'rgba(10, 14, 26, 0.95)' : 'rgba(10, 14, 26, 0.85)';
    });

    if (toggle) {
        toggle.addEventListener('click', () => {
            links.classList.toggle('active');
        });
    }
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const elements = document.querySelectorAll('.feature-card, .usecase-card, .doc-card, .arch-layer, .dash-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// ===== DASHBOARD SIMULATION =====
function initDashboard() {
    updateHealthMetrics();
    updateJobCounts();
    populateAIInsights();
    populateJobStream();
    populateConsole();
    populateSLATracker();

    // Live updates
    setInterval(updateHealthMetrics, 3000);
    setInterval(updateJobCounts, 5000);
    setInterval(addConsoleLine, 4000);
}

function updateHealthMetrics() {
    const metrics = [
        { bar: '.cpu-bar', val: '.cpu-val', min: 35, max: 72 },
        { bar: '.mem-bar', val: '.mem-val', min: 50, max: 78 },
        { bar: '.io-bar', val: '.io-val', min: 20, max: 55 },
        { bar: '.spool-bar', val: '.spool-val', min: 15, max: 45 },
    ];
    metrics.forEach(m => {
        const value = rand(m.min, m.max);
        const bar = document.querySelector(m.bar);
        const valEl = document.querySelector(m.val);
        if (bar) bar.style.width = value + '%';
        if (valEl) valEl.textContent = value + '%';
    });
}

function updateJobCounts() {
    setVal('.running-count', rand(42, 68));
    setVal('.completed-count', rand(1200, 1580));
    setVal('.waiting-count', rand(15, 35));
    setVal('.abended-count', rand(0, 4));
}

function populateAIInsights() {
    const insights = [
        { icon: '⚠️', text: 'Job GLPROD42 runtime is 2.3σ above mean — possible dataset contention on DASD VOL SYS001.' },
        { icon: '📈', text: 'Batch throughput trending 12% higher than baseline. Initiator allocation is optimal.' },
        { icon: '🔮', text: 'SLA for EOD_SETTLEMENT predicted to complete 18 mins before deadline.' },
        { icon: '🔄', text: 'Recurring S0C4 pattern detected in ACCTG* jobs — recommend JCL REGION parameter review.' },
    ];
    const container = document.getElementById('aiInsights');
    if (!container) return;
    container.innerHTML = insights.map(i => `
        <div class="ai-insight">
            <span class="insight-icon">${i.icon}</span>
            <span class="insight-text">${i.text}</span>
        </div>
    `).join('');
}

function populateJobStream() {
    const jobs = [
        { name: 'GLPROD01', pct: 100, color: '#10b981' },
        { name: 'GLPROD12', pct: 87, color: '#3b82f6' },
        { name: 'ACCTG045', pct: 64, color: '#06b6d4' },
        { name: 'RPTGEN03', pct: 42, color: '#8b5cf6' },
        { name: 'EODSETL1', pct: 23, color: '#f59e0b' },
        { name: 'BKUP0001', pct: 8, color: '#ef4444' },
    ];
    const container = document.getElementById('jobStream');
    if (!container) return;
    container.innerHTML = jobs.map(j => `
        <div class="stream-job">
            <span class="job-name">${j.name}</span>
            <div class="job-bar">
                <div class="job-progress" style="width:${j.pct}%;background:${j.color}"></div>
            </div>
            <span class="job-pct">${j.pct}%</span>
        </div>
    `).join('');
}

function populateConsole() {
    const messages = [
        { time: '22:14:32', msg: 'IEF403I GLPROD01 - STARTED - TIME=22.14.32', type: '' },
        { time: '22:14:33', msg: '$HASP373 GLPROD01 STARTED - INIT 12 - CLASS A - SYS SYSA', type: '' },
        { time: '22:15:01', msg: 'ICH70001I GLPROD12 LAST ACCESS AT 22:10:15 ON 05/21/2026', type: '' },
        { time: '22:15:44', msg: 'IEF142I ACCTG045 - STEP WAS EXECUTED - COND CODE 0000', type: '' },
        { time: '22:16:02', msg: '*WARNING* RPTGEN03 REGION UTILIZATION AT 87% - MONITOR', type: 'warning' },
        { time: '22:16:18', msg: 'IEA995I SYMPTOM DUMP OUTPUT - SYSLOG CAPTURED', type: '' },
        { time: '22:17:01', msg: 'CTM5210I CONTROL-M AGENT HEARTBEAT OK - SYSA', type: '' },
        { time: '22:17:30', msg: '*AI ALERT* ANOMALY DETECTED: GLPROD42 RUNTIME EXCEEDS 2.3 SIGMA', type: 'error' },
        { time: '22:18:05', msg: 'IEF404I GLPROD01 - ENDED - TIME=22.18.05', type: '' },
        { time: '22:18:22', msg: '$HASP395 GLPROD01 ENDED - RC=0000', type: '' },
    ];
    const container = document.getElementById('consoleOutput');
    if (!container) return;
    container.innerHTML = messages.map(m => `
        <div class="console-line ${m.type}">
            <span class="timestamp">${m.time}</span> ${m.msg}
        </div>
    `).join('');
    document.getElementById('msgCount').textContent = messages.length + ' msgs';
}

function populateSLATracker() {
    const slas = [
        { name: 'EOD Settlement', status: 'ON TRACK', cls: 'sla-on-track' },
        { name: 'GL Posting', status: 'ON TRACK', cls: 'sla-on-track' },
        { name: 'Regulatory Reports', status: 'AT RISK', cls: 'sla-at-risk' },
        { name: 'Data Warehouse Load', status: 'ON TRACK', cls: 'sla-on-track' },
        { name: 'Backup Window', status: 'ON TRACK', cls: 'sla-on-track' },
    ];
    const container = document.getElementById('slaTracker');
    if (!container) return;
    container.innerHTML = slas.map(s => `
        <div class="sla-item">
            <span class="sla-name">${s.name}</span>
            <span class="sla-status ${s.cls}">${s.status}</span>
        </div>
    `).join('');
}

function addConsoleLine() {
    const container = document.getElementById('consoleOutput');
    if (!container) return;
    const now = new Date();
    const ts = now.toTimeString().slice(0, 8);
    const msgs = [
        { msg: `CTM5210I CONTROL-M AGENT HEARTBEAT OK - SYS${rand(1,4) === 1 ? 'B' : 'A'}`, type: '' },
        { msg: `IEF142I JOB${rand(1000,9999)} - STEP COMPLETED - COND CODE 0000`, type: '' },
        { msg: `*AI INFO* BATCH THROUGHPUT NOMINAL - ${rand(45,68)} JOBS/MIN`, type: '' },
        { msg: `*WARNING* DASD VOL SYS0${rand(1,9)}${rand(1,9)} UTILIZATION AT ${rand(80,95)}%`, type: 'warning' },
        { msg: `$HASP373 BKUP000${rand(1,5)} STARTED - INIT ${rand(1,15)} - CLASS B`, type: '' },
    ];
    const m = msgs[rand(0, msgs.length - 1)];
    const line = document.createElement('div');
    line.className = `console-line ${m.type}`;
    line.innerHTML = `<span class="timestamp">${ts}</span> ${m.msg}`;
    container.appendChild(line);
    container.scrollTop = container.scrollHeight;
    const count = container.children.length;
    document.getElementById('msgCount').textContent = count + ' msgs';
}

// ===== HELPERS =====
function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function setVal(sel, val) { const el = document.querySelector(sel); if (el) el.textContent = val; }
