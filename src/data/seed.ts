// ============================================
// SIH Platform — Comprehensive Demo Seed Data
// ============================================

import type {
  User, Case, Person, Vehicle, Identifier, Location,
  Document, Evidence, Event, Relationship, Alert, Insight,
  AuditLog, Organization,
} from '@/types';

// ====================== USERS ======================
export const seedUsers: User[] = [
  {
    id: 'U-001', name: 'Admin Kumar', officerId: 'admin.demo',
    role: 'SUPER_ADMIN', email: 'admin@demo.sih.gov.in', department: 'Central Command',
    isActive: true, createdAt: '2025-01-15T08:00:00Z', lastLoginAt: '2026-09-09T14:30:00Z',
  },
  {
    id: 'U-002', name: 'Inspector Priya Sharma', officerId: 'officer.demo',
    role: 'INVESTIGATING_OFFICER', email: 'priya.sharma@demo.sih.gov.in', department: 'Criminal Investigation',
    isActive: true, createdAt: '2025-03-10T08:00:00Z', lastLoginAt: '2026-09-09T16:00:00Z',
  },
  {
    id: 'U-003', name: 'Dr. Kavita Reddy', officerId: 'forensic.demo',
    role: 'FORENSIC_OFFICER', email: 'kavita.reddy@demo.sih.gov.in', department: 'Forensic Lab',
    isActive: true, createdAt: '2025-04-01T08:00:00Z', lastLoginAt: '2026-09-09T12:00:00Z',
  },
  {
    id: 'U-004', name: 'Analyst Rajan Patel', officerId: 'analyst.demo',
    role: 'ANALYST', email: 'rajan.patel@demo.sih.gov.in', department: 'Intelligence Analysis',
    isActive: true, createdAt: '2025-05-20T08:00:00Z', lastLoginAt: '2026-09-09T11:00:00Z',
  },
  {
    id: 'U-005', name: 'Auditor Meena Iyer', officerId: 'auditor.demo',
    role: 'AUDITOR', email: 'meena.iyer@demo.sih.gov.in', department: 'Internal Audit',
    isActive: true, createdAt: '2025-06-15T08:00:00Z', lastLoginAt: '2026-09-09T09:00:00Z',
  },
];

// ====================== CASES ======================
export const seedCases: Case[] = [
  {
    id: 'C-001', caseNumber: '2026-041', title: 'Operation Trishul',
    description: 'Multi-entity investigation involving potential document fraud, cross-jurisdictional vehicle movements, and coordinated activities across multiple locations in the Central Zone.',
    status: 'ACTIVE', priority: 'HIGH', leadOfficerId: 'U-002', leadOfficerName: 'Inspector Priya Sharma',
    assignedOfficerIds: ['U-002', 'U-003'], createdAt: '2026-07-15T09:00:00Z', updatedAt: '2026-09-09T16:30:00Z',
    entityCount: 12, relationshipCount: 7, eventCount: 5, crossCaseLinks: 3, alertCount: 2, evidenceCount: 4,
  },
  {
    id: 'C-002', caseNumber: '2026-017', title: 'Operation Kavach',
    description: 'Financial document irregularity investigation linked to multiple identity anomalies and suspicious vehicle registrations.',
    status: 'ACTIVE', priority: 'HIGH', leadOfficerId: 'U-002', leadOfficerName: 'Inspector Priya Sharma',
    assignedOfficerIds: ['U-002'], createdAt: '2026-03-22T10:00:00Z', updatedAt: '2026-09-08T14:00:00Z',
    entityCount: 8, relationshipCount: 5, eventCount: 3, crossCaseLinks: 2, alertCount: 1, evidenceCount: 3,
  },
  {
    id: 'C-003', caseNumber: '2025-089', title: 'Operation Netra',
    description: 'Long-running surveillance pattern analysis involving repeated appearances at sensitive locations and cross-district vehicle movements.',
    status: 'UNDER_REVIEW', priority: 'MEDIUM', leadOfficerId: 'U-002', leadOfficerName: 'Inspector Priya Sharma',
    assignedOfficerIds: ['U-002', 'U-004'], createdAt: '2025-11-05T08:00:00Z', updatedAt: '2026-08-30T12:00:00Z',
    entityCount: 6, relationshipCount: 4, eventCount: 4, crossCaseLinks: 1, alertCount: 1, evidenceCount: 2,
  },
  {
    id: 'C-004', caseNumber: '2026-052', title: 'Operation Sudarshan',
    description: 'Investigation into coordinated identity fraud ring operating across state borders.',
    status: 'ACTIVE', priority: 'CRITICAL', leadOfficerId: 'U-002', leadOfficerName: 'Inspector Priya Sharma',
    assignedOfficerIds: ['U-002', 'U-003', 'U-004'], createdAt: '2026-08-01T07:00:00Z', updatedAt: '2026-09-09T18:00:00Z',
    entityCount: 15, relationshipCount: 10, eventCount: 7, crossCaseLinks: 4, alertCount: 3, evidenceCount: 5,
  },
  {
    id: 'C-005', caseNumber: '2026-038', title: 'Operation Vajra',
    description: 'Financial trail analysis involving shell organizations and layered transactions.',
    status: 'ACTIVE', priority: 'MEDIUM', leadOfficerId: 'U-004', leadOfficerName: 'Analyst Rajan Patel',
    assignedOfficerIds: ['U-004'], createdAt: '2026-06-10T09:00:00Z', updatedAt: '2026-09-07T11:00:00Z',
    entityCount: 9, relationshipCount: 6, eventCount: 3, crossCaseLinks: 2, alertCount: 1, evidenceCount: 3,
  },
  {
    id: 'C-006', caseNumber: '2026-063', title: 'Operation Dhanush',
    description: 'Counterfeit document production network investigation.',
    status: 'PENDING', priority: 'HIGH', leadOfficerId: 'U-003', leadOfficerName: 'Dr. Kavita Reddy',
    assignedOfficerIds: ['U-003'], createdAt: '2026-08-20T10:00:00Z', updatedAt: '2026-09-05T15:00:00Z',
    entityCount: 5, relationshipCount: 3, eventCount: 2, crossCaseLinks: 1, alertCount: 1, evidenceCount: 2,
  },
  {
    id: 'C-007', caseNumber: '2025-112', title: 'Operation Shakti',
    description: 'Historic case involving identity theft patterns now linked to current investigations.',
    status: 'CLOSED', priority: 'LOW', leadOfficerId: 'U-002', leadOfficerName: 'Inspector Priya Sharma',
    assignedOfficerIds: ['U-002'], createdAt: '2025-08-15T08:00:00Z', updatedAt: '2026-01-30T10:00:00Z',
    closedAt: '2026-01-30T10:00:00Z',
    entityCount: 4, relationshipCount: 2, eventCount: 2, crossCaseLinks: 0, alertCount: 0, evidenceCount: 1,
  },
  {
    id: 'C-008', caseNumber: '2026-071', title: 'Operation Agni',
    description: 'Cyber-enabled document forgery investigation with digital trail analysis.',
    status: 'ACTIVE', priority: 'HIGH', leadOfficerId: 'U-004', leadOfficerName: 'Analyst Rajan Patel',
    assignedOfficerIds: ['U-004', 'U-003'], createdAt: '2026-09-01T08:00:00Z', updatedAt: '2026-09-09T17:00:00Z',
    entityCount: 7, relationshipCount: 4, eventCount: 3, crossCaseLinks: 2, alertCount: 2, evidenceCount: 3,
  },
  {
    id: 'C-999', caseNumber: '2026-999', title: 'Operation Restricted',
    description: 'Classified investigation — access restricted to authorized personnel only.',
    status: 'ACTIVE', priority: 'CRITICAL', leadOfficerId: 'U-001', leadOfficerName: 'Admin Kumar',
    assignedOfficerIds: ['U-001'], createdAt: '2026-09-05T06:00:00Z', updatedAt: '2026-09-09T20:00:00Z',
    entityCount: 3, relationshipCount: 1, eventCount: 1, crossCaseLinks: 0, alertCount: 1, evidenceCount: 1,
  },
];

// ====================== PERSONS ======================
export const seedPersons: Person[] = [
  {
    id: 'P-1042', personId: 'P-1042', name: 'Rahul Mehra', aliases: ['R. Mehra', 'Rahul M.'],
    dob: '1994-08-17', nationality: 'IND', gender: 'Male', status: 'UNDER_REVIEW', riskLevel: 'HIGH',
    associatedCaseIds: ['C-001', 'C-002', 'C-003'], createdAt: '2025-11-10T08:00:00Z', updatedAt: '2026-09-09T16:00:00Z',
  },
  {
    id: 'P-2041', personId: 'P-2041', name: 'Arjun Verma', aliases: ['A. Verma'],
    dob: '1991-03-24', nationality: 'IND', gender: 'Male', status: 'UNDER_REVIEW', riskLevel: 'HIGH',
    associatedCaseIds: ['C-001', 'C-002'], createdAt: '2026-04-15T08:00:00Z', updatedAt: '2026-09-08T14:00:00Z',
  },
  {
    id: 'P-3099', personId: 'P-3099', name: 'Sameer Khan', aliases: ['S. Khan', 'Sam K.'],
    dob: '1989-11-02', nationality: 'IND', gender: 'Male', status: 'MONITORING', riskLevel: 'MEDIUM',
    associatedCaseIds: ['C-001', 'C-004'], createdAt: '2026-05-20T08:00:00Z', updatedAt: '2026-09-07T12:00:00Z',
  },
  {
    id: 'P-4012', personId: 'P-4012', name: 'Deepak Singh', aliases: ['D. Singh'],
    dob: '1987-06-11', nationality: 'IND', gender: 'Male', status: 'CLEARED', riskLevel: 'LOW',
    associatedCaseIds: ['C-003'], createdAt: '2025-12-01T08:00:00Z', updatedAt: '2026-06-15T10:00:00Z',
  },
  {
    id: 'P-5023', personId: 'P-5023', name: 'Vikram Joshi', aliases: ['V. Joshi', 'Vik'],
    dob: '1993-01-30', nationality: 'IND', gender: 'Male', status: 'UNDER_REVIEW', riskLevel: 'HIGH',
    associatedCaseIds: ['C-004', 'C-005'], createdAt: '2026-07-10T08:00:00Z', updatedAt: '2026-09-09T15:00:00Z',
  },
  {
    id: 'P-6034', personId: 'P-6034', name: 'Priyanka Deshmukh', aliases: ['P. Deshmukh'],
    dob: '1996-09-18', nationality: 'IND', gender: 'Female', status: 'MONITORING', riskLevel: 'MEDIUM',
    associatedCaseIds: ['C-002', 'C-005'], createdAt: '2026-04-01T08:00:00Z', updatedAt: '2026-09-06T11:00:00Z',
  },
  {
    id: 'P-7045', personId: 'P-7045', name: 'Rajesh Nair', aliases: ['R. Nair'],
    dob: '1985-12-05', nationality: 'IND', gender: 'Male', status: 'UNDER_REVIEW', riskLevel: 'MEDIUM',
    associatedCaseIds: ['C-004', 'C-006'], createdAt: '2026-08-05T08:00:00Z', updatedAt: '2026-09-08T16:00:00Z',
  },
  {
    id: 'P-8056', personId: 'P-8056', name: 'Anita Gupta', aliases: ['A. Gupta'],
    dob: '1990-04-22', nationality: 'IND', gender: 'Female', status: 'CLEARED', riskLevel: 'LOW',
    associatedCaseIds: ['C-003'], createdAt: '2025-11-20T08:00:00Z', updatedAt: '2026-03-10T10:00:00Z',
  },
  {
    id: 'P-9067', personId: 'P-9067', name: 'Mohammed Farooq', aliases: ['M. Farooq', 'Farooq M.'],
    dob: '1988-07-14', nationality: 'IND', gender: 'Male', status: 'MONITORING', riskLevel: 'MEDIUM',
    associatedCaseIds: ['C-005', 'C-008'], createdAt: '2026-06-15T08:00:00Z', updatedAt: '2026-09-09T13:00:00Z',
  },
  {
    id: 'P-1078', personId: 'P-1078', name: 'Sanjay Tiwari', aliases: ['S. Tiwari'],
    dob: '1992-02-28', nationality: 'IND', gender: 'Male', status: 'UNDER_REVIEW', riskLevel: 'HIGH',
    associatedCaseIds: ['C-004', 'C-008'], createdAt: '2026-08-10T08:00:00Z', updatedAt: '2026-09-09T17:00:00Z',
  },
  {
    id: 'P-1189', personId: 'P-1189', name: 'Kavita Saxena', aliases: ['K. Saxena'],
    dob: '1995-10-09', nationality: 'IND', gender: 'Female', status: 'MONITORING', riskLevel: 'MEDIUM',
    associatedCaseIds: ['C-006'], createdAt: '2026-08-22T08:00:00Z', updatedAt: '2026-09-05T14:00:00Z',
  },
  {
    id: 'P-1290', personId: 'P-1290', name: 'Amit Chaudhary', aliases: ['A. Chaudhary'],
    dob: '1986-05-17', nationality: 'IND', gender: 'Male', status: 'CLEARED', riskLevel: 'LOW',
    associatedCaseIds: ['C-005'], createdAt: '2026-06-20T08:00:00Z', updatedAt: '2026-08-25T10:00:00Z',
  },
  {
    id: 'P-1301', personId: 'P-1301', name: 'Neha Kapoor', aliases: ['N. Kapoor'],
    dob: '1997-03-12', nationality: 'IND', gender: 'Female', status: 'UNDER_REVIEW', riskLevel: 'MEDIUM',
    associatedCaseIds: ['C-008'], createdAt: '2026-09-02T08:00:00Z', updatedAt: '2026-09-09T16:00:00Z',
  },
  {
    id: 'P-1412', personId: 'P-1412', name: 'Harsh Pandey', aliases: ['H. Pandey'],
    dob: '1991-08-25', nationality: 'IND', gender: 'Male', status: 'MONITORING', riskLevel: 'MEDIUM',
    associatedCaseIds: ['C-001', 'C-006'], createdAt: '2026-07-01T08:00:00Z', updatedAt: '2026-09-04T12:00:00Z',
  },
  {
    id: 'P-1523', personId: 'P-1523', name: 'Sunita Yadav', aliases: ['S. Yadav'],
    dob: '1993-12-03', nationality: 'IND', gender: 'Female', status: 'CLEARED', riskLevel: 'LOW',
    associatedCaseIds: ['C-002'], createdAt: '2026-04-10T08:00:00Z', updatedAt: '2026-07-20T10:00:00Z',
  },
  {
    id: 'P-1634', personId: 'P-1634', name: 'Rakesh Dubey', aliases: ['R. Dubey'],
    dob: '1984-01-19', nationality: 'IND', gender: 'Male', status: 'UNDER_REVIEW', riskLevel: 'HIGH',
    associatedCaseIds: ['C-004', 'C-005', 'C-008'], createdAt: '2026-08-15T08:00:00Z', updatedAt: '2026-09-09T18:00:00Z',
  },
];

// ====================== VEHICLES ======================
export const seedVehicles: Vehicle[] = [
  { id: 'V-001', vehicleId: 'V-001', registration: 'MP09-DEMO-4821', type: 'Sedan', make: 'Maruti', model: 'Swift', color: 'Silver', associatedPersonIds: ['P-1042', 'P-2041'], associatedCaseIds: ['C-001', 'C-002'], createdAt: '2026-05-01T08:00:00Z' },
  { id: 'V-002', vehicleId: 'V-002', registration: 'MP09-TEST-7712', type: 'SUV', make: 'Mahindra', model: 'Scorpio', color: 'Black', associatedPersonIds: ['P-3099'], associatedCaseIds: ['C-001', 'C-004'], createdAt: '2026-06-15T08:00:00Z' },
  { id: 'V-003', vehicleId: 'V-003', registration: 'MP04-DEMO-3345', type: 'Motorcycle', make: 'Royal Enfield', model: 'Classic', color: 'Green', associatedPersonIds: ['P-5023'], associatedCaseIds: ['C-004'], createdAt: '2026-07-20T08:00:00Z' },
  { id: 'V-004', vehicleId: 'V-004', registration: 'DL01-DEMO-9988', type: 'Sedan', make: 'Hyundai', model: 'Verna', color: 'White', associatedPersonIds: ['P-6034', 'P-9067'], associatedCaseIds: ['C-005'], createdAt: '2026-06-25T08:00:00Z' },
  { id: 'V-005', vehicleId: 'V-005', registration: 'MH12-TEST-5567', type: 'Truck', make: 'Tata', model: 'Ace', color: 'Blue', associatedPersonIds: ['P-7045'], associatedCaseIds: ['C-006'], createdAt: '2026-08-10T08:00:00Z' },
  { id: 'V-006', vehicleId: 'V-006', registration: 'MP09-DEMO-1122', type: 'Van', make: 'Maruti', model: 'Eeco', color: 'Grey', associatedPersonIds: ['P-1042', 'P-1412'], associatedCaseIds: ['C-001', 'C-003'], createdAt: '2026-03-18T08:00:00Z' },
  { id: 'V-007', vehicleId: 'V-007', registration: 'RJ14-TEST-6677', type: 'Sedan', make: 'Honda', model: 'City', color: 'Red', associatedPersonIds: ['P-1078', 'P-1634'], associatedCaseIds: ['C-008'], createdAt: '2026-09-02T08:00:00Z' },
  { id: 'V-008', vehicleId: 'V-008', registration: 'UP32-DEMO-4455', type: 'SUV', make: 'Toyota', model: 'Fortuner', color: 'Black', associatedPersonIds: ['P-5023', 'P-1634'], associatedCaseIds: ['C-004', 'C-005'], createdAt: '2026-08-05T08:00:00Z' },
];

// ====================== IDENTIFIERS ======================
export const seedIdentifiers: Identifier[] = [
  { id: 'ID-001', identifierId: 'ID-DEMO-88421', type: 'Phone', value: '91-XXXX-DEMO-421', valueMasked: '91-XXXX-XXX-421', associatedPersonId: 'P-1042', associatedCaseIds: ['C-001', 'C-002'], createdAt: '2026-05-10T08:00:00Z' },
  { id: 'ID-002', identifierId: 'ID-DEMO-77312', type: 'Phone', value: '91-XXXX-DEMO-312', valueMasked: '91-XXXX-XXX-312', associatedPersonId: 'P-2041', associatedCaseIds: ['C-001'], createdAt: '2026-06-01T08:00:00Z' },
  { id: 'ID-003', identifierId: 'ID-DEMO-55678', type: 'Email', value: 'demo-user-55@test.example', valueMasked: 'd***-55@test.example', associatedPersonId: 'P-3099', associatedCaseIds: ['C-001', 'C-004'], createdAt: '2026-06-20T08:00:00Z' },
  { id: 'ID-004', identifierId: 'ID-DEMO-99102', type: 'Bank Account', value: 'DEMO-XXXX-XXXX-9102', valueMasked: 'DEMO-XXXX-XXXX-9102', associatedPersonId: 'P-5023', associatedCaseIds: ['C-004', 'C-005'], createdAt: '2026-07-15T08:00:00Z' },
  { id: 'ID-005', identifierId: 'ID-DEMO-33456', type: 'Phone', value: '91-XXXX-DEMO-456', valueMasked: '91-XXXX-XXX-456', associatedPersonId: 'P-6034', associatedCaseIds: ['C-002', 'C-005'], createdAt: '2026-04-05T08:00:00Z' },
  { id: 'ID-006', identifierId: 'ID-DEMO-11234', type: 'Vehicle Registration', value: 'DL-DEMO-RC-11234', valueMasked: 'DL-DEMO-RC-***34', associatedPersonId: 'P-7045', associatedCaseIds: ['C-006'], createdAt: '2026-08-12T08:00:00Z' },
  { id: 'ID-007', identifierId: 'ID-DEMO-66789', type: 'Aadhaar (Demo)', value: 'DEMO-XXXX-XXXX-6789', valueMasked: 'DEMO-XXXX-XXXX-6789', associatedPersonId: 'P-1042', associatedCaseIds: ['C-001'], createdAt: '2026-05-15T08:00:00Z' },
  { id: 'ID-008', identifierId: 'ID-DEMO-44321', type: 'PAN (Demo)', value: 'DEMO-PAN-44321', valueMasked: 'DEMO-PAN-***21', associatedPersonId: 'P-1634', associatedCaseIds: ['C-004', 'C-008'], createdAt: '2026-08-20T08:00:00Z' },
  { id: 'ID-009', identifierId: 'ID-DEMO-22098', type: 'IMEI (Demo)', value: 'DEMO-IMEI-22098', valueMasked: 'DEMO-IMEI-***98', associatedPersonId: 'P-9067', associatedCaseIds: ['C-005', 'C-008'], createdAt: '2026-07-01T08:00:00Z' },
];

// ====================== LOCATIONS ======================
export const seedLocations: Location[] = [
  { id: 'L-001', locationId: 'L-001', name: 'Bhopal Central Zone', type: 'Urban Zone', lat: 23.2599, lng: 77.4126, address: 'Central Bhopal, MP', zone: 'Zone A', createdAt: '2025-01-01T00:00:00Z' },
  { id: 'L-002', locationId: 'L-002', name: 'Transit Checkpoint Alpha', type: 'Checkpoint', lat: 23.2800, lng: 77.4500, address: 'Highway NH-12 Checkpoint', zone: 'Zone B', createdAt: '2025-01-01T00:00:00Z' },
  { id: 'L-003', locationId: 'L-003', name: 'Industrial Sector 7', type: 'Industrial', lat: 23.2100, lng: 77.3800, address: 'BHEL Industrial Area', zone: 'Zone C', createdAt: '2025-01-01T00:00:00Z' },
  { id: 'L-004', locationId: 'L-004', name: 'Lake Road Camera Cluster', type: 'Surveillance Point', lat: 23.2350, lng: 77.4200, address: 'Upper Lake Road', zone: 'Zone A', createdAt: '2025-01-01T00:00:00Z' },
  { id: 'L-005', locationId: 'L-005', name: 'Railway Junction Delta', type: 'Transit Hub', lat: 23.2650, lng: 77.4350, address: 'Bhopal Junction', zone: 'Zone A', createdAt: '2025-01-01T00:00:00Z' },
  { id: 'L-006', locationId: 'L-006', name: 'Commercial District Gamma', type: 'Commercial', lat: 23.2450, lng: 77.4000, address: 'New Market Area', zone: 'Zone B', createdAt: '2025-01-01T00:00:00Z' },
  { id: 'L-007', locationId: 'L-007', name: 'Residential Block Echo', type: 'Residential', lat: 23.2900, lng: 77.4600, address: 'Arera Colony', zone: 'Zone C', createdAt: '2025-01-01T00:00:00Z' },
  { id: 'L-008', locationId: 'L-008', name: 'Border Checkpoint Bravo', type: 'Checkpoint', lat: 23.3100, lng: 77.4800, address: 'State Border NH-46', zone: 'Zone D', createdAt: '2025-01-01T00:00:00Z' },
  { id: 'L-009', locationId: 'L-009', name: 'Warehouse Complex Foxtrot', type: 'Industrial', lat: 23.1950, lng: 77.3600, address: 'Mandideep Industrial', zone: 'Zone D', createdAt: '2025-01-01T00:00:00Z' },
  { id: 'L-010', locationId: 'L-010', name: 'Tech Park Hotel Zone', type: 'Commercial', lat: 23.2300, lng: 77.4100, address: 'MP Nagar Zone II', zone: 'Zone B', createdAt: '2025-01-01T00:00:00Z' },
  { id: 'L-011', locationId: 'L-011', name: 'Airport Approach Road', type: 'Transit Hub', lat: 23.2870, lng: 77.3370, address: 'Raja Bhoj Airport Rd', zone: 'Zone E', createdAt: '2025-01-01T00:00:00Z' },
  { id: 'L-012', locationId: 'L-012', name: 'Old City Market Area', type: 'Urban Zone', lat: 23.2680, lng: 77.4050, address: 'Chowk Bazaar', zone: 'Zone A', createdAt: '2025-01-01T00:00:00Z' },
];

// ====================== ORGANIZATIONS ======================
export const seedOrganizations: Organization[] = [
  { id: 'ORG-001', name: 'Demo Trading Corp', type: 'Shell Company', description: 'Suspected front organization', associatedPersonIds: ['P-5023', 'P-1634'], createdAt: '2026-08-01T08:00:00Z' },
  { id: 'ORG-002', name: 'Demo Logistics Ltd', type: 'Transport', description: 'Logistics company linked to vehicle movements', associatedPersonIds: ['P-7045', 'P-3099'], createdAt: '2026-07-15T08:00:00Z' },
  { id: 'ORG-003', name: 'Demo Finance Associates', type: 'Financial', description: 'Financial services linked to identity anomalies', associatedPersonIds: ['P-6034', 'P-9067'], createdAt: '2026-06-20T08:00:00Z' },
];

// ====================== DOCUMENTS ======================
export const seedDocuments: Document[] = [
  {
    id: 'D-001', documentId: 'DOC-2026-041-009', caseId: 'C-001', personId: 'P-1042',
    documentType: 'Identity Card', fileName: 'identity_card_mehra.png', fileSize: 245760,
    mimeType: 'image/png', hash: 'a7f3d2e1b9c8f4a5e6d7c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2',
    analysisStatus: 'COMPLETED',
    ocrData: {
      accuracy: 96,
      fields: [
        { fieldName: 'Name', value: 'Rahul Mehra', confidence: 98, matchStatus: 'MATCH' },
        { fieldName: 'DOB', value: '1994-08-17', confidence: 97, matchStatus: 'MATCH' },
        { fieldName: 'Document Number', value: 'DOC-DEMO-44192', confidence: 95, matchStatus: 'MATCH' },
        { fieldName: 'Nationality', value: 'IND', confidence: 99, matchStatus: 'MATCH' },
        { fieldName: 'Expiry', value: '2030-06-21', confidence: 94, matchStatus: 'MATCH' },
        { fieldName: 'Photo Region', value: 'Present', confidence: 88, matchStatus: 'REVIEW_REQUIRED' },
      ],
      rawText: 'DEMO IDENTITY CARD\nName: Rahul Mehra\nDOB: 17/08/1994\nDoc No: DOC-DEMO-44192\nNationality: IND\nExpiry: 21/06/2030',
      mrzData: { status: 'PASSED', fields: { line1: 'DEMO<<MEHRA<<RAHUL', line2: 'DOC-DEMO-44192<IND<9408171M3006217' } },
    },
    forensicData: {
      overallScore: 82,
      imageQuality: { status: 'NORMAL', score: 91, details: { resolution: '300 DPI', blur: 'Minimal', glare: 'None', compression: 'Standard', perspective: 'Normal' } },
      visualIntegrity: { status: 'SUSPICIOUS', score: 74, details: { textRegion: 'Normal', imageRegion: 'Anomaly detected in photo boundary', copyPaste: 'No indicators', syntheticPattern: 'Possible synthetic artifacts' } },
      textAnalysis: { status: 'REVIEW', score: 82, details: { fontConsistency: 'Consistent', spacing: 'Normal', alignment: 'Minor deviation' } },
      signals: [
        { name: 'Image Quality', status: 'NORMAL', description: 'Document image meets quality thresholds', explanation: 'Resolution, blur, and compression levels are within expected parameters.' },
        { name: 'Photo Boundary', status: 'SUSPICIOUS', description: 'Photo region shows potential manipulation indicators', explanation: 'Edge analysis detected subtle inconsistencies at the photo-to-background boundary.' },
        { name: 'Font Analysis', status: 'NORMAL', description: 'Text font is consistent', explanation: 'Font type and sizing are uniform across the document.' },
        { name: 'Synthetic Check', status: 'REVIEW', description: 'Possible synthetic pattern indicators', explanation: 'Pattern analysis detected minor artifacts that warrant manual review.' },
      ],
    },
    entityResolution: {
      candidates: [
        { entityId: 'P-1042', entityName: 'Rahul Mehra', confidence: 94, matchSignals: [
          { field: 'Name similarity', score: 96, description: 'Exact name match' },
          { field: 'DOB match', score: 100, description: 'Date of birth matches exactly' },
          { field: 'Document linkage', score: 100, description: 'Document number linked to entity record' },
          { field: 'Historical association', score: 87, description: 'Entity has prior investigation history' },
        ]},
        { entityId: 'P-1290', entityName: 'Rahul Kumar', confidence: 42, matchSignals: [
          { field: 'Name similarity', score: 55, description: 'Partial first name match' },
          { field: 'DOB match', score: 0, description: 'No DOB match' },
          { field: 'Document linkage', score: 0, description: 'No document linkage' },
          { field: 'Historical association', score: 12, description: 'No significant association' },
        ]},
        { entityId: 'P-1042', entityName: 'R. Mehra', confidence: 89, matchSignals: [
          { field: 'Name similarity', score: 82, description: 'Alias match for Rahul Mehra' },
          { field: 'DOB match', score: 100, description: 'Date of birth matches' },
          { field: 'Document linkage', score: 85, description: 'Alias linked to same entity' },
          { field: 'Historical association', score: 87, description: 'Same entity record' },
        ]},
      ],
      resolvedEntityId: 'P-1042',
      resolvedConfidence: 94,
      status: 'RESOLVED',
    },
    uploadedBy: 'U-002', createdAt: '2026-09-09T10:42:00Z', updatedAt: '2026-09-09T10:45:00Z',
  },
  {
    id: 'D-002', documentId: 'DOC-2026-041-010', caseId: 'C-001', personId: 'P-2041',
    documentType: 'Driving License', fileName: 'dl_verma.jpg', fileSize: 189440,
    mimeType: 'image/jpeg', hash: 'b8f4e3d2c1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4',
    analysisStatus: 'COMPLETED',
    ocrData: { accuracy: 93, fields: [
      { fieldName: 'Name', value: 'Arjun Verma', confidence: 95, matchStatus: 'MATCH' },
      { fieldName: 'DOB', value: '1991-03-24', confidence: 92, matchStatus: 'MATCH' },
      { fieldName: 'DL Number', value: 'DL-DEMO-78901', confidence: 91, matchStatus: 'MATCH' },
    ], mrzData: { status: 'NOT_APPLICABLE' } },
    forensicData: { overallScore: 90, imageQuality: { status: 'NORMAL', score: 93, details: { resolution: '300 DPI', blur: 'None', glare: 'Minimal', compression: 'Standard', perspective: 'Normal' } }, visualIntegrity: { status: 'NORMAL', score: 88, details: { textRegion: 'Normal', imageRegion: 'Normal', copyPaste: 'No indicators', syntheticPattern: 'None' } }, textAnalysis: { status: 'NORMAL', score: 91, details: { fontConsistency: 'Consistent', spacing: 'Normal', alignment: 'Normal' } }, signals: [] },
    uploadedBy: 'U-002', createdAt: '2026-09-08T14:20:00Z', updatedAt: '2026-09-08T14:25:00Z',
  },
  {
    id: 'D-003', documentId: 'DOC-2026-017-003', caseId: 'C-002', personId: 'P-1042',
    documentType: 'Financial Document', fileName: 'financial_doc_mehra.pdf', fileSize: 512000,
    mimeType: 'application/pdf', hash: 'c9f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5',
    analysisStatus: 'COMPLETED',
    ocrData: { accuracy: 91, fields: [
      { fieldName: 'Account Holder', value: 'Rahul Mehra', confidence: 93, matchStatus: 'MATCH' },
      { fieldName: 'Account Number', value: 'DEMO-XXXX-9102', confidence: 90, matchStatus: 'REVIEW_REQUIRED' },
    ], mrzData: { status: 'NOT_APPLICABLE' } },
    forensicData: { overallScore: 78, imageQuality: { status: 'NORMAL', score: 85, details: { resolution: '150 DPI', blur: 'None', glare: 'None', compression: 'High', perspective: 'Normal' } }, visualIntegrity: { status: 'REVIEW', score: 72, details: { textRegion: 'Minor anomaly', imageRegion: 'Normal', copyPaste: 'Possible indicator', syntheticPattern: 'None' } }, textAnalysis: { status: 'REVIEW', score: 76, details: { fontConsistency: 'Minor variation', spacing: 'Normal', alignment: 'Normal' } }, signals: [{ name: 'Font Variation', status: 'REVIEW', description: 'Inconsistent font detected in amount field', explanation: 'Two different font families were detected within the document body.' }] },
    uploadedBy: 'U-003', createdAt: '2026-06-20T11:00:00Z', updatedAt: '2026-06-20T11:30:00Z',
  },
  {
    id: 'D-004', documentId: 'DOC-2026-052-001', caseId: 'C-004', personId: 'P-5023',
    documentType: 'Identity Card', fileName: 'id_joshi.png', fileSize: 220160,
    mimeType: 'image/png', hash: 'd0f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6',
    analysisStatus: 'COMPLETED', ocrData: { accuracy: 89, fields: [
      { fieldName: 'Name', value: 'Vikram Joshi', confidence: 91, matchStatus: 'MATCH' },
      { fieldName: 'DOB', value: '1993-01-30', confidence: 88, matchStatus: 'MATCH' },
    ], mrzData: { status: 'PASSED' } },
    forensicData: { overallScore: 85, imageQuality: { status: 'NORMAL', score: 88, details: {} }, visualIntegrity: { status: 'NORMAL', score: 84, details: {} }, textAnalysis: { status: 'NORMAL', score: 86, details: {} }, signals: [] },
    uploadedBy: 'U-002', createdAt: '2026-08-05T09:00:00Z', updatedAt: '2026-08-05T09:20:00Z',
  },
  {
    id: 'D-005', documentId: 'DOC-2026-052-002', caseId: 'C-004', personId: 'P-7045',
    documentType: 'Travel Document', fileName: 'travel_nair.jpg', fileSize: 198656,
    mimeType: 'image/jpeg', hash: 'e1f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7',
    analysisStatus: 'COMPLETED', ocrData: { accuracy: 87, fields: [
      { fieldName: 'Name', value: 'Rajesh Nair', confidence: 89, matchStatus: 'MATCH' },
    ], mrzData: { status: 'PASSED' } },
    forensicData: { overallScore: 79, imageQuality: { status: 'NORMAL', score: 82, details: {} }, visualIntegrity: { status: 'REVIEW', score: 75, details: {} }, textAnalysis: { status: 'REVIEW', score: 80, details: {} }, signals: [{ name: 'Stamp Anomaly', status: 'REVIEW', description: 'Entry stamp alignment inconsistency', explanation: 'The entry stamp appears slightly rotated compared to expected orientation.' }] },
    uploadedBy: 'U-003', createdAt: '2026-08-10T10:00:00Z', updatedAt: '2026-08-10T10:15:00Z',
  },
  {
    id: 'D-006', documentId: 'DOC-2026-063-001', caseId: 'C-006', personId: 'P-1189',
    documentType: 'Utility Bill', fileName: 'utility_saxena.pdf', fileSize: 102400,
    mimeType: 'application/pdf', hash: 'f2f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8',
    analysisStatus: 'PENDING', ocrData: undefined, forensicData: undefined,
    uploadedBy: 'U-003', createdAt: '2026-08-25T09:00:00Z', updatedAt: '2026-08-25T09:00:00Z',
  },
  {
    id: 'D-007', documentId: 'DOC-2026-071-001', caseId: 'C-008', personId: 'P-1301',
    documentType: 'Identity Card', fileName: 'id_kapoor.png', fileSize: 235520,
    mimeType: 'image/png', hash: 'a3f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9',
    analysisStatus: 'PROCESSING', ocrData: undefined, forensicData: undefined,
    uploadedBy: 'U-004', createdAt: '2026-09-05T11:00:00Z', updatedAt: '2026-09-05T11:05:00Z',
  },
  {
    id: 'D-008', documentId: 'DOC-2025-089-005', caseId: 'C-003', personId: 'P-4012',
    documentType: 'Address Proof', fileName: 'address_singh.pdf', fileSize: 156672,
    mimeType: 'application/pdf', hash: 'b4f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0',
    analysisStatus: 'COMPLETED', ocrData: { accuracy: 94, fields: [
      { fieldName: 'Name', value: 'Deepak Singh', confidence: 96, matchStatus: 'MATCH' },
      { fieldName: 'Address', value: 'Demo Residential Area, Bhopal', confidence: 92, matchStatus: 'MATCH' },
    ], mrzData: { status: 'NOT_APPLICABLE' } },
    forensicData: { overallScore: 92, imageQuality: { status: 'NORMAL', score: 95, details: {} }, visualIntegrity: { status: 'NORMAL', score: 91, details: {} }, textAnalysis: { status: 'NORMAL', score: 93, details: {} }, signals: [] },
    uploadedBy: 'U-002', createdAt: '2025-12-10T14:00:00Z', updatedAt: '2025-12-10T14:20:00Z',
  },
];

// ====================== EVENTS ======================
export const seedEvents: Event[] = [
  { id: 'EVT-001', eventId: 'EVT-001', caseId: 'C-001', entityId: 'P-1042', entityType: 'PERSON', entityName: 'Rahul Mehra', locationId: 'L-001', locationName: 'Bhopal Central Zone', timestamp: '2026-09-09T09:40:00Z', description: 'Person identified at Bhopal Central Zone via demo surveillance data', source: 'Demo-CAM-05', confidence: 87 },
  { id: 'EVT-002', eventId: 'EVT-002', caseId: 'C-001', entityId: 'V-001', entityType: 'VEHICLE', entityName: 'MP09-DEMO-4821', locationId: 'L-002', locationName: 'Transit Checkpoint Alpha', timestamp: '2026-09-09T10:15:00Z', description: 'Vehicle MP09-DEMO-4821 recorded at Transit Checkpoint Alpha', source: 'Demo-ANPR-02', confidence: 95 },
  { id: 'EVT-003', eventId: 'EVT-003', caseId: 'C-001', entityId: 'P-1042', entityType: 'PERSON', entityName: 'Rahul Mehra', locationId: 'L-004', locationName: 'Lake Road Camera Cluster', timestamp: '2026-09-09T10:42:00Z', description: 'Possible person event at Camera Demo-12', source: 'Demo-CAM-12', confidence: 74 },
  { id: 'EVT-004', eventId: 'EVT-004', caseId: 'C-001', entityId: 'V-001', entityType: 'VEHICLE', entityName: 'MP09-DEMO-4821', locationId: 'L-003', locationName: 'Industrial Sector 7', timestamp: '2026-09-09T11:05:00Z', description: 'Vehicle MP09-DEMO-4821 recorded at Industrial Sector 7', source: 'Demo-ANPR-07', confidence: 92 },
  { id: 'EVT-005', eventId: 'EVT-005', caseId: 'C-001', entityId: 'ID-001', entityType: 'IDENTIFIER', entityName: 'ID-DEMO-88421', locationId: 'L-006', locationName: 'Commercial District Gamma', timestamp: '2026-09-09T11:31:00Z', description: 'Identifier event — ID-DEMO-88421 activity detected', source: 'Demo-Network-Monitor', confidence: 81 },
  { id: 'EVT-006', eventId: 'EVT-006', caseId: 'C-001', entityId: 'P-1042', entityType: 'PERSON', entityName: 'Rahul Mehra', locationId: 'L-004', locationName: 'Lake Road Camera Cluster', timestamp: '2026-09-09T12:10:00Z', description: 'Possible person event at Camera Demo-18', source: 'Demo-CAM-18', confidence: 74 },
  { id: 'EVT-007', eventId: 'EVT-007', caseId: 'C-001', entityId: 'P-2041', entityType: 'PERSON', entityName: 'Arjun Verma', locationId: 'L-003', locationName: 'Industrial Sector 7', timestamp: '2026-09-09T12:28:00Z', description: 'Cross-case relationship detected — person at same location', source: 'Demo-Analysis', confidence: 79 },
  { id: 'EVT-008', eventId: 'EVT-008', caseId: 'C-002', entityId: 'P-1042', entityType: 'PERSON', entityName: 'Rahul Mehra', locationId: 'L-005', locationName: 'Railway Junction Delta', timestamp: '2026-09-08T14:30:00Z', description: 'Person observed near Railway Junction Delta', source: 'Demo-CAM-21', confidence: 68 },
  { id: 'EVT-009', eventId: 'EVT-009', caseId: 'C-002', entityId: 'V-001', entityType: 'VEHICLE', entityName: 'MP09-DEMO-4821', locationId: 'L-006', locationName: 'Commercial District Gamma', timestamp: '2026-09-08T15:10:00Z', description: 'Vehicle MP09-DEMO-4821 observed in Commercial District', source: 'Demo-ANPR-11', confidence: 91 },
  { id: 'EVT-010', eventId: 'EVT-010', caseId: 'C-002', entityId: 'P-6034', entityType: 'PERSON', entityName: 'Priyanka Deshmukh', locationId: 'L-010', locationName: 'Tech Park Hotel Zone', timestamp: '2026-09-08T16:00:00Z', description: 'Person identified at Tech Park Hotel Zone', source: 'Demo-CAM-30', confidence: 72 },
  { id: 'EVT-011', eventId: 'EVT-011', caseId: 'C-003', entityId: 'P-1042', entityType: 'PERSON', entityName: 'Rahul Mehra', locationId: 'L-007', locationName: 'Residential Block Echo', timestamp: '2026-08-15T08:30:00Z', description: 'Person observed at Residential Block Echo', source: 'Demo-CAM-35', confidence: 65 },
  { id: 'EVT-012', eventId: 'EVT-012', caseId: 'C-003', entityId: 'V-006', entityType: 'VEHICLE', entityName: 'MP09-DEMO-1122', locationId: 'L-008', locationName: 'Border Checkpoint Bravo', timestamp: '2026-08-15T10:20:00Z', description: 'Vehicle MP09-DEMO-1122 at Border Checkpoint', source: 'Demo-ANPR-15', confidence: 94 },
  { id: 'EVT-013', eventId: 'EVT-013', caseId: 'C-004', entityId: 'P-5023', entityType: 'PERSON', entityName: 'Vikram Joshi', locationId: 'L-009', locationName: 'Warehouse Complex Foxtrot', timestamp: '2026-09-07T22:15:00Z', description: 'Person observed near Warehouse Complex', source: 'Demo-CAM-40', confidence: 71 },
  { id: 'EVT-014', eventId: 'EVT-014', caseId: 'C-004', entityId: 'V-002', entityType: 'VEHICLE', entityName: 'MP09-TEST-7712', locationId: 'L-003', locationName: 'Industrial Sector 7', timestamp: '2026-09-07T23:00:00Z', description: 'Vehicle MP09-TEST-7712 observed at Industrial Sector', source: 'Demo-ANPR-07', confidence: 88 },
  { id: 'EVT-015', eventId: 'EVT-015', caseId: 'C-004', entityId: 'P-7045', entityType: 'PERSON', entityName: 'Rajesh Nair', locationId: 'L-009', locationName: 'Warehouse Complex Foxtrot', timestamp: '2026-09-07T22:30:00Z', description: 'Person observed at Warehouse Complex', source: 'Demo-CAM-41', confidence: 76 },
  { id: 'EVT-016', eventId: 'EVT-016', caseId: 'C-005', entityId: 'P-9067', entityType: 'PERSON', entityName: 'Mohammed Farooq', locationId: 'L-010', locationName: 'Tech Park Hotel Zone', timestamp: '2026-09-06T13:00:00Z', description: 'Person at Tech Park Hotel Zone', source: 'Demo-CAM-30', confidence: 80 },
  { id: 'EVT-017', eventId: 'EVT-017', caseId: 'C-005', entityId: 'V-004', entityType: 'VEHICLE', entityName: 'DL01-DEMO-9988', locationId: 'L-011', locationName: 'Airport Approach Road', timestamp: '2026-09-06T15:30:00Z', description: 'Vehicle DL01-DEMO-9988 at Airport Approach', source: 'Demo-ANPR-20', confidence: 93 },
  { id: 'EVT-018', eventId: 'EVT-018', caseId: 'C-005', entityId: 'P-5023', entityType: 'PERSON', entityName: 'Vikram Joshi', locationId: 'L-011', locationName: 'Airport Approach Road', timestamp: '2026-09-06T15:45:00Z', description: 'Person at Airport Approach Road', source: 'Demo-CAM-50', confidence: 67 },
  { id: 'EVT-019', eventId: 'EVT-019', caseId: 'C-006', entityId: 'V-005', entityType: 'VEHICLE', entityName: 'MH12-TEST-5567', locationId: 'L-009', locationName: 'Warehouse Complex Foxtrot', timestamp: '2026-09-04T04:00:00Z', description: 'Vehicle MH12-TEST-5567 at Warehouse Complex', source: 'Demo-ANPR-08', confidence: 96 },
  { id: 'EVT-020', eventId: 'EVT-020', caseId: 'C-008', entityId: 'P-1078', entityType: 'PERSON', entityName: 'Sanjay Tiwari', locationId: 'L-012', locationName: 'Old City Market Area', timestamp: '2026-09-09T08:00:00Z', description: 'Person observed at Old City Market', source: 'Demo-CAM-55', confidence: 83 },
  { id: 'EVT-021', eventId: 'EVT-021', caseId: 'C-008', entityId: 'V-007', entityType: 'VEHICLE', entityName: 'RJ14-TEST-6677', locationId: 'L-012', locationName: 'Old City Market Area', timestamp: '2026-09-09T08:15:00Z', description: 'Vehicle RJ14-TEST-6677 near Old City Market', source: 'Demo-ANPR-12', confidence: 90 },
  { id: 'EVT-022', eventId: 'EVT-022', caseId: 'C-001', entityId: 'P-3099', entityType: 'PERSON', entityName: 'Sameer Khan', locationId: 'L-001', locationName: 'Bhopal Central Zone', timestamp: '2026-09-09T09:50:00Z', description: 'Person identified at Bhopal Central Zone', source: 'Demo-CAM-06', confidence: 82 },
  { id: 'EVT-023', eventId: 'EVT-023', caseId: 'C-004', entityId: 'P-1078', entityType: 'PERSON', entityName: 'Sanjay Tiwari', locationId: 'L-003', locationName: 'Industrial Sector 7', timestamp: '2026-09-07T23:30:00Z', description: 'Person at Industrial Sector 7', source: 'Demo-CAM-42', confidence: 75 },
  { id: 'EVT-024', eventId: 'EVT-024', caseId: 'C-004', entityId: 'V-008', entityType: 'VEHICLE', entityName: 'UP32-DEMO-4455', locationId: 'L-008', locationName: 'Border Checkpoint Bravo', timestamp: '2026-09-08T02:00:00Z', description: 'Vehicle UP32-DEMO-4455 at Border Checkpoint', source: 'Demo-ANPR-15', confidence: 97 },
  { id: 'EVT-025', eventId: 'EVT-025', caseId: 'C-003', entityId: 'P-4012', entityType: 'PERSON', entityName: 'Deepak Singh', locationId: 'L-001', locationName: 'Bhopal Central Zone', timestamp: '2026-08-14T16:00:00Z', description: 'Person observed at Bhopal Central Zone', source: 'Demo-CAM-03', confidence: 70 },
  { id: 'EVT-026', eventId: 'EVT-026', caseId: 'C-003', entityId: 'P-8056', entityType: 'PERSON', entityName: 'Anita Gupta', locationId: 'L-007', locationName: 'Residential Block Echo', timestamp: '2026-08-14T17:00:00Z', description: 'Person observed at Residential Block Echo', source: 'Demo-CAM-36', confidence: 62 },
  { id: 'EVT-027', eventId: 'EVT-027', caseId: 'C-005', entityId: 'P-1634', entityType: 'PERSON', entityName: 'Rakesh Dubey', locationId: 'L-006', locationName: 'Commercial District Gamma', timestamp: '2026-09-05T12:00:00Z', description: 'Person observed at Commercial District', source: 'Demo-CAM-28', confidence: 78 },
  { id: 'EVT-028', eventId: 'EVT-028', caseId: 'C-006', entityId: 'P-1412', entityType: 'PERSON', entityName: 'Harsh Pandey', locationId: 'L-012', locationName: 'Old City Market Area', timestamp: '2026-09-03T10:00:00Z', description: 'Person observed at Old City Market', source: 'Demo-CAM-56', confidence: 73 },
  { id: 'EVT-029', eventId: 'EVT-029', caseId: 'C-008', entityId: 'P-1634', entityType: 'PERSON', entityName: 'Rakesh Dubey', locationId: 'L-009', locationName: 'Warehouse Complex Foxtrot', timestamp: '2026-09-08T23:00:00Z', description: 'Person observed at Warehouse Complex', source: 'Demo-CAM-43', confidence: 69 },
  { id: 'EVT-030', eventId: 'EVT-030', caseId: 'C-001', entityId: 'P-1412', entityType: 'PERSON', entityName: 'Harsh Pandey', locationId: 'L-003', locationName: 'Industrial Sector 7', timestamp: '2026-09-09T11:20:00Z', description: 'Person observed at Industrial Sector 7', source: 'Demo-CAM-08', confidence: 71 },
  { id: 'EVT-031', eventId: 'EVT-031', caseId: 'C-002', entityId: 'P-2041', entityType: 'PERSON', entityName: 'Arjun Verma', locationId: 'L-001', locationName: 'Bhopal Central Zone', timestamp: '2026-09-08T13:30:00Z', description: 'Person at Bhopal Central Zone', source: 'Demo-CAM-04', confidence: 85 },
  { id: 'EVT-032', eventId: 'EVT-032', caseId: 'C-004', entityId: 'P-1634', entityType: 'PERSON', entityName: 'Rakesh Dubey', locationId: 'L-003', locationName: 'Industrial Sector 7', timestamp: '2026-09-07T22:45:00Z', description: 'Person observed at Industrial Sector 7', source: 'Demo-CAM-09', confidence: 77 },
];

// ====================== RELATIONSHIPS ======================
export const seedRelationships: Relationship[] = [
  { id: 'R-001', sourceEntityId: 'P-1042', sourceEntityType: 'PERSON', sourceEntityName: 'Rahul Mehra', targetEntityId: 'C-001', targetEntityType: 'CASE', targetEntityName: 'Case #2026-041', type: 'LINKED_TO', confidence: 97, source: 'Case Assignment', createdAt: '2026-07-15T09:00:00Z' },
  { id: 'R-002', sourceEntityId: 'V-001', sourceEntityType: 'VEHICLE', sourceEntityName: 'MP09-DEMO-4821', targetEntityId: 'C-002', targetEntityType: 'CASE', targetEntityName: 'Case #2026-017', type: 'LINKED_TO', confidence: 89, source: 'Cross-Case Analysis', createdAt: '2026-08-01T10:00:00Z' },
  { id: 'R-003', sourceEntityId: 'V-006', sourceEntityType: 'VEHICLE', sourceEntityName: 'MP09-DEMO-1122', targetEntityId: 'C-003', targetEntityType: 'CASE', targetEntityName: 'Case #2025-089', type: 'LINKED_TO', confidence: 72, source: 'Historical Analysis', createdAt: '2026-06-15T08:00:00Z' },
  { id: 'R-004', sourceEntityId: 'P-1042', sourceEntityType: 'PERSON', sourceEntityName: 'Rahul Mehra', targetEntityId: 'P-2041', targetEntityType: 'PERSON', targetEntityName: 'Arjun Verma', type: 'ASSOCIATED_WITH', confidence: 85, source: 'Shared location and vehicle events', description: 'Both persons appeared at Industrial Sector 7 and are associated with vehicle MP09-DEMO-4821', createdAt: '2026-09-09T12:30:00Z' },
  { id: 'R-005', sourceEntityId: 'P-1042', sourceEntityType: 'PERSON', sourceEntityName: 'Rahul Mehra', targetEntityId: 'V-001', targetEntityType: 'VEHICLE', targetEntityName: 'MP09-DEMO-4821', type: 'ASSOCIATED_WITH', confidence: 93, source: 'Vehicle registration and ANPR', createdAt: '2026-05-01T08:00:00Z' },
  { id: 'R-006', sourceEntityId: 'P-1042', sourceEntityType: 'PERSON', sourceEntityName: 'Rahul Mehra', targetEntityId: 'ID-001', targetEntityType: 'IDENTIFIER', targetEntityName: 'ID-DEMO-88421', type: 'USES', confidence: 96, source: 'Communication metadata', createdAt: '2026-05-10T08:00:00Z' },
  { id: 'R-007', sourceEntityId: 'P-1042', sourceEntityType: 'PERSON', sourceEntityName: 'Rahul Mehra', targetEntityId: 'L-001', targetEntityType: 'LOCATION', targetEntityName: 'Bhopal Central Zone', type: 'APPEARED_AT', confidence: 87, source: 'Demo surveillance data', createdAt: '2026-09-09T09:40:00Z' },
  { id: 'R-008', sourceEntityId: 'P-1042', sourceEntityType: 'PERSON', sourceEntityName: 'Rahul Mehra', targetEntityId: 'D-001', targetEntityType: 'DOCUMENT', targetEntityName: 'DOC-2026-041-009', type: 'USES', confidence: 94, source: 'Document analysis', createdAt: '2026-09-09T10:42:00Z' },
  { id: 'R-009', sourceEntityId: 'P-4012', sourceEntityType: 'PERSON', sourceEntityName: 'Deepak Singh', targetEntityId: 'C-003', targetEntityType: 'CASE', targetEntityName: 'Case #2025-089', type: 'LINKED_TO', confidence: 88, source: 'Historical Case File', createdAt: '2025-11-10T10:00:00Z' },
  { id: 'R-010', sourceEntityId: 'V-001', sourceEntityType: 'VEHICLE', sourceEntityName: 'MP09-DEMO-4821', targetEntityId: 'L-002', targetEntityType: 'LOCATION', targetEntityName: 'Transit Checkpoint Alpha', type: 'APPEARED_AT', confidence: 95, source: 'ANPR Demo Data', createdAt: '2026-09-09T10:15:00Z' },
  { id: 'R-011', sourceEntityId: 'V-001', sourceEntityType: 'VEHICLE', sourceEntityName: 'MP09-DEMO-4821', targetEntityId: 'L-003', targetEntityType: 'LOCATION', targetEntityName: 'Industrial Sector 7', type: 'APPEARED_AT', confidence: 92, source: 'ANPR Demo Data', createdAt: '2026-09-09T11:05:00Z' },
  { id: 'R-012', sourceEntityId: 'P-2041', sourceEntityType: 'PERSON', sourceEntityName: 'Arjun Verma', targetEntityId: 'C-001', targetEntityType: 'CASE', targetEntityName: 'Case #2026-041', type: 'LINKED_TO', confidence: 91, source: 'Case Assignment', createdAt: '2026-07-20T09:00:00Z' },
  { id: 'R-013', sourceEntityId: 'P-2041', sourceEntityType: 'PERSON', sourceEntityName: 'Arjun Verma', targetEntityId: 'C-002', targetEntityType: 'CASE', targetEntityName: 'Case #2026-017', type: 'LINKED_TO', confidence: 82, source: 'Cross-Case Analysis', createdAt: '2026-08-05T10:00:00Z' },
  { id: 'R-014', sourceEntityId: 'P-2041', sourceEntityType: 'PERSON', sourceEntityName: 'Arjun Verma', targetEntityId: 'V-001', targetEntityType: 'VEHICLE', targetEntityName: 'MP09-DEMO-4821', type: 'ASSOCIATED_WITH', confidence: 78, source: 'ANPR co-occurrence', createdAt: '2026-08-10T08:00:00Z' },
  { id: 'R-015', sourceEntityId: 'P-3099', sourceEntityType: 'PERSON', sourceEntityName: 'Sameer Khan', targetEntityId: 'C-001', targetEntityType: 'CASE', targetEntityName: 'Case #2026-041', type: 'LINKED_TO', confidence: 86, source: 'Case Assignment', createdAt: '2026-08-01T09:00:00Z' },
  { id: 'R-016', sourceEntityId: 'P-3099', sourceEntityType: 'PERSON', sourceEntityName: 'Sameer Khan', targetEntityId: 'V-002', targetEntityType: 'VEHICLE', targetEntityName: 'MP09-TEST-7712', type: 'ASSOCIATED_WITH', confidence: 88, source: 'Vehicle registration', createdAt: '2026-06-15T08:00:00Z' },
  { id: 'R-017', sourceEntityId: 'P-3099', sourceEntityType: 'PERSON', sourceEntityName: 'Sameer Khan', targetEntityId: 'P-1042', targetEntityType: 'PERSON', targetEntityName: 'Rahul Mehra', type: 'ASSOCIATED_WITH', confidence: 73, source: 'Shared location and temporal proximity', createdAt: '2026-09-09T10:00:00Z' },
  { id: 'R-018', sourceEntityId: 'P-5023', sourceEntityType: 'PERSON', sourceEntityName: 'Vikram Joshi', targetEntityId: 'C-004', targetEntityType: 'CASE', targetEntityName: 'Case #2026-052', type: 'LINKED_TO', confidence: 94, source: 'Case Assignment', createdAt: '2026-08-01T07:00:00Z' },
  { id: 'R-019', sourceEntityId: 'P-5023', sourceEntityType: 'PERSON', sourceEntityName: 'Vikram Joshi', targetEntityId: 'C-005', targetEntityType: 'CASE', targetEntityName: 'Case #2026-038', type: 'LINKED_TO', confidence: 76, source: 'Cross-Case Analysis', createdAt: '2026-08-20T10:00:00Z' },
  { id: 'R-020', sourceEntityId: 'P-5023', sourceEntityType: 'PERSON', sourceEntityName: 'Vikram Joshi', targetEntityId: 'V-003', targetEntityType: 'VEHICLE', targetEntityName: 'MP04-DEMO-3345', type: 'ASSOCIATED_WITH', confidence: 91, source: 'Vehicle registration', createdAt: '2026-07-20T08:00:00Z' },
  { id: 'R-021', sourceEntityId: 'P-6034', sourceEntityType: 'PERSON', sourceEntityName: 'Priyanka Deshmukh', targetEntityId: 'C-002', targetEntityType: 'CASE', targetEntityName: 'Case #2026-017', type: 'LINKED_TO', confidence: 80, source: 'Case Assignment', createdAt: '2026-04-01T08:00:00Z' },
  { id: 'R-022', sourceEntityId: 'P-7045', sourceEntityType: 'PERSON', sourceEntityName: 'Rajesh Nair', targetEntityId: 'C-004', targetEntityType: 'CASE', targetEntityName: 'Case #2026-052', type: 'LINKED_TO', confidence: 83, source: 'Case Assignment', createdAt: '2026-08-05T08:00:00Z' },
  { id: 'R-023', sourceEntityId: 'P-7045', sourceEntityType: 'PERSON', sourceEntityName: 'Rajesh Nair', targetEntityId: 'ORG-002', targetEntityType: 'ORGANIZATION', targetEntityName: 'Demo Logistics Ltd', type: 'ASSOCIATED_WITH', confidence: 79, source: 'Business records analysis', createdAt: '2026-08-08T08:00:00Z' },
  { id: 'R-024', sourceEntityId: 'P-1634', sourceEntityType: 'PERSON', sourceEntityName: 'Rakesh Dubey', targetEntityId: 'C-004', targetEntityType: 'CASE', targetEntityName: 'Case #2026-052', type: 'LINKED_TO', confidence: 88, source: 'Case Assignment', createdAt: '2026-08-15T08:00:00Z' },
  { id: 'R-025', sourceEntityId: 'P-1634', sourceEntityType: 'PERSON', sourceEntityName: 'Rakesh Dubey', targetEntityId: 'C-005', targetEntityType: 'CASE', targetEntityName: 'Case #2026-038', type: 'LINKED_TO', confidence: 75, source: 'Cross-Case Analysis', createdAt: '2026-08-25T10:00:00Z' },
  { id: 'R-026', sourceEntityId: 'P-1634', sourceEntityType: 'PERSON', sourceEntityName: 'Rakesh Dubey', targetEntityId: 'C-008', targetEntityType: 'CASE', targetEntityName: 'Case #2026-071', type: 'LINKED_TO', confidence: 82, source: 'Cross-Case Analysis', createdAt: '2026-09-03T08:00:00Z' },
  { id: 'R-027', sourceEntityId: 'P-1634', sourceEntityType: 'PERSON', sourceEntityName: 'Rakesh Dubey', targetEntityId: 'P-5023', targetEntityType: 'PERSON', targetEntityName: 'Vikram Joshi', type: 'ASSOCIATED_WITH', confidence: 71, source: 'Shared vehicle and location', createdAt: '2026-09-05T08:00:00Z' },
  { id: 'R-028', sourceEntityId: 'V-001', sourceEntityType: 'VEHICLE', sourceEntityName: 'MP09-DEMO-4821', targetEntityId: 'L-004', targetEntityType: 'LOCATION', targetEntityName: 'Lake Road Camera Cluster', type: 'APPEARED_AT', confidence: 74, source: 'Demo surveillance data', createdAt: '2026-09-09T10:42:00Z' },
  { id: 'R-029', sourceEntityId: 'P-1412', sourceEntityType: 'PERSON', sourceEntityName: 'Harsh Pandey', targetEntityId: 'C-001', targetEntityType: 'CASE', targetEntityName: 'Case #2026-041', type: 'LINKED_TO', confidence: 70, source: 'Cross-Case Analysis', createdAt: '2026-09-09T11:20:00Z' },
  { id: 'R-030', sourceEntityId: 'P-4012', sourceEntityType: 'PERSON', sourceEntityName: 'Deepak Singh', targetEntityId: 'V-006', targetEntityType: 'VEHICLE', targetEntityName: 'MP09-DEMO-1122', type: 'ASSOCIATED_WITH', confidence: 81, source: 'Vehicle registration', createdAt: '2026-03-18T08:00:00Z' },
];

// ====================== EVIDENCE ======================
export const seedEvidence: Evidence[] = [
  { id: 'E-001', evidenceId: 'EV-2026-041-001', caseId: 'C-001', type: 'Document', description: 'Identity document submitted for analysis — DOC-2026-041-009', hash: 'a7f3d2e1b9c8f4a5e6d7c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2', integrityStatus: 'VERIFIED', sourceType: 'DOCUMENT', sourceId: 'D-001', uploadedBy: 'U-002', createdAt: '2026-09-09T10:42:00Z' },
  { id: 'E-002', evidenceId: 'EV-2026-041-002', caseId: 'C-001', type: 'ANPR Record', description: 'Vehicle MP09-DEMO-4821 ANPR capture at Transit Checkpoint Alpha', hash: 'f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6', integrityStatus: 'VERIFIED', sourceType: 'EVENT', sourceId: 'EVT-002', uploadedBy: 'U-002', createdAt: '2026-09-09T10:20:00Z' },
  { id: 'E-003', evidenceId: 'EV-2026-041-003', caseId: 'C-001', type: 'Surveillance Image', description: 'Camera Demo-12 capture at Lake Road Camera Cluster', hash: 'e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7', integrityStatus: 'VERIFIED', sourceType: 'EVENT', sourceId: 'EVT-003', uploadedBy: 'U-002', createdAt: '2026-09-09T10:45:00Z' },
  { id: 'E-004', evidenceId: 'EV-2026-041-004', caseId: 'C-001', type: 'Network Analysis', description: 'Cross-case entity association analysis output', hash: 'd9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8', integrityStatus: 'VERIFIED', sourceType: 'INSIGHT', sourceId: 'INS-001', uploadedBy: 'U-004', createdAt: '2026-09-09T12:35:00Z' },
  { id: 'E-005', evidenceId: 'EV-2026-017-001', caseId: 'C-002', type: 'Document', description: 'Financial document analysis — DOC-2026-017-003', hash: 'c9f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5', integrityStatus: 'VERIFIED', sourceType: 'DOCUMENT', sourceId: 'D-003', uploadedBy: 'U-003', createdAt: '2026-06-20T11:30:00Z' },
  { id: 'E-006', evidenceId: 'EV-2026-017-002', caseId: 'C-002', type: 'ANPR Record', description: 'Vehicle MP09-DEMO-4821 at Commercial District', hash: 'b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9', integrityStatus: 'VERIFIED', sourceType: 'EVENT', sourceId: 'EVT-009', uploadedBy: 'U-002', createdAt: '2026-09-08T15:15:00Z' },
  { id: 'E-007', evidenceId: 'EV-2025-089-001', caseId: 'C-003', type: 'Document', description: 'Address proof analysis — DOC-2025-089-005', hash: 'b4f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0', integrityStatus: 'VERIFIED', sourceType: 'DOCUMENT', sourceId: 'D-008', uploadedBy: 'U-002', createdAt: '2025-12-10T14:20:00Z' },
  { id: 'E-008', evidenceId: 'EV-2026-052-001', caseId: 'C-004', type: 'Surveillance Image', description: 'Warehouse Complex camera captures — multiple entities', hash: 'a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0', integrityStatus: 'VERIFIED', sourceType: 'EVENT', sourceId: 'EVT-013', uploadedBy: 'U-002', createdAt: '2026-09-07T22:20:00Z' },
  { id: 'E-009', evidenceId: 'EV-2026-038-001', caseId: 'C-005', type: 'Financial Record', description: 'Demo financial trail analysis output', hash: '92f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1', integrityStatus: 'VERIFIED', sourceType: 'INSIGHT', sourceId: 'INS-005', uploadedBy: 'U-004', createdAt: '2026-09-06T16:00:00Z' },
  { id: 'E-010', evidenceId: 'EV-2026-071-001', caseId: 'C-008', type: 'Digital Evidence', description: 'Digital trail analysis — cyber-enabled forgery indicators', hash: '83e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2', integrityStatus: 'VERIFIED', sourceType: 'INSIGHT', sourceId: 'INS-007', uploadedBy: 'U-004', createdAt: '2026-09-09T17:00:00Z' },
];

// ====================== ALERTS ======================
export const seedAlerts: Alert[] = [
  { id: 'ALT-001', alertId: 'ALT-001', caseId: 'C-001', severity: 'HIGH', category: 'DOCUMENT', title: 'Potential identity inconsistency', description: 'Identity and document signals conflict with existing records in Case #2026-041. Document forensic analysis flagged potential photo manipulation.', entityId: 'P-1042', entityType: 'PERSON', isRead: false, isResolved: false, createdAt: '2026-09-09T10:43:00Z' },
  { id: 'ALT-002', alertId: 'ALT-002', caseId: 'C-001', severity: 'HIGH', category: 'CROSS_CASE', title: 'Cross-case entity correlation', description: 'Rahul Mehra appears in 3 active cases with shared vehicle and location events.', entityId: 'P-1042', entityType: 'PERSON', isRead: false, isResolved: false, createdAt: '2026-09-09T12:30:00Z' },
  { id: 'ALT-003', alertId: 'ALT-003', caseId: 'C-001', severity: 'MEDIUM', category: 'NETWORK', title: 'Network hub identified', description: 'Entity Rahul Mehra has the highest connectivity in the investigation network with 7+ direct connections.', entityId: 'P-1042', entityType: 'PERSON', isRead: true, isResolved: false, createdAt: '2026-09-09T12:35:00Z' },
  { id: 'ALT-004', alertId: 'ALT-004', caseId: 'C-004', severity: 'CRITICAL', category: 'NETWORK', title: 'Coordinated activity pattern', description: 'Multiple entities observed at Warehouse Complex Foxtrot and Industrial Sector 7 within a 2-hour window.', isRead: false, isResolved: false, createdAt: '2026-09-08T01:00:00Z' },
  { id: 'ALT-005', alertId: 'ALT-005', caseId: 'C-002', severity: 'MEDIUM', category: 'DOCUMENT', title: 'Financial document anomaly', description: 'Font variation detected in financial document DOC-2026-017-003.', entityId: 'D-003', entityType: 'DOCUMENT', isRead: true, isResolved: false, createdAt: '2026-06-20T11:35:00Z' },
  { id: 'ALT-006', alertId: 'ALT-006', severity: 'LOW', category: 'SECURITY', title: 'Unauthorized access attempt', description: 'Officer O-102 attempted to access restricted Case #2026-999.', isRead: true, isResolved: true, createdAt: '2026-09-09T10:44:00Z', resolvedAt: '2026-09-09T10:50:00Z', resolvedBy: 'U-001' },
  { id: 'ALT-007', alertId: 'ALT-007', caseId: 'C-004', severity: 'HIGH', category: 'EVIDENCE', title: 'New evidence linked to multi-case entity', description: 'Rakesh Dubey now appears in 3 separate cases with overlapping vehicle and location associations.', entityId: 'P-1634', entityType: 'PERSON', isRead: false, isResolved: false, createdAt: '2026-09-09T18:00:00Z' },
  { id: 'ALT-008', alertId: 'ALT-008', caseId: 'C-005', severity: 'MEDIUM', category: 'CROSS_CASE', title: 'Vehicle cross-case appearance', description: 'Vehicle UP32-DEMO-4455 associated with entities in both Case #2026-052 and Case #2026-038.', entityId: 'V-008', entityType: 'VEHICLE', isRead: false, isResolved: false, createdAt: '2026-09-08T03:00:00Z' },
  { id: 'ALT-009', alertId: 'ALT-009', caseId: 'C-008', severity: 'HIGH', category: 'NETWORK', title: 'Rapid entity expansion', description: 'Case #2026-071 entity network has expanded significantly in the last 48 hours.', isRead: false, isResolved: false, createdAt: '2026-09-09T17:30:00Z' },
  { id: 'ALT-010', alertId: 'ALT-010', caseId: 'C-001', severity: 'MEDIUM', category: 'EVIDENCE', title: 'Evidence integrity check passed', description: 'All 4 evidence items in Case #2026-041 have passed SHA-256 integrity verification.', isRead: true, isResolved: true, createdAt: '2026-09-09T13:00:00Z', resolvedAt: '2026-09-09T13:00:00Z', resolvedBy: 'SYSTEM' },
  { id: 'ALT-011', alertId: 'ALT-011', caseId: 'C-006', severity: 'MEDIUM', category: 'DOCUMENT', title: 'Pending document analysis', description: 'Document DOC-2026-063-001 has been queued for analysis for over 24 hours.', entityId: 'D-006', entityType: 'DOCUMENT', isRead: false, isResolved: false, createdAt: '2026-08-26T09:00:00Z' },
  { id: 'ALT-012', alertId: 'ALT-012', caseId: 'C-003', severity: 'LOW', category: 'NETWORK', title: 'Entity cleared from monitoring', description: 'Deepak Singh has been cleared from active monitoring in Case #2025-089.', entityId: 'P-4012', entityType: 'PERSON', isRead: true, isResolved: true, createdAt: '2026-06-15T10:00:00Z', resolvedAt: '2026-06-15T10:00:00Z', resolvedBy: 'U-002' },
  { id: 'ALT-013', alertId: 'ALT-013', caseId: 'C-001', severity: 'MEDIUM', category: 'NETWORK', title: 'Repeated vehicle at key locations', description: 'Vehicle MP09-DEMO-4821 appeared at 3 key investigation locations within 2 hours.', entityId: 'V-001', entityType: 'VEHICLE', isRead: false, isResolved: false, createdAt: '2026-09-09T11:10:00Z' },
  { id: 'ALT-014', alertId: 'ALT-014', caseId: 'C-004', severity: 'HIGH', category: 'CROSS_CASE', title: 'Organization link detected', description: 'Demo Trading Corp linked to entities in Case #2026-052 and Case #2026-038.', entityId: 'ORG-001', entityType: 'ORGANIZATION', isRead: false, isResolved: false, createdAt: '2026-09-08T12:00:00Z' },
  { id: 'ALT-015', alertId: 'ALT-015', severity: 'INFO', category: 'SECURITY', title: 'System health check passed', description: 'All security subsystems operational. Demo environment stable.', isRead: true, isResolved: true, createdAt: '2026-09-09T06:00:00Z', resolvedAt: '2026-09-09T06:00:00Z', resolvedBy: 'SYSTEM' },
  { id: 'ALT-016', alertId: 'ALT-016', caseId: 'C-008', severity: 'MEDIUM', category: 'DOCUMENT', title: 'Document processing in progress', description: 'Identity card DOC-2026-071-001 is currently being processed.', entityId: 'D-007', entityType: 'DOCUMENT', isRead: false, isResolved: false, createdAt: '2026-09-05T11:05:00Z' },
  { id: 'ALT-017', alertId: 'ALT-017', caseId: 'C-001', severity: 'LOW', category: 'EVIDENCE', title: 'New relationship added', description: 'A new association between Harsh Pandey and Case #2026-041 has been recorded.', entityId: 'P-1412', entityType: 'PERSON', isRead: false, isResolved: false, createdAt: '2026-09-09T11:25:00Z' },
  { id: 'ALT-018', alertId: 'ALT-018', caseId: 'C-005', severity: 'MEDIUM', category: 'NETWORK', title: 'Airport proximity event', description: 'Vehicle and person detected near Airport Approach Road within 15 minutes of each other.', isRead: false, isResolved: false, createdAt: '2026-09-06T15:50:00Z' },
  { id: 'ALT-019', alertId: 'ALT-019', caseId: 'C-004', severity: 'HIGH', category: 'EVIDENCE', title: 'Multi-entity location convergence', description: 'Three persons and two vehicles converged at Industrial Sector 7 within a single evening.', isRead: false, isResolved: false, createdAt: '2026-09-07T23:35:00Z' },
  { id: 'ALT-020', alertId: 'ALT-020', severity: 'MEDIUM', category: 'SECURITY', title: 'Session activity review', description: 'Officer O-102 has been active for 8+ hours. Session review recommended.', isRead: false, isResolved: false, createdAt: '2026-09-09T22:00:00Z' },
];

// ====================== INSIGHTS ======================
export const seedInsights: Insight[] = [
  {
    id: 'INS-001', insightId: 'INS-001', caseId: 'C-001',
    title: 'Cross-Case Entity Association', severity: 'HIGH',
    summary: 'Rahul Mehra appears in Case #2026-041 and Case #2026-017 and shares two associated entities with both investigations.',
    confidence: 87,
    evidenceIds: ['E-001', 'E-002', 'E-004'],
    supportingIndicators: [
      { label: 'Document inconsistency', status: 'warning', description: 'Document forensic analysis flagged potential manipulation in photo region', sourceId: 'D-001', sourceType: 'DOCUMENT' },
      { label: 'Identity inconsistency', status: 'warning', description: 'Entity resolution shows 94% match but with forensic review flags', sourceId: 'P-1042', sourceType: 'PERSON' },
      { label: 'Existing case association', status: 'confirmed', description: 'Entity appears in 3 separate cases', sourceId: 'C-001', sourceType: 'CASE' },
      { label: 'Repeated network association', status: 'confirmed', description: 'Entity has 7+ direct connections in the network', sourceId: 'P-1042', sourceType: 'PERSON' },
    ],
    explanation: 'This insight was generated because: (1) The same vehicle appears in two cases. (2) The same location appears within a short event window. (3) The person is associated with both records. (4) Document analysis produced an inconsistency flag.',
    recommendedAction: 'Review linked evidence and verify the identity association. Cross-reference with Case #2026-017 entities.',
    createdAt: '2026-09-09T12:35:00Z',
  },
  {
    id: 'INS-002', insightId: 'INS-002', caseId: 'C-001',
    title: 'Vehicle Movement Pattern', severity: 'MEDIUM',
    summary: 'Vehicle MP09-DEMO-4821 appeared at 3 key locations (Transit Checkpoint Alpha, Industrial Sector 7, Commercial District) within a 2-hour window on the same day.',
    confidence: 91,
    evidenceIds: ['E-002'],
    supportingIndicators: [
      { label: 'Multi-location appearance', status: 'confirmed', description: 'Vehicle recorded at 3 locations within 2 hours' },
      { label: 'Cross-case vehicle', status: 'confirmed', description: 'Same vehicle appears in Case #2026-041 and Case #2026-017' },
    ],
    explanation: 'The vehicle movement pattern was identified through ANPR demo data showing rapid transit across key investigation zones.',
    recommendedAction: 'Review vehicle ownership records and check for additional camera data along the route.',
    createdAt: '2026-09-09T11:10:00Z',
  },
  {
    id: 'INS-003', insightId: 'INS-003', caseId: 'C-001',
    title: 'Network Hub Identification', severity: 'HIGH',
    summary: 'Rahul Mehra has been identified as a potential network hub with the highest degree centrality in the investigation graph. Connected to 3 cases, 2 vehicles, 4 locations, and 2 documents.',
    confidence: 92,
    evidenceIds: ['E-001', 'E-002', 'E-003', 'E-004'],
    supportingIndicators: [
      { label: 'High degree centrality', status: 'confirmed', description: 'Entity has 7+ direct connections' },
      { label: 'Cross-case presence', status: 'confirmed', description: 'Entity appears in 3 active cases' },
      { label: 'Multiple vehicle associations', status: 'confirmed', description: 'Associated with 2 vehicles' },
      { label: 'Frequent location appearances', status: 'confirmed', description: 'Appeared at 4 distinct locations' },
    ],
    explanation: 'Graph analytics identified this entity as having the highest connectivity score in the current investigation network.',
    recommendedAction: 'Focus investigation resources on this entity and its immediate network. Review all associated evidence.',
    createdAt: '2026-09-09T12:40:00Z',
  },
  {
    id: 'INS-004', insightId: 'INS-004', caseId: 'C-004',
    title: 'Coordinated Location Activity', severity: 'CRITICAL',
    summary: 'Multiple persons (Vikram Joshi, Rajesh Nair, Sanjay Tiwari, Rakesh Dubey) and vehicles observed at Industrial Sector 7 and Warehouse Complex within a 90-minute window.',
    confidence: 84,
    evidenceIds: ['E-008'],
    supportingIndicators: [
      { label: 'Multi-entity convergence', status: 'confirmed', description: '4 persons at 2 locations in 90 minutes' },
      { label: 'Late-night activity', status: 'warning', description: 'Activity between 22:00 and 23:30' },
      { label: 'Cross-case entities', status: 'confirmed', description: 'Entities from Case #2026-052 and Case #2026-038 co-located' },
    ],
    explanation: 'Temporal and spatial analysis detected unusual convergence of multiple entities at Industrial Sector 7 and Warehouse Complex during late-night hours.',
    recommendedAction: 'Coordinate with field units for authorized verification. Review all camera feeds from the time window.',
    createdAt: '2026-09-08T01:00:00Z',
  },
  {
    id: 'INS-005', insightId: 'INS-005', caseId: 'C-005',
    title: 'Financial-Transport Correlation', severity: 'MEDIUM',
    summary: 'Financial identifiers and vehicle movements show temporal correlation between Demo Finance Associates activities and Airport Approach Road events.',
    confidence: 73,
    evidenceIds: ['E-009'],
    supportingIndicators: [
      { label: 'Financial-transport overlap', status: 'warning', description: 'Financial activity coincides with vehicle movement near airport' },
      { label: 'Organization linkage', status: 'confirmed', description: 'Demo Finance Associates connected to persons in this case' },
    ],
    explanation: 'Pattern analysis detected a correlation between financial activity timestamps and transport events.',
    recommendedAction: 'Review financial records alongside transport data. Verify organization connections.',
    createdAt: '2026-09-06T16:00:00Z',
  },
  {
    id: 'INS-006', insightId: 'INS-006', caseId: 'C-004',
    title: 'Organization Network Pattern', severity: 'HIGH',
    summary: 'Demo Trading Corp and Demo Logistics Ltd share common associated persons (Vikram Joshi, Rajesh Nair, Rakesh Dubey), suggesting potential coordinated activity.',
    confidence: 78,
    evidenceIds: ['E-008'],
    supportingIndicators: [
      { label: 'Shared personnel', status: 'confirmed', description: 'Common persons across both organizations' },
      { label: 'Co-located activities', status: 'confirmed', description: 'Organization activities at overlapping locations' },
    ],
    explanation: 'Network analysis identified shared connections between two organizations linked to the same investigation.',
    recommendedAction: 'Investigate organization ownership and registration records. Review financial linkages.',
    createdAt: '2026-09-08T12:00:00Z',
  },
  {
    id: 'INS-007', insightId: 'INS-007', caseId: 'C-008',
    title: 'Rapid Network Expansion', severity: 'MEDIUM',
    summary: 'Case #2026-071 has seen a 40% increase in connected entities over the past 48 hours, with new persons and vehicles being added to the network.',
    confidence: 81,
    evidenceIds: ['E-010'],
    supportingIndicators: [
      { label: 'Entity growth rate', status: 'warning', description: '40% entity increase in 48 hours' },
      { label: 'New cross-case links', status: 'confirmed', description: 'New connections to Case #2026-052' },
    ],
    explanation: 'Monitoring detected an unusual rate of entity additions to this case network.',
    recommendedAction: 'Review newly added entities for relevance and accuracy. Ensure proper authorization for expanded investigation scope.',
    createdAt: '2026-09-09T17:00:00Z',
  },
  {
    id: 'INS-008', insightId: 'INS-008',
    title: 'Multi-Case Entity — Rakesh Dubey', severity: 'HIGH',
    summary: 'Rakesh Dubey appears across 3 separate cases (2026-052, 2026-038, 2026-071) with shared vehicle and location associations across all three.',
    confidence: 85,
    evidenceIds: [],
    supportingIndicators: [
      { label: 'Three-case presence', status: 'confirmed', description: 'Entity in Case #2026-052, #2026-038, #2026-071' },
      { label: 'Shared vehicle', status: 'confirmed', description: 'UP32-DEMO-4455 linked across cases' },
      { label: 'Location overlap', status: 'confirmed', description: 'Industrial Sector 7 and Warehouse Complex appearances' },
    ],
    explanation: 'Cross-case analysis identified Rakesh Dubey as appearing in 3 separate investigations with consistent vehicle and location patterns.',
    recommendedAction: 'Consider consolidating related case elements. Review all three case files for additional connections.',
    createdAt: '2026-09-09T18:00:00Z',
  },
];

// ====================== AUDIT LOGS ======================
export const seedAuditLogs: AuditLog[] = [
  { id: 'AUD-001', userId: 'U-002', userName: 'Inspector Priya Sharma', userRole: 'INVESTIGATING_OFFICER', action: 'LOGIN', resource: 'Authentication', result: 'ALLOWED', ipAddress: '192.168.DEMO.102', sessionId: 'SES-DEMO-001', timestamp: '2026-09-09T09:30:00Z' },
  { id: 'AUD-002', userId: 'U-002', userName: 'Inspector Priya Sharma', userRole: 'INVESTIGATING_OFFICER', action: 'VIEW_DASHBOARD', resource: 'Dashboard', result: 'ALLOWED', ipAddress: '192.168.DEMO.102', sessionId: 'SES-DEMO-001', timestamp: '2026-09-09T09:31:00Z' },
  { id: 'AUD-003', userId: 'U-002', userName: 'Inspector Priya Sharma', userRole: 'INVESTIGATING_OFFICER', action: 'VIEW_CASE', resource: 'Case', resourceId: 'C-001', caseId: 'C-001', result: 'ALLOWED', ipAddress: '192.168.DEMO.102', sessionId: 'SES-DEMO-001', timestamp: '2026-09-09T10:42:00Z' },
  { id: 'AUD-004', userId: 'U-002', userName: 'Inspector Priya Sharma', userRole: 'INVESTIGATING_OFFICER', action: 'OPEN_DOCUMENT', resource: 'Document', resourceId: 'D-001', caseId: 'C-001', result: 'ALLOWED', ipAddress: '192.168.DEMO.102', sessionId: 'SES-DEMO-001', timestamp: '2026-09-09T10:43:00Z' },
  { id: 'AUD-005', userId: 'U-002', userName: 'Inspector Priya Sharma', userRole: 'INVESTIGATING_OFFICER', action: 'RUN_ANALYSIS', resource: 'Document Analysis', resourceId: 'D-001', caseId: 'C-001', result: 'ALLOWED', ipAddress: '192.168.DEMO.102', sessionId: 'SES-DEMO-001', timestamp: '2026-09-09T10:44:00Z' },
  { id: 'AUD-006', userId: 'U-002', userName: 'Inspector Priya Sharma', userRole: 'INVESTIGATING_OFFICER', action: 'ENTITY_RESOLUTION', resource: 'Entity Resolution', resourceId: 'P-1042', caseId: 'C-001', result: 'ALLOWED', ipAddress: '192.168.DEMO.102', sessionId: 'SES-DEMO-001', timestamp: '2026-09-09T10:45:00Z' },
  { id: 'AUD-007', userId: 'U-002', userName: 'Inspector Priya Sharma', userRole: 'INVESTIGATING_OFFICER', action: 'VIEW_NETWORK', resource: 'Network Graph', caseId: 'C-001', result: 'ALLOWED', ipAddress: '192.168.DEMO.102', sessionId: 'SES-DEMO-001', timestamp: '2026-09-09T10:50:00Z' },
  { id: 'AUD-008', userId: 'U-002', userName: 'Inspector Priya Sharma', userRole: 'INVESTIGATING_OFFICER', action: 'VIEW_TIMELINE', resource: 'Timeline', caseId: 'C-001', result: 'ALLOWED', ipAddress: '192.168.DEMO.102', sessionId: 'SES-DEMO-001', timestamp: '2026-09-09T11:00:00Z' },
  { id: 'AUD-009', userId: 'U-002', userName: 'Inspector Priya Sharma', userRole: 'INVESTIGATING_OFFICER', action: 'VIEW_MAP', resource: 'Intelligence Map', caseId: 'C-001', result: 'ALLOWED', ipAddress: '192.168.DEMO.102', sessionId: 'SES-DEMO-001', timestamp: '2026-09-09T11:05:00Z' },
  { id: 'AUD-010', userId: 'U-002', userName: 'Inspector Priya Sharma', userRole: 'INVESTIGATING_OFFICER', action: 'VIEW_CASE', resource: 'Case', resourceId: 'C-999', result: 'DENIED', ipAddress: '192.168.DEMO.102', sessionId: 'SES-DEMO-001', timestamp: '2026-09-09T10:44:02Z', metadata: { reason: 'Unauthorized — case not assigned to officer' } },
  { id: 'AUD-011', userId: 'U-002', userName: 'Inspector Priya Sharma', userRole: 'INVESTIGATING_OFFICER', action: 'VIEW_EVIDENCE', resource: 'Evidence', resourceId: 'E-001', caseId: 'C-001', result: 'ALLOWED', ipAddress: '192.168.DEMO.102', sessionId: 'SES-DEMO-001', timestamp: '2026-09-09T12:00:00Z' },
  { id: 'AUD-012', userId: 'U-002', userName: 'Inspector Priya Sharma', userRole: 'INVESTIGATING_OFFICER', action: 'VIEW_AUDIT', resource: 'Audit Logs', result: 'DENIED', ipAddress: '192.168.DEMO.102', sessionId: 'SES-DEMO-001', timestamp: '2026-09-09T12:10:00Z', metadata: { reason: 'Investigating Officers do not have audit log access by default' } },
  { id: 'AUD-013', userId: 'U-004', userName: 'Analyst Rajan Patel', userRole: 'ANALYST', action: 'LOGIN', resource: 'Authentication', result: 'ALLOWED', ipAddress: '192.168.DEMO.104', sessionId: 'SES-DEMO-002', timestamp: '2026-09-09T11:00:00Z' },
  { id: 'AUD-014', userId: 'U-004', userName: 'Analyst Rajan Patel', userRole: 'ANALYST', action: 'VIEW_NETWORK', resource: 'Network Graph', result: 'ALLOWED', ipAddress: '192.168.DEMO.104', sessionId: 'SES-DEMO-002', timestamp: '2026-09-09T11:05:00Z' },
  { id: 'AUD-015', userId: 'U-004', userName: 'Analyst Rajan Patel', userRole: 'ANALYST', action: 'GENERATE_INSIGHT', resource: 'AI Insights', caseId: 'C-001', result: 'ALLOWED', ipAddress: '192.168.DEMO.104', sessionId: 'SES-DEMO-002', timestamp: '2026-09-09T12:35:00Z' },
  { id: 'AUD-016', userId: 'U-003', userName: 'Dr. Kavita Reddy', userRole: 'FORENSIC_OFFICER', action: 'LOGIN', resource: 'Authentication', result: 'ALLOWED', ipAddress: '192.168.DEMO.103', sessionId: 'SES-DEMO-003', timestamp: '2026-09-09T09:00:00Z' },
  { id: 'AUD-017', userId: 'U-003', userName: 'Dr. Kavita Reddy', userRole: 'FORENSIC_OFFICER', action: 'VIEW_DOCUMENT', resource: 'Document', resourceId: 'D-003', caseId: 'C-002', result: 'ALLOWED', ipAddress: '192.168.DEMO.103', sessionId: 'SES-DEMO-003', timestamp: '2026-09-09T09:30:00Z' },
  { id: 'AUD-018', userId: 'U-005', userName: 'Auditor Meena Iyer', userRole: 'AUDITOR', action: 'LOGIN', resource: 'Authentication', result: 'ALLOWED', ipAddress: '192.168.DEMO.105', sessionId: 'SES-DEMO-004', timestamp: '2026-09-09T09:00:00Z' },
  { id: 'AUD-019', userId: 'U-005', userName: 'Auditor Meena Iyer', userRole: 'AUDITOR', action: 'VIEW_AUDIT', resource: 'Audit Logs', result: 'ALLOWED', ipAddress: '192.168.DEMO.105', sessionId: 'SES-DEMO-004', timestamp: '2026-09-09T09:05:00Z' },
  { id: 'AUD-020', userId: 'U-001', userName: 'Admin Kumar', userRole: 'SUPER_ADMIN', action: 'SYSTEM_CONFIG', resource: 'System Settings', result: 'ALLOWED', ipAddress: '192.168.DEMO.101', sessionId: 'SES-DEMO-005', timestamp: '2026-09-09T08:00:00Z' },
  { id: 'AUD-021', userId: 'U-002', userName: 'Inspector Priya Sharma', userRole: 'INVESTIGATING_OFFICER', action: 'UPLOAD_DOCUMENT', resource: 'Document Upload', resourceId: 'D-001', caseId: 'C-001', result: 'ALLOWED', ipAddress: '192.168.DEMO.102', sessionId: 'SES-DEMO-001', timestamp: '2026-09-09T10:42:30Z' },
  { id: 'AUD-022', userId: 'U-002', userName: 'Inspector Priya Sharma', userRole: 'INVESTIGATING_OFFICER', action: 'VIEW_INSIGHTS', resource: 'AI Insights', caseId: 'C-001', result: 'ALLOWED', ipAddress: '192.168.DEMO.102', sessionId: 'SES-DEMO-001', timestamp: '2026-09-09T12:40:00Z' },
];

// ====================== PASSWORD HASH ======================
// Demo password hash for "Demo@12345"
// In a real system this would be bcrypt/argon2. For demo, we use a simple comparison.
export const DEMO_PASSWORD = 'Demo@12345';
export const DEMO_MFA_CODE = '123456';
