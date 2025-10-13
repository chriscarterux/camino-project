/**
 * SSO Bridge: Supabase ↔ Frappe LMS
 * Manages user synchronization and authentication between systems
 */

import { frappeClient } from './frappe-client';
import { createClient } from '../supabase/server';

export interface FrappeUser {
  name: string; // email
  email: string;
  first_name?: string;
  enabled: boolean;
  api_key?: string;
  api_secret?: string;
}

/**
 * Create or get Frappe user for Supabase user
 * Called automatically on Supabase signup
 */
export async function syncUserToFrappe(
  supabaseUserId: string,
  email: string,
  name?: string
): Promise<{ success: boolean; lmsUserId?: string; apiToken?: string }> {
  try {
    // Check if user exists in Frappe
    const existingUser = await getFrappeUser(email);

    if (existingUser) {
      // User exists, generate/get API token
      const token = await generateFrappeApiToken(email);
      return {
        success: true,
        lmsUserId: existingUser.name,
        apiToken: token,
      };
    }

    // Create new Frappe user
    const newUser = await createFrappeUser(email, name);

    // Generate API token for the user
    const token = await generateFrappeApiToken(email);

    // Update Supabase profile with LMS info
    const supabase = await createClient();
    await supabase
      .from('profiles')
      .update({
        lms_user_id: newUser.name,
        lms_api_token: token,
      })
      .eq('id', supabaseUserId);

    return {
      success: true,
      lmsUserId: newUser.name,
      apiToken: token,
    };
  } catch (error) {
    console.error('Frappe sync error:', error);
    return { success: false };
  }
}

/**
 * Check if Frappe user exists
 */
async function getFrappeUser(email: string): Promise<FrappeUser | null> {
  try {
    const response = await frappeClient.getDoc('User', email);
    return response.data || null;
  } catch (error) {
    // User doesn't exist
    return null;
  }
}

/**
 * Create Frappe user
 */
async function createFrappeUser(email: string, name?: string): Promise<FrappeUser> {
  const firstName = name?.split(' ')[0] || email.split('@')[0];

  const userData = {
    doctype: 'User',
    email,
    first_name: firstName,
    enabled: 1,
    send_welcome_email: 0,
    user_type: 'Website User',
    role_profile_name: 'LMS Student',
  };

  const response = await frappeClient.createDoc('User', userData);
  return response.data;
}

/**
 * Generate API token for Frappe user
 * This token is used for all LMS API calls on behalf of the user
 */
async function generateFrappeApiToken(email: string): Promise<string> {
  try {
    // Call Frappe method to generate API key
    const response = await frappeClient.call(
      'frappe.core.doctype.user.user.generate_keys',
      { user: email }
    );

    // Frappe returns api_key and api_secret
    // We'll use them to create a token
    const { api_key, api_secret } = response.message;

    // Encode as base64 token for easy storage
    const token = Buffer.from(`${api_key}:${api_secret}`).toString('base64');

    return token;
  } catch (error) {
    console.error('Token generation error:', error);
    throw error;
  }
}

/**
 * Decode API token back to key:secret
 */
export function decodeApiToken(token: string): { apiKey: string; apiSecret: string } {
  const decoded = Buffer.from(token, 'base64').toString('utf-8');
  const [apiKey, apiSecret] = decoded.split(':');
  return { apiKey, apiSecret };
}

/**
 * Enroll user in Journey modules based on subscription
 */
export async function enrollUserInJourneyModules(
  email: string,
  plan: string,
  userToken: string
): Promise<void> {
  if (plan !== 'journey' && plan !== 'coach') {
    return; // Only Journey and Coach tiers get LMS access
  }

  // Enroll in all 4 Camino modules
  const modules = [
    'camino-module-1-awareness',
    'camino-module-2-belonging',
    'camino-module-3-resilience',
    'camino-module-4-purpose',
  ];

  for (const moduleSlug of modules) {
    try {
      await frappeClient.call(
        'lms.lms.doctype.lms_enrollment.lms_enrollment.create_enrollment',
        {
          course: moduleSlug,
          member: email,
        },
        userToken
      );
    } catch (error) {
      console.error(`Failed to enroll in ${moduleSlug}:`, error);
      // Continue with other modules
    }
  }
}

/**
 * Unenroll user from Journey modules (on downgrade/cancellation)
 */
export async function unenrollUserFromJourneyModules(
  email: string,
  userToken: string
): Promise<void> {
  try {
    // Get user's enrollments
    const enrollments = await frappeClient.getDocList(
      'LMS Enrollment',
      ['name', 'course'],
      [['member', '=', email]],
      userToken
    );

    // Delete enrollments for Camino modules
    for (const enrollment of enrollments.data || []) {
      if (enrollment.course.startsWith('camino-module-')) {
        await frappeClient.deleteDoc('LMS Enrollment', enrollment.name, userToken);
      }
    }
  } catch (error) {
    console.error('Unenroll error:', error);
  }
}
