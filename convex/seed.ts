import { mutation } from "./_generated/server";
import data from "../db.json";

export const seedDatabase = mutation(async (ctx) => {

    for (const product of data.data) {
        await ctx.db.insert("products", product);
    }
});