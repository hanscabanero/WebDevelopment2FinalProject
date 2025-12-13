import { promises as fs } from "fs";
import path from "path";

// Absolute path to data/journals.json
const filePath = path.join(process.cwd(), "data", "journals.json");

// GET return all journal entries
export async function GET() {
  try {
    const file = await fs.readFile(filePath, "utf8");
    const journals = JSON.parse(file);
    return Response.json(journals);
  } catch (err) {
    // If file is empty or missing, return empty array
    return Response.json([]);
  }
}

// POST add a new journal entry
export async function POST(req) {
  try {
    const { title, content } = await req.json();

    const file = await fs.readFile(filePath, "utf8");
    const journals = JSON.parse(file);

    const newEntry = {
      id: Date.now(),
      title,
      content,
      datetime: new Date().toLocaleString(),
    };

    journals.unshift(newEntry);

    await fs.writeFile(filePath, JSON.stringify(journals, null, 2));

    return Response.json({ success: true, entry: newEntry });
  } catch (err) {
    console.error("Failed to write journal:", err);
    return new Response("Failed to save journal", { status: 500 });
  }
}
