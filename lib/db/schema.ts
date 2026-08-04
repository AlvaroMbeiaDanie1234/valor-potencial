import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core"

/* -------------------------------------------------------------------------- */
/*  Better Auth tables (camelCase columns — do not rename)                    */
/* -------------------------------------------------------------------------- */

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").default(false).notNull(),
  image: text("image"),
  role: text("role").default("candidate").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
})

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
})

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
  refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
})

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
})

/* -------------------------------------------------------------------------- */
/*  Application tables                                                        */
/* -------------------------------------------------------------------------- */

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull(),
  location: text("location").notNull(),
  contractType: text("contract_type").default("Tempo integral").notNull(),
  rotation: text("rotation"),
  experienceLevel: text("experience_level").default("Intermediario").notNull(),
  salaryRange: text("salary_range"),
  vacancies: integer("vacancies").default(1).notNull(),
  summary: text("summary").notNull(),
  description: text("description").notNull(),
  requirements: text("requirements"),
  benefits: text("benefits"),
  requiredDocuments: text("required_documents"),
  status: text("status").default("aberta").notNull(),
  featured: boolean("featured").default(false).notNull(),
  deadline: timestamp("deadline"),
  createdBy: text("created_by"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const candidateProfiles = pgTable("candidate_profiles", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull().unique(),
  fullName: text("full_name").notNull(),
  phone: text("phone"),
  birthDate: text("birth_date"),
  gender: text("gender"),
  idNumber: text("id_number"),
  nationality: text("nationality").default("Angolana"),
  province: text("province"),
  city: text("city"),
  address: text("address"),
  headline: text("headline"),
  bio: text("bio"),
  educationLevel: text("education_level"),
  course: text("course"),
  institution: text("institution"),
  graduationYear: text("graduation_year"),
  yearsExperience: text("years_experience"),
  currentRole: text("current_role"),
  currentCompany: text("current_company"),
  certifications: text("certifications"),
  languages: text("languages"),
  skills: text("skills"),
  linkedin: text("linkedin"),
  availableFrom: text("available_from"),
  willingOffshore: boolean("willing_offshore").default(true).notNull(),
  verificationStatus: text("verification_status").default("incompleto").notNull(),
  interviewScheduled: boolean("interview_scheduled").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id").notNull(),
  userId: text("userId").notNull(),
  status: text("status").default("recebida").notNull(),
  coverLetter: text("cover_letter"),
  expectedSalary: text("expected_salary"),
  adminNotes: text("admin_notes"),
  rating: integer("rating"),
  reviewedAt: timestamp("reviewed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull(),
  applicationId: integer("application_id"),
  docType: text("doc_type").notNull(),
  fileName: text("file_name").notNull(),
  pathname: text("pathname").notNull(),
  contentType: text("content_type"),
  size: integer("size"),
  status: text("status").default("pendente").notNull(),
  reviewNote: text("review_note"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const applicationEvents = pgTable("application_events", {
  id: serial("id").primaryKey(),
  applicationId: integer("application_id").notNull(),
  actorId: text("actor_id"),
  fromStatus: text("from_status"),
  toStatus: text("to_status").notNull(),
  note: text("note"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export type Job = typeof jobs.$inferSelect
export type CandidateProfile = typeof candidateProfiles.$inferSelect
export type Application = typeof applications.$inferSelect
export type CandidateDocument = typeof documents.$inferSelect
export type ApplicationEvent = typeof applicationEvents.$inferSelect
