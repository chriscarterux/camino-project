import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";
import WelcomeEmail from "@/lib/emails/welcome-lead";

const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting map (in production, use Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 }); // 1 minute
    return true;
  }

  if (limit.count >= 3) {
    return false;
  }

  limit.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email, name, primary_interest, source } = body;

    // Validation
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    // Source validation
    const validSources = [
      "homepage",
      "how-it-works",
      "pricing",
      "footer",
      "exit-intent",
    ];
    if (!source || !validSources.includes(source)) {
      return NextResponse.json(
        { error: "Invalid source" },
        { status: 400 }
      );
    }

    // Create Supabase client
    const supabase = await createClient();

    // Check if lead already exists
    const { data: existingLead, error: checkError } = await supabase
      .from("leads")
      .select("id")
      .eq("email", normalizedEmail)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      // PGRST116 = no rows returned
      console.error("Database check error:", checkError);
      return NextResponse.json(
        { error: "Database error" },
        { status: 500 }
      );
    }

    if (existingLead) {
      return NextResponse.json(
        { error: "This email is already registered" },
        { status: 409 }
      );
    }

    // Insert lead
    const { data: lead, error: insertError } = await supabase
      .from("leads")
      .insert({
        email: normalizedEmail,
        name: name?.trim() || null,
        primary_interest: primary_interest || null,
        source,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to save lead" },
        { status: 500 }
      );
    }

    // Send welcome email
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "noreply@camino.app",
        to: normalizedEmail,
        subject: "Welcome to Camino - Your Journey Begins",
        react: WelcomeEmail({ name: name || undefined }),
      });
    } catch (emailError) {
      // Log error but don't fail the request
      console.error("Email send error:", emailError);
    }

    // Track conversion in analytics
    // This would integrate with PostHog, Mixpanel, etc.

    return NextResponse.json({
      success: true,
      message: "Welcome! Check your email to get started.",
      leadId: lead.id,
    });

  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET endpoint for analytics/admin (optional)
export async function GET(request: NextRequest) {
  try {
    // This would require authentication in production
    const supabase = await createClient();

    // Get lead stats
    const { count: totalLeads, error: countError } = await supabase
      .from("leads")
      .select("*", { count: "exact", head: true });

    if (countError) {
      throw countError;
    }

    // Get leads by source
    const { data: leadsBySource, error: sourceError } = await supabase
      .from("leads")
      .select("source")
      .order("created_at", { ascending: false });

    if (sourceError) {
      throw sourceError;
    }

    const sourceCounts = leadsBySource?.reduce((acc: any, lead) => {
      acc[lead.source] = (acc[lead.source] || 0) + 1;
      return acc;
    }, {});

    return NextResponse.json({
      totalLeads,
      leadsBySource: sourceCounts,
    });

  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
