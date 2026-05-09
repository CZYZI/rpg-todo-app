export const QWEN_SYSTEM_PROMPT = '你是一个RPG任务生成器。';

export function buildTaskPrompt(
  taskName: string,
  worldview: string,
  historyDescriptions: string[]
): string {
  let prompt = `用户待办：${taskName}。世界观：${worldview}。请用20字内生成任务描述，包含强化动词、世界观元素和积分（格式：'任务描述，奖励X积分'）。避免使用直白词汇。`;
  
  if (historyDescriptions.length > 0) {
    prompt += `\n注意：之前已生成过类似描述：${historyDescriptions.join('；')}。请使用不同的怪物名称、场景元素，避免重复。`;
  }
  
  return prompt;
}

export const FALLBACK_DESCRIPTIONS: Record<string, string[]> = {
  medieval: [
    '前往遗迹探索，奖励{X}积分',
    '击败深渊巨龙，奖励{X}积分',
    '净化被诅咒的村庄，奖励{X}积分',
  ],
  cyberpunk: [
    '潜入暗网禁区，奖励{X}积分',
    '操控机械臂，奖励{X}积分',
    '破解加密协议，奖励{X}积分',
  ],
  modern: [
    '探索未知区域，奖励{X}积分',
    '完成秘密任务，奖励{X}积分',
    '解锁隐藏关卡，奖励{X}积分',
  ],
};
