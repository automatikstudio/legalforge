import { NextRequest, NextResponse } from "next/server";
import { scanHTML } from "@/lib/detector";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Normalize URL
    let normalizedUrl = url.trim();
    if (!normalizedUrl.startsWith("http://") && !normalizedUrl.startsWith("https://")) {
      normalizedUrl = "https://" + normalizedUrl;
    }

    // Validate URL
    try {
      new URL(normalizedUrl);
    } catch {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
    }

    // Fetch the website
    let html: string;
    try {
      const response = await fetch(normalizedUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; LegalForge/1.0; +https://legalforge.vercel.app)",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
        redirect: "follow",
        signal: AbortSignal.timeout(15000),
      });

      if (!response.ok) {
        return NextResponse.json(
          { error: `Failed to fetch website (HTTP ${response.status})` },
          { status: 400 }
        );
      }

      html = await response.text();
    } catch (fetchError: unknown) {
      const msg = fetchError instanceof Error ? fetchError.message : "Unknown error";
      return NextResponse.json(
        { error: `Could not reach website: ${msg}` },
        { status: 400 }
      );
    }

    // Scan the HTML
    const scanResult = scanHTML(html, normalizedUrl);

    return NextResponse.json(scanResult);
  } catch (error: unknown) {
    console.error("Scan error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
