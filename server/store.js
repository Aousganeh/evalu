/**
 * Evalu Persistent Store (Server-Side JSON Database)
 * 
 * Manages:
 * - Ingested customer interactions (with PII redactions & model/fallback analysis)
 * - Operator-assigned corrective actions for issue clusters
 * - Seeded synthetic before/after closed-loop intervention metrics
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial Seeded Closed-Loop Outcome Data
const INITIAL_CLOSED_LOOP = {
  is_synthetic_demo: true,
  disclaimer: 'SYNTHETIC DEMO DATASET: Demonstrates simulated before/after feedback loop; not real production customer data.',
  cluster_topic: 'Unexpected Data Charges',
  action_applied: {
    action_id: 'ACT-001',
    title: 'Audit & Patch Background Data Charging Engine & Auto-SMS Warning',
    owner: 'Billing (Nigar Aliyeva)',
    deployed_date: '2026-09-15',
    target_metric: 'Reduce repeat billing contacts by >50% within 4 weeks'
  },
  baseline_vs_current: {
    before_weekly_volume: 156,
    after_weekly_volume: 18,
    volume_reduction_pct: 88.5,
    before_repeat_contact_rate: 51.2,
    after_repeat_contact_rate: 8.5,
    repeat_rate_reduction_pct: 83.4,
    status: 'Intervention Successful - Repeat contacts minimized'
  },
  weekly_trend: [
    { week: 'W-2 (Pre)', mentions: 142, repeat_contact_pct: 48.5, negative_rate_pct: 88.0, stage: 'before' },
    { week: 'W-1 (Pre)', mentions: 156, repeat_contact_pct: 51.2, negative_rate_pct: 91.0, stage: 'before' },
    { week: 'W0 (Action)', mentions: 110, repeat_contact_pct: 39.0, negative_rate_pct: 75.0, stage: 'intervention' },
    { week: 'W+1 (Post)', mentions: 84, repeat_contact_pct: 29.4, negative_rate_pct: 62.0, stage: 'after' },
    { week: 'W+2 (Post)', mentions: 42, repeat_contact_pct: 18.1, negative_rate_pct: 45.0, stage: 'after' },
    { week: 'W+3 (Post)', mentions: 26, repeat_contact_pct: 12.0, negative_rate_pct: 31.0, stage: 'after' },
    { week: 'W+4 (Post)', mentions: 18, repeat_contact_pct: 8.5, negative_rate_pct: 24.0, stage: 'after' }
  ]
};

// Initial Seeded Operator Actions
const INITIAL_ACTIONS = [
  {
    id: 'ACT-001',
    cluster_topic: 'Unexpected Data Charges',
    action_title: 'Audit & Patch Background Data Charging Engine & Auto-SMS Warning',
    owner: 'Billing',
    due_date: '2026-10-15',
    status: 'in_progress',
    expected_success_metric: 'Drop repeat data charge complaints by 50%',
    created_at: '2026-10-02T10:00:00Z',
    updated_at: '2026-10-02T10:00:00Z'
  },
  {
    id: 'ACT-002',
    cluster_topic: 'SIM Card & OTP Issues',
    action_title: 'Update SMS gateway routing with fallback banking tier',
    owner: 'Support',
    due_date: '2026-10-18',
    status: 'open',
    expected_success_metric: 'Achieve 99.8% OTP delivery within 30 seconds',
    created_at: '2026-10-03T11:30:00Z',
    updated_at: '2026-10-03T11:30:00Z'
  }
];

class Store {
  constructor() {
    this.data = {
      interactions: [],
      actions: [...INITIAL_ACTIONS],
      closed_loop: { ...INITIAL_CLOSED_LOOP },
      last_upload_at: null
    };
    this.load();
  }

  load() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(raw);
      } else {
        this.save();
      }
    } catch (err) {
      console.warn('Failed to parse existing DB file, re-initializing fresh state:', err.message);
      this.save();
    }
  }

  save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to persist db.json:', err.message);
    }
  }

  getInteractions() {
    return this.data.interactions || [];
  }

  setInteractions(interactions) {
    this.data.interactions = interactions;
    this.data.last_upload_at = new Date().toISOString();
    this.save();
    return this.data.interactions;
  }

  addInteraction(interaction) {
    this.data.interactions.push(interaction);
    this.save();
    return interaction;
  }

  getActions() {
    return this.data.actions || [];
  }

  addAction(action) {
    const newAction = {
      id: `ACT-${String(this.data.actions.length + 1).padStart(3, '0')}`,
      cluster_topic: action.cluster_topic || 'General',
      action_title: action.action_title || 'Corrective Action',
      owner: action.owner || 'Support',
      due_date: action.due_date || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      status: action.status || 'open',
      expected_success_metric: action.expected_success_metric || 'Reduce repeat contacts by 40%',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    this.data.actions.unshift(newAction);
    this.save();
    return newAction;
  }

  updateAction(id, updates) {
    const idx = this.data.actions.findIndex(a => a.id === id);
    if (idx === -1) return null;
    this.data.actions[idx] = {
      ...this.data.actions[idx],
      ...updates,
      updated_at: new Date().toISOString()
    };
    this.save();
    return this.data.actions[idx];
  }

  getClosedLoop() {
    return this.data.closed_loop;
  }

  reset() {
    this.data = {
      interactions: [],
      actions: [...INITIAL_ACTIONS],
      closed_loop: { ...INITIAL_CLOSED_LOOP },
      last_upload_at: null
    };
    this.save();
  }
}

export const store = new Store();
