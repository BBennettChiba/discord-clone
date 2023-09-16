import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  computerIdSchema,
  computers,
  type ComputerId,
  type Computer,
} from "@/lib/db/schema/computers";

export const getComputers = async (): Promise<{ computers: Computer[] }> => {
  const c = await db.select().from(computers);
  return { computers: c };
};

export const getComputerById = async (
  id: ComputerId,
): Promise<{ computer: Computer }> => {
  const { id: computerId } = computerIdSchema.parse({ id });
  const [c] = await db
    .select()
    .from(computers)
    .where(eq(computers.id, computerId));

  return { computer: c };
};
