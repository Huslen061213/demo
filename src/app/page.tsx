/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";
/* eslint-disable react-hooks/static-components, @typescript-eslint/no-unused-vars */

import { useState, useEffect, useCallback } from "react";

/* ─── TOKENS ─────────────────────────────────────────────────────────── */
const T = {
  bg: "#F5F5F5",
  surface: "#FFFFFF",
  border: "#E8E8E8",
  text: "#111",
  textMid: "#555",
  textDim: "#999",
  dark: "#111",
  green: "#16A34A",
  greenBg: "#DCFCE7",
  orange: "#D97706",
  orangeBg: "#FEF3C7",
  red: "#DC2626",
  redBg: "#FEE2E2",
  blue: "#2563EB",
  blueBg: "#DBEAFE",
  purple: "#7C3AED",
  purpleBg: "#EDE9FE",
  shadow: "0 1px 3px rgba(0,0,0,.06),0 1px 2px rgba(0,0,0,.04)",
  shadowMd: "0 4px 16px rgba(0,0,0,.10)",
  shadowLg: "0 8px 36px rgba(0,0,0,.13)",
};

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html,body{height:100%;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:${T.bg};color:${T.text};-webkit-font-smoothing:antialiased}
  button,input,select,textarea{font-family:inherit}
  ::-webkit-scrollbar{width:4px;height:4px}
  ::-webkit-scrollbar-track{background:transparent}
  ::-webkit-scrollbar-thumb{background:#DDD;border-radius:4px}
  @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes scaleIn{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}
  @keyframes slideRight{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:translateX(0)}}
  @keyframes barIn{from{width:0}to{width:var(--bw)}}
  @keyframes spin{to{transform:rotate(360deg)}}
  @keyframes scanPulse{0%,100%{top:4%}50%{top:86%}}
  @keyframes toastIn{from{opacity:0;transform:translateY(16px) scale(.95)}to{opacity:1;transform:translateY(0) scale(1)}}
  @keyframes ripple{from{transform:scale(0);opacity:.3}to{transform:scale(4);opacity:0}}
  .page{animation:fadeUp .3s cubic-bezier(.22,1,.36,1) both}
  .rh{transition:background .1s}.rh:hover{background:#FAFAFA!important}
  .ch{transition:box-shadow .2s,transform .2s}.ch:hover{box-shadow:${T.shadowMd}!important;transform:translateY(-2px)}
  .nh{transition:background .12s,color .12s}.nh:hover{background:#F0F0F0!important}
  input:focus,select:focus,textarea:focus{border-color:#888!important;outline:none}
  .spin{animation:spin .65s linear infinite}
`;

/* ─── MOCK DATA ──────────────────────────────────────────────────────── */
const INIT_ASSETS = [
  {
    id: "MAC-2026-001",
    name: 'MacBook Pro 16"',
    cat: "Laptop",
    status: "Assigned",
    assignee: "Ganbold Batjargal",
    loc: "Floor 3",
    val: 4800000,
    cost: 5200000,
    residual: 200000,
    life: 4,
    purchased: "2026-01-15",
    serial: "C02XL0HF",
    condition: "Good",
    wh: "WH-A",
  },
  {
    id: "MON-2026-008",
    name: "Dell UltraSharp 27",
    cat: "Monitor",
    status: "Available",
    assignee: null,
    loc: "Warehouse",
    val: 1250000,
    cost: 1400000,
    residual: 50000,
    life: 5,
    purchased: "2026-02-20",
    serial: "DLTM80029",
    condition: "New",
    wh: "WH-B",
  },
  {
    id: "LPT-2026-015",
    name: "ThinkPad X1 Carbon",
    cat: "Laptop",
    status: "In Repair",
    assignee: "Bat Erdene",
    loc: "IT Dept",
    val: 3400000,
    cost: 3800000,
    residual: 100000,
    life: 4,
    purchased: "2025-11-10",
    serial: "R90P9F3K",
    condition: "Fair",
    wh: "WH-A",
  },
  {
    id: "PER-2026-047",
    name: "Logitech MX Master 3",
    cat: "Peripheral",
    status: "Assigned",
    assignee: "Oyungerel Bold",
    loc: "Floor 2",
    val: 195000,
    cost: 220000,
    residual: 5000,
    life: 3,
    purchased: "2026-03-01",
    serial: "MX31920",
    condition: "Good",
    wh: "WH-C",
  },
  {
    id: "PHN-2026-012",
    name: "iPhone 15 Pro",
    cat: "Phone",
    status: "Pending Disposal",
    assignee: null,
    loc: "Storage",
    val: 2900000,
    cost: 3500000,
    residual: 0,
    life: 3,
    purchased: "2025-09-05",
    serial: "DNPXC2F1",
    condition: "Fair",
    wh: "WH-A",
  },
  {
    id: "TAB-2026-003",
    name: 'iPad Pro 12.9"',
    cat: "Tablet",
    status: "Available",
    assignee: null,
    loc: "Warehouse",
    val: 2200000,
    cost: 2500000,
    residual: 100000,
    life: 4,
    purchased: "2026-01-22",
    serial: "DMPPKNT9",
    condition: "New",
    wh: "WH-B",
  },
  {
    id: "FRN-2025-088",
    name: "Herman Miller Aeron",
    cat: "Furniture",
    status: "Assigned",
    assignee: "Munkh Bayar",
    loc: "Floor 1",
    val: 1600000,
    cost: 1800000,
    residual: 100000,
    life: 8,
    purchased: "2025-07-14",
    serial: "HM-A-4892",
    condition: "Good",
    wh: "WH-C",
  },
  {
    id: "NET-2026-019",
    name: "Cisco Switch 24-port",
    cat: "Network",
    status: "Available",
    assignee: null,
    loc: "Server Rm",
    val: 890000,
    cost: 1000000,
    residual: 50000,
    life: 5,
    purchased: "2026-02-10",
    serial: "FTX2208Y",
    condition: "New",
    wh: "WH-A",
  },
  {
    id: "LPT-2026-009",
    name: "HP EliteBook 840",
    cat: "Laptop",
    status: "Pending Disposal",
    assignee: null,
    loc: "Storage",
    val: 0,
    cost: 2800000,
    residual: 0,
    life: 4,
    purchased: "2022-01-10",
    serial: "5CD22349",
    condition: "Poor",
    wh: "WH-B",
  },
  {
    id: "PHN-2026-005",
    name: "Samsung Galaxy S24",
    cat: "Phone",
    status: "Assigned",
    assignee: "Solongo N.",
    loc: "Floor 3",
    val: 1800000,
    cost: 2000000,
    residual: 50000,
    life: 3,
    purchased: "2026-01-05",
    serial: "R5CX71BM",
    condition: "Good",
    wh: "WH-A",
  },
];

const EMPLOYEES = [
  {
    id: "E001",
    name: "Ganbold Batjargal",
    email: "ganbold@ams.mn",
    dept: "Engineering",
    branch: "UB HQ",
    status: "ACTIVE",
    level: "Senior",
    hireDate: "2023-03-01",
    terminationDate: null,
  },
  {
    id: "E002",
    name: "Bat Erdene",
    email: "baterdene@ams.mn",
    dept: "IT",
    branch: "UB HQ",
    status: "ACTIVE",
    level: "Mid",
    hireDate: "2022-08-15",
    terminationDate: null,
  },
  {
    id: "E003",
    name: "Oyungerel Bold",
    email: "oyungerel@ams.mn",
    dept: "Finance",
    branch: "UB HQ",
    status: "ACTIVE",
    level: "Senior",
    hireDate: "2021-06-01",
    terminationDate: null,
  },
  {
    id: "E004",
    name: "Munkh Bayar",
    email: "munkh@ams.mn",
    dept: "HR",
    branch: "UB HQ",
    status: "ACTIVE",
    level: "Mid",
    hireDate: "2020-01-10",
    terminationDate: null,
  },
  {
    id: "E005",
    name: "Solongo N.",
    email: "solongo@ams.mn",
    dept: "Marketing",
    branch: "UB HQ",
    status: "ACTIVE",
    level: "Junior",
    hireDate: "2024-09-01",
    terminationDate: null,
  },
  {
    id: "E006",
    name: "Tuguldur G.",
    email: "tuguldur@ams.mn",
    dept: "Engineering",
    branch: "Darkhan",
    status: "TERMINATED",
    level: "Mid",
    hireDate: "2022-04-01",
    terminationDate: "2026-03-10",
  },
];

const INIT_CENSUS = [
  {
    id: "CEN-001",
    name: "Q1 2026 Full Audit",
    scope: "Company",
    status: "Active",
    deadline: "2026-03-31",
    total: 6,
    verified: 3,
    discrepancy: 1,
  },
  {
    id: "CEN-002",
    name: "IT Dept Spot Check",
    scope: "Department",
    status: "Completed",
    deadline: "2025-12-15",
    total: 5,
    verified: 5,
    discrepancy: 0,
  },
  {
    id: "CEN-003",
    name: "Laptop Category Audit",
    scope: "Category",
    status: "Draft",
    deadline: "2026-04-15",
    total: 0,
    verified: 0,
    discrepancy: 0,
  },
];

const INIT_TASKS = [
  {
    id: "CT-001",
    census: "CEN-001",
    assetId: "MAC-2026-001",
    assetName: 'MacBook Pro 16"',
    assignee: "Ganbold Batjargal",
    verified: true,
    verifiedAt: "2026-03-05",
    condition: "Good",
    discrepancy: false,
  },
  {
    id: "CT-002",
    census: "CEN-001",
    assetId: "LPT-2026-015",
    assetName: "ThinkPad X1 Carbon",
    assignee: "Bat Erdene",
    verified: true,
    verifiedAt: "2026-03-06",
    condition: "Fair",
    discrepancy: false,
  },
  {
    id: "CT-003",
    census: "CEN-001",
    assetId: "PER-2026-047",
    assetName: "Logitech MX Master 3",
    assignee: "Oyungerel Bold",
    verified: true,
    verifiedAt: "2026-03-07",
    condition: "Good",
    discrepancy: false,
  },
  {
    id: "CT-004",
    census: "CEN-001",
    assetId: "FRN-2025-088",
    assetName: "Herman Miller Aeron",
    assignee: "Munkh Bayar",
    verified: false,
    verifiedAt: null,
    condition: null,
    discrepancy: false,
  },
  {
    id: "CT-005",
    census: "CEN-001",
    assetId: "PHN-2026-005",
    assetName: "Samsung Galaxy S24",
    assignee: "Solongo N.",
    verified: false,
    verifiedAt: null,
    condition: null,
    discrepancy: false,
  },
  {
    id: "CT-006",
    census: "CEN-001",
    assetId: "MON-2026-008",
    assetName: "Dell UltraSharp 27",
    assignee: null,
    verified: false,
    verifiedAt: null,
    condition: null,
    discrepancy: true,
  },
];

const INIT_OB = [
  {
    id: "OB-001",
    employee: "Tuguldur G.",
    empId: "E006",
    dept: "Engineering",
    terminationDate: "2026-03-10",
    deadline: "2026-03-17",
    clearance: "PENDING",
    assets: [
      {
        id: "MAC-2026-003",
        name: 'MacBook Pro 14"',
        cat: "Laptop",
        returned: false,
        condition: null,
        wiped: false,
      },
      {
        id: "PHN-2026-008",
        name: "iPhone 14 Pro",
        cat: "Phone",
        returned: false,
        condition: null,
        wiped: false,
      },
      {
        id: "PER-2026-031",
        name: "AirPods Pro",
        cat: "Peripheral",
        returned: true,
        condition: "Good",
        wiped: false,
      },
    ],
  },
];

const INIT_DISPOSALS = [
  {
    id: "DSP-001",
    assetId: "PHN-2026-012",
    assetName: "iPhone 15 Pro",
    reason: "End of life — 3yr threshold",
    bookValue: 0,
    financeApproved: false,
    wiped: false,
    status: "Awaiting Finance",
  },
  {
    id: "DSP-002",
    assetId: "LPT-2026-009",
    assetName: "HP EliteBook 840",
    reason: "Fully depreciated — auto-flagged",
    bookValue: 0,
    financeApproved: true,
    wiped: false,
    status: "Awaiting Data Wipe",
  },
];

const INIT_ASSIGNMENTS = [
  {
    id: "ASG-055",
    assetId: "MAC-2026-001",
    assetName: 'MacBook Pro 16"',
    employee: "Ganbold Batjargal",
    email: "ganbold@ams.mn",
    assignedAt: "2026-03-14 14:25",
    expiry: "2026-03-17 14:25",
    signed: false,
  },
  {
    id: "ASG-051",
    assetId: "PER-2026-047",
    assetName: "Logitech MX Master 3",
    employee: "Oyungerel Bold",
    email: "oyungerel@ams.mn",
    assignedAt: "2026-03-12 09:10",
    expiry: "2026-03-15 09:10",
    signed: true,
  },
  {
    id: "ASG-049",
    assetId: "PHN-2026-005",
    assetName: "Samsung Galaxy S24",
    employee: "Solongo N.",
    email: "solongo@ams.mn",
    assignedAt: "2026-03-10 11:30",
    expiry: "2026-03-13 11:30",
    signed: true,
  },
];

const INIT_AUDIT = [
  {
    id: "AL-001",
    table: "assets",
    recordId: "MAC-2026-001",
    action: "CREATE",
    actor: "Batbayar Dorj",
    time: "2026-03-14 14:23",
    detail: "Asset registered",
  },
  {
    id: "AL-002",
    table: "assignments",
    recordId: "ASG-055",
    action: "CREATE",
    actor: "Batbayar Dorj",
    time: "2026-03-14 14:25",
    detail: "Assigned to Ganbold Batjargal",
  },
  {
    id: "AL-003",
    table: "assets",
    recordId: "LPT-2026-015",
    action: "UPDATE",
    actor: "Batbayar Dorj",
    time: "2026-03-13 16:44",
    detail: "Status: ASSIGNED → IN_REPAIR",
  },
  {
    id: "AL-004",
    table: "census_tasks",
    recordId: "CT-003",
    action: "UPDATE",
    actor: "Oyungerel Bold",
    time: "2026-03-07 09:12",
    detail: "Census task verified",
  },
  {
    id: "AL-005",
    table: "assignments",
    recordId: "ASG-031",
    action: "UPDATE",
    actor: "Munkh Bayar",
    time: "2026-03-06 15:30",
    detail: "Asset returned by Munkh Bayar",
  },
  {
    id: "AL-006",
    table: "disposal_records",
    recordId: "DSP-001",
    action: "CREATE",
    actor: "Batbayar Dorj",
    time: "2026-03-10 11:00",
    detail: "Disposal request raised",
  },
];

const MONTHLY = [
  { m: "Sep", added: 8 },
  { m: "Oct", added: 12 },
  { m: "Nov", added: 6 },
  { m: "Dec", added: 15 },
  { m: "Jan", added: 10 },
  { m: "Feb", added: 18 },
  { m: "Mar", added: 45 },
];

const WAREHOUSES = [
  {
    id: "WH-A",
    name: "Warehouse A — Main",
    loc: "UB HQ, B1",
    cap: 200,
    manager: "Gantulga M.",
  },
  {
    id: "WH-B",
    name: "Warehouse B — Annex",
    loc: "UB HQ, B2",
    cap: 150,
    manager: "Oyun Ts.",
  },
  {
    id: "WH-C",
    name: "Warehouse C — Remote",
    loc: "Darkhan Branch",
    cap: 80,
    manager: "Narantsetseg B.",
  },
];

const CC = {
  Laptop: "#111",
  Monitor: "#2563EB",
  Peripheral: "#16A34A",
  Phone: "#D97706",
  Tablet: "#7C3AED",
  Furniture: "#DC2626",
  Network: "#06B6D4",
  Printer: "#84CC16",
  Camera: "#F59E0B",
};

const fmtV = (v) =>
  v >= 1000000
    ? (v / 1000000).toFixed(1) + "M ₮"
    : (v / 1000).toFixed(0) + "K ₮";
const fmtF = (v) => (v || 0).toLocaleString() + " ₮";
const depA = (a) =>
  a.life > 0 ? Math.round((a.cost - a.residual) / a.life) : 0;
const depB = (a) =>
  Math.max(
    a.residual,
    a.cost -
      depA(a) *
        Math.max(
          0,
          new Date().getFullYear() - new Date(a.purchased).getFullYear(),
        ),
  );
const addLog = (logs, table, recordId, action, detail) => [
  {
    id: `AL-${Date.now()}`,
    table,
    recordId,
    action,
    actor: "Batbayar Dorj",
    time: new Date().toISOString().replace("T", " ").slice(0, 16),
    detail,
  },
  ...logs,
];

/* ─── ICONS ──────────────────────────────────────────────────────────── */
const IC = {
  home: (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9,22 9,12 15,12 15,22" />
    </svg>
  ),
  assets: (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
    </svg>
  ),
  assign: (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  census: (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  offb: (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
    </svg>
  ),
  report: (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  storage: (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  cog: (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  ),
  box: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
    </svg>
  ),
  users: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  alert: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  trend: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  check: (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  plus: (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  edit: (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
  trash: (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2" />
    </svg>
  ),
  sign: (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  ),
  eye: (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  dl: (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  qr: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="3" width="5" height="5" />
      <rect x="16" y="3" width="5" height="5" />
      <rect x="3" y="16" width="5" height="5" />
      <path d="M21 16h-3a2 2 0 00-2 2v3M16 21h5M21 16v5" />
    </svg>
  ),
  refresh: (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="23 4 23 10 17 10" />
      <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
    </svg>
  ),
  pdf: (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  ),
  shield: (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  upload: (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="16 16 12 12 8 16" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" />
    </svg>
  ),
  chevR: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  clock: (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  bell: (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  ),
  user: (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  globe: (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  ),
  key: (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
  ),
};

/* ─── SHARED UI ──────────────────────────────────────────────────────── */
function Card({ c, s = {}, className = "" }) {
  return (
    <div
      className={className}
      style={{
        background: T.surface,
        border: `1px solid ${T.border}`,
        borderRadius: 10,
        boxShadow: T.shadow,
        transition: "box-shadow .2s,transform .2s",
        ...s,
      }}
    >
      {c}
    </div>
  );
}

function Chip({ status }) {
  const m = {
    Assigned: { bg: "#DBEAFE", c: "#1D4ED8" },
    Available: { bg: "#DCFCE7", c: "#15803D" },
    "In Repair": { bg: "#FEF3C7", c: "#B45309" },
    "Pending Disposal": { bg: "#FEE2E2", c: "#B91C1C" },
    Disposed: { bg: "#F3F4F6", c: "#6B7280" },
    Lost: { bg: "#FEE2E2", c: "#B91C1C" },
    ACTIVE: { bg: "#DCFCE7", c: "#15803D" },
    TERMINATED: { bg: "#FEE2E2", c: "#B91C1C" },
    ON_LEAVE: { bg: "#FEF3C7", c: "#B45309" },
    PENDING: { bg: "#FEF3C7", c: "#B45309" },
    CLEARED: { bg: "#DCFCE7", c: "#15803D" },
    Active: { bg: "#DBEAFE", c: "#1D4ED8" },
    Completed: { bg: "#DCFCE7", c: "#15803D" },
    Draft: { bg: "#F3F4F6", c: "#6B7280" },
    "Awaiting Finance": { bg: "#FEF3C7", c: "#B45309" },
    "Awaiting Data Wipe": { bg: "#DBEAFE", c: "#1D4ED8" },
    Approved: { bg: "#DCFCE7", c: "#15803D" },
  }[status] || { bg: "#F3F4F6", c: "#6B7280" };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        background: m.bg,
        color: m.c,
        padding: "3px 9px",
        borderRadius: 6,
        fontSize: 11.5,
        fontWeight: 500,
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: m.c,
          flexShrink: 0,
        }}
      />
      {status}
    </span>
  );
}

function Btn({
  children,
  dark = false,
  danger = false,
  ghost = false,
  onClick,
  icon,
  disabled = false,
  loading = false,
  style = {},
  full = false,
}) {
  const [press, setPress] = useState(false);
  const bg = danger
    ? T.red
    : dark
      ? T.dark
      : ghost
        ? "transparent"
        : "transparent";
  const clr = danger || dark ? "#fff" : T.textMid;
  const brd = danger ? T.red : dark ? T.dark : T.border;
  return (
    <button
      onClick={(e) => {
        if (!disabled && !loading) {
          setPress(true);
          setTimeout(() => setPress(false), 150);
          if (onClick) onClick(e);
        }
      }}
      disabled={disabled || loading}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        padding: "7px 14px",
        fontSize: 12.5,
        fontWeight: 500,
        borderRadius: 7,
        border: `1px solid ${brd}`,
        background: bg,
        color: clr,
        cursor: disabled || loading ? "not-allowed" : "pointer",
        opacity: disabled || loading ? 0.45 : 1,
        transform: press ? "scale(.97)" : "scale(1)",
        transition:
          "transform .12s,opacity .15s,box-shadow .15s,background .12s",
        width: full ? "100%" : "auto",
        ...(!(disabled || loading) && { ":hover": { opacity: 0.82 } }),
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled && !loading) e.currentTarget.style.boxShadow = T.shadowMd;
      }}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
    >
      {loading ? (
        <span
          className="spin"
          style={{
            width: 13,
            height: 13,
            borderRadius: "50%",
            border: "2px solid rgba(255,255,255,.3)",
            borderTopColor: dark ? "#fff" : T.textMid,
            display: "inline-block",
          }}
        />
      ) : (
        icon && <span style={{ display: "inline-flex" }}>{icon}</span>
      )}
      {children}
    </button>
  );
}

function Inp({
  val,
  set,
  placeholder,
  type = "text",
  disabled = false,
  s = {},
}) {
  return (
    <input
      type={type}
      value={val}
      onChange={(e) => set(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      style={{
        width: "100%",
        padding: "9px 12px",
        fontSize: 13,
        color: disabled ? T.textDim : T.text,
        background: disabled ? "#FAFAFA" : T.surface,
        border: `1px solid ${T.border}`,
        borderRadius: 7,
        outline: "none",
        ...s,
      }}
    />
  );
}

function Sel({ val, set, opts, s = {} }) {
  return (
    <select
      value={val}
      onChange={(e) => set(e.target.value)}
      style={{
        width: "100%",
        padding: "9px 12px",
        fontSize: 13,
        color: T.text,
        background: T.surface,
        border: `1px solid ${T.border}`,
        borderRadius: 7,
        outline: "none",
        cursor: "pointer",
        appearance: "none",
        ...s,
      }}
    >
      {opts.map((o) => (
        <option key={o.v ?? o} value={o.v ?? o}>
          {o.l ?? o}
        </option>
      ))}
    </select>
  );
}

function Lbl({ children }) {
  return (
    <div
      style={{
        fontSize: 12,
        fontWeight: 500,
        color: T.textMid,
        marginBottom: 5,
      }}
    >
      {children}
    </div>
  );
}

function Toggle({ on, set }) {
  return (
    <div
      onClick={() => set(!on)}
      style={{
        width: 40,
        height: 22,
        borderRadius: 99,
        cursor: "pointer",
        flexShrink: 0,
        background: on ? T.dark : "#D1D5DB",
        position: "relative",
        transition: "background .2s",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 3,
          left: on ? 20 : 3,
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: "#fff",
          boxShadow: "0 1px 3px rgba(0,0,0,.2)",
          transition: "left .18s",
        }}
      />
    </div>
  );
}

function SH({ children, right, border = false }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 14,
        ...(border
          ? { paddingBottom: 12, borderBottom: `1px solid ${T.border}` }
          : {}),
      }}
    >
      <div style={{ fontSize: 14, fontWeight: 600, color: T.text }}>
        {children}
      </div>
      {right}
    </div>
  );
}

function HBar({ label, val, pct, color, right }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 4,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 2,
              background: color,
              flexShrink: 0,
            }}
          />
          <span style={{ fontSize: 12.5, color: T.text }}>{label}</span>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {right && (
            <span style={{ fontSize: 11, color: T.textDim }}>{right}</span>
          )}
          <span style={{ fontSize: 12, fontWeight: 600, color: T.text }}>
            {val}
          </span>
        </div>
      </div>
      <div
        style={{
          height: 5,
          background: "#F3F4F6",
          borderRadius: 99,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            background: color,
            borderRadius: 99,
            width: pct + "%",
            "--bw": pct + "%",
            animation: "barIn .7s ease both",
          }}
        />
      </div>
    </div>
  );
}

/* ─── TOAST SYSTEM ───────────────────────────────────────────────────── */
function ToastStack({ toasts }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 22,
        right: 22,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        alignItems: "flex-end",
      }}
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          style={{
            background: t.danger ? T.red : T.dark,
            color: "#fff",
            padding: "11px 18px",
            borderRadius: 9,
            fontSize: 13,
            fontWeight: 500,
            boxShadow: T.shadowLg,
            display: "flex",
            alignItems: "center",
            gap: 8,
            animation: "toastIn .28s cubic-bezier(.22,1,.36,1) both",
            maxWidth: 340,
          }}
        >
          <span style={{ flexShrink: 0 }}>{t.danger ? "⚠" : IC.check}</span>
          {t.msg}
        </div>
      ))}
    </div>
  );
}

/* ─── MODAL ──────────────────────────────────────────────────────────── */
function Modal({ title, children, onClose, width = 480 }) {
  useEffect(() => {
    const h = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        background: "rgba(0,0,0,.38)",
        backdropFilter: "blur(3px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        animation: "fadeIn .18s",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          background: T.surface,
          border: `1px solid ${T.border}`,
          borderRadius: 14,
          width,
          maxWidth: "100%",
          boxShadow: T.shadowLg,
          animation: "scaleIn .22s cubic-bezier(.22,1,.36,1)",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "16px 20px",
            borderBottom: `1px solid ${T.border}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 600, color: T.text }}>
            {title}
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: 20,
              color: T.textDim,
              cursor: "pointer",
              lineHeight: 1,
              borderRadius: 6,
              padding: "0 5px",
              transition: "color .12s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = T.text)}
            onMouseLeave={(e) => (e.currentTarget.style.color = T.textDim)}
          >
            ×
          </button>
        </div>
        <div style={{ padding: "18px 20px", overflowY: "auto", flex: 1 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function Confirm({ msg, onOk, onCancel, danger = true }) {
  return (
    <Modal title="Confirm Action" onClose={onCancel} width={380}>
      <p
        style={{
          fontSize: 13,
          color: T.textMid,
          lineHeight: 1.7,
          marginBottom: 22,
        }}
      >
        {msg}
      </p>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <Btn onClick={onCancel}>Cancel</Btn>
        <Btn
          dark={!danger}
          danger={danger}
          onClick={onOk}
          icon={danger ? IC.trash : IC.check}
        >
          {danger ? "Delete" : "Confirm"}
        </Btn>
      </div>
    </Modal>
  );
}

function CountUp({ to }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let f = 0;
    const s = Math.max(1, to) / 28;
    const t = setInterval(() => {
      f += s;
      if (f >= to) {
        setV(to);
        clearInterval(t);
      } else setV(Math.floor(f));
    }, 22);
    return () => clearInterval(t);
  }, [to]);
  return <>{v.toLocaleString()}</>;
}

/* ─── SIDEBAR ────────────────────────────────────────────────────────── */
const NAV = [
  { id: "home", label: "HOME", icon: IC.home },
  { id: "assets", label: "ASSETS", icon: IC.assets },
  { id: "assign", label: "ASSIGNMENTS", icon: IC.assign },
  { id: "census", label: "CENSUS", icon: IC.census },
  { id: "offboard", label: "OFFBOARDING", icon: IC.offb },
  { id: "reports", label: "REPORTS", icon: IC.report },
  { id: "storage", label: "STORAGE", icon: IC.storage },
  { id: "settings", label: "SETTINGS", icon: IC.cog },
];

function Sidebar({ page, setPage, assets }) {
  const pending = assets.filter((a) => a.status === "Pending Disposal").length;
  return (
    <aside
      style={{
        width: 182,
        background: T.surface,
        borderRight: `1px solid ${T.border}`,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "sticky",
        top: 0,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          padding: "16px 16px 14px",
          borderBottom: `1px solid ${T.border}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: T.dark,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
            </svg>
          </div>
          <div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: T.text,
                letterSpacing: "-0.01em",
              }}
            >
              AMS
            </div>
            <div style={{ fontSize: 9.5, color: T.textDim }}>
              Asset Management System
            </div>
          </div>
        </div>
      </div>
      <nav style={{ flex: 1, overflowY: "auto", padding: "6px 8px" }}>
        {NAV.map((n) => {
          const active = page === n.id;
          return (
            <button
              key={n.id}
              onClick={() => setPage(n.id)}
              className={active ? "" : "nh"}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                padding: "9px 10px",
                borderRadius: 7,
                border: "none",
                textAlign: "left",
                background: active ? T.dark : "transparent",
                color: active ? "#fff" : T.textMid,
                fontSize: 11.5,
                fontWeight: active ? 600 : 500,
                letterSpacing: "0.03em",
                marginBottom: 1,
                cursor: "pointer",
                transition: "background .12s,color .12s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <span style={{ flexShrink: 0, opacity: active ? 1 : 0.85 }}>
                  {n.icon}
                </span>
                {n.label}
              </div>
              {n.id === "reports" && pending > 0 && (
                <span
                  style={{
                    background: T.red,
                    color: "#fff",
                    borderRadius: 99,
                    fontSize: 9,
                    fontWeight: 700,
                    padding: "1px 5px",
                    minWidth: 16,
                    textAlign: "center",
                  }}
                >
                  {pending}
                </span>
              )}
            </button>
          );
        })}
      </nav>
      <div
        style={{
          padding: "12px 14px 14px",
          borderTop: `1px solid ${T.border}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: T.dark,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            BD
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: T.text }}>
              Batbayar Dorj
            </div>
            <div style={{ fontSize: 10.5, color: T.textDim }}>Admin</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   HOME / DASHBOARD
═══════════════════════════════════════════════════════════════════════ */
function HomePage({ assets, setPage }) {
  const assigned = assets.filter((a) => a.status === "Assigned").length;
  const available = assets.filter((a) => a.status === "Available").length;
  const inRepair = assets.filter((a) => a.status === "In Repair").length;
  const pendingDisposal = assets.filter(
    (a) => a.status === "Pending Disposal",
  ).length;
  const totalCost = assets.reduce((s, a) => s + (a.cost || 0), 0);
  const catMap = {};
  assets.forEach((a) => {
    catMap[a.cat] = (catMap[a.cat] || 0) + 1;
  });
  const catE = Object.entries(catMap).sort((a, b) => b[1] - a[1]);
  const catMax = catE[0]?.[1] || 1;
  const segs = [
    { l: "Assigned", v: assigned, c: "#2563EB" },
    { l: "Available", v: available, c: T.green },
    { l: "In Repair", v: inRepair, c: T.orange },
    { l: "Pending Disposal", v: pendingDisposal, c: T.red },
  ].map((s) => ({
    ...s,
    pct: assets.length > 0 ? (s.v / assets.length) * 100 : 0,
  }));
  let cum = 0;
  const pie = segs.map((s) => {
    const seg = { ...s, start: cum, end: cum + s.pct };
    cum += s.pct;
    return seg;
  });
  const grad = pie
    .map((s) => `${s.c} ${s.start.toFixed(1)}% ${s.end.toFixed(1)}%`)
    .join(",");
  const maxBar = Math.max(...MONTHLY.map((d) => d.added));

  const TASKS = [
    {
      type: "Assignment",
      priority: "high",
      title: "Awaiting e-signature from Ganbold Batjargal",
      ref: "MAC-2026-003",
      due: "2026-03-15",
    },
    {
      type: "Census",
      priority: "medium",
      title: "Q1 2026 Census verification pending",
      sub: "3 assets unverified",
      due: "2026-03-20",
    },
    {
      type: "Offboarding",
      priority: "high",
      title: "Asset return checklist for Tuguldur G.",
      sub: "2 assets pending",
      due: "2026-03-17",
    },
    {
      type: "Disposal",
      priority: "medium",
      title: "Finance approval required for DSP-001",
      ref: "PHN-2026-012",
      due: "2026-03-16",
    },
  ];
  const ACT = [
    {
      type: "assign",
      text: "Asset assigned",
      detail: "MAC-2026-001 → Ganbold Batjargal",
      time: "14:23",
      user: "Batbayar Dorj",
    },
    {
      type: "create",
      text: "Asset registered",
      detail: "CAM-2026-006 Canon EOS R5 added",
      time: "11:05",
      user: "Solongo N.",
    },
    {
      type: "repair",
      text: "Sent for repair",
      detail: "LPT-2026-015 ThinkPad X1 Carbon",
      time: "09:44",
      user: "Batbayar Dorj",
    },
    {
      type: "return",
      text: "Asset returned",
      detail: "MON-2026-008 returned to warehouse",
      time: "Yesterday",
      user: "Munkh Bayar",
    },
    {
      type: "dispose",
      text: "Disposal flagged",
      detail: "PHN-2026-012 iPhone 15 Pro",
      time: "Yesterday",
      user: "Batbayar Dorj",
    },
  ];
  const dotC = {
    assign: T.green,
    create: T.blue,
    repair: T.orange,
    return: T.purple,
    dispose: T.red,
  };

  return (
    <div className="page" style={{ padding: "28px 28px 50px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 24,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: T.text,
              letterSpacing: "-0.02em",
            }}
          >
            Dashboard
          </h1>
          <p style={{ fontSize: 13, color: T.textDim, marginTop: 3 }}>
            Overview of your asset management system
          </p>
        </div>
        <Btn dark onClick={() => setPage("assets")} icon={IC.qr}>
          Register Asset
        </Btn>
      </div>

      {/* KPIs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 14,
          marginBottom: 20,
        }}
      >
        {[
          {
            label: "Total Assets",
            val: assets.length,
            sub: "+12% this month",
            subC: T.green,
            icon: IC.box,
            dark: false,
          },
          {
            label: "Assigned",
            val: assigned,
            sub: `${Math.round((assigned / assets.length) * 100) || 0}% utilization`,
            subC: T.textDim,
            icon: IC.users,
            dark: false,
          },
          {
            label: "Pending Actions",
            val: TASKS.length,
            sub: "Require attention",
            subC: "rgba(255,255,255,.38)",
            icon: IC.alert,
            dark: true,
          },
          {
            label: "This Month",
            val: 45,
            sub: "New registrations",
            subC: T.textDim,
            icon: IC.trend,
            dark: false,
          },
        ].map((k, i) => (
          <div
            key={i}
            className="ch"
            style={{
              background: k.dark ? T.dark : T.surface,
              border: `1px solid ${k.dark ? T.dark : T.border}`,
              borderRadius: 10,
              padding: "20px 22px",
              boxShadow: T.shadow,
              animation: `fadeUp .35s ease ${i * 0.06}s both`,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  color: k.dark ? "rgba(255,255,255,.5)" : T.textDim,
                  fontWeight: 500,
                }}
              >
                {k.label}
              </div>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 8,
                  background: k.dark ? "rgba(255,255,255,.1)" : "#F3F4F6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: k.dark ? "rgba(255,255,255,.7)" : T.textMid,
                }}
              >
                {k.icon}
              </div>
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: k.dark ? "#fff" : T.text,
                letterSpacing: "-0.03em",
                lineHeight: 1,
              }}
            >
              <CountUp to={k.val} />
            </div>
            <div style={{ fontSize: 12, color: k.subC, marginTop: 6 }}>
              {k.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 300px",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <Card
          s={{ padding: "20px 22px" }}
          c={
            <>
              <SH>Monthly Registrations</SH>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 8,
                  height: 120,
                  paddingBottom: 2,
                }}
              >
                {MONTHLY.map((d, i) => {
                  const h = Math.round((d.added / maxBar) * 90);
                  const last = i === MONTHLY.length - 1;
                  return (
                    <div
                      key={d.m}
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 3,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 10,
                          fontWeight: 600,
                          color: last ? T.text : T.textDim,
                        }}
                      >
                        {d.added}
                      </div>
                      <div
                        style={{
                          width: "100%",
                          borderRadius: "3px 3px 0 0",
                          height: h,
                          cursor: "default",
                          background: last ? T.dark : "#E5E7EB",
                          transition: "background .15s,height .4s",
                        }}
                        onMouseEnter={(e) => {
                          if (!last)
                            e.currentTarget.style.background = "#9CA3AF";
                        }}
                        onMouseLeave={(e) => {
                          if (!last)
                            e.currentTarget.style.background = "#E5E7EB";
                        }}
                      />
                      <div style={{ fontSize: 10, color: T.textDim }}>
                        {d.m}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          }
        />
        <Card
          s={{ padding: "20px 22px" }}
          c={
            <>
              <SH>Status Overview</SH>
              <div
                style={{
                  position: "relative",
                  width: 100,
                  height: 100,
                  margin: "0 auto 14px",
                }}
              >
                <div
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    background: `conic-gradient(${grad})`,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 18,
                    borderRadius: "50%",
                    background: T.surface,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 0 0 1px ${T.border}`,
                  }}
                >
                  <div style={{ fontSize: 16, fontWeight: 700, color: T.text }}>
                    {assets.length}
                  </div>
                  <div style={{ fontSize: 9, color: T.textDim }}>TOTAL</div>
                </div>
              </div>
              {segs.map((s) => (
                <div
                  key={s.l}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 6,
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 2,
                        background: s.c,
                      }}
                    />
                    <span style={{ fontSize: 11.5, color: T.textMid }}>
                      {s.l}
                    </span>
                  </div>
                  <span
                    style={{ fontSize: 12, fontWeight: 600, color: T.text }}
                  >
                    {s.v}
                  </span>
                </div>
              ))}
            </>
          }
        />
      </div>

      {/* Charts row 2 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <Card
          s={{ padding: "20px 22px" }}
          c={
            <>
              <SH>Assets by Category</SH>
              {catE.map(([cat, cnt]) => (
                <HBar
                  key={cat}
                  label={cat}
                  val={cnt}
                  pct={Math.round((cnt / catMax) * 100)}
                  color={CC[cat] || T.dark}
                  right={Math.round((cnt / assets.length) * 100) + "%"}
                />
              ))}
            </>
          }
        />
        <Card
          s={{ padding: "20px 22px" }}
          c={
            <>
              <SH
                right={
                  <span style={{ fontSize: 12, color: T.textDim }}>
                    Fleet: {fmtV(totalCost)}
                  </span>
                }
              >
                Depreciation Snapshot
              </SH>
              {assets.slice(0, 6).map((a) => {
                const bv = depB(a);
                const pct = a.cost > 0 ? Math.round((bv / a.cost) * 100) : 0;
                return (
                  <div key={a.id} style={{ marginBottom: 10 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 3,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12,
                          color: T.text,
                          maxWidth: 160,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {a.name}
                      </span>
                      <span
                        style={{
                          fontSize: 11.5,
                          fontWeight: 600,
                          color: T.text,
                        }}
                      >
                        {fmtV(bv)}
                      </span>
                    </div>
                    <div
                      style={{
                        height: 4,
                        background: "#F3F4F6",
                        borderRadius: 99,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          borderRadius: 99,
                          width: pct + "%",
                          transition: "width .6s",
                          background:
                            pct > 50 ? T.green : pct > 20 ? T.orange : T.red,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </>
          }
        />
      </div>

      {/* Table + Tasks */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 330px",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <Card
          s={{ padding: 0, overflow: "hidden" }}
          c={
            <>
              <div
                style={{
                  padding: "14px 20px",
                  borderBottom: `1px solid ${T.border}`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 600, color: T.text }}>
                  Recent Assets
                </div>
                <button
                  onClick={() => setPage("assets")}
                  style={{
                    fontSize: 12.5,
                    color: T.textDim,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                    transition: "color .12s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = T.text)}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = T.textDim)
                  }
                >
                  View all {IC.chevR}
                </button>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${T.border}` }}>
                    {[
                      "Asset Tag",
                      "Name",
                      "Category",
                      "Status",
                      "Assigned To",
                    ].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "9px 16px",
                          textAlign: "left",
                          fontSize: 11,
                          fontWeight: 600,
                          color: T.textDim,
                          letterSpacing: "0.04em",
                          textTransform: "uppercase",
                          background: "#FAFAFA",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {assets.slice(0, 5).map((a, i) => (
                    <tr
                      key={a.id}
                      className="rh"
                      style={{
                        borderBottom:
                          i < 4 ? `1px solid ${T.border}40` : "none",
                        cursor: "pointer",
                      }}
                      onClick={() => setPage("assets")}
                    >
                      <td style={{ padding: "11px 16px" }}>
                        <span
                          style={{
                            fontFamily: "monospace",
                            fontSize: 12,
                            color: T.textMid,
                            background: "#F3F4F6",
                            padding: "2px 7px",
                            borderRadius: 4,
                          }}
                        >
                          {a.id}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "11px 16px",
                          fontSize: 13,
                          fontWeight: 500,
                          color: T.text,
                        }}
                      >
                        {a.name}
                      </td>
                      <td
                        style={{
                          padding: "11px 16px",
                          fontSize: 12.5,
                          color: T.textMid,
                        }}
                      >
                        {a.cat}
                      </td>
                      <td style={{ padding: "11px 16px" }}>
                        <Chip status={a.status} />
                      </td>
                      <td
                        style={{
                          padding: "11px 16px",
                          fontSize: 12.5,
                          color: T.textMid,
                        }}
                      >
                        {a.assignee || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          }
        />
        <Card
          s={{ padding: 0, overflow: "hidden" }}
          c={
            <>
              <div
                style={{
                  padding: "14px 18px",
                  borderBottom: `1px solid ${T.border}`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 600, color: T.text }}>
                  Pending Tasks
                </div>
                <span style={{ fontSize: 12, color: T.textDim }}>
                  {TASKS.length} items
                </span>
              </div>
              {TASKS.map((t, i) => (
                <div
                  key={i}
                  className="rh"
                  style={{
                    padding: "12px 18px",
                    borderBottom:
                      i < TASKS.length - 1 ? `1px solid ${T.border}40` : "none",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                    }}
                  >
                    <div
                      style={{
                        marginTop: 4,
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        flexShrink: 0,
                        background: t.priority === "high" ? T.red : T.orange,
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 10.5,
                          fontWeight: 600,
                          color: T.textDim,
                          letterSpacing: "0.04em",
                          marginBottom: 2,
                        }}
                      >
                        {t.type.toUpperCase()}
                      </div>
                      <div
                        style={{
                          fontSize: 12.5,
                          fontWeight: 500,
                          color: T.text,
                          lineHeight: 1.4,
                          marginBottom: 3,
                        }}
                      >
                        {t.title}
                      </div>
                      {(t.ref || t.sub) && (
                        <div
                          style={{
                            fontSize: 11,
                            color: T.textDim,
                            marginBottom: 3,
                          }}
                        >
                          {t.ref || t.sub}
                        </div>
                      )}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                          fontSize: 10.5,
                          color: T.textDim,
                        }}
                      >
                        {IC.clock} Due: {t.due}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          }
        />
      </div>

      {/* Activity */}
      <Card
        s={{ padding: 0 }}
        c={
          <>
            <div
              style={{
                padding: "14px 20px",
                borderBottom: `1px solid ${T.border}`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 600, color: T.text }}>
                Recent Activity
              </div>
              <button
                onClick={() => setPage("reports")}
                style={{
                  fontSize: 12.5,
                  color: T.textDim,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  transition: "color .12s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = T.text)}
                onMouseLeave={(e) => (e.currentTarget.style.color = T.textDim)}
              >
                {IC.pdf} View Audit Log
              </button>
            </div>
            {ACT.map((a, i) => (
              <div
                key={i}
                className="rh"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "11px 20px",
                  borderBottom:
                    i < ACT.length - 1 ? `1px solid ${T.border}40` : "none",
                }}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    flexShrink: 0,
                    border: `2px solid ${dotC[a.type] || T.textDim}25`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: dotC[a.type] || T.textDim,
                    }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: T.text }}>
                    {a.text}
                  </div>
                  <div
                    style={{
                      fontSize: 11.5,
                      color: T.textDim,
                      marginTop: 1,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {a.detail}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: 1,
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontSize: 11.5,
                      color: T.textDim,
                      fontFamily: "monospace",
                    }}
                  >
                    {a.time}
                  </span>
                  <span style={{ fontSize: 11, color: T.textDim }}>
                    {a.user}
                  </span>
                </div>
              </div>
            ))}
          </>
        }
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   ASSETS PAGE
═══════════════════════════════════════════════════════════════════════ */
function AssetsPage({ assets, setAssets, toast, setAuditLog }) {
  const [search, setSearch] = useState("");
  const [fS, setFS] = useState("");
  const [fC, setFC] = useState("");
  const [pg, setPg] = useState(1);
  const [addOpen, setAddOpen] = useState(false);
  const [editA, setEditA] = useState(null);
  const [detailA, setDetailA] = useState(null);
  const [qrA, setQrA] = useState(null);
  const [delId, setDelId] = useState(null);
  const [saving, setSaving] = useState(false);
  const PER = 8;

  const filtered = assets.filter(
    (a) =>
      (!search ||
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.id.toLowerCase().includes(search.toLowerCase())) &&
      (!fS || a.status === fS) &&
      (!fC || a.cat === fC),
  );
  const pages = Math.ceil(filtered.length / PER);
  const paged = filtered.slice((pg - 1) * PER, pg * PER);

  const handleSave = (form, isEdit) => {
    setSaving(true);
    setTimeout(() => {
      if (isEdit) {
        setAssets((p) =>
          p.map((a) =>
            a.id === editA.id
              ? {
                  ...a,
                  ...form,
                  val: +form.val,
                  cost: +form.cost,
                  residual: +form.residual,
                  life: +form.life,
                }
              : a,
          ),
        );
        setAuditLog((p) =>
          addLog(p, "assets", editA.id, "UPDATE", "Asset details updated"),
        );
        toast("Asset updated successfully");
      } else {
        const pre = {
          Laptop: "LPT",
          Monitor: "MON",
          Phone: "PHN",
          Peripheral: "PER",
          Tablet: "TAB",
          Furniture: "FRN",
          Network: "NET",
          Printer: "PRN",
          Camera: "CAM",
        };
        const newId = `${pre[form.cat] || "AST"}-2026-${String(assets.length + 1).padStart(3, "0")}`;
        const newA = {
          ...form,
          id: newId,
          val: +form.val,
          cost: +form.cost,
          residual: +form.residual,
          life: +form.life,
          status: "Available",
          wh: "WH-A",
        };
        setAssets((p) => [newA, ...p]);
        setAuditLog((p) =>
          addLog(p, "assets", newId, "CREATE", "Asset registered"),
        );
        toast(`Asset ${newId} registered — QR label ready`);
      }
      setSaving(false);
      setAddOpen(false);
      setEditA(null);
    }, 600);
  };

  const handleDelete = () => {
    setAssets((p) => p.filter((a) => a.id !== delId));
    setAuditLog((p) =>
      addLog(p, "assets", delId, "DELETE", "Asset permanently deleted"),
    );
    toast("Asset deleted", "danger");
    setDelId(null);
  };

  const exportCSV = () => {
    const rows = [
      "ID,Name,Category,Status,Assigned To,Book Value,Location",
      ...assets.map(
        (a) =>
          `${a.id},"${a.name}",${a.cat},${a.status},"${a.assignee || ""}",${depB(a)},${a.loc}`,
      ),
    ].join("\n");
    const b = new Blob([rows], { type: "text/csv" });
    const u = URL.createObjectURL(b);
    const l = document.createElement("a");
    l.href = u;
    l.download = "assets.csv";
    l.click();
    toast("CSV exported successfully");
  };

  const IB = (props) => (
    <button
      {...props}
      style={{
        padding: "5px 8px",
        borderRadius: 6,
        border: `1px solid ${T.border}`,
        background: "transparent",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        color: T.textDim,
        transition: "all .12s",
        ...(props.style || {}),
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#EEF2FF";
        e.currentTarget.style.color = T.blue;
        e.currentTarget.style.borderColor = "#C7D2FE";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color = T.textDim;
        e.currentTarget.style.borderColor = T.border;
      }}
    />
  );
  const IBR = (props) => (
    <button
      {...props}
      style={{
        padding: "5px 8px",
        borderRadius: 6,
        border: `1px solid ${T.border}`,
        background: "transparent",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        color: T.textDim,
        transition: "all .12s",
        ...(props.style || {}),
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = T.redBg;
        e.currentTarget.style.color = T.red;
        e.currentTarget.style.borderColor = T.red + "40";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color = T.textDim;
        e.currentTarget.style.borderColor = T.border;
      }}
    />
  );

  return (
    <div className="page" style={{ padding: "28px 28px 50px", maxWidth: 1300 }}>
      {addOpen && (
        <AssetForm
          onSave={(f) => handleSave(f, false)}
          onClose={() => setAddOpen(false)}
          saving={saving}
        />
      )}
      {editA && (
        <AssetForm
          asset={editA}
          onSave={(f) => handleSave(f, true)}
          onClose={() => setEditA(null)}
          saving={saving}
        />
      )}
      {detailA && (
        <AssetDetailModal
          asset={assets.find((a) => a.id === detailA.id) || detailA}
          onClose={() => setDetailA(null)}
          onEdit={(a) => {
            setDetailA(null);
            setEditA(a);
          }}
        />
      )}
      {qrA && (
        <QRModal asset={qrA} onClose={() => setQrA(null)} toast={toast} />
      )}
      {delId && (
        <Confirm
          msg={`Permanently delete asset ${delId}? This cannot be undone.`}
          onOk={handleDelete}
          onCancel={() => setDelId(null)}
        />
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 20,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: T.text,
              letterSpacing: "-0.02em",
            }}
          >
            Assets
          </h1>
          <p style={{ fontSize: 13, color: T.textDim, marginTop: 3 }}>
            {assets.length} assets ·{" "}
            {assets.filter((a) => a.status === "Available").length} available
          </p>
        </div>
        <Btn dark onClick={() => setAddOpen(true)} icon={IC.plus}>
          Register Asset
        </Btn>
      </div>

      <div
        style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}
      >
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <span
            style={{
              position: "absolute",
              left: 10,
              top: "50%",
              transform: "translateY(-50%)",
              color: T.textDim,
              pointerEvents: "none",
            }}
          >
            🔍
          </span>
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPg(1);
            }}
            placeholder="Search by name or ID…"
            style={{
              width: "100%",
              padding: "8px 10px 8px 32px",
              fontSize: 13,
              background: T.surface,
              border: `1px solid ${T.border}`,
              borderRadius: 7,
              outline: "none",
              color: T.text,
            }}
            onFocus={(e) => (e.target.style.borderColor = "#888")}
            onBlur={(e) => (e.target.style.borderColor = T.border)}
          />
        </div>
        <Sel
          val={fS}
          set={(v) => {
            setFS(v);
            setPg(1);
          }}
          s={{ width: 160 }}
          opts={[
            { v: "", l: "All Status" },
            { v: "Available", l: "Available" },
            { v: "Assigned", l: "Assigned" },
            { v: "In Repair", l: "In Repair" },
            { v: "Pending Disposal", l: "Pending Disposal" },
          ]}
        />
        <Sel
          val={fC}
          set={(v) => {
            setFC(v);
            setPg(1);
          }}
          s={{ width: 150 }}
          opts={[
            { v: "", l: "All Categories" },
            ...Object.keys(CC).map((c) => ({ v: c, l: c })),
          ]}
        />
        <Btn onClick={exportCSV} icon={IC.dl}>
          Export CSV
        </Btn>
      </div>

      <Card
        s={{ padding: 0, overflow: "visible" }}
        c={
          <>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr
                  style={{
                    background: "#FAFAFA",
                    borderBottom: `1px solid ${T.border}`,
                  }}
                >
                  {[
                    "Asset Tag",
                    "Name / Serial",
                    "Category",
                    "Status",
                    "Assigned To",
                    "Book Value",
                    "Condition",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "10px 14px",
                        textAlign: "left",
                        fontSize: 11,
                        fontWeight: 600,
                        color: T.textDim,
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paged.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      style={{ padding: "48px 0", textAlign: "center" }}
                    >
                      <div style={{ fontSize: 30, marginBottom: 8 }}>📭</div>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          color: T.textMid,
                        }}
                      >
                        No assets found
                      </div>
                    </td>
                  </tr>
                ) : (
                  paged.map((a, i) => (
                    <tr
                      key={a.id}
                      className="rh"
                      style={{
                        borderBottom:
                          i < paged.length - 1
                            ? `1px solid ${T.border}40`
                            : "none",
                      }}
                    >
                      <td style={{ padding: "11px 14px" }}>
                        <span
                          style={{
                            fontFamily: "monospace",
                            fontSize: 12,
                            color: T.textMid,
                            background: "#F3F4F6",
                            padding: "2px 7px",
                            borderRadius: 4,
                          }}
                        >
                          {a.id}
                        </span>
                      </td>
                      <td style={{ padding: "11px 14px" }}>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 500,
                            color: T.text,
                          }}
                        >
                          {a.name}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: T.textDim,
                            marginTop: 1,
                          }}
                        >
                          {a.serial}
                        </div>
                      </td>
                      <td
                        style={{
                          padding: "11px 14px",
                          fontSize: 12.5,
                          color: T.textMid,
                        }}
                      >
                        {a.cat}
                      </td>
                      <td style={{ padding: "11px 14px" }}>
                        <Chip status={a.status} />
                      </td>
                      <td
                        style={{
                          padding: "11px 14px",
                          fontSize: 12.5,
                          color: T.textMid,
                        }}
                      >
                        {a.assignee || "—"}
                      </td>
                      <td
                        style={{
                          padding: "11px 14px",
                          fontSize: 12,
                          fontFamily: "monospace",
                          color: T.text,
                        }}
                      >
                        {fmtV(depB(a))}
                      </td>
                      <td
                        style={{
                          padding: "11px 14px",
                          fontSize: 12,
                          color: T.textMid,
                        }}
                      >
                        {a.condition}
                      </td>
                      <td style={{ padding: "11px 10px" }}>
                        <div style={{ display: "flex", gap: 4 }}>
                          <IB onClick={() => setDetailA(a)} title="View">
                            {IC.eye}
                          </IB>
                          <IB onClick={() => setEditA(a)} title="Edit">
                            {IC.edit}
                          </IB>
                          <IB onClick={() => setQrA(a)} title="QR Label">
                            {IC.qr}
                          </IB>
                          <IBR onClick={() => setDelId(a.id)} title="Delete">
                            {IC.trash}
                          </IBR>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {pages > 1 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 16px",
                  borderTop: `1px solid ${T.border}`,
                }}
              >
                <span style={{ fontSize: 12, color: T.textDim }}>
                  {(pg - 1) * PER + 1}–{Math.min(pg * PER, filtered.length)} of{" "}
                  {filtered.length}
                </span>
                <div style={{ display: "flex", gap: 4 }}>
                  <button
                    onClick={() => setPg((p) => Math.max(1, p - 1))}
                    disabled={pg === 1}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 5,
                      border: `1px solid ${T.border}`,
                      background: "transparent",
                      cursor: pg === 1 ? "not-allowed" : "pointer",
                      color: pg === 1 ? T.textDim : T.text,
                      opacity: pg === 1 ? 0.4 : 1,
                    }}
                  >
                    ‹
                  </button>
                  {[...Array(pages)].map((_, p) => (
                    <button
                      key={p}
                      onClick={() => setPg(p + 1)}
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 5,
                        border: `1px solid ${p + 1 === pg ? T.dark : T.border}`,
                        background: p + 1 === pg ? T.dark : "transparent",
                        color: p + 1 === pg ? "#fff" : T.textMid,
                        fontSize: 12,
                        cursor: "pointer",
                      }}
                    >
                      {p + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setPg((p) => Math.min(pages, p + 1))}
                    disabled={pg === pages}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 5,
                      border: `1px solid ${T.border}`,
                      background: "transparent",
                      cursor: pg === pages ? "not-allowed" : "pointer",
                      color: pg === pages ? T.textDim : T.text,
                      opacity: pg === pages ? 0.4 : 1,
                    }}
                  >
                    ›
                  </button>
                </div>
              </div>
            )}
          </>
        }
      />
    </div>
  );
}

function AssetForm({ asset, onSave, onClose, saving }) {
  const ie = !!asset;
  const [f, setF] = useState({
    name: asset?.name || "",
    cat: asset?.cat || "Laptop",
    serial: asset?.serial || "",
    condition: asset?.condition || "New",
    loc: asset?.loc || "",
    val: asset?.val || "",
    cost: asset?.cost || "",
    residual: asset?.residual || "",
    life: asset?.life || 4,
    purchased: asset?.purchased || "",
  });
  const s = (k, v) => setF((p) => ({ ...p, [k]: v }));
  const G2 = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" };
  const F = ({ label, k, type = "text", placeholder, span = false, opts }) => (
    <div style={{ marginBottom: 14, ...(span ? { gridColumn: "1/-1" } : {}) }}>
      <Lbl>{label}</Lbl>
      {opts ? (
        <Sel val={f[k]} set={(v) => s(k, v)} opts={opts} />
      ) : (
        <Inp
          val={f[k]}
          set={(v) => s(k, v)}
          type={type}
          placeholder={placeholder}
        />
      )}
    </div>
  );
  return (
    <Modal
      title={ie ? "Edit Asset" : "Register New Asset"}
      onClose={onClose}
      width={560}
    >
      <div style={G2}>
        <F
          label="Asset Name *"
          k="name"
          placeholder="e.g. MacBook Pro 16-inch"
          span
        />
        <F
          label="Category"
          k="cat"
          opts={Object.keys(CC).map((c) => ({ v: c, l: c }))}
        />
        <F
          label="Condition"
          k="condition"
          opts={["New", "Good", "Fair", "Poor"].map((c) => ({ v: c, l: c }))}
        />
        <F label="Serial Number" k="serial" placeholder="e.g. C02XL0HF" />
        <F label="Location" k="loc" placeholder="e.g. Floor 3" />
        <F label="Purchase Cost (₮)" k="cost" type="number" placeholder="0" />
        <F
          label="Residual Value (₮)"
          k="residual"
          type="number"
          placeholder="0"
        />
        <F label="Useful Life (years)" k="life" type="number" placeholder="4" />
        <F label="Purchase Date" k="purchased" type="date" />
        <F
          label="Current Book Value (₮)"
          k="val"
          type="number"
          placeholder="0"
        />
      </div>
      <div
        style={{
          display: "flex",
          gap: 10,
          justifyContent: "flex-end",
          marginTop: 8,
        }}
      >
        <Btn onClick={onClose}>Cancel</Btn>
        <Btn
          dark
          onClick={() => onSave(f)}
          disabled={!f.name}
          loading={saving}
          icon={IC.check}
        >
          {ie ? "Save Changes" : "Register Asset"}
        </Btn>
      </div>
    </Modal>
  );
}

function AssetDetailModal({ asset, onClose, onEdit }) {
  const bv = depB(asset);
  const ann = depA(asset);
  const pct = asset.cost > 0 ? Math.round((bv / asset.cost) * 100) : 0;
  return (
    <Modal title={asset.name} onClose={onClose} width={520}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px 24px",
          marginBottom: 18,
        }}
      >
        {[
          ["Asset Tag", asset.id, true],
          ["Serial", asset.serial, true],
          ["Category", asset.cat, false],
          ["Condition", asset.condition, false],
          ["Location", asset.loc, false],
          ["Warehouse", asset.wh, false],
          ["Purchase Cost", fmtF(asset.cost), true],
          ["Annual Depr.", fmtV(ann), true],
          ["Book Value", fmtV(bv), true],
          ["Purchased", asset.purchased, false],
          ["Assigned To", asset.assignee || "—", false],
        ].map(([l, v, mono]) => (
          <div key={l}>
            <div
              style={{
                fontSize: 10.5,
                fontWeight: 600,
                color: T.textDim,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: 3,
              }}
            >
              {l}
            </div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: T.text,
                fontFamily: mono ? "monospace" : "inherit",
              }}
            >
              {v}
            </div>
          </div>
        ))}
        <div>
          <div
            style={{
              fontSize: 10.5,
              fontWeight: 600,
              color: T.textDim,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: 3,
            }}
          >
            Status
          </div>
          <Chip status={asset.status} />
        </div>
      </div>
      <div
        style={{
          background: "#FAFAFA",
          borderRadius: 8,
          padding: "12px 14px",
          marginBottom: 14,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 6,
          }}
        >
          <span style={{ fontSize: 12, color: T.textMid }}>
            Remaining value ({pct}%)
          </span>
          <span style={{ fontSize: 12, fontWeight: 600, color: T.text }}>
            {fmtV(bv)} / {fmtV(asset.cost)}
          </span>
        </div>
        <div
          style={{
            height: 6,
            background: T.border,
            borderRadius: 99,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              borderRadius: 99,
              background: pct > 50 ? T.green : pct > 20 ? T.orange : T.red,
              width: pct + "%",
              transition: "width .8s",
            }}
          />
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <Btn onClick={onClose}>Close</Btn>
        <Btn dark onClick={() => onEdit(asset)} icon={IC.edit}>
          Edit Asset
        </Btn>
      </div>
    </Modal>
  );
}

function QRModal({ asset, onClose, toast }) {
  const seed = asset.id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const cells = Array.from(
    { length: 49 },
    (_, i) => (seed * i * 7 + i * 3 + seed) % 11 > 4,
  );
  return (
    <Modal title={`QR Label — ${asset.id}`} onClose={onClose} width={340}>
      <div style={{ textAlign: "center", padding: "8px 0 16px" }}>
        <div
          style={{
            background: "#fff",
            border: `1px solid ${T.border}`,
            borderRadius: 10,
            padding: 20,
            display: "inline-block",
            marginBottom: 12,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7,10px)",
              gap: 1,
              marginBottom: 8,
            }}
          >
            {cells.map((on, i) => (
              <div
                key={i}
                style={{
                  width: 10,
                  height: 10,
                  background: on ? "#111" : "#fff",
                  borderRadius: 1,
                }}
              />
            ))}
          </div>
          <div
            style={{
              fontSize: 10,
              fontFamily: "monospace",
              color: T.textMid,
              textAlign: "center",
            }}
          >
            {asset.id}
          </div>
          <div style={{ fontSize: 9, color: T.textDim, marginTop: 2 }}>
            {asset.name}
          </div>
        </div>
        <div style={{ fontSize: 12, color: T.textDim, marginBottom: 16 }}>
          {asset.serial} · {asset.cat} · {asset.condition}
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          <Btn
            onClick={() => {
              toast("QR label PDF downloaded");
              onClose();
            }}
            dark
            icon={IC.dl}
          >
            Download PDF
          </Btn>
          <Btn onClick={() => onClose()}>Close</Btn>
        </div>
      </div>
    </Modal>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   ASSIGNMENTS PAGE
═══════════════════════════════════════════════════════════════════════ */
function AssignmentsPage({
  assets,
  setAssets,
  assignments,
  setAssignments,
  toast,
  auditLog,
  setAuditLog,
}) {
  const [tab, setTab] = useState("pending");
  const [newOpen, setNewOpen] = useState(false);
  const [signModal, setSignModal] = useState(null);
  const [returnModal, setReturnModal] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleAssign = (form) => {
    setSaving(true);
    setTimeout(() => {
      setAssets((p) =>
        p.map((a) =>
          a.id === form.assetId
            ? { ...a, status: "Assigned", assignee: form.employee }
            : a,
        ),
      );
      const newAsg = {
        id: `ASG-${Date.now()}`,
        assetId: form.assetId,
        assetName: assets.find((a) => a.id === form.assetId)?.name || "",
        employee: form.employee,
        email: EMPLOYEES.find((e) => e.name === form.employee)?.email || "",
        assignedAt: new Date().toISOString().slice(0, 16).replace("T", " "),
        expiry: new Date(Date.now() + 72 * 36e5)
          .toISOString()
          .slice(0, 16)
          .replace("T", " "),
        signed: false,
      };
      setAssignments((p) => [newAsg, ...p]);
      setAuditLog((p) =>
        addLog(
          p,
          "assignments",
          newAsg.id,
          "CREATE",
          `Assigned to ${form.employee}`,
        ),
      );
      toast(`Assignment created — e-sign link sent to ${form.employee}`);
      setSaving(false);
      setNewOpen(false);
    }, 600);
  };

  const handleSign = (asgId, employeeName) => {
    setAssignments((p) =>
      p.map((a) => (a.id === asgId ? { ...a, signed: true } : a)),
    );
    setAuditLog((p) =>
      addLog(
        p,
        "assignments",
        asgId,
        "UPDATE",
        "E-signature recorded — assignment confirmed",
      ),
    );
    toast(`Assignment signed by ${employeeName}`);
    setSignModal(null);
  };

  const handleReturn = (assetId, condition) => {
    setAssets((p) =>
      p.map((a) =>
        a.id === assetId
          ? { ...a, status: "Available", assignee: null, condition }
          : a,
      ),
    );
    setAuditLog((p) =>
      addLog(
        p,
        "assets",
        assetId,
        "UPDATE",
        `Returned · condition: ${condition}`,
      ),
    );
    const needsWipe = ["Laptop", "Phone", "Tablet"].includes(
      assets.find((a) => a.id === assetId)?.cat,
    );
    toast(
      `Asset returned${needsWipe ? " — data wipe task created for IT Admin" : ""}`,
    );
    setReturnModal(null);
  };

  const handleResend = (asg) => {
    toast(`E-sign link re-sent to ${asg.employee}`);
  };

  const assigned = assets.filter((a) => a.status === "Assigned");

  return (
    <div className="page" style={{ padding: "28px 28px 50px", maxWidth: 1100 }}>
      {newOpen && (
        <AssignForm
          assets={assets}
          onSave={handleAssign}
          onClose={() => setNewOpen(false)}
          saving={saving}
        />
      )}
      {signModal && (
        <ESignModal
          asg={signModal}
          onSign={handleSign}
          onClose={() => setSignModal(null)}
        />
      )}
      {returnModal && (
        <ReturnModal
          asset={returnModal}
          onReturn={handleReturn}
          onClose={() => setReturnModal(null)}
        />
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 22,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: T.text,
              letterSpacing: "-0.02em",
            }}
          >
            Assignments
          </h1>
          <p style={{ fontSize: 13, color: T.textDim, marginTop: 3 }}>
            Digital assignment with e-signature acknowledgment (72hr JWT link)
          </p>
        </div>
        <Btn dark onClick={() => setNewOpen(true)} icon={IC.plus}>
          New Assignment
        </Btn>
      </div>

      <div
        style={{
          display: "flex",
          gap: 0,
          borderBottom: `1px solid ${T.border}`,
          marginBottom: 20,
        }}
      >
        {[
          ["pending", "E-Sign Pending"],
          ["active", "Active Assignments"],
          ["history", "All Assignments"],
        ].map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            style={{
              padding: "9px 18px",
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: tab === id ? 600 : 400,
              color: tab === id ? T.text : T.textDim,
              borderBottom: `2px solid ${tab === id ? T.dark : "transparent"}`,
              marginBottom: -1,
              transition: "all .15s",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "pending" && (
        <>
          {assignments.filter((a) => !a.signed).length > 0 && (
            <div
              style={{
                background: "#FFFBEB",
                border: `1px solid #FDE68A`,
                borderRadius: 9,
                padding: "12px 16px",
                marginBottom: 16,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span style={{ fontSize: 16 }}>⏳</span>
              <div>
                <div
                  style={{ fontSize: 13, fontWeight: 600, color: "#92400E" }}
                >
                  {assignments.filter((a) => !a.signed).length} assignment(s)
                  awaiting e-signature
                </div>
                <div style={{ fontSize: 12, color: "#B45309" }}>
                  Links expire after 72 hours. Resend from the Actions column.
                </div>
              </div>
            </div>
          )}
          <Card
            s={{ padding: 0, overflow: "hidden" }}
            c={
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr
                    style={{
                      background: "#FAFAFA",
                      borderBottom: `1px solid ${T.border}`,
                    }}
                  >
                    {[
                      "ID",
                      "Asset",
                      "Employee",
                      "Sent",
                      "Expiry",
                      "Signature",
                      "Actions",
                    ].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "10px 14px",
                          textAlign: "left",
                          fontSize: 11,
                          fontWeight: 600,
                          color: T.textDim,
                          letterSpacing: "0.04em",
                          textTransform: "uppercase",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {assignments.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        style={{
                          padding: "40px 0",
                          textAlign: "center",
                          color: T.textDim,
                          fontSize: 13,
                        }}
                      >
                        No assignments yet
                      </td>
                    </tr>
                  ) : (
                    assignments.map((a, i) => (
                      <tr
                        key={a.id}
                        className="rh"
                        style={{
                          borderBottom:
                            i < assignments.length - 1
                              ? `1px solid ${T.border}40`
                              : "none",
                        }}
                      >
                        <td style={{ padding: "11px 14px" }}>
                          <span
                            style={{
                              fontFamily: "monospace",
                              fontSize: 11,
                              color: T.textMid,
                              background: "#F3F4F6",
                              padding: "2px 6px",
                              borderRadius: 4,
                            }}
                          >
                            {a.id}
                          </span>
                        </td>
                        <td style={{ padding: "11px 14px" }}>
                          <div
                            style={{
                              fontSize: 13,
                              fontWeight: 500,
                              color: T.text,
                            }}
                          >
                            {a.assetName}
                          </div>
                          <div
                            style={{
                              fontSize: 11,
                              color: T.textDim,
                              fontFamily: "monospace",
                            }}
                          >
                            {a.assetId}
                          </div>
                        </td>
                        <td style={{ padding: "11px 14px" }}>
                          <div style={{ fontSize: 13, color: T.text }}>
                            {a.employee}
                          </div>
                          <div style={{ fontSize: 11, color: T.textDim }}>
                            {a.email}
                          </div>
                        </td>
                        <td
                          style={{
                            padding: "11px 14px",
                            fontSize: 11.5,
                            color: T.textDim,
                            fontFamily: "monospace",
                          }}
                        >
                          {a.assignedAt}
                        </td>
                        <td
                          style={{
                            padding: "11px 14px",
                            fontSize: 11.5,
                            color: a.signed ? T.textDim : T.orange,
                            fontFamily: "monospace",
                          }}
                        >
                          {a.expiry}
                        </td>
                        <td style={{ padding: "11px 14px" }}>
                          {a.signed ? (
                            <span
                              style={{
                                background: T.greenBg,
                                color: T.green,
                                padding: "3px 9px",
                                borderRadius: 6,
                                fontSize: 11.5,
                                fontWeight: 500,
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 4,
                              }}
                            >
                              {IC.check} Signed
                            </span>
                          ) : (
                            <span
                              style={{
                                background: T.orangeBg,
                                color: T.orange,
                                padding: "3px 9px",
                                borderRadius: 6,
                                fontSize: 11.5,
                                fontWeight: 500,
                              }}
                            >
                              ⏳ Pending
                            </span>
                          )}
                        </td>
                        <td style={{ padding: "11px 10px" }}>
                          <div style={{ display: "flex", gap: 5 }}>
                            {!a.signed && (
                              <Btn
                                onClick={() => setSignModal(a)}
                                icon={IC.sign}
                                style={{ fontSize: 11, padding: "4px 10px" }}
                              >
                                Sign
                              </Btn>
                            )}
                            {!a.signed && (
                              <Btn
                                onClick={() => handleResend(a)}
                                icon={IC.refresh}
                                style={{ fontSize: 11, padding: "4px 10px" }}
                              >
                                Resend
                              </Btn>
                            )}
                            {a.signed && (
                              <Btn
                                onClick={() =>
                                  toast("Acknowledgment PDF downloaded")
                                }
                                icon={IC.pdf}
                                style={{ fontSize: 11, padding: "4px 10px" }}
                              >
                                PDF
                              </Btn>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            }
          />
        </>
      )}

      {tab === "active" && (
        <Card
          s={{ padding: 0, overflow: "hidden" }}
          c={
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr
                  style={{
                    background: "#FAFAFA",
                    borderBottom: `1px solid ${T.border}`,
                  }}
                >
                  {[
                    "Asset Tag",
                    "Asset Name",
                    "Employee",
                    "Dept",
                    "Assigned Date",
                    "Condition",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "10px 14px",
                        textAlign: "left",
                        fontSize: 11,
                        fontWeight: 600,
                        color: T.textDim,
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {assigned.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      style={{
                        padding: "40px 0",
                        textAlign: "center",
                        color: T.textDim,
                        fontSize: 13,
                      }}
                    >
                      No active assignments
                    </td>
                  </tr>
                ) : (
                  assigned.map((a, i) => {
                    const emp = EMPLOYEES.find((e) => e.name === a.assignee);
                    return (
                      <tr
                        key={a.id}
                        className="rh"
                        style={{
                          borderBottom:
                            i < assigned.length - 1
                              ? `1px solid ${T.border}40`
                              : "none",
                        }}
                      >
                        <td style={{ padding: "11px 14px" }}>
                          <span
                            style={{
                              fontFamily: "monospace",
                              fontSize: 12,
                              color: T.textMid,
                              background: "#F3F4F6",
                              padding: "2px 7px",
                              borderRadius: 4,
                            }}
                          >
                            {a.id}
                          </span>
                        </td>
                        <td
                          style={{
                            padding: "11px 14px",
                            fontSize: 13,
                            fontWeight: 500,
                            color: T.text,
                          }}
                        >
                          {a.name}
                        </td>
                        <td style={{ padding: "11px 14px" }}>
                          <div style={{ fontSize: 13, color: T.text }}>
                            {a.assignee}
                          </div>
                          <div style={{ fontSize: 11, color: T.textDim }}>
                            {emp?.email || "—"}
                          </div>
                        </td>
                        <td
                          style={{
                            padding: "11px 14px",
                            fontSize: 12.5,
                            color: T.textMid,
                          }}
                        >
                          {emp?.dept || "—"}
                        </td>
                        <td
                          style={{
                            padding: "11px 14px",
                            fontSize: 12,
                            color: T.textDim,
                            fontFamily: "monospace",
                          }}
                        >
                          {a.purchased || "2026-03-14"}
                        </td>
                        <td style={{ padding: "11px 14px" }}>
                          <Chip status={a.condition || "Good"} />
                        </td>
                        <td style={{ padding: "11px 10px" }}>
                          <Btn
                            onClick={() => setReturnModal(a)}
                            style={{ fontSize: 11, padding: "4px 10px" }}
                            icon={IC.offb}
                          >
                            Return
                          </Btn>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          }
        />
      )}

      {tab === "history" && (
        <Card
          s={{ padding: 0, overflow: "hidden" }}
          c={
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr
                  style={{
                    background: "#FAFAFA",
                    borderBottom: `1px solid ${T.border}`,
                  }}
                >
                  {[
                    "ID",
                    "Asset",
                    "Employee",
                    "Assigned",
                    "Expiry",
                    "Signed",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "10px 14px",
                        textAlign: "left",
                        fontSize: 11,
                        fontWeight: 600,
                        color: T.textDim,
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {assignments.map((a, i) => (
                  <tr
                    key={a.id}
                    className="rh"
                    style={{
                      borderBottom:
                        i < assignments.length - 1
                          ? `1px solid ${T.border}40`
                          : "none",
                    }}
                  >
                    <td style={{ padding: "11px 14px" }}>
                      <span
                        style={{
                          fontFamily: "monospace",
                          fontSize: 11,
                          color: T.textMid,
                          background: "#F3F4F6",
                          padding: "2px 6px",
                          borderRadius: 4,
                        }}
                      >
                        {a.id}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "11px 14px",
                        fontSize: 13,
                        fontWeight: 500,
                        color: T.text,
                      }}
                    >
                      {a.assetName}
                    </td>
                    <td
                      style={{
                        padding: "11px 14px",
                        fontSize: 13,
                        color: T.text,
                      }}
                    >
                      {a.employee}
                    </td>
                    <td
                      style={{
                        padding: "11px 14px",
                        fontSize: 11.5,
                        color: T.textDim,
                        fontFamily: "monospace",
                      }}
                    >
                      {a.assignedAt}
                    </td>
                    <td
                      style={{
                        padding: "11px 14px",
                        fontSize: 11.5,
                        color: T.textDim,
                        fontFamily: "monospace",
                      }}
                    >
                      {a.expiry}
                    </td>
                    <td style={{ padding: "11px 14px" }}>
                      {a.signed ? (
                        <span
                          style={{
                            background: T.greenBg,
                            color: T.green,
                            padding: "3px 9px",
                            borderRadius: 6,
                            fontSize: 11.5,
                            fontWeight: 500,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          {IC.check} Signed
                        </span>
                      ) : (
                        <span
                          style={{
                            background: T.orangeBg,
                            color: T.orange,
                            padding: "3px 9px",
                            borderRadius: 6,
                            fontSize: 11.5,
                            fontWeight: 500,
                          }}
                        >
                          Pending
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          }
        />
      )}
    </div>
  );
}

function AssignForm({ assets, onSave, onClose, saving }) {
  const [f, setF] = useState({ assetId: "", employee: "", notes: "" });
  const s = (k, v) => setF((p) => ({ ...p, [k]: v }));
  const avail = assets.filter((a) => a.status === "Available");
  const selA = avail.find((a) => a.id === f.assetId);
  const conflict =
    f.employee && selA
      ? assets.filter(
          (a) =>
            a.assignee === f.employee &&
            a.cat === selA.cat &&
            a.status === "Assigned",
        )
      : [];
  return (
    <Modal title="New Assignment" onClose={onClose} width={500}>
      <div style={{ marginBottom: 14 }}>
        <Lbl>Select Asset (Available only)</Lbl>
        <Sel
          val={f.assetId}
          set={(v) => s("assetId", v)}
          opts={[
            { v: "", l: "— Select asset —" },
            ...avail.map((a) => ({ v: a.id, l: `${a.id} — ${a.name}` })),
          ]}
        />
      </div>
      <div style={{ marginBottom: 14 }}>
        <Lbl>Assign To</Lbl>
        <Sel
          val={f.employee}
          set={(v) => s("employee", v)}
          opts={[
            { v: "", l: "— Select employee —" },
            ...EMPLOYEES.filter((e) => e.status === "ACTIVE").map((e) => ({
              v: e.name,
              l: `${e.name} (${e.dept})`,
            })),
          ]}
        />
      </div>
      {conflict.length > 0 && (
        <div
          style={{
            background: T.orangeBg,
            border: `1px solid ${T.orange}30`,
            borderRadius: 8,
            padding: "10px 14px",
            marginBottom: 14,
          }}
        >
          <div
            style={{
              fontSize: 12.5,
              fontWeight: 600,
              color: T.orange,
              marginBottom: 2,
            }}
          >
            ⚠ Category Conflict Detected
          </div>
          <div style={{ fontSize: 12, color: T.orange }}>
            {f.employee} already holds a {selA?.cat}: {conflict[0]?.name}
          </div>
        </div>
      )}
      <div style={{ marginBottom: 14 }}>
        <Lbl>Notes</Lbl>
        <textarea
          value={f.notes}
          onChange={(e) => s("notes", e.target.value)}
          rows={2}
          placeholder="Accessories included, handover notes…"
          style={{
            width: "100%",
            padding: "9px 12px",
            fontSize: 13,
            border: `1px solid ${T.border}`,
            borderRadius: 7,
            resize: "none",
            outline: "none",
            color: T.text,
          }}
        />
      </div>
      <div
        style={{
          background: T.blueBg,
          border: `1px solid ${T.blue}30`,
          borderRadius: 8,
          padding: "10px 14px",
          marginBottom: 16,
          fontSize: 12,
          color: T.blue,
        }}
      >
        ✉ A 72-hour e-sign link will be sent to the employee&apos;s email
        automatically.
      </div>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <Btn onClick={onClose}>Cancel</Btn>
        <Btn
          dark
          onClick={() => onSave(f)}
          disabled={!f.assetId || !f.employee}
          loading={saving}
          icon={IC.sign}
        >
          Create & Send E-Sign Link
        </Btn>
      </div>
    </Modal>
  );
}

function ESignModal({ asg, onSign, onClose }) {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);
  const match =
    typed.trim().toLowerCase() === asg.employee.trim().toLowerCase();
  const handleSign = () => {
    setDone(true);
    setTimeout(() => onSign(asg.id, asg.employee), 800);
  };
  return (
    <Modal title="Electronic Acknowledgment" onClose={onClose} width={480}>
      {!done ? (
        <>
          <div
            style={{
              background: "#FAFAFA",
              borderRadius: 9,
              padding: "14px 16px",
              marginBottom: 16,
              fontSize: 13,
              color: T.textMid,
              lineHeight: 1.6,
            }}
          >
            I acknowledge receipt of{" "}
            <strong style={{ color: T.text }}>{asg.assetName}</strong> (
            {asg.assetId}) assigned on {asg.assignedAt.slice(0, 10)}. I agree to
            take responsibility for this company asset and return it upon
            request.
          </div>
          <div style={{ marginBottom: 16 }}>
            <Lbl>Type your full name to sign *</Lbl>
            <Inp val={typed} set={setTyped} placeholder={asg.employee} />
            {typed && !match && (
              <div style={{ fontSize: 11.5, color: T.red, marginTop: 4 }}>
                Name must exactly match: {asg.employee}
              </div>
            )}
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn onClick={onClose}>Cancel</Btn>
            <Btn dark onClick={handleSign} disabled={!match} icon={IC.sign}>
              Sign & Confirm
            </Btn>
          </div>
        </>
      ) : (
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: T.greenBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              margin: "0 auto 12px",
              animation: "scaleIn .3s ease",
            }}
          >
            ✅
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: T.green }}>
            Signed by {typed}
          </div>
          <div style={{ fontSize: 12, color: T.textDim, marginTop: 4 }}>
            PDF stored in R2 ·{" "}
            {new Date().toISOString().slice(0, 16).replace("T", " ")}
          </div>
        </div>
      )}
    </Modal>
  );
}

function ReturnModal({ asset, onReturn, onClose }) {
  const [cond, setCond] = useState("Good");
  const [notes, setNotes] = useState("");
  const needsWipe = ["Laptop", "Phone", "Tablet"].includes(asset.cat);
  return (
    <Modal title={`Return Asset — ${asset.id}`} onClose={onClose} width={420}>
      <div
        style={{
          background: "#FAFAFA",
          borderRadius: 9,
          padding: "12px 14px",
          marginBottom: 14,
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 500, color: T.text }}>
          {asset.name}
        </div>
        <div style={{ fontSize: 12, color: T.textDim, marginTop: 2 }}>
          Currently assigned to <strong>{asset.assignee}</strong>
        </div>
      </div>
      <div style={{ marginBottom: 14 }}>
        <Lbl>Condition at Return</Lbl>
        <Sel
          val={cond}
          set={setCond}
          opts={["Good", "Fair", "Damaged", "Lost"].map((c) => ({
            v: c,
            l: c,
          }))}
        />
      </div>
      <div style={{ marginBottom: 14 }}>
        <Lbl>Notes (optional)</Lbl>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          placeholder="Any damage, missing accessories…"
          style={{
            width: "100%",
            padding: "9px 12px",
            fontSize: 13,
            border: `1px solid ${T.border}`,
            borderRadius: 7,
            resize: "none",
            outline: "none",
            color: T.text,
          }}
        />
      </div>
      {needsWipe && (
        <div
          style={{
            background: T.blueBg,
            border: `1px solid ${T.blue}30`,
            borderRadius: 8,
            padding: "10px 14px",
            marginBottom: 14,
            fontSize: 12,
            color: T.blue,
          }}
        >
          💾 A data wipe task will be auto-created for IT Admin upon return.
        </div>
      )}
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <Btn onClick={onClose}>Cancel</Btn>
        <Btn dark onClick={() => onReturn(asset.id, cond)} icon={IC.check}>
          Confirm Return
        </Btn>
      </div>
    </Modal>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   CENSUS PAGE
═══════════════════════════════════════════════════════════════════════ */
function CensusPage({ toast, auditLog, setAuditLog }) {
  const [events, setEvents] = useState(INIT_CENSUS);
  const [tasks, setTasks] = useState(INIT_TASKS);
  const [selId, setSelId] = useState("CEN-001");
  const [createOpen, setCreateOpen] = useState(false);
  const [scanOpen, setScanOpen] = useState(false);
  const [scanPhase, setScanPhase] = useState("idle");
  const [scanResult, setScanResult] = useState(null);
  const [scanVCount, setScanVCount] = useState(0);

  const evt = events.find((e) => e.id === selId);
  const evtTasks = tasks.filter((t) => t.census === selId);
  const verified = evtTasks.filter((t) => t.verified).length;
  const pct =
    evtTasks.length > 0 ? Math.round((verified / evtTasks.length) * 100) : 0;

  const handleVerify = (taskId, cond = "Good") => {
    const task = tasks.find((t) => t.id === taskId);
    setTasks((p) =>
      p.map((t) =>
        t.id === taskId
          ? {
              ...t,
              verified: true,
              verifiedAt: new Date().toISOString().slice(0, 10),
              condition: cond,
              discrepancy: false,
            }
          : t,
      ),
    );
    setEvents((p) =>
      p.map((e) =>
        e.id === selId
          ? {
              ...e,
              verified: e.verified + 1,
              pending: Math.max(0, e.pending - 1),
            }
          : e,
      ),
    );
    setAuditLog((p) =>
      addLog(
        p,
        "census_tasks",
        taskId,
        "UPDATE",
        `Census task verified: ${task?.assetName}`,
      ),
    );
    toast(`${task?.assetName} verified in census`);
  };

  const handleResolveDiscrepancy = (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    setTasks((p) =>
      p.map((t) =>
        t.id === taskId
          ? {
              ...t,
              discrepancy: false,
              verified: true,
              verifiedAt: new Date().toISOString().slice(0, 10),
              condition: "Good",
            }
          : t,
      ),
    );
    setEvents((p) =>
      p.map((e) =>
        e.id === selId
          ? {
              ...e,
              discrepancy: Math.max(0, e.discrepancy - 1),
              verified: e.verified + 1,
            }
          : e,
      ),
    );
    toast(`Discrepancy resolved for ${task?.assetName}`);
  };

  const startScan = () => {
    setScanOpen(true);
    setScanPhase("scanning");
    setScanResult(null);
    setTimeout(() => {
      const pending = evtTasks.filter((t) => !t.verified && !t.discrepancy);
      setScanResult(pending[0] || null);
      setScanPhase(pending[0] ? "found" : "notFound");
    }, 2200);
  };

  const handleScanVerify = () => {
    if (scanResult) {
      handleVerify(scanResult.id);
      setScanVCount((c) => c + 1);
      setScanPhase("verified");
    }
  };

  const handleScanNext = () => {
    setScanPhase("scanning");
    setScanResult(null);
    setTimeout(() => {
      const pending = evtTasks.filter((t) => !t.verified && !t.discrepancy);
      setScanResult(pending[0] || null);
      setScanPhase(pending[0] ? "found" : "notFound");
    }, 1800);
  };

  const handleCreateCensus = (form) => {
    const id = `CEN-00${events.length + 1}`;
    setEvents((p) => [
      ...p,
      {
        ...form,
        id,
        status: "Active",
        total: 0,
        verified: 0,
        pending: 0,
        discrepancy: 0,
      },
    ]);
    setAuditLog((p) =>
      addLog(p, "census_events", id, "CREATE", `Census created: ${form.name}`),
    );
    toast("Census created — tasks auto-generated");
    setCreateOpen(false);
  };

  return (
    <div className="page" style={{ padding: "28px 28px 50px", maxWidth: 1100 }}>
      {createOpen && (
        <CreateCensusModal
          onSave={handleCreateCensus}
          onClose={() => setCreateOpen(false)}
        />
      )}
      {scanOpen && (
        <Modal
          title={`QR Census Scanner — ${scanVCount} verified`}
          onClose={() => {
            setScanOpen(false);
            setScanPhase("idle");
          }}
          width={370}
        >
          {scanPhase === "scanning" && (
            <>
              <div
                style={{
                  position: "relative",
                  background: "#111",
                  borderRadius: 12,
                  overflow: "hidden",
                  aspectRatio: "1",
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                      "repeating-linear-gradient(0deg,transparent,transparent 20px,rgba(255,255,255,.03) 20px,rgba(255,255,255,.03) 21px),repeating-linear-gradient(90deg,transparent,transparent 20px,rgba(255,255,255,.03) 20px,rgba(255,255,255,.03) 21px)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{ width: 160, height: 160, position: "relative" }}
                  >
                    {[
                      { top: 0, left: 0, t: true, l: true },
                      { top: 0, right: 0, t: true, r: true },
                      { bottom: 0, left: 0, b: true, l: true },
                      { bottom: 0, right: 0, b: true, r: true },
                    ].map((pos, j) => (
                      <div
                        key={j}
                        style={{
                          position: "absolute",
                          width: 24,
                          height: 24,
                          ...pos,
                          borderTop: pos.t ? "3px solid #3B82F6" : "none",
                          borderBottom: pos.b ? "3px solid #3B82F6" : "none",
                          borderLeft: pos.l ? "3px solid #3B82F6" : "none",
                          borderRight: pos.r ? "3px solid #3B82F6" : "none",
                        }}
                      />
                    ))}
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        height: 2,
                        background:
                          "linear-gradient(90deg,transparent,#3B82F6,transparent)",
                        boxShadow: "0 0 10px #3B82F6",
                        animation: "scanPulse 2s ease infinite",
                        top: "50%",
                      }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: "linear-gradient(transparent,rgba(0,0,0,.8))",
                    padding: "16px",
                    textAlign: "center",
                  }}
                >
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,.7)" }}>
                    ⚡ Scanning… align QR code within frame
                  </span>
                </div>
              </div>
              <div
                style={{ textAlign: "center", color: T.textDim, fontSize: 13 }}
              >
                Looking for unverified assets…
              </div>
            </>
          )}
          {scanPhase === "found" && scanResult && (
            <>
              <div
                style={{
                  background: T.greenBg,
                  border: `1px solid ${T.green}30`,
                  borderRadius: 10,
                  padding: 16,
                  marginBottom: 14,
                }}
              >
                <div
                  style={{ fontSize: 12, color: T.textDim, marginBottom: 3 }}
                >
                  QR Code Detected
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: T.text }}>
                  {scanResult.assetName}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontFamily: "monospace",
                    color: T.textMid,
                    marginTop: 2,
                  }}
                >
                  {scanResult.assetId}
                </div>
              </div>
              <div style={{ marginBottom: 14 }}>
                <Lbl>Condition at Scan</Lbl>
                <Sel
                  val="Good"
                  set={() => {}}
                  opts={["Good", "Fair", "Damaged"].map((c) => ({
                    v: c,
                    l: c,
                  }))}
                />
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <Btn dark onClick={handleScanVerify} icon={IC.check} full>
                  Mark Verified
                </Btn>
                <Btn onClick={handleScanNext}>Skip</Btn>
              </div>
            </>
          )}
          {scanPhase === "notFound" && (
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <div style={{ fontSize: 40, marginBottom: 10 }}>✅</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: T.text }}>
                No more pending assets
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: T.textDim,
                  marginTop: 4,
                  marginBottom: 20,
                }}
              >
                All tasks in this census have been addressed
              </div>
              <Btn dark onClick={() => setScanOpen(false)} icon={IC.check}>
                Done
              </Btn>
            </div>
          )}
          {scanPhase === "verified" && (
            <div style={{ textAlign: "center", padding: "16px 0" }}>
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: T.greenBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                  margin: "0 auto 12px",
                }}
              >
                ✅
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: T.text }}>
                Verified!
              </div>
              <div
                style={{
                  fontSize: 12.5,
                  color: T.textDim,
                  marginTop: 3,
                  marginBottom: 4,
                }}
              >
                {scanResult?.assetName}
              </div>
              <div style={{ fontSize: 11, color: T.textDim, marginBottom: 20 }}>
                {scanVCount} verified this session
              </div>
              <div
                style={{ display: "flex", gap: 10, justifyContent: "center" }}
              >
                <Btn dark onClick={handleScanNext}>
                  Scan Next →
                </Btn>
                <Btn onClick={() => setScanOpen(false)}>Done</Btn>
              </div>
            </div>
          )}
        </Modal>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 22,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: T.text,
              letterSpacing: "-0.02em",
            }}
          >
            Census
          </h1>
          <p style={{ fontSize: 13, color: T.textDim, marginTop: 3 }}>
            Mobile QR-scan asset verification campaigns
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn onClick={startScan} icon={IC.qr}>
            Start QR Scan
          </Btn>
          <Btn dark onClick={() => setCreateOpen(true)} icon={IC.plus}>
            New Census
          </Btn>
        </div>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "268px 1fr", gap: 16 }}
      >
        <div>
          {events.map((ev) => (
            <Card
              key={ev.id}
              className="ch"
              onClick={() => setSelId(ev.id)}
              s={{
                padding: "14px 16px",
                marginBottom: 10,
                cursor: "pointer",
                border: `1.5px solid ${selId === ev.id ? T.dark : T.border}`,
                transition: "border-color .15s,transform .18s,box-shadow .18s",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 6,
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: T.text,
                    flex: 1,
                    marginRight: 8,
                    lineHeight: 1.3,
                  }}
                >
                  {ev.name}
                </div>
                <Chip status={ev.status} />
              </div>
              <div
                style={{ fontSize: 11.5, color: T.textDim, marginBottom: 8 }}
              >
                {ev.scope} · {ev.deadline}
              </div>
              {ev.total > 0 && (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 11,
                      color: T.textDim,
                      marginBottom: 4,
                    }}
                  >
                    <span>
                      {ev.verified}/{ev.total} verified
                    </span>
                    <span style={{ fontWeight: 600, color: T.text }}>
                      {Math.round((ev.verified / ev.total) * 100)}%
                    </span>
                  </div>
                  <div
                    style={{
                      height: 3,
                      background: "#F3F4F6",
                      borderRadius: 99,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        background: ev.discrepancy > 0 ? T.orange : T.green,
                        borderRadius: 99,
                        width: Math.round((ev.verified / ev.total) * 100) + "%",
                        transition: "width .6s",
                      }}
                    />
                  </div>
                </>
              )}
            </Card>
          ))}
        </div>

        {evt && (
          <Card
            s={{ padding: 0, overflow: "hidden" }}
            c={
              <>
                <div
                  style={{
                    padding: "14px 18px",
                    borderBottom: `1px solid ${T.border}`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div
                      style={{ fontSize: 14, fontWeight: 600, color: T.text }}
                    >
                      {evt.name}
                    </div>
                    <div
                      style={{ fontSize: 12, color: T.textDim, marginTop: 2 }}
                    >
                      {evt.scope} scope · Deadline: {evt.deadline}
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", gap: 8, alignItems: "center" }}
                  >
                    <Chip status={evt.status} />
                    {evt.status === "Active" && (
                      <Btn
                        onClick={() => toast("Census report PDF generated")}
                        icon={IC.pdf}
                        style={{ fontSize: 11, padding: "5px 10px" }}
                      >
                        Report
                      </Btn>
                    )}
                  </div>
                </div>
                {evt.total > 0 && (
                  <div
                    style={{
                      padding: "12px 18px",
                      borderBottom: `1px solid ${T.border}`,
                      background: "#FAFAFA",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 8,
                      }}
                    >
                      <div style={{ display: "flex", gap: 20 }}>
                        {[
                          { l: "Verified", v: evt.verified, c: T.green },
                          {
                            l: "Pending",
                            v: evt.total - evt.verified - evt.discrepancy,
                            c: T.orange,
                          },
                          { l: "Discrepancy", v: evt.discrepancy, c: T.red },
                        ].map((s) => (
                          <span
                            key={s.l}
                            style={{ fontSize: 12, color: T.textMid }}
                          >
                            {s.l}: <strong style={{ color: s.c }}>{s.v}</strong>
                          </span>
                        ))}
                      </div>
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color:
                            pct === 100
                              ? T.green
                              : pct > 50
                                ? T.blue
                                : T.orange,
                        }}
                      >
                        {pct}%
                      </span>
                    </div>
                    <div
                      style={{
                        height: 5,
                        background: T.border,
                        borderRadius: 99,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          borderRadius: 99,
                          background: pct === 100 ? T.green : T.blue,
                          width: pct + "%",
                          transition: "width .6s",
                        }}
                      />
                    </div>
                  </div>
                )}
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr
                      style={{
                        background: "#FAFAFA",
                        borderBottom: `1px solid ${T.border}`,
                      }}
                    >
                      {[
                        "Asset",
                        "Assigned To",
                        "Status",
                        "Verified At",
                        "Condition",
                        "Actions",
                      ].map((h) => (
                        <th
                          key={h}
                          style={{
                            padding: "9px 14px",
                            textAlign: "left",
                            fontSize: 11,
                            fontWeight: 600,
                            color: T.textDim,
                            letterSpacing: "0.04em",
                            textTransform: "uppercase",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {evtTasks.map((t, i) => (
                      <tr
                        key={t.id}
                        className="rh"
                        style={{
                          borderBottom:
                            i < evtTasks.length - 1
                              ? `1px solid ${T.border}40`
                              : "none",
                        }}
                      >
                        <td style={{ padding: "11px 14px" }}>
                          <div
                            style={{
                              fontSize: 13,
                              fontWeight: 500,
                              color: T.text,
                            }}
                          >
                            {t.assetName}
                          </div>
                          <div
                            style={{
                              fontSize: 11,
                              color: T.textDim,
                              fontFamily: "monospace",
                            }}
                          >
                            {t.assetId}
                          </div>
                        </td>
                        <td
                          style={{
                            padding: "11px 14px",
                            fontSize: 12.5,
                            color: T.textMid,
                          }}
                        >
                          {t.assignee || "—"}
                        </td>
                        <td style={{ padding: "11px 14px" }}>
                          {t.discrepancy ? (
                            <span
                              style={{
                                background: T.redBg,
                                color: T.red,
                                padding: "3px 9px",
                                borderRadius: 6,
                                fontSize: 11.5,
                                fontWeight: 500,
                              }}
                            >
                              ⚠ Discrepancy
                            </span>
                          ) : t.verified ? (
                            <span
                              style={{
                                background: T.greenBg,
                                color: T.green,
                                padding: "3px 9px",
                                borderRadius: 6,
                                fontSize: 11.5,
                                fontWeight: 500,
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 4,
                              }}
                            >
                              {IC.check} Verified
                            </span>
                          ) : (
                            <span
                              style={{
                                background: T.orangeBg,
                                color: T.orange,
                                padding: "3px 9px",
                                borderRadius: 6,
                                fontSize: 11.5,
                                fontWeight: 500,
                              }}
                            >
                              ⏳ Pending
                            </span>
                          )}
                        </td>
                        <td
                          style={{
                            padding: "11px 14px",
                            fontSize: 12,
                            color: T.textDim,
                            fontFamily: "monospace",
                          }}
                        >
                          {t.verifiedAt || "—"}
                        </td>
                        <td
                          style={{
                            padding: "11px 14px",
                            fontSize: 12.5,
                            color: T.textMid,
                          }}
                        >
                          {t.condition || "—"}
                        </td>
                        <td style={{ padding: "11px 10px" }}>
                          {!t.verified && !t.discrepancy && (
                            <Btn
                              onClick={() => handleVerify(t.id)}
                              icon={IC.check}
                              style={{ fontSize: 11, padding: "4px 10px" }}
                            >
                              Verify
                            </Btn>
                          )}
                          {t.discrepancy && (
                            <Btn
                              danger
                              onClick={() => handleResolveDiscrepancy(t.id)}
                              style={{ fontSize: 11, padding: "4px 10px" }}
                              icon={IC.check}
                            >
                              Resolve
                            </Btn>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            }
          />
        )}
      </div>
    </div>
  );
}

function CreateCensusModal({ onSave, onClose }) {
  const [f, setF] = useState({ name: "", scope: "Company", deadline: "" });
  const s = (k, v) => setF((p) => ({ ...p, [k]: v }));
  return (
    <Modal title="New Census Event" onClose={onClose} width={460}>
      <div style={{ marginBottom: 14 }}>
        <Lbl>Census Name *</Lbl>
        <Inp
          val={f.name}
          set={(v) => s("name", v)}
          placeholder="e.g. Q2 2026 Full Audit"
        />
      </div>
      <div style={{ marginBottom: 14 }}>
        <Lbl>Scope</Lbl>
        <Sel
          val={f.scope}
          set={(v) => s("scope", v)}
          opts={["Company", "Department", "Category"].map((c) => ({
            v: c,
            l: c,
          }))}
        />
      </div>
      <div style={{ marginBottom: 14 }}>
        <Lbl>Deadline *</Lbl>
        <Inp val={f.deadline} set={(v) => s("deadline", v)} type="date" />
      </div>
      <div
        style={{
          background: T.blueBg,
          border: `1px solid ${T.blue}30`,
          borderRadius: 8,
          padding: "10px 14px",
          fontSize: 12,
          color: T.blue,
          marginBottom: 16,
        }}
      >
        📋 One verification task will be auto-generated per assigned asset in
        scope.
      </div>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <Btn onClick={onClose}>Cancel</Btn>
        <Btn
          dark
          onClick={() => onSave(f)}
          disabled={!f.name || !f.deadline}
          icon={IC.check}
        >
          Create Census
        </Btn>
      </div>
    </Modal>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   OFFBOARDING PAGE
═══════════════════════════════════════════════════════════════════════ */
function OffboardingPage({ assets, setAssets, toast, auditLog, setAuditLog }) {
  const [cases, setCases] = useState(INIT_OB);
  const [selId, setSelId] = useState("OB-001");
  const [returnModal, setReturnModal] = useState(null);
  const [wipeModal, setWipeModal] = useState(null);

  const ob = cases.find((c) => c.id === selId);
  const allReturned = ob?.assets.every((a) => a.returned);

  const handleReturn = (caseId, assetId, condition) => {
    setCases((p) =>
      p.map((c) =>
        c.id === caseId
          ? {
              ...c,
              assets: c.assets.map((a) =>
                a.id === assetId ? { ...a, returned: true, condition } : a,
              ),
            }
          : c,
      ),
    );
    setAssets((p) =>
      p.map((a) =>
        a.id === assetId
          ? { ...a, status: "Available", assignee: null, condition }
          : a,
      ),
    );
    setAuditLog((p) =>
      addLog(
        p,
        "assignments",
        assetId,
        "UPDATE",
        `Offboarding return · condition: ${condition}`,
      ),
    );
    const needsWipe = ["Laptop", "Phone", "Tablet"].includes(
      cases.find((c) => c.id === caseId)?.assets.find((a) => a.id === assetId)
        ?.cat,
    );
    toast(`Asset returned${needsWipe ? " — IT data wipe task created" : ""}`);
    setReturnModal(null);
  };

  const handleWipe = (caseId, assetId) => {
    setCases((p) =>
      p.map((c) =>
        c.id === caseId
          ? {
              ...c,
              assets: c.assets.map((a) =>
                a.id === assetId ? { ...a, wiped: true } : a,
              ),
            }
          : c,
      ),
    );
    setAuditLog((p) =>
      addLog(p, "assets", assetId, "UPDATE", "Data wipe certificate uploaded"),
    );
    toast("Data wipe certified — certificate stored in R2");
    setWipeModal(null);
  };

  const handleClearance = (caseId) => {
    setCases((p) =>
      p.map((c) => (c.id === caseId ? { ...c, clearance: "CLEARED" } : c)),
    );
    setAuditLog((p) =>
      addLog(
        p,
        "offboarding",
        caseId,
        "UPDATE",
        "HR payroll clearance granted",
      ),
    );
    toast("✅ HR payroll clearance granted — Payroll team notified");
  };

  return (
    <div className="page" style={{ padding: "28px 28px 50px", maxWidth: 1100 }}>
      {returnModal && (
        <Modal
          title={`Return — ${returnModal.id}`}
          onClose={() => setReturnModal(null)}
          width={420}
        >
          <div
            style={{
              background: "#FAFAFA",
              borderRadius: 9,
              padding: "12px 14px",
              marginBottom: 14,
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 500, color: T.text }}>
              {returnModal.name}
            </div>
            <div style={{ fontSize: 12, color: T.textDim, marginTop: 2 }}>
              From: {ob.employee}
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <Lbl>Condition at Return</Lbl>
            <Sel
              val={returnModal._c || "Good"}
              set={(v) => setReturnModal((p) => ({ ...p, _c: v }))}
              opts={["Good", "Fair", "Damaged", "Lost"].map((c) => ({
                v: c,
                l: c,
              }))}
            />
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn onClick={() => setReturnModal(null)}>Cancel</Btn>
            <Btn
              dark
              onClick={() =>
                handleReturn(ob.id, returnModal.id, returnModal._c || "Good")
              }
              icon={IC.check}
            >
              Confirm Return
            </Btn>
          </div>
        </Modal>
      )}
      {wipeModal && (
        <Modal
          title="Data Wipe Certification"
          onClose={() => setWipeModal(null)}
          width={420}
        >
          <div
            style={{
              background: "#FAFAFA",
              borderRadius: 9,
              padding: "12px 14px",
              marginBottom: 14,
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 500, color: T.text }}>
              {wipeModal.name}
            </div>
            <div style={{ fontSize: 12, color: T.textDim, marginTop: 2 }}>
              Upload IT data wipe certificate (stored in R2)
            </div>
          </div>
          <div
            style={{
              border: `2px dashed ${T.border}`,
              borderRadius: 9,
              padding: "28px 20px",
              textAlign: "center",
              marginBottom: 14,
              cursor: "pointer",
              transition: "border-color .15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#888")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = T.border)}
          >
            <div style={{ fontSize: 24, marginBottom: 6 }}>{IC.upload}</div>
            <div style={{ fontSize: 13, color: T.textMid }}>
              Click to upload certificate PDF
            </div>
            <div style={{ fontSize: 11.5, color: T.textDim, marginTop: 3 }}>
              Stored securely in Cloudflare R2
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn onClick={() => setWipeModal(null)}>Cancel</Btn>
            <Btn
              dark
              onClick={() => handleWipe(ob.id, wipeModal.id)}
              icon={IC.check}
            >
              Confirm Wipe Complete
            </Btn>
          </div>
        </Modal>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 22,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: T.text,
              letterSpacing: "-0.02em",
            }}
          >
            Offboarding
          </h1>
          <p style={{ fontSize: 13, color: T.textDim, marginTop: 3 }}>
            Asset return checklists triggered by HR termination events
          </p>
        </div>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 16 }}
      >
        <div>
          {cases.map((c) => (
            <Card
              key={c.id}
              className="ch"
              onClick={() => setSelId(c.id)}
              s={{
                padding: "14px 16px",
                marginBottom: 10,
                cursor: "pointer",
                border: `1.5px solid ${selId === c.id ? T.dark : T.border}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 5,
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>
                  {c.employee}
                </div>
                <Chip status={c.clearance} />
              </div>
              <div
                style={{ fontSize: 11.5, color: T.textDim, marginBottom: 4 }}
              >
                {c.dept}
              </div>
              <div style={{ fontSize: 11.5, color: T.textDim }}>
                Terminated: {c.terminationDate}
              </div>
              <div style={{ fontSize: 11, color: T.red, marginTop: 4 }}>
                ⏰ Deadline: {c.deadline}
              </div>
            </Card>
          ))}
          {EMPLOYEES.filter(
            (e) =>
              e.status === "TERMINATED" && !cases.find((c) => c.empId === e.id),
          ).map((e) => (
            <Card
              key={e.id}
              s={{
                padding: "14px 16px",
                marginBottom: 10,
                background: "#FAFAFA",
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 500, color: T.textMid }}>
                {e.name}
              </div>
              <div style={{ fontSize: 11.5, color: T.textDim, marginTop: 3 }}>
                {e.terminationDate}
              </div>
              <div style={{ fontSize: 11, color: T.green, marginTop: 4 }}>
                ✓ No assets assigned
              </div>
            </Card>
          ))}
        </div>

        {ob && (
          <div>
            {ob.clearance === "CLEARED" ? (
              <div
                style={{
                  background: T.greenBg,
                  border: `1px solid ${T.green}30`,
                  borderRadius: 9,
                  padding: "13px 16px",
                  marginBottom: 14,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span style={{ fontSize: 18 }}>✅</span>
                <div>
                  <div
                    style={{ fontSize: 13, fontWeight: 600, color: T.green }}
                  >
                    HR Payroll Clearance Granted
                  </div>
                  <div style={{ fontSize: 12, color: T.green, marginTop: 1 }}>
                    All assets accounted for · HR + Payroll notified
                  </div>
                </div>
              </div>
            ) : (
              <div
                style={{
                  background: T.orangeBg,
                  border: `1px solid ${T.orange}30`,
                  borderRadius: 9,
                  padding: "13px 16px",
                  marginBottom: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 18 }}>🔒</span>
                  <div>
                    <div
                      style={{ fontSize: 13, fontWeight: 600, color: T.orange }}
                    >
                      HR Payroll Clearance Blocked
                    </div>
                    <div
                      style={{ fontSize: 12, color: T.orange, marginTop: 1 }}
                    >
                      Outstanding assets must be returned
                    </div>
                  </div>
                </div>
                {allReturned && (
                  <Btn
                    dark
                    onClick={() => handleClearance(ob.id)}
                    icon={IC.check}
                  >
                    Grant Clearance
                  </Btn>
                )}
              </div>
            )}

            <Card
              s={{ padding: 0, overflow: "hidden" }}
              c={
                <>
                  <div
                    style={{
                      padding: "14px 18px",
                      borderBottom: `1px solid ${T.border}`,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div
                        style={{ fontSize: 14, fontWeight: 600, color: T.text }}
                      >
                        {ob.employee} — Return Checklist
                      </div>
                      <div
                        style={{ fontSize: 12, color: T.textDim, marginTop: 2 }}
                      >
                        {ob.dept} · Deadline: {ob.deadline}
                      </div>
                    </div>
                    <Btn
                      onClick={() => toast("Return checklist PDF downloaded")}
                      icon={IC.pdf}
                      style={{ fontSize: 11, padding: "5px 10px" }}
                    >
                      Export
                    </Btn>
                  </div>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr
                        style={{
                          background: "#FAFAFA",
                          borderBottom: `1px solid ${T.border}`,
                        }}
                      >
                        {[
                          "Asset ID",
                          "Asset Name",
                          "Return Status",
                          "Condition",
                          "Data Wipe",
                          "Actions",
                        ].map((h) => (
                          <th
                            key={h}
                            style={{
                              padding: "9px 14px",
                              textAlign: "left",
                              fontSize: 11,
                              fontWeight: 600,
                              color: T.textDim,
                              letterSpacing: "0.04em",
                              textTransform: "uppercase",
                            }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {ob.assets.map((a, i) => (
                        <tr
                          key={a.id}
                          className="rh"
                          style={{
                            borderBottom:
                              i < ob.assets.length - 1
                                ? `1px solid ${T.border}40`
                                : "none",
                          }}
                        >
                          <td style={{ padding: "11px 14px" }}>
                            <span
                              style={{
                                fontFamily: "monospace",
                                fontSize: 12,
                                color: T.textMid,
                                background: "#F3F4F6",
                                padding: "2px 7px",
                                borderRadius: 4,
                              }}
                            >
                              {a.id}
                            </span>
                          </td>
                          <td
                            style={{
                              padding: "11px 14px",
                              fontSize: 13,
                              fontWeight: 500,
                              color: T.text,
                            }}
                          >
                            {a.name}
                          </td>
                          <td style={{ padding: "11px 14px" }}>
                            {a.returned ? (
                              <span
                                style={{
                                  background: T.greenBg,
                                  color: T.green,
                                  padding: "3px 9px",
                                  borderRadius: 6,
                                  fontSize: 11.5,
                                  fontWeight: 500,
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: 4,
                                }}
                              >
                                {IC.check} Returned
                              </span>
                            ) : (
                              <span
                                style={{
                                  background: T.redBg,
                                  color: T.red,
                                  padding: "3px 9px",
                                  borderRadius: 6,
                                  fontSize: 11.5,
                                  fontWeight: 500,
                                }}
                              >
                                ⏳ Pending
                              </span>
                            )}
                          </td>
                          <td
                            style={{
                              padding: "11px 14px",
                              fontSize: 12.5,
                              color: T.textMid,
                            }}
                          >
                            {a.condition || "—"}
                          </td>
                          <td style={{ padding: "11px 14px" }}>
                            {a.wiped ? (
                              <span
                                style={{
                                  background: T.greenBg,
                                  color: T.green,
                                  padding: "3px 9px",
                                  borderRadius: 6,
                                  fontSize: 11.5,
                                  fontWeight: 500,
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: 4,
                                }}
                              >
                                {IC.check} Done
                              </span>
                            ) : a.returned ? (
                              <span
                                style={{
                                  background: T.blueBg,
                                  color: T.blue,
                                  padding: "3px 9px",
                                  borderRadius: 6,
                                  fontSize: 11.5,
                                  fontWeight: 500,
                                }}
                              >
                                ⏳ Required
                              </span>
                            ) : (
                              <span style={{ color: T.textDim, fontSize: 12 }}>
                                —
                              </span>
                            )}
                          </td>
                          <td style={{ padding: "11px 10px" }}>
                            <div style={{ display: "flex", gap: 5 }}>
                              {!a.returned && (
                                <Btn
                                  onClick={() => setReturnModal(a)}
                                  style={{ fontSize: 11, padding: "4px 10px" }}
                                  icon={IC.offb}
                                >
                                  Return
                                </Btn>
                              )}
                              {a.returned &&
                                !a.wiped &&
                                ["Laptop", "Phone", "Tablet"].includes(
                                  a.cat,
                                ) && (
                                  <Btn
                                    onClick={() => setWipeModal(a)}
                                    style={{
                                      fontSize: 11,
                                      padding: "4px 10px",
                                    }}
                                    icon={IC.shield}
                                  >
                                    Certify Wipe
                                  </Btn>
                                )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   REPORTS PAGE
═══════════════════════════════════════════════════════════════════════ */
function ReportsPage({ assets, toast, auditLog, setAuditLog }) {
  const [tab, setTab] = useState("overview");
  const [disposals, setDisposals] = useState(INIT_DISPOSALS);

  const totalCost = assets.reduce((s, a) => s + (a.cost || 0), 0);
  const totalBV = assets.reduce((s, a) => s + depB(a), 0);
  const assigned = assets.filter((a) => a.status === "Assigned").length;
  const catMap = {};
  assets.forEach((a) => {
    catMap[a.cat] = (catMap[a.cat] || 0) + 1;
  });
  const catE = Object.entries(catMap).sort((a, b) => b[1] - a[1]);
  const catMax = catE[0]?.[1] || 1;

  const handleApprove = (id) => {
    setDisposals((p) =>
      p.map((d) =>
        d.id === id
          ? { ...d, financeApproved: true, status: "Awaiting Data Wipe" }
          : d,
      ),
    );
    setAuditLog((p) =>
      addLog(p, "disposal_records", id, "UPDATE", "Finance approval granted"),
    );
    toast("Disposal approved — IT data wipe required before execution");
  };
  const handleWipeDone = (id) => {
    setDisposals((p) =>
      p.map((d) =>
        d.id === id ? { ...d, wiped: true, status: "Approved" } : d,
      ),
    );
    setAuditLog((p) =>
      addLog(
        p,
        "disposal_records",
        id,
        "UPDATE",
        "Data wipe certificate uploaded",
      ),
    );
    toast("Data wipe certified — ready to archive");
  };
  const handleArchive = (id) => {
    const d = disposals.find((x) => x.id === id);
    setDisposals((p) => p.filter((x) => x.id !== id));
    setAuditLog((p) =>
      addLog(
        p,
        "assets",
        d.assetId,
        "UPDATE",
        "Asset disposed and archived (read-only)",
      ),
    );
    toast("Asset disposed and moved to read-only archive");
  };

  const exportCSV = () => {
    const rows = [
      "ID,Name,Category,Purchase Cost,Annual Depr,Book Value,Status",
      ...assets.map(
        (a) =>
          `${a.id},"${a.name}",${a.cat},${a.cost},${depA(a)},${depB(a)},${a.status}`,
      ),
    ].join("\n");
    const b = new Blob([rows], { type: "text/csv" });
    const u = URL.createObjectURL(b);
    const l = document.createElement("a");
    l.href = u;
    l.download = "ams-report.csv";
    l.click();
    toast("Report exported as CSV");
  };

  const TABS = [
    ["overview", "Overview"],
    ["depreciation", "Depreciation"],
    ["disposal", "Disposal"],
    ["audit", "Audit Log"],
  ];

  return (
    <div className="page" style={{ padding: "28px 28px 50px", maxWidth: 1200 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 22,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: T.text,
              letterSpacing: "-0.02em",
            }}
          >
            Reports
          </h1>
          <p style={{ fontSize: 13, color: T.textDim, marginTop: 3 }}>
            Analytics · Depreciation · Disposal · Audit trail
          </p>
        </div>
        <Btn onClick={exportCSV} icon={IC.dl}>
          Export CSV
        </Btn>
      </div>

      <div
        style={{
          display: "flex",
          gap: 0,
          borderBottom: `1px solid ${T.border}`,
          marginBottom: 20,
        }}
      >
        {TABS.map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            style={{
              padding: "9px 18px",
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: tab === id ? 600 : 400,
              color: tab === id ? T.text : T.textDim,
              borderBottom: `2px solid ${tab === id ? T.dark : "transparent"}`,
              marginBottom: -1,
              transition: "all .15s",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 14,
              marginBottom: 18,
            }}
          >
            {[
              {
                label: "Fleet Book Value",
                val: fmtV(totalBV),
                icon: "💰",
                c: T.green,
              },
              {
                label: "Total Purchase Cost",
                val: fmtV(totalCost),
                icon: "🏷",
                c: T.blue,
              },
              {
                label: "Total Depreciation",
                val: fmtV(totalCost - totalBV),
                icon: "📉",
                c: T.orange,
              },
              {
                label: "Utilization Rate",
                val: Math.round((assigned / assets.length) * 100 || 0) + "%",
                icon: "📊",
                c: T.purple,
              },
              {
                label: "Assets Registered",
                val: assets.length,
                icon: "📦",
                c: T.dark,
              },
              {
                label: "Pending Disposal",
                val: assets.filter((a) => a.status === "Pending Disposal")
                  .length,
                icon: "🗑",
                c: T.red,
              },
            ].map((k, i) => (
              <Card
                key={i}
                className="ch"
                s={{
                  padding: "18px 20px",
                  animation: `fadeUp .35s ease ${i * 0.06}s both`,
                }}
                c={
                  <>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        marginBottom: 10,
                      }}
                    >
                      <div
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: 8,
                          background: k.c + "15",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 16,
                        }}
                      >
                        {k.icon}
                      </div>
                      <span style={{ fontSize: 12, color: T.textDim }}>
                        {k.label}
                      </span>
                    </div>
                    <div
                      style={{ fontSize: 20, fontWeight: 700, color: T.text }}
                    >
                      {typeof k.val === "number"
                        ? k.val.toLocaleString()
                        : k.val}
                    </div>
                  </>
                }
              />
            ))}
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
          >
            <Card
              s={{ padding: "20px 22px" }}
              c={
                <>
                  <SH>Assets by Category</SH>
                  {catE.map(([cat, cnt]) => (
                    <HBar
                      key={cat}
                      label={cat}
                      val={cnt}
                      pct={Math.round((cnt / catMax) * 100)}
                      color={CC[cat] || T.dark}
                      right={Math.round((cnt / assets.length) * 100) + "%"}
                    />
                  ))}
                </>
              }
            />
            <Card
              s={{ padding: "20px 22px" }}
              c={
                <>
                  <SH>Status Breakdown</SH>
                  {[
                    ["Assigned", "#2563EB"],
                    ["Available", T.green],
                    ["In Repair", T.orange],
                    ["Pending Disposal", T.red],
                  ].map(([s, c]) => {
                    const cnt = assets.filter((a) => a.status === s).length;
                    const pct = Math.round((cnt / assets.length) * 100 || 0);
                    return (
                      <HBar
                        key={s}
                        label={s}
                        val={cnt}
                        pct={pct}
                        color={c}
                        right={pct + "%"}
                      />
                    );
                  })}
                </>
              }
            />
          </div>
        </>
      )}

      {tab === "depreciation" && (
        <Card
          s={{ padding: 0, overflow: "hidden" }}
          c={
            <>
              <div
                style={{
                  padding: "14px 20px",
                  borderBottom: `1px solid ${T.border}`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: T.text }}>
                    Depreciation Schedule — Straight-Line
                  </div>
                  <div style={{ fontSize: 12, color: T.textDim, marginTop: 1 }}>
                    Formula: (Cost − Residual) ÷ Useful Life · Updated monthly
                  </div>
                </div>
                <Btn
                  onClick={() => toast("Depreciation schedule PDF downloaded")}
                  icon={IC.pdf}
                  style={{ fontSize: 11, padding: "5px 10px" }}
                >
                  Download PDF
                </Btn>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr
                    style={{
                      background: "#FAFAFA",
                      borderBottom: `1px solid ${T.border}`,
                    }}
                  >
                    {[
                      "Asset",
                      "Cat",
                      "Purchase Cost",
                      "Residual",
                      "Life",
                      "Annual Depr.",
                      "Book Value",
                      "Remaining",
                      "Status",
                    ].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "9px 12px",
                          textAlign: "left",
                          fontSize: 11,
                          fontWeight: 600,
                          color: T.textDim,
                          letterSpacing: "0.04em",
                          textTransform: "uppercase",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {assets.map((a, i) => {
                    const bv = depB(a);
                    const ann = depA(a);
                    const pct =
                      a.cost > 0 ? Math.round((bv / a.cost) * 100) : 0;
                    return (
                      <tr
                        key={a.id}
                        className="rh"
                        style={{
                          borderBottom:
                            i < assets.length - 1
                              ? `1px solid ${T.border}40`
                              : "none",
                        }}
                      >
                        <td style={{ padding: "10px 12px" }}>
                          <div
                            style={{
                              fontSize: 13,
                              fontWeight: 500,
                              color: T.text,
                            }}
                          >
                            {a.name}
                          </div>
                          <div
                            style={{
                              fontSize: 11,
                              color: T.textDim,
                              fontFamily: "monospace",
                            }}
                          >
                            {a.id}
                          </div>
                        </td>
                        <td
                          style={{
                            padding: "10px 12px",
                            fontSize: 12.5,
                            color: T.textMid,
                          }}
                        >
                          {a.cat}
                        </td>
                        <td
                          style={{
                            padding: "10px 12px",
                            fontSize: 12,
                            fontFamily: "monospace",
                            color: T.text,
                          }}
                        >
                          {fmtF(a.cost)}
                        </td>
                        <td
                          style={{
                            padding: "10px 12px",
                            fontSize: 12,
                            fontFamily: "monospace",
                            color: T.textMid,
                          }}
                        >
                          {fmtF(a.residual)}
                        </td>
                        <td
                          style={{
                            padding: "10px 12px",
                            fontSize: 12,
                            color: T.textMid,
                            textAlign: "center",
                          }}
                        >
                          {a.life}y
                        </td>
                        <td
                          style={{
                            padding: "10px 12px",
                            fontSize: 12,
                            fontFamily: "monospace",
                            color: T.orange,
                          }}
                        >
                          {fmtV(ann)}/yr
                        </td>
                        <td
                          style={{
                            padding: "10px 12px",
                            fontSize: 12,
                            fontWeight: 600,
                            fontFamily: "monospace",
                            color: T.text,
                          }}
                        >
                          {fmtV(bv)}
                        </td>
                        <td style={{ padding: "10px 12px", minWidth: 90 }}>
                          <div
                            style={{
                              height: 4,
                              background: "#F3F4F6",
                              borderRadius: 99,
                              overflow: "hidden",
                              marginBottom: 2,
                            }}
                          >
                            <div
                              style={{
                                height: "100%",
                                background:
                                  pct > 50
                                    ? T.green
                                    : pct > 20
                                      ? T.orange
                                      : T.red,
                                borderRadius: 99,
                                width: pct + "%",
                                transition: "width .6s",
                              }}
                            />
                          </div>
                          <div style={{ fontSize: 10, color: T.textDim }}>
                            {pct}%
                          </div>
                        </td>
                        <td style={{ padding: "10px 12px" }}>
                          {bv <= a.residual ? (
                            <span
                              style={{
                                background: T.redBg,
                                color: T.red,
                                padding: "2px 8px",
                                borderRadius: 6,
                                fontSize: 11,
                                fontWeight: 500,
                              }}
                            >
                              Fully Depr.
                            </span>
                          ) : (
                            <Chip status={a.status} />
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr
                    style={{
                      background: "#FAFAFA",
                      borderTop: `1px solid ${T.border}`,
                    }}
                  >
                    <td
                      colSpan={2}
                      style={{
                        padding: "10px 12px",
                        fontSize: 12.5,
                        fontWeight: 600,
                        color: T.text,
                      }}
                    >
                      Totals ({assets.length} assets)
                    </td>
                    <td
                      style={{
                        padding: "10px 12px",
                        fontSize: 12,
                        fontWeight: 700,
                        fontFamily: "monospace",
                        color: T.text,
                      }}
                    >
                      {fmtF(totalCost)}
                    </td>
                    <td colSpan={3} />
                    <td
                      style={{
                        padding: "10px 12px",
                        fontSize: 12,
                        fontWeight: 700,
                        fontFamily: "monospace",
                        color: T.text,
                      }}
                    >
                      {fmtV(totalBV)}
                    </td>
                    <td colSpan={2} />
                  </tr>
                </tfoot>
              </table>
            </>
          }
        />
      )}

      {tab === "disposal" && (
        <>
          <div
            style={{
              background: T.orangeBg,
              border: `1px solid ${T.orange}30`,
              borderRadius: 9,
              padding: "12px 16px",
              marginBottom: 16,
              fontSize: 12.5,
              color: T.orange,
              display: "flex",
              gap: 10,
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 16 }}>🗑</span>
            <span>
              <strong>Disposal Workflow:</strong> Finance must approve → IT
              uploads data wipe cert → Asset archived (read-only, 7yr retention)
            </span>
          </div>
          <Card
            s={{ padding: 0, overflow: "hidden" }}
            c={
              <>
                <div
                  style={{
                    padding: "14px 20px",
                    borderBottom: `1px solid ${T.border}`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ fontSize: 14, fontWeight: 600, color: T.text }}>
                    Disposal Requests
                  </div>
                  <Btn
                    dark
                    onClick={() => toast("New disposal request created")}
                    icon={IC.plus}
                    style={{ fontSize: 11, padding: "5px 10px" }}
                  >
                    Request Disposal
                  </Btn>
                </div>
                {disposals.length === 0 ? (
                  <div style={{ padding: "40px 0", textAlign: "center" }}>
                    <div style={{ fontSize: 30, marginBottom: 8 }}>✅</div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: T.textMid,
                      }}
                    >
                      No pending disposals
                    </div>
                  </div>
                ) : (
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr
                        style={{
                          background: "#FAFAFA",
                          borderBottom: `1px solid ${T.border}`,
                        }}
                      >
                        {[
                          "ID",
                          "Asset",
                          "Reason",
                          "Book Value",
                          "Finance",
                          "Data Wipe",
                          "Status",
                          "Actions",
                        ].map((h) => (
                          <th
                            key={h}
                            style={{
                              padding: "9px 12px",
                              textAlign: "left",
                              fontSize: 11,
                              fontWeight: 600,
                              color: T.textDim,
                              letterSpacing: "0.04em",
                              textTransform: "uppercase",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {disposals.map((d, i) => (
                        <tr
                          key={d.id}
                          className="rh"
                          style={{
                            borderBottom:
                              i < disposals.length - 1
                                ? `1px solid ${T.border}40`
                                : "none",
                          }}
                        >
                          <td style={{ padding: "10px 12px" }}>
                            <span
                              style={{
                                fontFamily: "monospace",
                                fontSize: 11.5,
                                color: T.textMid,
                                background: "#F3F4F6",
                                padding: "2px 7px",
                                borderRadius: 4,
                              }}
                            >
                              {d.id}
                            </span>
                          </td>
                          <td style={{ padding: "10px 12px" }}>
                            <div
                              style={{
                                fontSize: 13,
                                fontWeight: 500,
                                color: T.text,
                              }}
                            >
                              {d.assetName}
                            </div>
                            <div
                              style={{
                                fontSize: 11,
                                color: T.textDim,
                                fontFamily: "monospace",
                              }}
                            >
                              {d.assetId}
                            </div>
                          </td>
                          <td
                            style={{
                              padding: "10px 12px",
                              fontSize: 12,
                              color: T.textMid,
                              maxWidth: 160,
                            }}
                          >
                            {d.reason}
                          </td>
                          <td
                            style={{
                              padding: "10px 12px",
                              fontSize: 12,
                              fontFamily: "monospace",
                              color: T.text,
                            }}
                          >
                            {fmtF(d.bookValue)}
                          </td>
                          <td style={{ padding: "10px 12px" }}>
                            {d.financeApproved ? (
                              <span
                                style={{
                                  background: T.greenBg,
                                  color: T.green,
                                  padding: "2px 9px",
                                  borderRadius: 6,
                                  fontSize: 11.5,
                                  fontWeight: 500,
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: 3,
                                }}
                              >
                                {IC.check} Approved
                              </span>
                            ) : (
                              <span
                                style={{
                                  background: T.orangeBg,
                                  color: T.orange,
                                  padding: "2px 9px",
                                  borderRadius: 6,
                                  fontSize: 11.5,
                                }}
                              >
                                ⏳ Pending
                              </span>
                            )}
                          </td>
                          <td style={{ padding: "10px 12px" }}>
                            {d.wiped ? (
                              <span
                                style={{
                                  background: T.greenBg,
                                  color: T.green,
                                  padding: "2px 9px",
                                  borderRadius: 6,
                                  fontSize: 11.5,
                                  fontWeight: 500,
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: 3,
                                }}
                              >
                                {IC.check} Done
                              </span>
                            ) : (
                              <span
                                style={{
                                  background: "#F3F4F6",
                                  color: T.textDim,
                                  padding: "2px 9px",
                                  borderRadius: 6,
                                  fontSize: 11.5,
                                }}
                              >
                                —
                              </span>
                            )}
                          </td>
                          <td style={{ padding: "10px 12px" }}>
                            <Chip status={d.status} />
                          </td>
                          <td style={{ padding: "10px 10px" }}>
                            <div style={{ display: "flex", gap: 4 }}>
                              {!d.financeApproved && (
                                <Btn
                                  dark
                                  onClick={() => handleApprove(d.id)}
                                  style={{ fontSize: 11, padding: "4px 10px" }}
                                  icon={IC.check}
                                >
                                  Approve
                                </Btn>
                              )}
                              {d.financeApproved && !d.wiped && (
                                <Btn
                                  style={{ fontSize: 11, padding: "4px 10px" }}
                                  icon={IC.shield}
                                  onClick={() => handleWipeDone(d.id)}
                                >
                                  Wipe Done
                                </Btn>
                              )}
                              {d.wiped && (
                                <Btn
                                  dark
                                  onClick={() => handleArchive(d.id)}
                                  style={{ fontSize: 11, padding: "4px 10px" }}
                                  icon={IC.check}
                                >
                                  Archive
                                </Btn>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            }
          />
        </>
      )}

      {tab === "audit" && (
        <Card
          s={{ padding: 0, overflow: "hidden" }}
          c={
            <>
              <div
                style={{
                  padding: "14px 20px",
                  borderBottom: `1px solid ${T.border}`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: T.text }}>
                    Audit Log — Insert-Only
                  </div>
                  <div style={{ fontSize: 12, color: T.textDim, marginTop: 1 }}>
                    All CREATE / UPDATE / DELETE operations · 7-year retention ·{" "}
                    {auditLog.length} records
                  </div>
                </div>
                <Btn
                  onClick={() => {
                    const rows = [
                      "ID,Table,RecordID,Action,Actor,Time,Detail",
                      ...auditLog.map(
                        (l) =>
                          `${l.id},${l.table},${l.recordId},${l.action},"${l.actor}",${l.time},"${l.detail}"`,
                      ),
                    ].join("\n");
                    const b = new Blob([rows], { type: "text/csv" });
                    const u = URL.createObjectURL(b);
                    const link = document.createElement("a");
                    link.href = u;
                    link.download = "audit-log.csv";
                    link.click();
                    toast("Audit log exported");
                  }}
                  icon={IC.dl}
                  style={{ fontSize: 11, padding: "5px 10px" }}
                >
                  Export Log
                </Btn>
              </div>
              {auditLog.map((log, i) => (
                <div
                  key={log.id}
                  className="rh"
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 14,
                    padding: "13px 20px",
                    borderBottom:
                      i < auditLog.length - 1
                        ? `1px solid ${T.border}40`
                        : "none",
                    animation: `slideRight .25s ease ${Math.min(i, 0.1) * i}s both`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      paddingTop: 2,
                    }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: T.dark,
                        flexShrink: 0,
                      }}
                    />
                    {i < auditLog.length - 1 && (
                      <div
                        style={{
                          width: 1,
                          flex: 1,
                          background: T.border,
                          marginTop: 4,
                          minHeight: 16,
                        }}
                      />
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: 12,
                        marginBottom: 3,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            padding: "2px 8px",
                            borderRadius: 5,
                            background:
                              {
                                CREATE: T.greenBg,
                                UPDATE: T.blueBg,
                                DELETE: T.redBg,
                              }[log.action] || "#F3F4F6",
                            color:
                              {
                                CREATE: T.green,
                                UPDATE: T.blue,
                                DELETE: T.red,
                              }[log.action] || T.textDim,
                          }}
                        >
                          {log.action}
                        </span>
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: 500,
                            color: T.text,
                          }}
                        >
                          {log.detail}
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: 11,
                          color: T.textDim,
                          whiteSpace: "nowrap",
                          fontFamily: "monospace",
                        }}
                      >
                        {log.time}
                      </span>
                    </div>
                    <div style={{ fontSize: 11.5, color: T.textDim }}>
                      Table:{" "}
                      <code
                        style={{
                          background: "#F3F4F6",
                          padding: "1px 5px",
                          borderRadius: 3,
                          fontSize: 11,
                        }}
                      >
                        {log.table}
                      </code>
                      {" · "}Record:{" "}
                      <code
                        style={{
                          background: "#F3F4F6",
                          padding: "1px 5px",
                          borderRadius: 3,
                          fontSize: 11,
                        }}
                      >
                        {log.recordId}
                      </code>
                      {" · "}By {log.actor}
                    </div>
                  </div>
                </div>
              ))}
            </>
          }
        />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   STORAGE PAGE
═══════════════════════════════════════════════════════════════════════ */
function StoragePage({ assets, setAssets, toast }) {
  const [activeWH, setActiveWH] = useState("all");
  const [search, setSearch] = useState("");
  const [moveModal, setMoveModal] = useState(null);
  const [moveTarget, setMoveTarget] = useState("");
  const q = search.toLowerCase();

  const whStats = WAREHOUSES.map((wh) => ({
    ...wh,
    used: assets.filter((a) => a?.wh === wh.id).length,
  }));
  const filtered = assets.filter(
    (a) =>
      a &&
      (activeWH === "all" || a.wh === activeWH) &&
      (!search ||
        a.name?.toLowerCase().includes(q) ||
        a.id?.toLowerCase().includes(q)),
  );

  const handleMove = () => {
    if (!moveModal || !moveTarget) return;

    setAssets((p) =>
      p.map((a) => (a?.id === moveModal.id ? { ...a, wh: moveTarget } : a)),
    );
    toast(`${moveModal.name} moved to ${moveTarget}`);
    setMoveModal(null);
    setMoveTarget("");
  };

  return (
    <div className="page" style={{ padding: "28px 28px 50px", maxWidth: 1200 }}>
      {moveModal && (
        <Modal
          title="Move Asset"
          onClose={() => setMoveModal(null)}
          width={400}
        >
          <div style={{ fontSize: 13, color: T.textMid, marginBottom: 14 }}>
            Moving <strong style={{ color: T.text }}>{moveModal.name}</strong>{" "}
            from <strong>{moveModal.wh}</strong>
          </div>
          {WAREHOUSES.filter((w) => w.id !== moveModal.wh).map((wh) => {
            const stat = whStats.find((s) => s.id === wh.id);
            const pct = Math.round(((stat?.used || 0) / wh.cap) * 100);
            return (
              <div
                key={wh.id}
                onClick={() => setMoveTarget(wh.id)}
                style={{
                  padding: "11px 13px",
                  borderRadius: 9,
                  cursor: "pointer",
                  border: `1.5px solid ${moveTarget === wh.id ? T.dark : T.border}`,
                  background: moveTarget === wh.id ? "#FAFAFA" : "transparent",
                  marginBottom: 8,
                  transition: "all .15s",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 500, color: T.text }}>
                    {wh.name}
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      color: pct > 80 ? T.red : pct > 60 ? T.orange : T.green,
                    }}
                  >
                    {pct}% full
                  </span>
                </div>
                <div style={{ fontSize: 11.5, color: T.textDim, marginTop: 2 }}>
                  {wh.loc} · {stat?.used || 0}/{wh.cap}
                </div>
              </div>
            );
          })}
          <div
            style={{
              display: "flex",
              gap: 10,
              justifyContent: "flex-end",
              marginTop: 14,
            }}
          >
            <Btn onClick={() => setMoveModal(null)}>Cancel</Btn>
            <Btn
              dark
              onClick={handleMove}
              disabled={!moveTarget}
              icon={IC.check}
            >
              Move Asset
            </Btn>
          </div>
        </Modal>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 22,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: T.text,
              letterSpacing: "-0.02em",
            }}
          >
            Storage
          </h1>
          <p style={{ fontSize: 13, color: T.textDim, marginTop: 3 }}>
            Warehouse inventory and asset location management
          </p>
        </div>
        <div style={{ position: "relative" }}>
          <span
            style={{
              position: "absolute",
              left: 9,
              top: "50%",
              transform: "translateY(-50%)",
              color: T.textDim,
              fontSize: 13,
              pointerEvents: "none",
            }}
          >
            🔍
          </span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search assets…"
            style={{
              padding: "7px 10px 7px 30px",
              fontSize: 12.5,
              width: 200,
              border: `1px solid ${T.border}`,
              borderRadius: 7,
              outline: "none",
              background: T.surface,
              color: T.text,
              transition: "border-color .15s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#888")}
            onBlur={(e) => (e.target.style.borderColor = T.border)}
          />
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 14,
          marginBottom: 20,
        }}
      >
        <div
          onClick={() => setActiveWH("all")}
          className="ch"
          style={{
            background: activeWH === "all" ? T.dark : T.surface,
            border: `1px solid ${activeWH === "all" ? T.dark : T.border}`,
            borderRadius: 10,
            padding: "16px 18px",
            cursor: "pointer",
            boxShadow: T.shadow,
          }}
        >
          <div
            style={{
              fontSize: 12,
              color: activeWH === "all" ? "rgba(255,255,255,.5)" : T.textDim,
              marginBottom: 8,
            }}
          >
            All Warehouses
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: activeWH === "all" ? "#fff" : T.text,
              marginBottom: 4,
            }}
          >
            {assets.length}
          </div>
          <div
            style={{
              fontSize: 12,
              color: activeWH === "all" ? "rgba(255,255,255,.4)" : T.textDim,
            }}
          >
            Total assets
          </div>
        </div>
        {whStats.map((wh) => {
          const pct = Math.round((wh.used / wh.cap) * 100);
          const capC = pct > 85 ? T.red : pct > 60 ? T.orange : T.green;
          const isAct = activeWH === wh.id;
          return (
            <div
              key={wh.id}
              onClick={() => setActiveWH(isAct ? "all" : wh.id)}
              className="ch"
              style={{
                background: isAct ? "#F9FAFB" : T.surface,
                border: `1.5px solid ${isAct ? T.dark : T.border}`,
                borderRadius: 10,
                padding: "16px 18px",
                cursor: "pointer",
                boxShadow: T.shadow,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 6,
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 600, color: T.text }}>
                  {wh.id}
                </div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: capC,
                    background: capC + "18",
                    padding: "2px 7px",
                    borderRadius: 99,
                  }}
                >
                  {pct}%
                </span>
              </div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: T.text,
                  marginBottom: 2,
                }}
              >
                {wh.used}
              </div>
              <div style={{ fontSize: 11, color: T.textDim, marginBottom: 6 }}>
                / {wh.cap} · {wh.manager}
              </div>
              <div
                style={{
                  height: 3,
                  background: "#F3F4F6",
                  borderRadius: 99,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    background: capC,
                    borderRadius: 99,
                    width: pct + "%",
                    transition: "width .6s",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <Card
        s={{ padding: 0, overflow: "hidden" }}
        c={
          <>
            <div
              style={{
                padding: "14px 20px",
                borderBottom: `1px solid ${T.border}`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 600, color: T.text }}>
                Inventory {activeWH !== "all" ? `— ${activeWH}` : ""}
              </div>
              <span style={{ fontSize: 12, color: T.textDim }}>
                {filtered.length} assets
              </span>
            </div>
            {filtered.length === 0 ? (
              <div style={{ padding: "40px 0", textAlign: "center" }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>📭</div>
                <div
                  style={{ fontSize: 14, fontWeight: 500, color: T.textMid }}
                >
                  No assets found
                </div>
              </div>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr
                    style={{
                      background: "#FAFAFA",
                      borderBottom: `1px solid ${T.border}`,
                    }}
                  >
                    {[
                      "Asset Tag",
                      "Name",
                      "Category",
                      "WH",
                      "Location",
                      "Status",
                      "Assigned To",
                      "Action",
                    ].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "9px 14px",
                          textAlign: "left",
                          fontSize: 11,
                          fontWeight: 600,
                          color: T.textDim,
                          letterSpacing: "0.04em",
                          textTransform: "uppercase",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((a, i) => (
                    <tr
                      key={a.id}
                      className="rh"
                      style={{
                        borderBottom:
                          i < filtered.length - 1
                            ? `1px solid ${T.border}40`
                            : "none",
                      }}
                    >
                      <td style={{ padding: "11px 14px" }}>
                        <span
                          style={{
                            fontFamily: "monospace",
                            fontSize: 12,
                            color: T.textMid,
                            background: "#F3F4F6",
                            padding: "2px 7px",
                            borderRadius: 4,
                          }}
                        >
                          {a.id}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "11px 14px",
                          fontSize: 13,
                          fontWeight: 500,
                          color: T.text,
                        }}
                      >
                        {a.name}
                      </td>
                      <td
                        style={{
                          padding: "11px 14px",
                          fontSize: 12.5,
                          color: T.textMid,
                        }}
                      >
                        {a.cat}
                      </td>
                      <td style={{ padding: "11px 14px" }}>
                        <span
                          style={{
                            fontSize: 11.5,
                            fontWeight: 600,
                            color: T.text,
                            background: "#F3F4F6",
                            padding: "3px 9px",
                            borderRadius: 99,
                          }}
                        >
                          {a.wh}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "11px 14px",
                          fontSize: 12,
                          color: T.textDim,
                        }}
                      >
                        {a.loc}
                      </td>
                      <td style={{ padding: "11px 14px" }}>
                        <Chip status={a.status} />
                      </td>
                      <td
                        style={{
                          padding: "11px 14px",
                          fontSize: 12.5,
                          color: T.textMid,
                        }}
                      >
                        {a.assignee || "—"}
                      </td>
                      <td style={{ padding: "11px 10px" }}>
                        <button
                          onClick={() => {
                            setMoveModal(a);
                            setMoveTarget("");
                          }}
                          style={{
                            padding: "5px 10px",
                            borderRadius: 6,
                            border: `1px solid ${T.border}`,
                            background: "transparent",
                            cursor: "pointer",
                            fontSize: 12,
                            color: T.textMid,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 5,
                            transition: "all .12s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#F0F0F0";
                            e.currentTarget.style.color = T.text;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = T.textMid;
                          }}
                        >
                          → Move
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div
              style={{
                padding: "10px 20px",
                borderTop: `1px solid ${T.border}`,
                display: "flex",
                gap: 20,
                alignItems: "center",
              }}
            >
              {whStats.map((wh) => {
                const pct = Math.round((wh.used / wh.cap) * 100);
                return (
                  <div
                    key={wh.id}
                    style={{ display: "flex", alignItems: "center", gap: 5 }}
                  >
                    <div
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: 2,
                        background:
                          pct > 85 ? T.red : pct > 60 ? T.orange : T.green,
                      }}
                    />
                    <span style={{ fontSize: 11.5, color: T.textDim }}>
                      {wh.id}:
                    </span>
                    <span
                      style={{ fontSize: 11.5, fontWeight: 600, color: T.text }}
                    >
                      {assets.filter((a) => a.wh === wh.id).length}/{wh.cap}
                    </span>
                  </div>
                );
              })}
              <div
                style={{ marginLeft: "auto", fontSize: 11.5, color: T.textDim }}
              >
                Fleet:{" "}
                <strong style={{ color: T.text }}>
                  {fmtV(assets.reduce((s, a) => s + (a.val || 0), 0))}
                </strong>
              </div>
            </div>
          </>
        }
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   SETTINGS PAGE
═══════════════════════════════════════════════════════════════════════ */
function SettingsPage({ toast }) {
  const [org, setOrg] = useState("Mongolian Asset Corp");
  const [tz, setTz] = useState("Asia/Ulaanbaatar");
  const [cur, setCur] = useState("MNT");
  const [name, setName] = useState("Batbayar Dorj");
  const [email, setEmail] = useState("batbayar@ams.mn");
  const [phone, setPhone] = useState("+976 9911 2233");
  const [autoRetire, setAutoRetire] = useState("36");
  const [lowStock, setLowStock] = useState("10");
  const [auditRetain, setAuditRetain] = useState("84");
  const [notifs, setNotifs] = useState({
    emailAssign: true,
    emailReturn: true,
    emailMaint: false,
    emailReport: true,
    pushAll: true,
    pushOverdue: true,
    weekly: true,
  });
  const [twoFA, setTwoFA] = useState(true);
  const [sessions, setSessions] = useState(true);
  const [ipLog, setIpLog] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [saving, setSaving] = useState(false);
  const tog = (k) => setNotifs((p) => ({ ...p, [k]: !p[k] }));

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast("Settings saved successfully");
    }, 700);
  };

  function Sec({ title, sub, icon, children }) {
    return (
      <Card
        s={{ padding: 0, marginBottom: 14, overflow: "hidden" }}
        c={
          <>
            <div
              style={{
                padding: "14px 20px",
                borderBottom: `1px solid ${T.border}`,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 7,
                  background: "#F3F4F6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: T.textMid,
                  flexShrink: 0,
                }}
              >
                {icon}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: T.text }}>
                  {title}
                </div>
                {sub && (
                  <div
                    style={{ fontSize: 11.5, color: T.textDim, marginTop: 1 }}
                  >
                    {sub}
                  </div>
                )}
              </div>
            </div>
            <div style={{ padding: "18px 20px" }}>{children}</div>
          </>
        }
      />
    );
  }
  const G2 = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" };
  const F = ({ label, val, set, type = "text", disabled = false, opts }) => (
    <div style={{ marginBottom: 14 }}>
      <Lbl>{label}</Lbl>
      {opts ? (
        <Sel val={val} set={set} opts={opts} />
      ) : (
        <Inp val={val} set={set} type={type} disabled={disabled} />
      )}
    </div>
  );
  const TRow = ({ label, k }) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 13,
      }}
    >
      <span style={{ fontSize: 13, color: T.text }}>{label}</span>
      <Toggle on={notifs[k]} set={() => tog(k)} />
    </div>
  );

  return (
    <div className="page" style={{ padding: "28px 28px 50px", maxWidth: 800 }}>
      {confirm && (
        <Confirm
          msg="This will permanently delete all assets, assignments, audit logs and census data. This cannot be undone."
          onOk={() => {
            setConfirm(false);
            toast("All data has been reset", "danger");
          }}
          onCancel={() => setConfirm(false)}
        />
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 24,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: T.text,
              letterSpacing: "-0.02em",
            }}
          >
            Settings
          </h1>
          <p style={{ fontSize: 13, color: T.textDim, marginTop: 3 }}>
            Workspace preferences and system configuration
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn onClick={() => toast("Changes discarded")}>Cancel</Btn>
          <Btn
            dark
            onClick={handleSave}
            loading={saving}
            icon={!saving && IC.check}
          >
            Save Changes
          </Btn>
        </div>
      </div>

      <Sec title="General" sub="Organization and locale" icon={IC.globe}>
        <div style={G2}>
          <F label="Organization Name" val={org} set={setOrg} />
          <F
            label="Timezone"
            val={tz}
            set={setTz}
            opts={[
              "Asia/Ulaanbaatar",
              "UTC",
              "Asia/Tokyo",
              "Europe/London",
              "America/New_York",
            ].map((c) => ({ v: c, l: c }))}
          />
          <F
            label="Currency"
            val={cur}
            set={setCur}
            opts={[
              { v: "MNT", l: "MNT — Mongolian Tögrög" },
              { v: "USD", l: "USD — US Dollar" },
              { v: "EUR", l: "EUR — Euro" },
            ]}
          />
          <F
            label="Language"
            val="en"
            set={() => {}}
            opts={[
              { v: "en", l: "English" },
              { v: "mn", l: "Монгол" },
            ]}
          />
        </div>
      </Sec>

      <Sec title="Profile" sub="Your account information" icon={IC.user}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 18,
            padding: "13px 15px",
            background: "#FAFAFA",
            borderRadius: 9,
            border: `1px solid ${T.border}`,
          }}
        >
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: "50%",
              background: T.dark,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              fontWeight: 700,
              color: "#fff",
              flexShrink: 0,
            }}
          >
            BD
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: T.text }}>
              {name}
            </div>
            <div style={{ fontSize: 12, color: T.textDim, marginTop: 1 }}>
              {email} · Administrator
            </div>
          </div>
          <button
            onClick={() => toast("Photo upload dialog opened")}
            style={{
              marginLeft: "auto",
              fontSize: 12,
              color: T.textMid,
              background: "none",
              border: `1px solid ${T.border}`,
              padding: "6px 12px",
              borderRadius: 6,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 5,
              transition: "all .12s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#F0F0F0")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
          >
            {IC.upload} Upload photo
          </button>
        </div>
        <div style={G2}>
          <F label="Full Name" val={name} set={setName} />
          <F label="Email" val={email} set={setEmail} type="email" />
          <F label="Role" val="Administrator" set={() => {}} disabled />
          <F label="Phone" val={phone} set={setPhone} />
        </div>
      </Sec>

      <Sec title="Notifications" sub="Email and push alerts" icon={IC.bell}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0 40px",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11.5,
                fontWeight: 600,
                color: T.textDim,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Email Notifications
            </div>
            <TRow label="Asset assignments & returns" k="emailAssign" />
            <TRow label="Return requests" k="emailReturn" />
            <TRow label="Maintenance updates" k="emailMaint" />
            <TRow label="Weekly summary reports" k="emailReport" />
          </div>
          <div>
            <div
              style={{
                fontSize: 11.5,
                fontWeight: 600,
                color: T.textDim,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              In-App & Push
            </div>
            <TRow label="All activity notifications" k="pushAll" />
            <TRow label="Overdue task alerts" k="pushOverdue" />
            <TRow label="Weekly digest" k="weekly" />
          </div>
        </div>
      </Sec>

      <Sec
        title="Security"
        sub="Authentication and access control"
        icon={IC.shield}
      >
        {[
          {
            v: twoFA,
            s: setTwoFA,
            l: "Two-factor authentication",
            d: "Require 2FA for all admin logins",
          },
          {
            v: sessions,
            s: setSessions,
            l: "Active session alerts",
            d: "Notify when a new session starts",
          },
          {
            v: ipLog,
            s: setIpLog,
            l: "IP address logging",
            d: "Log IP addresses for all actions",
          },
        ].map((item) => (
          <div
            key={item.l}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "11px 13px",
              borderRadius: 8,
              marginBottom: 8,
              background: "#FAFAFA",
              border: `1px solid ${T.border}`,
            }}
          >
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: T.text }}>
                {item.l}
              </div>
              <div style={{ fontSize: 11.5, color: T.textDim, marginTop: 2 }}>
                {item.d}
              </div>
            </div>
            <Toggle on={item.v} set={item.s} />
          </div>
        ))}
        <Btn
          onClick={() => toast("Password reset email sent to " + email)}
          icon={IC.key}
          style={{ marginTop: 8 }}
        >
          Change Password
        </Btn>
      </Sec>

      <Sec
        title="System Configuration"
        sub="Asset lifecycle and audit retention"
        icon={IC.cog}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "0 20px",
            marginBottom: 20,
          }}
        >
          <F
            label="Auto-retire after (months)"
            val={autoRetire}
            set={setAutoRetire}
            type="number"
          />
          <F
            label="Low stock alert (units)"
            val={lowStock}
            set={setLowStock}
            type="number"
          />
          <F
            label="Audit log retention (months)"
            val={auditRetain}
            set={setAuditRetain}
            type="number"
          />
        </div>
        <div
          style={{
            padding: "14px 16px",
            borderRadius: 9,
            border: `1px solid ${T.red}30`,
            background: T.redBg + "55",
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: T.red,
              marginBottom: 4,
            }}
          >
            Danger Zone
          </div>
          <div style={{ fontSize: 12, color: T.textMid, marginBottom: 12 }}>
            These actions are irreversible. All data will be permanently
            deleted.
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <Btn danger onClick={() => setConfirm(true)} icon={IC.trash}>
              Reset All Data
            </Btn>
            <Btn
              onClick={() => {
                exportAllData();
                toast("Data exported and scheduled for deletion");
              }}
              icon={IC.dl}
            >
              Export & Delete
            </Btn>
          </div>
        </div>
      </Sec>
    </div>
  );
}

function exportAllData() {
  const data = JSON.stringify(
    {
      assets: INIT_ASSETS,
      employees: EMPLOYEES,
      timestamp: new Date().toISOString(),
    },
    null,
    2,
  );
  const b = new Blob([data], { type: "application/json" });
  const u = URL.createObjectURL(b);
  const l = document.createElement("a");
  l.href = u;
  l.download = "ams-export.json";
  l.click();
}

/* ═══════════════════════════════════════════════════════════════════════
   ROOT APP — shared state at top level
═══════════════════════════════════════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState("home");
  const [assets, setAssets] = useState(INIT_ASSETS);
  const [assignments, setAssignments] = useState(INIT_ASSIGNMENTS);
  const [auditLog, setAuditLog] = useState(INIT_AUDIT);
  const [toasts, setToasts] = useState([]);

  const toast = useCallback((msg, type = "success") => {
    const id = Date.now();
    setToasts((p) => [...p, { id, msg, danger: type === "danger" }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 3000);
  }, []);

  const shared = { assets, setAssets, toast, auditLog, setAuditLog };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: T.bg,
        overflow: "hidden",
      }}
    >
      <style>{CSS}</style>
      <Sidebar page={page} setPage={setPage} assets={assets} />
      <main
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {page === "home" && <HomePage {...shared} setPage={setPage} />}
        {page === "assets" && <AssetsPage {...shared} />}
        {page === "assign" && (
          <AssignmentsPage
            {...shared}
            assignments={assignments}
            setAssignments={setAssignments}
          />
        )}
        {page === "census" && <CensusPage {...shared} />}
        {page === "offboard" && <OffboardingPage {...shared} />}
        {page === "reports" && <ReportsPage {...shared} />}
        {page === "storage" && <StoragePage {...shared} />}
        {page === "settings" && <SettingsPage {...shared} />}
      </main>
      <ToastStack toasts={toasts} />
    </div>
  );
}
