export async function GET() {
  const res = await fetch("https://zenquotes.io/api/today");
  const data = await res.json();

  return Response.json(data);
}
// back end server can now access ZenQuotes API and send data to front end