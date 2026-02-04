import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { ScanResult } from "@/lib/detector";
import { getPrivacyPrompt, getTermsPrompt, getCookiePrompt } from "@/lib/prompts";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { scanResult, documentType } = body as {
      scanResult: ScanResult;
      documentType: "privacy" | "terms" | "cookie";
    };

    if (!scanResult || !documentType) {
      return NextResponse.json(
        { error: "scanResult and documentType are required" },
        { status: 400 }
      );
    }

    if (!["privacy", "terms", "cookie"].includes(documentType)) {
      return NextResponse.json(
        { error: "documentType must be 'privacy', 'terms', or 'cookie'" },
        { status: 400 }
      );
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    // Select prompt based on document type
    let prompt: string;
    switch (documentType) {
      case "privacy":
        prompt = getPrivacyPrompt(scanResult);
        break;
      case "terms":
        prompt = getTermsPrompt(scanResult);
        break;
      case "cookie":
        prompt = getCookiePrompt(scanResult);
        break;
    }

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 8000,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== "text") {
      return NextResponse.json(
        { error: "Unexpected response format" },
        { status: 500 }
      );
    }

    // Clean up the response - remove code fences if present
    let document = content.text;
    document = document.replace(/^```html?\s*\n?/i, "").replace(/\n?```\s*$/i, "");

    return NextResponse.json({
      document,
      documentType,
      siteName: scanResult.siteName,
      url: scanResult.url,
      detectionCount: scanResult.detections.length,
    });
  } catch (error: unknown) {
    console.error("Generation error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to generate document: ${msg}` },
      { status: 500 }
    );
  }
}
