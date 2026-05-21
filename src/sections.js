export const REQUIRED_SECTIONS = [
  "Operating Contract",
  "Identity",
  "Mission",
  "Project Constellation",
  "Voice and Style",
  "Preferences and Constraints",
  "Workflows and Tools",
  "Knowledge Domains",
  "Collaboration Protocol",
  "Privacy and Boundaries",
  "Update Log"
];

export function normalizeHeading(heading) {
  return heading.trim().replace(/\s+/g, " ");
}
