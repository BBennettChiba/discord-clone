import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  type NewComputer,
  insertComputerSchema,
  computers,
  computerIdSchema,
  type ComputerId,
  type Computer,
} from "@/lib/db/schema/computers";

type MutationReturnType = Promise<
  | {
      computer: Computer;
      error?: undefined;
    }
  | {
      error: string;
      computer?: undefined;
    }
>;

export const createComputer = async (
  computer: NewComputer,
): MutationReturnType => {
  const newComputer = insertComputerSchema.parse(computer);
  try {
    const [c] = await db.insert(computers).values(newComputer).returning();
    return { computer: c };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const updateComputer = async (
  id: ComputerId,
  computer: NewComputer,
): MutationReturnType => {
  const { id: computerId } = computerIdSchema.parse({ id });
  const newComputer = insertComputerSchema.parse(computer);
  try {
    const [c] = await db
      .update(computers)
      .set(newComputer)
      .where(eq(computers.id, computerId))
      .returning();
    return { computer: c };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const deleteComputer = async (id: ComputerId): MutationReturnType => {
  const { id: computerId } = computerIdSchema.parse({ id });
  try {
    const [c] = await db
      .delete(computers)
      .where(eq(computers.id, computerId))
      .returning();
    return { computer: c };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Error, please try again";
    console.error(message);
    return { error: message };
  }
};
