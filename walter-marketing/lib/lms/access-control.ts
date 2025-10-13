/**
 * LMS Access Control
 * Determines what LMS features users can access based on their subscription tier
 */

export type SubscriptionPlan = 'reflect' | 'journey' | 'coach';

export interface LMSAccessPermissions {
  canAccessLMS: boolean;
  canAccessAllModules: boolean;
  canDownloadResources: boolean;
  canAccessCoaching: boolean;
  allowedModules: string[];
  reason?: string;
}

/**
 * Get LMS access permissions based on subscription plan
 */
export function getLMSAccess(plan: SubscriptionPlan): LMSAccessPermissions {
  switch (plan) {
    case 'reflect':
      return {
        canAccessLMS: false,
        canAccessAllModules: false,
        canDownloadResources: false,
        canAccessCoaching: false,
        allowedModules: [],
        reason: 'Upgrade to Journey to access the full curriculum',
      };

    case 'journey':
      return {
        canAccessLMS: true,
        canAccessAllModules: true,
        canDownloadResources: true,
        canAccessCoaching: false,
        allowedModules: [
          'camino-module-1-awareness',
          'camino-module-2-belonging',
          'camino-module-3-resilience',
          'camino-module-4-purpose',
        ],
      };

    case 'coach':
      return {
        canAccessLMS: true,
        canAccessAllModules: true,
        canDownloadResources: true,
        canAccessCoaching: true,
        allowedModules: [
          'camino-module-1-awareness',
          'camino-module-2-belonging',
          'camino-module-3-resilience',
          'camino-module-4-purpose',
        ],
      };

    default:
      return {
        canAccessLMS: false,
        canAccessAllModules: false,
        canDownloadResources: false,
        canAccessCoaching: false,
        allowedModules: [],
        reason: 'Invalid subscription plan',
      };
  }
}

/**
 * Check if user can access a specific module
 */
export function canAccessModule(plan: SubscriptionPlan, moduleSlug: string): boolean {
  const permissions = getLMSAccess(plan);
  return permissions.allowedModules.includes(moduleSlug);
}

/**
 * Get upgrade prompt message based on current plan
 */
export function getUpgradeMessage(currentPlan: SubscriptionPlan): string {
  if (currentPlan === 'reflect') {
    return 'Upgrade to Journey ($19.95/mo) to unlock the full curriculum with 4 guided modules.';
  }
  if (currentPlan === 'journey') {
    return 'Upgrade to Coach ($1,000/mo) for 1:1 guidance and personalized support.';
  }
  return '';
}
