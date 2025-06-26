import { NextRequest, NextResponse } from 'next/server';
import { askAI } from '../../../lib/services/chatgpt';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, prompt, context } = body;

    if (!type || !prompt) {
      return NextResponse.json(
        { success: false, error: 'Type and prompt are required' },
        { status: 400 }
      );
    }

    let systemPrompt = '';
    let aiPrompt = prompt;

    switch (type) {
      case 'reward_image':
        systemPrompt = `You are an expert game artist. Generate a detailed description for an image that will be used as a reward icon in a battle pass system. The description should be suitable for an AI image generator like DALL-E or Midjourney. Focus on:
        - Clear, iconic design suitable for a small icon (64x64 to 128x128 pixels)
        - Gaming aesthetic that fits the reward type
        - Professional game art style
        - Vibrant colors that stand out
        Return only the image description, no other text.`;
        break;

      case 'reward_description':
        systemPrompt = `You are an expert game designer writing reward descriptions for a battle pass system. Create engaging, concise descriptions that make players excited about the reward. Keep descriptions under 100 characters and focus on what makes the reward special or valuable.`;
        break;

      case 'battle_pass_theme':
        systemPrompt = `You are a creative game designer specializing in battle pass themes. Generate a complete theme concept including:
        - Theme name
        - Visual style description
        - Sample reward names (5-10 items)
        - Color scheme suggestions
        - Lore/story background
        Format as JSON with keys: name, description, rewards, colors, lore`;
        aiPrompt = `Create a battle pass theme based on: ${prompt}`;
        break;

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid AI generation type' },
          { status: 400 }
        );
    }

    const result = await askAI({
      prompt: aiPrompt,
      systemPrompt,
      model: 'gpt-4',
      files: []
    });

    return NextResponse.json({
      success: true,
      data: {
        type,
        prompt,
        result,
        context,
        generatedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error in AI generation:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      },
      { status: 500 }
    );
  }
} 