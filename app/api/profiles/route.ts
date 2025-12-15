import clientPromise from "@/lib/mongo";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return Response.json({ error: "Email required" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db();

  const profiles = await db
    .collection("profiles")
    .find({ accountEmail: email })
    .toArray();

  return Response.json(profiles);
}

export async function POST(req: Request) {
  const { email, name } = await req.json();

  if (!email || !name) {
    return Response.json(
      { error: "Email and profile name required" },
      { status: 400 }
    );
  }

  const client = await clientPromise;
  const db = client.db();

  // 🔒 limit to 4 profiles
  const count = await db
    .collection("profiles")
    .countDocuments({ accountEmail: email });

  if (count >= 4) {
    return Response.json(
      { error: "Maximum 4 profiles allowed" },
      { status: 400 }
    );
  }

  await db.collection("profiles").insertOne({
    accountEmail: email,
    name,
    createdAt: new Date(),
  });

  return Response.json({ success: true });
}
