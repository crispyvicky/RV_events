/** Realistic event-management quotation line items (INR) */

export function defaultLinesFor(type) {
  switch (type) {
    case "Wedding":
      return [
        { description: "Wedding creative direction & planning retainer", qty: 1, unit: "package", rate: 175000 },
        { description: "Venue styling & floral design (ceremony + reception)", qty: 1, unit: "package", rate: 320000 },
        { description: "Lighting design & ambient production", qty: 1, unit: "package", rate: 145000 },
        { description: "Stage / mandap build & soft furnishings", qty: 1, unit: "package", rate: 180000 },
        { description: "Guest flow, seating & hospitality desk", qty: 1, unit: "day", rate: 45000 },
        { description: "On-site coordination team (lead + assistants)", qty: 2, unit: "day", rate: 55000 },
        { description: "Run-of-show, cue sheets & vendor management", qty: 1, unit: "package", rate: 40000 },
        { description: "Bridal / VIP green-room styling", qty: 1, unit: "package", rate: 35000 },
      ];
    case "Corporate":
      return [
        { description: "Event concept, brand narrative & creative direction", qty: 1, unit: "package", rate: 125000 },
        { description: "Stage design, LED wall & scenic set", qty: 1, unit: "package", rate: 280000 },
        { description: "AV production (sound, projection, playback)", qty: 1, unit: "package", rate: 160000 },
        { description: "Registration desk & badge / guest management", qty: 1, unit: "day", rate: 35000 },
        { description: "Content cueing & show-calling", qty: 1, unit: "day", rate: 45000 },
        { description: "On-site production crew", qty: 1, unit: "day", rate: 75000 },
        { description: "VIP hospitality lounge setup", qty: 1, unit: "package", rate: 55000 },
        { description: "Photography / highlight reel coordination", qty: 1, unit: "package", rate: 40000 },
      ];
    case "Social":
    case "Birthday":
      return [
        { description: "Celebration concept & moodboard", qty: 1, unit: "package", rate: 65000 },
        { description: "Venue décor, florals & table styling", qty: 1, unit: "package", rate: 180000 },
        { description: "Ambient lighting & focal installation", qty: 1, unit: "package", rate: 95000 },
        { description: "Entertainment / DJ coordination", qty: 1, unit: "package", rate: 45000 },
        { description: "Cake / dessert moment styling", qty: 1, unit: "package", rate: 25000 },
        { description: "Day-of coordination team", qty: 1, unit: "day", rate: 40000 },
        { description: "Guest welcome & gifts desk", qty: 1, unit: "package", rate: 20000 },
      ];
    case "Destination":
      return [
        { description: "Destination experience design & itinerary", qty: 1, unit: "package", rate: 150000 },
        { description: "Venue / property sourcing & liaison", qty: 1, unit: "package", rate: 75000 },
        { description: "Guest travel & rooming coordination", qty: 1, unit: "package", rate: 90000 },
        { description: "Multi-day production & décor", qty: 3, unit: "day", rate: 120000 },
        { description: "On-site hospitality & concierge team", qty: 3, unit: "day", rate: 45000 },
        { description: "Welcome dinner / cultural programming", qty: 1, unit: "package", rate: 85000 },
        { description: "Logistics, transfers & vendor travel", qty: 1, unit: "package", rate: 60000 },
      ];
    case "Product Launch":
      return [
        { description: "Launch narrative & experiential concept", qty: 1, unit: "package", rate: 140000 },
        { description: "Immersive set / product reveal build", qty: 1, unit: "package", rate: 260000 },
        { description: "Lighting, sound & media servers", qty: 1, unit: "package", rate: 150000 },
        { description: "Influencer / press hospitality lane", qty: 1, unit: "package", rate: 45000 },
        { description: "Show calling & brand film cues", qty: 1, unit: "day", rate: 50000 },
        { description: "On-site crew & technical rehearsal", qty: 2, unit: "day", rate: 65000 },
      ];
    case "Conference":
      return [
        { description: "Conference design & programme architecture", qty: 1, unit: "package", rate: 110000 },
        { description: "Main stage + breakout room AV", qty: 1, unit: "package", rate: 220000 },
        { description: "Registration, badging & wayfinding", qty: 1, unit: "package", rate: 55000 },
        { description: "Speaker green room & tech checks", qty: 1, unit: "day", rate: 35000 },
        { description: "Live streaming / hybrid setup (optional)", qty: 1, unit: "package", rate: 90000 },
        { description: "Floor management & ushers", qty: 2, unit: "day", rate: 30000 },
      ];
    default:
      return [
        { description: "Creative direction & planning", qty: 1, unit: "package", rate: 95000 },
        { description: "Production design & décor", qty: 1, unit: "package", rate: 175000 },
        { description: "Lighting & atmosphere", qty: 1, unit: "package", rate: 85000 },
        { description: "AV / sound support", qty: 1, unit: "package", rate: 70000 },
        { description: "On-site coordination team", qty: 1, unit: "day", rate: 45000 },
        { description: "Vendor management & run-of-show", qty: 1, unit: "package", rate: 35000 },
        { description: "Guest hospitality desk", qty: 1, unit: "day", rate: 25000 },
      ];
  }
}
