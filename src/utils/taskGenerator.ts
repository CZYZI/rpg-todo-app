// No unused imports

/**
 * 任务描述防重复处理
 * 检查新生成的描述是否与历史描述重复
 */
export function checkDescriptionDuplicate(
  newDescription: string,
  historyDescriptions: string[]
): boolean {
  // 简单匹配：去掉积分数字后比较
  const normalize = (desc: string) => desc.replace(/奖励\d+积分/, '').trim();
  const normalizedNew = normalize(newDescription);
  
  return historyDescriptions.some((desc) => normalize(desc) === normalizedNew);
}

/**
 * 从 RPG 描述中提取积分
 */
export function extractScoreFromDescription(description: string): number | null {
  const match = description.match(/奖励(\d+)积分/);
  if (match) {
    return parseInt(match[1], 10);
  }
  return null;
}

/**
 * 生成防重复 Prompt 增强版
 */
export function buildAntiDuplicatePrompt(
  taskName: string,
  worldview: string,
  historyDescriptions: string[]
): string {
  let prompt = `用户待办：${taskName}。世界观：${worldview}。请生成20字内的RPG任务描述，包含积分（格式：'描述，奖励X积分'）。`;

  if (historyDescriptions.length > 0) {
    prompt += `\n\n重要：以下描述已经使用过，请避免使用相同或相似的元素：\n`;
    prompt += historyDescriptions.map((desc, i) => `${i + 1}. ${desc}`).join('\n');
    prompt += `\n\n请确保新描述使用不同的：怪物名称、地点、动作、奖励描述方式。`;
  }

  return prompt;
}
