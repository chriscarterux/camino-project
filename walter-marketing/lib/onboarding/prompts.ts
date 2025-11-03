import { Intent } from "@/components/onboarding/IntentSelector";

export interface ReflectionPromptData {
  id: string;
  text: string;
  dimension: "identity" | "worldview" | "relationships";
}

/**
 * Reflection prompts organized by intent and sequence
 */
export const reflectionPrompts: Record<
  Exclude<Intent, "all">,
  [ReflectionPromptData, ReflectionPromptData, ReflectionPromptData]
> = {
  identity: [
    {
      id: "identity_1",
      text: "What belief about yourself feels most limiting right now?",
      dimension: "identity",
    },
    {
      id: "identity_2",
      text: "When do you feel most like your authentic self? What's different about those moments?",
      dimension: "identity",
    },
    {
      id: "identity_3",
      text: "If you could let go of one belief about who you're 'supposed to be', what would it be?",
      dimension: "identity",
    },
  ],
  worldview: [
    {
      id: "worldview_1",
      text: "What assumption about how the world works do you question most?",
      dimension: "worldview",
    },
    {
      id: "worldview_2",
      text: "Describe a time when reality surprised you—when something worked differently than you expected.",
      dimension: "worldview",
    },
    {
      id: "worldview_3",
      text: "What belief about 'how things should be' causes you the most frustration?",
      dimension: "worldview",
    },
  ],
  relationships: [
    {
      id: "relationships_1",
      text: "What pattern in your relationships keeps repeating?",
      dimension: "relationships",
    },
    {
      id: "relationships_2",
      text: "Think of a difficult relationship. What role do you typically play? What role do you want to play?",
      dimension: "relationships",
    },
    {
      id: "relationships_3",
      text: "What do you need from others that you find hard to ask for?",
      dimension: "relationships",
    },
  ],
};

/**
 * Mixed prompts for "all dimensions" intent
 */
export const mixedPrompts: [ReflectionPromptData, ReflectionPromptData, ReflectionPromptData] = [
  reflectionPrompts.identity[0],
  reflectionPrompts.worldview[0],
  reflectionPrompts.relationships[0],
];

/**
 * Get prompts for a given intent
 */
export function getPromptsForIntent(
  intent: Intent
): [ReflectionPromptData, ReflectionPromptData, ReflectionPromptData] {
  if (intent === "all") {
    return mixedPrompts;
  }
  return reflectionPrompts[intent];
}

/**
 * Get a specific prompt by intent and number (1-3)
 */
export function getPrompt(intent: Intent, number: number): ReflectionPromptData {
  const prompts = getPromptsForIntent(intent);
  return prompts[number - 1];
}
