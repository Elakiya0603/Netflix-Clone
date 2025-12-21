import clientPromise from "@/lib/mongo";
import { ObjectId } from "mongodb";

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

export async function PUT(req: Request) {
  const { profileId, name } = await req.json();

  if (!profileId || !name) {
    return Response.json(
      { error: "Profile ID and name required" },
      { status: 400 }
    );
  }

  const client = await clientPromise;
  const db = client.db();

  await db.collection("profiles").updateOne(
    { _id: new ObjectId(profileId) },
    { $set: { name } }
  );

  return Response.json({ success: true });
}

export async function DELETE(req: Request) {
  const { profileId } = await req.json();

  if (!profileId) {
    return Response.json(
      { error: "Profile ID required" },
      { status: 400 }
    );
  }

  const client = await clientPromise;
  const db = client.db();

  await db.collection("profiles").deleteOne({
    _id: new ObjectId(profileId),
  });

  return Response.json({ success: true });
}
