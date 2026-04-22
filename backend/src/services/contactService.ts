import { collections, getDb, isMongoConfigured } from "@/lib/mongodb";
import type { ContactInput, ContactSubmission } from "@/types";

export async function createContactSubmission(
  input: ContactInput
): Promise<ContactSubmission> {
  const submission: ContactSubmission = {
    id: `contact-${Date.now()}`,
    name: input.name,
    email: input.email,
    phone: input.phone || "",
    subject: input.subject || "General Inquiry",
    message: input.message,
    createdAt: new Date().toISOString(),
    status: "pending",
  };

  if (isMongoConfigured()) {
    const db = await getDb();
    await db.collection<ContactSubmission>(collections.contacts).insertOne(submission);
  } else {
    console.log("MongoDB is not configured. Contact submission was not persisted:", submission);
  }

  return submission;
}
