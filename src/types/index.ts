// ============================================
// SIH Criminal Intelligence Platform — Types
// ============================================

// ---------- Enums ----------

export type UserRole = 'SUPER_ADMIN' | 'INVESTIGATING_OFFICER' | 'FORENSIC_OFFICER' | 'ANALYST' | 'AUDITOR';

export type CaseStatus = 'ACTIVE' | 'CLOSED' | 'PENDING' | 'ARCHIVED' | 'UNDER_REVIEW';

export type CasePriority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export type AlertSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';

export type AlertCategory = 'DOCUMENT' | 'NETWORK' | 'CROSS_CASE' | 'SECURITY' | 'EVIDENCE';

export type DocumentAnalysisStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';

export type IntegrityStatus = 'VERIFIED' | 'COMPROMISED' | 'PENDING';

export type AuditResult = 'ALLOWED' | 'DENIED' | 'ERROR';

export type EntityType = 'PERSON' | 'DOCUMENT' | 'CASE' | 'VEHICLE' | 'IDENTIFIER' | 'LOCATION' | 'ORGANIZATION' | 'EVENT';

export type RelationshipType =
  | 'LINKED_TO'
  | 'ASSOCIATED_WITH'
  | 'USES'
  | 'APPEARED_AT'
  | 'INVOLVED_IN'
  | 'RELATED_TO'
  | 'VERIFIED_AS'
  | 'OWNS'
  | 'CONTACTED';

export type InsightSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

// ---------- Core Entities ----------

export interface User {
  id: string;
  name: string;
  officerId: string;
  role: UserRole;
  email: string;
  department: string;
  avatarUrl?: string;
  isActive: boolean;
  createdAt: string;
  lastLoginAt?: string;
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  role: UserRole;
  createdAt: string;
  expiresAt: string;
  ipAddress: string;
  isActive: boolean;
}

export interface Case {
  id: string;
  caseNumber: string;
  title: string;
  description: string;
  status: CaseStatus;
  priority: CasePriority;
  leadOfficerId: string;
  leadOfficerName?: string;
  assignedOfficerIds: string[];
  createdAt: string;
  updatedAt: string;
  closedAt?: string;
  entityCount?: number;
  relationshipCount?: number;
  eventCount?: number;
  crossCaseLinks?: number;
  alertCount?: number;
  evidenceCount?: number;
}

export interface Person {
  id: string;
  personId: string;
  name: string;
  aliases: string[];
  dob?: string;
  nationality?: string;
  gender?: string;
  status: string;
  riskLevel: CasePriority;
  associatedCaseIds: string[];
  metadata?: Record<string, string>;
  photoUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Vehicle {
  id: string;
  vehicleId: string;
  registration: string;
  type: string;
  make?: string;
  model?: string;
  color?: string;
  associatedPersonIds: string[];
  associatedCaseIds: string[];
  createdAt: string;
}

export interface Identifier {
  id: string;
  identifierId: string;
  type: string;
  value: string;
  valueMasked: string;
  associatedPersonId?: string;
  associatedCaseIds: string[];
  createdAt: string;
}

export interface Location {
  id: string;
  locationId: string;
  name: string;
  type: string;
  lat: number;
  lng: number;
  address?: string;
  zone?: string;
  createdAt: string;
}

export interface Organization {
  id: string;
  name: string;
  type: string;
  description?: string;
  associatedPersonIds: string[];
  createdAt: string;
}

export interface Document {
  id: string;
  documentId: string;
  caseId: string;
  personId?: string;
  documentType: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  hash: string;
  analysisStatus: DocumentAnalysisStatus;
  ocrData?: OCRData;
  forensicData?: ForensicData;
  entityResolution?: EntityResolutionResult;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Evidence {
  id: string;
  evidenceId: string;
  caseId: string;
  type: string;
  description: string;
  hash: string;
  integrityStatus: IntegrityStatus;
  sourceType: string;
  sourceId: string;
  uploadedBy: string;
  createdAt: string;
  metadata?: Record<string, string>;
}

export interface Event {
  id: string;
  eventId: string;
  caseId: string;
  entityId: string;
  entityType: EntityType;
  entityName?: string;
  locationId: string;
  locationName?: string;
  timestamp: string;
  description: string;
  source: string;
  confidence: number;
  metadata?: Record<string, string>;
}

export interface Relationship {
  id: string;
  sourceEntityId: string;
  sourceEntityType: EntityType;
  sourceEntityName?: string;
  targetEntityId: string;
  targetEntityType: EntityType;
  targetEntityName?: string;
  type: RelationshipType;
  confidence: number;
  source: string;
  description?: string;
  createdAt: string;
}

export interface Alert {
  id: string;
  alertId: string;
  caseId?: string;
  severity: AlertSeverity;
  category: AlertCategory;
  title: string;
  description: string;
  entityId?: string;
  entityType?: EntityType;
  isRead: boolean;
  isResolved: boolean;
  createdAt: string;
  resolvedAt?: string;
  resolvedBy?: string;
}

export interface Insight {
  id: string;
  insightId: string;
  caseId?: string;
  title: string;
  severity: InsightSeverity;
  summary: string;
  confidence: number;
  evidenceIds: string[];
  supportingIndicators: SupportingIndicator[];
  explanation: string;
  recommendedAction: string;
  createdAt: string;
}

export interface SupportingIndicator {
  label: string;
  status: 'confirmed' | 'warning' | 'review';
  description: string;
  sourceId?: string;
  sourceType?: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName?: string;
  userRole?: UserRole;
  action: string;
  resource: string;
  resourceId?: string;
  caseId?: string;
  result: AuditResult;
  ipAddress: string;
  sessionId?: string;
  timestamp: string;
  metadata?: Record<string, string>;
}

// ---------- Document Intelligence Types ----------

export interface OCRData {
  accuracy: number;
  fields: OCRField[];
  rawText?: string;
  mrzData?: MRZData;
}

export interface OCRField {
  fieldName: string;
  value: string;
  confidence: number;
  matchStatus: 'MATCH' | 'MISMATCH' | 'REVIEW_REQUIRED' | 'NOT_APPLICABLE';
}

export interface MRZData {
  status: 'PASSED' | 'FAILED' | 'NOT_APPLICABLE';
  fields?: Record<string, string>;
}

export interface ForensicData {
  overallScore: number;
  imageQuality: ForensicCheck;
  visualIntegrity: ForensicCheck;
  textAnalysis: ForensicCheck;
  signals: ForensicSignal[];
}

export interface ForensicCheck {
  status: 'NORMAL' | 'REVIEW' | 'SUSPICIOUS';
  score: number;
  details: Record<string, string>;
}

export interface ForensicSignal {
  name: string;
  status: 'NORMAL' | 'REVIEW' | 'SUSPICIOUS';
  description: string;
  explanation: string;
}

export interface EntityResolutionResult {
  candidates: EntityCandidate[];
  resolvedEntityId?: string;
  resolvedConfidence?: number;
  status: 'PENDING' | 'RESOLVED' | 'NO_MATCH' | 'REVIEW_REQUIRED';
}

export interface EntityCandidate {
  entityId: string;
  entityName: string;
  confidence: number;
  matchSignals: MatchSignal[];
}

export interface MatchSignal {
  field: string;
  score: number;
  description: string;
}

// ---------- Graph Types ----------

export interface GraphNode {
  id: string;
  entityId: string;
  entityType: EntityType;
  label: string;
  properties: Record<string, unknown>;
  connectionCount: number;
  caseIds: string[];
  riskLevel?: CasePriority;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  type: RelationshipType;
  confidence: number;
  label: string;
  source_description?: string;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

// ---------- Timeline Types ----------

export interface TimelineEntry {
  id: string;
  timestamp: string;
  entityId: string;
  entityType: EntityType;
  entityName: string;
  locationId?: string;
  locationName?: string;
  description: string;
  caseId?: string;
  source: string;
  confidence: number;
  eventType: string;
}

// ---------- Map Types ----------

export interface MapPoint {
  id: string;
  lat: number;
  lng: number;
  label: string;
  type: EntityType;
  eventId?: string;
  entityId?: string;
  entityName?: string;
  timestamp?: string;
  description?: string;
  confidence?: number;
  caseId?: string;
}

// ---------- Search Types ----------

export interface SearchResult {
  id: string;
  type: EntityType;
  name: string;
  entityId: string;
  description?: string;
  caseIds: string[];
  priority?: CasePriority;
  relevanceScore: number;
}

// ---------- Assistant Types ----------

export interface AssistantMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: AssistantSource[];
  timestamp: string;
}

export interface AssistantSource {
  type: EntityType;
  id: string;
  label: string;
  description?: string;
}

// ---------- API Response Types ----------

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ---------- Auth Types ----------

export interface LoginRequest {
  officerId: string;
  password: string;
  mfaCode: string;
}

export interface AuthUser {
  id: string;
  name: string;
  officerId: string;
  role: UserRole;
  department: string;
}

// ---------- Demo Types ----------

export interface DemoStep {
  id: number;
  title: string;
  description: string;
  route: string;
  action?: string;
  highlight?: string;
}

// ---------- RBAC Types ----------

export interface Permission {
  resource: string;
  actions: ('read' | 'write' | 'delete' | 'admin')[];
}

export type RolePermissions = Record<UserRole, Permission[]>;

// ---------- Cross-Case Types ----------

export interface CrossCaseConnection {
  case1Id: string;
  case1Number: string;
  case2Id: string;
  case2Number: string;
  sharedEntities: {
    entityId: string;
    entityType: EntityType;
    entityName: string;
  }[];
  connectionStrength: number;
}

export interface OverlapMatrix {
  cases: { id: string; caseNumber: string }[];
  entities: {
    entityId: string;
    entityName: string;
    entityType: EntityType;
    casePresence: Record<string, boolean>;
  }[];
}

// ---------- Security Types ----------

export interface SecurityHealth {
  overallScore: number;
  authentication: 'PROTECTED' | 'WARNING' | 'CRITICAL';
  authorization: 'ACTIVE' | 'WARNING' | 'CRITICAL';
  encryption: 'ENABLED' | 'PARTIAL' | 'DISABLED';
  audit: 'ACTIVE' | 'WARNING' | 'INACTIVE';
  fileSecurity: 'PROTECTED' | 'WARNING' | 'CRITICAL';
  apiProtection: 'ACTIVE' | 'WARNING' | 'CRITICAL';
  sessionSecurity: 'PROTECTED' | 'WARNING' | 'CRITICAL';
}

// ---------- Evidence Fusion Types ----------

export interface EvidenceFusionResult {
  signals: FusionSignal[];
  overallPriority: 'HIGH' | 'MEDIUM' | 'LOW';
  supportingIndicators: string[];
}

export interface FusionSignal {
  name: string;
  status: 'confirmed' | 'warning' | 'pending';
  icon: string;
}
