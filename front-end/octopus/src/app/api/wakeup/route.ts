export async function GET(request: Request) {
  return new Response("API is awake!", {
    status: 200,
  });
}
