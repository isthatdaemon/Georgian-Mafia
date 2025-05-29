export function assignRoles(playerNames: string[]) {
  const roles: string[] = [];

  const total = playerNames.length;

  if (total < 10) {
    throw new Error("მინიმუმ 10 მოთამაშე საჭიროა");
  }

  // აუცილებელი როლები
  roles.push("მაფია", "მაფია", "მაფია");
  roles.push("დეტექტივი");
  roles.push("ექიმი");
  roles.push("მანიაკი");

  // დანარჩენი - მოქალაქეები
  while (roles.length < total) {
    roles.push("მოქალაქე");
  }

  // გადაურიეთ როლებს
  const shuffled = roles.sort(() => Math.random() - 0.5);

  // დააბრუნე ობიექტად: { "player1": "მაფია", ... }
  const result: Record<string, string> = {};
  playerNames.forEach((name, i) => {
    result[name] = shuffled[i];
  });

  return result;
}
